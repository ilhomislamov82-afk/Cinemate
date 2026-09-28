import React, { useState, useMemo } from 'react';
import { Bookmark, CheckCircle2, Trash2, Play, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { movieService } from '../services/movieService';

export const WatchlistView: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  const {
    preferences,
    openMovieDetails,
    removeFromWatchlist,
    setWatchlistWatched,
    clearWatchlist,
    t,
  } = useApp();

  const [filterMode, setFilterMode] = useState<'all' | 'unwatched' | 'watched'>('all');

  const watchlistData = useMemo(() => {
    return preferences.watchlist.map((entry) => {
      const movie = movieService.getByIds([entry.id])[0];
      return {
        ...entry,
        movie,
      };
    }).filter((item) => item.movie !== undefined);
  }, [preferences.watchlist]);

  const filteredWatchlist = useMemo(() => {
    if (filterMode === 'unwatched') {
      return watchlistData.filter((item) => !item.watched);
    }
    if (filterMode === 'watched') {
      return watchlistData.filter((item) => item.watched);
    }
    return watchlistData;
  }, [watchlistData, filterMode]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <Bookmark className="w-6 h-6 text-cyan-400 fill-cyan-400" />
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-['Outfit'] tracking-tight">
              {t.watchlist.title}
            </h1>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300">
              {watchlistData.length}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            {t.watchlist.subtitle}
          </p>
        </div>

        {/* Clear All button */}
        {watchlistData.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm(t.settings.clearWatchlistConfirm)) {
                clearWatchlist();
              }
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 text-xs font-semibold border border-white/10 transition-colors w-fit"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Watchlist</span>
          </button>
        )}
      </div>

      {/* Filter Tabs (All / To Watch / Watched) */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#111420] border border-white/5 w-fit">
        <button
          onClick={() => setFilterMode('all')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            filterMode === 'all'
              ? 'bg-amber-500 text-black shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {t.watchlist.tabAll} ({watchlistData.length})
        </button>

        <button
          onClick={() => setFilterMode('unwatched')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            filterMode === 'unwatched'
              ? 'bg-cyan-500 text-black shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {t.watchlist.tabUnwatched} ({watchlistData.filter((w) => !w.watched).length})
        </button>

        <button
          onClick={() => setFilterMode('watched')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            filterMode === 'watched'
              ? 'bg-emerald-500 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {t.watchlist.tabWatched} ({watchlistData.filter((w) => w.watched).length})
        </button>
      </div>

      {/* List items */}
      {filteredWatchlist.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWatchlist.map(({ id, watched, movie }) => {
            if (!movie) return null;
            return (
              <div
                key={id}
                className="p-4 rounded-2xl bg-[#121623] border border-white/10 shadow-lg hover:border-white/20 transition-all flex gap-4 items-start group"
              >
                {/* Poster */}
                <div
                  className="w-24 aspect-[2/3] rounded-xl overflow-hidden bg-[#1a2030] flex-shrink-0 cursor-pointer relative"
                  onClick={() => openMovieDetails(movie)}
                >
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {watched && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                    </div>
                  )}
                </div>

                {/* Details & Actions */}
                <div className="flex-1 min-w-0 space-y-2">
                  <div>
                    <h3
                      onClick={() => openMovieDetails(movie)}
                      className="font-bold text-sm sm:text-base text-white hover:text-amber-400 cursor-pointer truncate font-['Outfit'] transition-colors"
                    >
                      {movie.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                      <span>{movie.year}</span>
                      <span>•</span>
                      <span>{movie.primaryGenre}</span>
                      <span>•</span>
                      <span className="text-amber-400">⭐ {movie.rating}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2">
                    {movie.overview}
                  </p>

                  {/* Buttons: Mark Watched, View Details, Remove */}
                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => setWatchlistWatched(id, !watched)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                        watched
                          ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{watched ? t.card.watched : t.watchlist.markWatched}</span>
                    </button>

                    <button
                      onClick={() => openMovieDetails(movie)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-amber-500/20 hover:text-amber-300 text-slate-400 border border-white/10 transition-colors"
                      title={t.card.viewDetails}
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                    </button>

                    <button
                      onClick={() => removeFromWatchlist(id)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 hover:text-rose-300 text-slate-400 border border-white/10 transition-colors"
                      title={t.watchlist.remove}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty Watchlist State */
        <div className="p-12 text-center rounded-3xl bg-[#111420] border border-white/5 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Bookmark className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white font-['Outfit']">
              {t.watchlist.emptyWatchlist}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
              {t.watchlist.browseToWatch}
            </p>
          </div>
          <button
            onClick={() => onNavigate('home')}
            className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/20"
          >
            Explore Movies
          </button>
        </div>
      )}
    </div>
  );
};
