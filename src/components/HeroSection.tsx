import React from 'react';
import { Play, Star, Plus, Check, Heart, Film, Sparkles } from 'lucide-react';
import { MovieItem } from '../types';
import { useApp } from '../context/AppContext';

interface HeroSectionProps {
  movie: MovieItem;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ movie }) => {
  const {
    openMovieDetails,
    openTrailer,
    toggleWatchlist,
    isInWatchlist,
    toggleFavorite,
    isFavorite,
    t,
  } = useApp();

  const inWatchlist = isInWatchlist(movie.id);
  const favorited = isFavorite(movie.id);

  return (
    <div className="relative w-full min-h-[500px] lg:min-h-[620px] rounded-3xl overflow-hidden bg-[#0c0f17] border border-white/10 shadow-2xl mb-10 flex items-end">
      {/* Cinematic Backdrop Image with multi-layer Vignette Gradients */}
      <div className="absolute inset-0">
        <img
          src={movie.backdropUrl}
          alt={movie.title}
          className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.05]"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e14] via-[#0b0e14]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0e14] via-[#0b0e14]/80 to-transparent lg:w-3/4" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 p-6 sm:p-10 lg:p-14 max-w-3xl space-y-4">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-wide">
            {movie.type === 'movie' ? (
              <>
                <Film className="w-3.5 h-3.5" />
                <span>Featured Movie</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-purple-300">Featured Animated Film</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-amber-400 text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{movie.rating.toFixed(1)} / 10</span>
          </div>

          <span className="text-xs font-semibold text-slate-300 px-2 py-0.5 rounded-md bg-white/10">
            {movie.year}
          </span>
          <span className="text-xs text-slate-400 font-medium">
            {movie.runtime}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight font-['Outfit'] drop-shadow-md">
          {movie.title}
        </h1>

        {/* Tagline or Genre Bar */}
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-300 font-medium">
          {movie.genres.map((g, i) => (
            <React.Fragment key={g}>
              <span className="text-amber-300/90 font-semibold">{g}</span>
              {i < movie.genres.length - 1 && <span className="text-slate-600">•</span>}
            </React.Fragment>
          ))}
          {movie.tagline && (
            <span className="hidden sm:inline italic text-slate-400 ml-2">
              — &ldquo;{movie.tagline}&rdquo;
            </span>
          )}
        </div>

        {/* Overview Synopsis */}
        <p className="text-sm sm:text-base text-slate-300 line-clamp-3 max-w-2xl font-normal leading-relaxed">
          {movie.overview}
        </p>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          {/* Details Button */}
          <button
            onClick={() => openMovieDetails(movie)}
            className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-amber-500/25 active:scale-95"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{t.home.heroDetails}</span>
          </button>

          {/* Official Trailer Button (if exists) */}
          {movie.trailerYoutubeId && (
            <button
              onClick={() => openTrailer(movie.trailerYoutubeId!, movie.title)}
              className="px-5 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white backdrop-blur-md font-semibold text-sm transition-all border border-white/20 flex items-center gap-2 active:scale-95"
            >
              <Film className="w-4 h-4 text-amber-400" />
              <span>{t.home.heroTrailer}</span>
            </button>
          )}

          {/* Watchlist Toggle */}
          <button
            onClick={() => toggleWatchlist(movie.id)}
            className={`p-3.5 rounded-2xl border backdrop-blur-md transition-all flex items-center gap-2 text-sm font-semibold active:scale-95 ${
              inWatchlist
                ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                : 'bg-white/10 hover:bg-white/20 border-white/15 text-white'
            }`}
            title={inWatchlist ? t.card.removeFromWatchlist : t.card.addToWatchlist}
          >
            {inWatchlist ? (
              <>
                <Check className="w-4 h-4 text-cyan-400" />
                <span className="hidden sm:inline">{t.home.heroInWatchlist}</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">{t.home.heroWatchlist}</span>
              </>
            )}
          </button>

          {/* Favorites Toggle */}
          <button
            onClick={() => toggleFavorite(movie.id)}
            className={`p-3.5 rounded-2xl border backdrop-blur-md transition-all flex items-center gap-2 text-sm font-semibold active:scale-95 ${
              favorited
                ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                : 'bg-white/10 hover:bg-white/20 border-white/15 text-white'
            }`}
            title={favorited ? t.card.removeFromFavorites : t.card.addToFavorites}
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span className="hidden sm:inline">
              {favorited ? t.home.heroInFavorites : t.home.heroFavorite}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
