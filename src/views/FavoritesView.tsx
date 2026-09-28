import React, { useState, useMemo } from 'react';
import { Heart, Film, Sparkles, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { movieService } from '../services/movieService';
import { MovieCard } from '../components/MovieCard';

export const FavoritesView: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  const { preferences, clearFavorites, t } = useApp();
  const [activeTab, setActiveTab] = useState<'movies' | 'animated'>('movies');

  const favoriteMoviesList = useMemo(() => {
    return movieService.getByIds(preferences.favorites);
  }, [preferences.favorites]);

  const moviesOnly = useMemo(() => {
    return favoriteMoviesList.filter((m) => m.type === 'movie');
  }, [favoriteMoviesList]);

  const animatedOnly = useMemo(() => {
    return favoriteMoviesList.filter((m) => m.type === 'animated');
  }, [favoriteMoviesList]);

  const currentDisplayList = activeTab === 'movies' ? moviesOnly : animatedOnly;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-['Outfit'] tracking-tight">
              {t.favorites.title}
            </h1>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300">
              {favoriteMoviesList.length}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            {t.favorites.subtitle}
          </p>
        </div>

        {/* Clear All button */}
        {favoriteMoviesList.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm(t.settings.clearFavoritesConfirm)) {
                clearFavorites();
              }
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 text-xs font-semibold border border-white/10 transition-colors w-fit"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{t.favorites.clearAll}</span>
          </button>
        )}
      </div>

      {/* Tabs: Movies vs Animated */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#111420] border border-white/5 w-fit">
        <button
          onClick={() => setActiveTab('movies')}
          className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'movies'
              ? 'bg-amber-500 text-black shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Film className="w-4 h-4" />
          <span>{t.categories.moviesOnly}</span>
          <span className="text-[11px] px-1.5 py-0.2 rounded-md bg-black/20 font-mono">
            {moviesOnly.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('animated')}
          className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'animated'
              ? 'bg-purple-500 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>{t.categories.animatedOnly}</span>
          <span className="text-[11px] px-1.5 py-0.2 rounded-md bg-black/20 font-mono">
            {animatedOnly.length}
          </span>
        </button>
      </div>

      {/* Content Grid */}
      {currentDisplayList.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 pt-2">
          {currentDisplayList.map((movie) => (
            <div key={movie.id} className="w-full">
              <MovieCard movie={movie} size="large" />
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center rounded-3xl bg-[#111420] border border-white/5 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <Heart className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white font-['Outfit']">
              {activeTab === 'movies' ? t.favorites.emptyMovies : t.favorites.emptyAnimated}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
              Tap the heart icon on any card or hero banner to build your cherished personal library.
            </p>
          </div>
          <button
            onClick={() => onNavigate(activeTab === 'movies' ? 'movies' : 'animated')}
            className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/20"
          >
            {activeTab === 'movies' ? t.favorites.browseMovies : t.favorites.browseAnimated}
          </button>
        </div>
      )}
    </div>
  );
};
