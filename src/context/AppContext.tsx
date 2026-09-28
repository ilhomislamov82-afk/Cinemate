import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserPreferences, SupportedLanguage, MovieItem, WatchlistItem } from '../types';
import { translations, Translations } from '../i18n/translations';

interface AppContextType {
  preferences: UserPreferences;
  t: Translations;
  updateNickname: (username: string) => void;
  updateContentPreference: (pref: 'movies' | 'animated' | 'both') => void;
  updateFavoriteGenres: (genres: string[]) => void;
  updateLanguage: (lang: SupportedLanguage) => void;
  completeOnboarding: () => void;
  skipOnboarding: () => void;
  toggleFavorite: (movieId: string) => void;
  isFavorite: (movieId: string) => boolean;
  toggleWatchlist: (movieId: string) => void;
  isInWatchlist: (movieId: string) => boolean;
  isWatched: (movieId: string) => boolean;
  setWatchlistWatched: (movieId: string, watched: boolean) => void;
  removeFromWatchlist: (movieId: string) => void;
  rateMovie: (movieId: string, rating: number) => void;
  getUserRating: (movieId: string) => number | undefined;
  recordViewed: (movieId: string) => void;
  clearFavorites: () => void;
  clearWatchlist: () => void;
  resetPreferences: () => void;

  // Global modals
  selectedMovie: MovieItem | null;
  openMovieDetails: (movie: MovieItem) => void;
  closeMovieDetails: () => void;
  activeTrailer: { youtubeId: string; title: string } | null;
  openTrailer: (youtubeId: string, title: string) => void;
  closeTrailer: () => void;

  // AI Assistant Drawer
  isAssistantOpen: boolean;
  openAssistant: () => void;
  closeAssistant: () => void;
  toggleAssistant: () => void;
  assistantInitialPrompt?: string;
  triggerAssistantWithPrompt: (prompt: string) => void;
}

const STORAGE_KEY = 'cinemate_user_preferences_v1';

const DEFAULT_PREFERENCES: UserPreferences = {
  username: '',
  contentPreference: 'both',
  favoriteGenres: ['Adventure', 'Science Fiction', 'Animation'],
  language: 'en',
  isOnboarded: false,
  ratings: {},
  favorites: [],
  watchlist: [],
  viewedHistory: [],
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...DEFAULT_PREFERENCES, ...parsed };
      }
    } catch {
      // Fallback
    }
    return DEFAULT_PREFERENCES;
  });

  const [selectedMovie, setSelectedMovie] = useState<MovieItem | null>(null);
  const [activeTrailer, setActiveTrailer] = useState<{ youtubeId: string; title: string } | null>(null);
  const [isAssistantOpen, setIsAssistantOpen] = useState<boolean>(false);
  const [assistantInitialPrompt, setAssistantInitialPrompt] = useState<string | undefined>();

  // Persist state updates
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch {
      // Storage unavailable or quota exceeded
    }
  }, [preferences]);

  const t = translations[preferences.language] || translations.en;

  const updateNickname = (username: string) => {
    setPreferences((prev) => ({ ...prev, username: username.trim() }));
  };

  const updateContentPreference = (pref: 'movies' | 'animated' | 'both') => {
    setPreferences((prev) => ({ ...prev, contentPreference: pref }));
  };

  const updateFavoriteGenres = (genres: string[]) => {
    setPreferences((prev) => ({ ...prev, favoriteGenres: genres }));
  };

  const updateLanguage = (lang: SupportedLanguage) => {
    setPreferences((prev) => ({ ...prev, language: lang }));
  };

  const completeOnboarding = () => {
    setPreferences((prev) => ({
      ...prev,
      username: prev.username || 'MovieFan',
      isOnboarded: true,
    }));
  };

  const skipOnboarding = () => {
    setPreferences((prev) => ({
      ...prev,
      username: prev.username || 'MovieFan',
      isOnboarded: true,
    }));
  };

  const toggleFavorite = (movieId: string) => {
    setPreferences((prev) => {
      const exists = prev.favorites.includes(movieId);
      return {
        ...prev,
        favorites: exists
          ? prev.favorites.filter((id) => id !== movieId)
          : [...prev.favorites, movieId],
      };
    });
  };

  const isFavorite = (movieId: string) => {
    return preferences.favorites.includes(movieId);
  };

  const toggleWatchlist = (movieId: string) => {
    setPreferences((prev) => {
      const exists = prev.watchlist.some((w) => w.id === movieId);
      if (exists) {
        return {
          ...prev,
          watchlist: prev.watchlist.filter((w) => w.id !== movieId),
        };
      } else {
        const newItem: WatchlistItem = {
          id: movieId,
          addedAt: new Date().toISOString(),
          watched: false,
        };
        return {
          ...prev,
          watchlist: [newItem, ...prev.watchlist],
        };
      }
    });
  };

  const isInWatchlist = (movieId: string) => {
    return preferences.watchlist.some((w) => w.id === movieId);
  };

  const isWatched = (movieId: string) => {
    const item = preferences.watchlist.find((w) => w.id === movieId);
    return !!item?.watched;
  };

  const setWatchlistWatched = (movieId: string, watched: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      watchlist: prev.watchlist.map((w) =>
        w.id === movieId ? { ...w, watched } : w
      ),
    }));
  };

  const removeFromWatchlist = (movieId: string) => {
    setPreferences((prev) => ({
      ...prev,
      watchlist: prev.watchlist.filter((w) => w.id !== movieId),
    }));
  };

  const rateMovie = (movieId: string, rating: number) => {
    const validRating = Math.max(1, Math.min(10, Math.round(rating)));
    setPreferences((prev) => ({
      ...prev,
      ratings: {
        ...prev.ratings,
        [movieId]: validRating,
      },
    }));
  };

  const getUserRating = (movieId: string) => {
    return preferences.ratings[movieId];
  };

  const recordViewed = (movieId: string) => {
    setPreferences((prev) => {
      const nextHistory = [movieId, ...prev.viewedHistory.filter((id) => id !== movieId)].slice(0, 30);
      return { ...prev, viewedHistory: nextHistory };
    });
  };

  const clearFavorites = () => {
    setPreferences((prev) => ({ ...prev, favorites: [] }));
  };

  const clearWatchlist = () => {
    setPreferences((prev) => ({ ...prev, watchlist: [] }));
  };

  const resetPreferences = () => {
    setPreferences({
      ...DEFAULT_PREFERENCES,
      isOnboarded: false,
    });
  };

  const openMovieDetails = (movie: MovieItem) => {
    setSelectedMovie(movie);
    recordViewed(movie.id);
  };

  const closeMovieDetails = () => {
    setSelectedMovie(null);
  };

  const openTrailer = (youtubeId: string, title: string) => {
    setActiveTrailer({ youtubeId, title });
  };

  const closeTrailer = () => {
    setActiveTrailer(null);
  };

  const openAssistant = () => setIsAssistantOpen(true);
  const closeAssistant = () => {
    setIsAssistantOpen(false);
    setAssistantInitialPrompt(undefined);
  };
  const toggleAssistant = () => setIsAssistantOpen((prev) => !prev);

  const triggerAssistantWithPrompt = (prompt: string) => {
    setAssistantInitialPrompt(prompt);
    setIsAssistantOpen(true);
  };

  return (
    <AppContext.Provider
      value={{
        preferences,
        t,
        updateNickname,
        updateContentPreference,
        updateFavoriteGenres,
        updateLanguage,
        completeOnboarding,
        skipOnboarding,
        toggleFavorite,
        isFavorite,
        toggleWatchlist,
        isInWatchlist,
        isWatched,
        setWatchlistWatched,
        removeFromWatchlist,
        rateMovie,
        getUserRating,
        recordViewed,
        clearFavorites,
        clearWatchlist,
        resetPreferences,
        selectedMovie,
        openMovieDetails,
        closeMovieDetails,
        activeTrailer,
        openTrailer,
        closeTrailer,
        isAssistantOpen,
        openAssistant,
        closeAssistant,
        toggleAssistant,
        assistantInitialPrompt,
        triggerAssistantWithPrompt,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
