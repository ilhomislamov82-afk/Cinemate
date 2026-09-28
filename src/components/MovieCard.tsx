import React, { useState } from 'react';
import { Star, Heart, Bookmark, Play, CheckCircle2, Film } from 'lucide-react';
import { MovieItem } from '../types';
import { useApp } from '../context/AppContext';

interface MovieCardProps {
  movie: MovieItem;
  size?: 'normal' | 'large' | 'compact';
  rank?: number; // e.g. for Top 10 lists
  showRankBadge?: boolean;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  size = 'normal',
  rank,
  showRankBadge = false,
}) => {
  const {
    openMovieDetails,
    toggleFavorite,
    isFavorite,
    toggleWatchlist,
    isInWatchlist,
    isWatched,
    getUserRating,
  } = useApp();

  const [imageError, setImageError] = useState(false);

  const favorited = isFavorite(movie.id);
  const inWatchlist = isInWatchlist(movie.id);
  const watched = isWatched(movie.id);
  const personalRating = getUserRating(movie.id);

  const widthClass =
    size === 'large'
      ? 'w-64 sm:w-72'
      : size === 'compact'
      ? 'w-40 sm:w-44'
      : 'w-48 sm:w-56';

  return (
    <div
      className={`group relative flex-shrink-0 ${widthClass} flex flex-col cursor-pointer transition-all duration-300 transform select-none`}
      onClick={() => openMovieDetails(movie)}
    >
      {/* Poster Container */}
      <div className="relative aspect-[2/3] w-full rounded-2xl overflow-hidden bg-[#141824] border border-white/10 shadow-lg group-hover:shadow-2xl group-hover:shadow-amber-500/10 group-hover:border-amber-500/40 transition-all duration-300">
        {/* Poster Image or Fallback */}
        {!imageError ? (
          <img
            src={movie.posterUrl}
            alt={movie.title}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-[#121624] via-[#1a2238] to-[#121624]">
            <Film className="w-10 h-10 text-amber-500/40 mb-2" />
            <span className="text-xs font-semibold text-slate-300 line-clamp-2">
              {movie.title}
            </span>
            <span className="text-[10px] text-slate-500 mt-1">{movie.year}</span>
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between pointer-events-none z-10">
          {/* Top Rank Badge */}
          {showRankBadge && rank !== undefined ? (
            <div className="px-2 py-0.5 rounded-lg bg-amber-500 font-extrabold text-[11px] text-black shadow-md flex items-center gap-0.5">
              <span>#{rank}</span>
            </div>
          ) : (
            <div className="px-2 py-0.5 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-bold text-amber-400 flex items-center gap-1 shadow-sm">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{movie.rating.toFixed(1)}</span>
            </div>
          )}

          {/* Watched or Personal Rating Badge */}
          <div className="flex items-center gap-1">
            {personalRating && (
              <span className="px-1.5 py-0.5 rounded-md bg-indigo-600/90 text-white font-bold text-[10px] shadow" title={`You rated this ${personalRating}/10`}>
                ⭐ {personalRating}
              </span>
            )}
            {watched && (
              <span className="p-1 rounded-md bg-emerald-500/90 text-white shadow" title="Marked as Watched">
                <CheckCircle2 className="w-3 h-3" />
              </span>
            )}
          </div>
        </div>

        {/* Hover Overlay with Quick Actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 z-20">
          <div className="space-y-2.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                openMovieDetails(movie);
              }}
              className="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/30"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Details</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(movie.id);
                }}
                className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-medium border transition-colors flex items-center justify-center gap-1 backdrop-blur-md ${
                  favorited
                    ? 'bg-rose-500/30 border-rose-500/50 text-rose-300 hover:bg-rose-500/40'
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                }`}
                title={favorited ? 'Remove from Favorites' : 'Add to Favorites'}
              >
                <Heart className={`w-3.5 h-3.5 ${favorited ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span className="text-[11px]">{favorited ? 'Favorited' : 'Favorite'}</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWatchlist(movie.id);
                }}
                className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-medium border transition-colors flex items-center justify-center gap-1 backdrop-blur-md ${
                  inWatchlist
                    ? 'bg-cyan-500/30 border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/40'
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                }`}
                title={inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
              >
                <Bookmark className={`w-3.5 h-3.5 ${inWatchlist ? 'fill-cyan-400 text-cyan-400' : ''}`} />
                <span className="text-[11px]">{inWatchlist ? 'Saved' : 'Watchlist'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Card Info Below Poster */}
      <div className="pt-3 px-1 flex flex-col gap-1">
        <h4 className="text-sm font-semibold text-slate-100 group-hover:text-amber-400 transition-colors line-clamp-1">
          {movie.title}
        </h4>
        <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
          <span className="truncate max-w-[110px]">{movie.primaryGenre}</span>
          <span className="text-slate-500">{movie.year}</span>
        </div>
      </div>
    </div>
  );
};
