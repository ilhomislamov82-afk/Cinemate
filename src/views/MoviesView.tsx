import React, { useMemo } from 'react';
import { Film } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { movieService } from '../services/movieService';
import { HeroSection } from '../components/HeroSection';
import { MovieRow } from '../components/MovieRow';

export const MoviesView: React.FC = () => {
  const { preferences, t } = useApp();

  // Featured live-action movie hero
  const heroMovie = useMemo(() => {
    return movieService.getTrending('movie', 1)[0] || movieService.getByCategory('movie')[0];
  }, []);

  // Exactly 10 trending movies
  const trendingMovies = useMemo(() => movieService.getTrending('movie', 10), []);

  // Top rated movies
  const topRatedMovies = useMemo(() => movieService.getTopRated('movie', 10), []);

  // Recently released movies
  const recentlyReleasedMovies = useMemo(() => movieService.getRecentlyReleased('movie', 10), []);

  // Personalized movie recommendations
  const recommendedMovies = useMemo(() => {
    return movieService.getPersonalizedRecommendations(preferences, 'movie', 10);
  }, [preferences]);

  // Genre specific rows for movies only
  const sciFiMovies = useMemo(() => movieService.getByGenre('Science Fiction', 'movie', 8), []);
  const actionMovies = useMemo(() => movieService.getByGenre('Action', 'movie', 8), []);
  const dramaMovies = useMemo(() => movieService.getByGenre('Drama', 'movie', 8), []);

  return (
    <div className="space-y-6 pb-20">
      {/* Category Header Badge */}
      <div className="flex items-center justify-between px-4 sm:px-8 pt-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Film className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] tracking-tight">
              {t.categories.moviesOnly}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              {t.categories.moviesDesc}
            </p>
          </div>
        </div>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
          Cinema Exclusives
        </span>
      </div>

      {/* Featured Movie Hero */}
      {heroMovie && <HeroSection movie={heroMovie} />}

      {/* Recommended Movies For You */}
      {recommendedMovies.length > 0 && (
        <MovieRow
          title={t.home.recommendedForYou}
          subtitle={`Personalized cinema matching your taste in ${preferences.favoriteGenres.join(', ')}`}
          badge="For You"
          icon="❤️"
          movies={recommendedMovies}
        />
      )}

      {/* Trending Movies This Month (Exactly 10) */}
      <MovieRow
        title={t.home.trendingMovies}
        subtitle="The 10 most popular and talked-about feature films right now"
        badge={t.home.tenItemsCount}
        icon="🔥"
        movies={trendingMovies}
        showRankBadges
      />

      {/* Top Rated Movies This Year */}
      <MovieRow
        title={t.home.topRatedMovies}
        subtitle="Highest audience and critical ratings from recent cinema releases"
        icon="🏆"
        movies={topRatedMovies}
      />

      {/* Recently Released Movies */}
      <MovieRow
        title={t.home.recentlyReleasedMovies}
        subtitle="Newly premiered films available across theaters and digital platforms"
        icon="🆕"
        movies={recentlyReleasedMovies}
      />

      {/* Sci-Fi Cinema */}
      {sciFiMovies.length > 0 && (
        <MovieRow
          title="Visionary Science Fiction"
          subtitle="Mind-bending concepts, dystopian futures, and cosmic exploration"
          icon="🚀"
          movies={sciFiMovies}
        />
      )}

      {/* Action Blockbusters */}
      {actionMovies.length > 0 && (
        <MovieRow
          title="High-Octane Action & Thrills"
          subtitle="Adrenaline-fueled stunts and cinematic spectacles"
          icon="⚡"
          movies={actionMovies}
        />
      )}

      {/* Captivating Dramas */}
      {dramaMovies.length > 0 && (
        <MovieRow
          title="Deep Dramas & Human Stories"
          subtitle="Award-winning narratives exploring intimate relationships and life choices"
          icon="🎭"
          movies={dramaMovies}
        />
      )}
    </div>
  );
};
