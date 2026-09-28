import React, { useState } from 'react';
import {
  X,
  Star,
  Heart,
  Bookmark,
  Play,
  Film,
  User,
  Clock,
  Calendar,
  Sparkles,
  CheckCircle2,
  Check
} from 'lucide-react';
import { MovieItem } from '../types';
import { useApp } from '../context/AppContext';
import { movieService } from '../services/movieService';
import { MovieCard } from './MovieCard';

interface MovieDetailsModalProps {
  movie: MovieItem | null;
  onClose: () => void;
}

export const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({ movie, onClose }) => {
  const {
    t,
    toggleFavorite,
    isFavorite,
    toggleWatchlist,
    isInWatchlist,
    isWatched,
    setWatchlistWatched,
    rateMovie,
    getUserRating,
    openTrailer,
  } = useApp();

  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [ratedNotification, setRatedNotification] = useState(false);

  if (!movie) return null;

  const favorited = isFavorite(movie.id);
  const inWatchlist = isInWatchlist(movie.id);
  const watched = isWatched(movie.id);
  const personalRating = getUserRating(movie.id);
  const similarMovies = movieService.getSimilarMovies(movie, 6);

  const handleRate = (value: number) => {
    rateMovie(movie.id, value);
    setRatedNotification(true);
    setTimeout(() => setRatedNotification(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 lg:p-6 animate-in fade-in duration-200">
      {/* Background Dismiss click area */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div className="relative w-full max-w-5xl rounded-3xl bg-[#0f131d] border border-white/10 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Close Button Top Right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/15 transition-all shadow-lg focus:outline-none"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-1 scrollbar-thin">
          {/* Backdrop Header */}
          <div className="relative w-full h-72 sm:h-96 bg-[#161a26]">
            <img
              src={movie.backdropUrl}
              alt={movie.title}
              className="w-full h-full object-cover filter brightness-[0.7]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f131d] via-[#0f131d]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f131d] via-transparent to-transparent hidden sm:block" />

            {/* Category Pill on Backdrop */}
            <div className="absolute top-5 left-5 z-20 flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide border shadow-md flex items-center gap-1.5 ${
                  movie.type === 'movie'
                    ? 'bg-amber-500/25 border-amber-500/40 text-amber-300'
                    : 'bg-purple-500/25 border-purple-500/40 text-purple-300'
                }`}
              >
                {movie.type === 'movie' ? (
                  <>
                    <Film className="w-3.5 h-3.5" />
                    <span>Cinema Movie</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Animated Film</span>
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Main Body */}
          <div className="relative px-6 sm:px-10 pb-10 -mt-24 sm:-mt-32 space-y-8">
            <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-start">
              {/* Poster Card */}
              <div className="w-44 sm:w-56 flex-shrink-0 aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-[#121622] relative group">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title & Metadata */}
              <div className="flex-1 space-y-3.5 pt-2">
                <div className="space-y-1">
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-['Outfit'] tracking-tight">
                    {movie.title}
                  </h2>
                  {movie.tagline && (
                    <p className="text-sm italic text-amber-300/80 font-medium">
                      &ldquo;{movie.tagline}&rdquo;
                    </p>
                  )}
                </div>

                {/* Genre Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre}
                      className="px-2.5 py-0.5 rounded-lg bg-white/10 text-slate-200 text-xs font-semibold"
                    >
                      {genre}
                    </span>
                  ))}
                </div>

                {/* Quick Stats Bar */}
                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300 pt-1">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>{movie.year} ({movie.releaseDate})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>{movie.runtime}</span>
                  </div>
                </div>

                {/* Dual Rating Display: Community vs Personal */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {/* Community Rating */}
                  <div className="p-3.5 rounded-2xl bg-[#141926] border border-white/5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
                      <Star className="w-5 h-5 fill-amber-400" />
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                        {t.details.communityRating}
                      </p>
                      <p className="text-lg font-bold text-white">
                        ⭐ {movie.rating.toFixed(1)}{' '}
                        <span className="text-xs text-slate-400 font-normal">
                          / 10 ({movie.voteCount.toLocaleString()} votes)
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Personal Rating */}
                  <div className="p-3.5 rounded-2xl bg-[#141926] border border-white/5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                        {t.details.yourRating}
                      </p>
                      <p className="text-lg font-bold text-white">
                        {personalRating ? (
                          <span className="text-amber-300">
                            ⭐ {personalRating} <span className="text-xs text-slate-400 font-normal">/ 10</span>
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400 italic">Not rated yet</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Interactive 1 to 10 Star Rating Selector */}
                <div className="p-3.5 rounded-2xl bg-[#131722]/80 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                    <span>{t.details.ratePrompt}</span>
                    <span className="text-amber-400 font-bold">
                      {hoverRating || personalRating || '-'} / 10
                    </span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((starVal) => {
                      const isActive =
                        (hoverRating !== null ? hoverRating : personalRating || 0) >= starVal;
                      return (
                        <button
                          key={starVal}
                          onClick={() => handleRate(starVal)}
                          onMouseEnter={() => setHoverRating(starVal)}
                          onMouseLeave={() => setHoverRating(null)}
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                            isActive
                              ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20 scale-105'
                              : 'bg-white/5 text-slate-400 hover:bg-white/15 hover:text-white'
                          }`}
                          title={`Rate ${starVal}/10`}
                        >
                          {starVal}
                        </button>
                      );
                    })}
                  </div>
                  {ratedNotification && (
                    <p className="text-xs text-emerald-400 font-medium animate-in fade-in flex items-center gap-1 pt-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {t.details.ratedSuccess}
                    </p>
                  )}
                </div>

                {/* Primary Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {/* Trailer button */}
                  {movie.trailerYoutubeId ? (
                    <button
                      onClick={() => openTrailer(movie.trailerYoutubeId!, movie.title)}
                      className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-lg shadow-amber-500/20"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>{t.details.officialTrailer}</span>
                    </button>
                  ) : (
                    <span className="text-xs text-slate-500 italic">
                      {t.details.noTrailer}
                    </span>
                  )}

                  {/* Favorites */}
                  <button
                    onClick={() => toggleFavorite(movie.id)}
                    className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold border transition-all flex items-center gap-2 ${
                      favorited
                        ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                        : 'bg-white/10 hover:bg-white/20 border-white/15 text-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-500 text-rose-500' : ''}`} />
                    <span>{favorited ? t.card.removeFromFavorites : t.card.addToFavorites}</span>
                  </button>

                  {/* Watchlist */}
                  <button
                    onClick={() => toggleWatchlist(movie.id)}
                    className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold border transition-all flex items-center gap-2 ${
                      inWatchlist
                        ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                        : 'bg-white/10 hover:bg-white/20 border-white/15 text-white'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${inWatchlist ? 'fill-cyan-400 text-cyan-400' : ''}`} />
                    <span>{inWatchlist ? t.card.removeFromWatchlist : t.card.addToWatchlist}</span>
                  </button>

                  {/* Watched Status toggle if in watchlist */}
                  {inWatchlist && (
                    <button
                      onClick={() => setWatchlistWatched(movie.id, !watched)}
                      className={`px-3 py-3 rounded-2xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                        watched
                          ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{watched ? t.card.watched : t.watchlist.markWatched}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Synopsis */}
            <div className="space-y-2 border-t border-white/10 pt-6">
              <h3 className="text-base sm:text-lg font-bold text-white font-['Outfit']">
                {t.details.synopsis}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                {movie.overview}
              </p>
            </div>

            {/* Cast & Crew Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/10 pt-6">
              <div className="p-4 rounded-2xl bg-[#141926] border border-white/5 space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t.details.director}</span>
                </div>
                <p className="text-sm font-bold text-white pl-5">
                  {movie.director}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#141926] border border-white/5 space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <User className="w-3.5 h-3.5 text-blue-400" />
                  <span>{t.details.cast}</span>
                </div>
                <p className="text-sm font-medium text-slate-200 pl-5">
                  {movie.cast.join(', ')}
                </p>
              </div>
            </div>

            {/* Legitimate Notice */}
            <div className="text-[11px] text-slate-500 flex items-center justify-between border-t border-white/5 pt-4">
              <span>{t.details.notice}</span>
              <span className="text-slate-600 font-mono">ID: {movie.id}</span>
            </div>

            {/* More Like This Row */}
            {similarMovies.length > 0 && (
              <div className="space-y-4 border-t border-white/10 pt-6">
                <h3 className="text-lg sm:text-xl font-bold text-white font-['Outfit']">
                  {t.details.similars}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  {similarMovies.map((sim) => (
                    <MovieCard key={sim.id} movie={sim} size="compact" />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
