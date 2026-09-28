export type ContentType = 'movie' | 'animated';

export interface MovieItem {
  id: string;
  title: string;
  type: ContentType;
  year: number;
  releaseDate: string;
  rating: number; // e.g., 8.7 (Community rating)
  voteCount: number;
  genres: string[];
  primaryGenre: string;
  runtime: string; // e.g., "2h 46m"
  overview: string;
  tagline?: string;
  director: string;
  cast: string[];
  posterUrl: string;
  backdropUrl: string;
  trailerYoutubeId?: string; // Official trailer ID
  isTrending?: boolean;
  isTopRated?: boolean;
  isRecentlyReleased?: boolean;
  popularityScore: number;
}

export type SupportedLanguage = 'en' | 'uz' | 'ru';

export interface WatchlistItem {
  id: string;
  addedAt: string;
  watched: boolean;
}

export interface UserPreferences {
  username: string; // Nickname only
  contentPreference: 'movies' | 'animated' | 'both';
  favoriteGenres: string[];
  language: SupportedLanguage;
  isOnboarded: boolean;
  ratings: Record<string, number>; // movieId -> 1 to 10
  favorites: string[]; // movieIds
  watchlist: WatchlistItem[];
  viewedHistory: string[]; // movieIds
}

export interface FilterState {
  query: string;
  type: 'all' | 'movie' | 'animated';
  genre: string;
  year: string;
  minRating: number;
  sortBy: 'popularity' | 'rating' | 'newest' | 'title';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  recommendedMovieIds?: string[];
  timestamp: string;
  isFallback?: boolean;
}

export interface ApiStatus {
  mode: 'demo' | 'live';
  provider: string;
  details: string;
}
