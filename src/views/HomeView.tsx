import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { movieService } from '../services/movieService';
import { HeroSection } from '../components/HeroSection';
import { MovieRow } from '../components/MovieRow';

export const HomeView: React.FC = () => {
  const { preferences, t } = useApp();

  // Pick hero movie based on user preferences
  const heroMovie = useMemo(() => {
    if (preferences.contentPreference === 'animated') {
      return movieService.getTrending('animated', 1)[0] || movieService.getByCategory('animated')[0];
    }
    return movieService.getTrending('movie', 1)[0] || movieService.getByCategory('movie')[0];
  }, [preferences.contentPreference]);

  // Trending This Month - exactly 10 items
  const trendingMovies = useMemo(() => movieService.getTrending('movie', 10), []);
  const trendingAnimated = useMemo(() => movieService.getTrending('animated', 10), []);

  // Top Rated This Year
  const topRatedMovies = useMemo(() => movieService.getTopRated('movie', 10), []);
  const topRatedAnimated = useMemo(() => movieService.getTopRated('animated', 10), []);

  // Recently Released
  const recentlyReleasedMovies = useMemo(() => movieService.getRecentlyReleased('movie', 10), []);
  const recentlyReleasedAnimated = useMemo(() => movieService.getRecentlyReleased('animated', 10), []);

  // Personalized recommendations
  const recommendedMovies = useMemo(() => {
    return movieService.getPersonalizedRecommendations(preferences, undefined, 12);
  }, [preferences]);

  // Dynamic "Because you like [Genre]" row
  const primaryFavoriteGenre = preferences.favoriteGenres[0] || 'Adventure';
  const becauseGenreMovies = useMemo(() => {
    return movieService.getByGenre(primaryFavoriteGenre, undefined, 10);
  }, [primaryFavoriteGenre]);

  // Dynamic "Because you liked [Movie]" row (highest user rated movie or favorite)
  const highestRatedMovie = useMemo(() => {
    const ratedEntries = Object.entries(preferences.ratings);
    if (ratedEntries.length > 0) {
      ratedEntries.sort((a, b) => b[1] - a[1]);
      return movieService.getByIds([ratedEntries[0][0]])[0];
    }
    if (preferences.favorites.length > 0) {
      return movieService.getByIds([preferences.favorites[0]])[0];
    }
    return undefined;
  }, [preferences.ratings, preferences.favorites]);

  const becauseLikedMovies = useMemo(() => {
    if (!highestRatedMovie) return [];
    return movieService.getSimilarMovies(highestRatedMovie, 8);
  }, [highestRatedMovie]);

  const showMovies = preferences.contentPreference !== 'animated';
  const showAnimated = preferences.contentPreference !== 'movies';

  return (
    <div className="space-y-6 pb-20">
      {/* Featured Hero Banner */}
      {heroMovie && <HeroSection movie={heroMovie} />}

      {/* Personalized Recommendations Section */}
      {recommendedMovies.length > 0 && (
        <MovieRow
          title={t.home.recommendedForYou}
          subtitle={`Handpicked for ${preferences.username || 'you'} matching your favorite genres & ratings`}
          badge="Personalized"
          icon="❤️"
          movies={recommendedMovies}
        />
      )}

      {/* Dynamic: Because You Like [Genre] */}
      {becauseGenreMovies.length > 0 && (
        <MovieRow
          title={`${t.home.becauseYouLike} ${primaryFavoriteGenre}`}
          subtitle={`Top rated titles exploring ${primaryFavoriteGenre}`}
          icon="✨"
          movies={becauseGenreMovies}
        />
      )}

      {/* Dynamic: Because You Liked [Movie Title] */}
      {highestRatedMovie && becauseLikedMovies.length > 0 && (
        <MovieRow
          title={`${t.home.becauseYouLiked} "${highestRatedMovie.title}"`}
          subtitle={`Films with matching aesthetic, themes, and creative direction`}
          icon="🎬"
          movies={becauseLikedMovies}
        />
      )}

      {/* Trending Movies (Exactly 10) */}
      {showMovies && (
        <MovieRow
          title={t.home.trendingMovies}
          subtitle="Top 10 highest momentum live-action cinema this month"
          badge={t.home.tenItemsCount}
          icon="🔥"
          movies={trendingMovies}
          showRankBadges
        />
      )}

      {/* Trending Animated (Exactly 10) */}
      {showAnimated && (
        <MovieRow
          title={t.home.trendingAnimated}
          subtitle="Top 10 highest momentum animated feature films this month"
          badge={t.home.tenItemsCount}
          icon="🎨"
          movies={trendingAnimated}
          showRankBadges
        />
      )}

      {/* Top Rated This Year */}
      {showMovies && (
        <MovieRow
          title={t.home.topRatedMovies}
          subtitle="Critically acclaimed cinema with exceptional audience scores"
          icon="🏆"
          movies={topRatedMovies}
        />
      )}

      {showAnimated && (
        <MovieRow
          title={t.home.topRatedAnimated}
          subtitle="Highest rated animation masterworks and festival favorites"
          icon="🏆"
          movies={topRatedAnimated}
        />
      )}

      {/* Recently Released */}
      {showMovies && (
        <MovieRow
          title={t.home.recentlyReleasedMovies}
          subtitle="Fresh theatrical premieres and digital debuts"
          icon="🆕"
          movies={recentlyReleasedMovies}
        />
      )}

      {showAnimated && (
        <MovieRow
          title={t.home.recentlyReleasedAnimated}
          subtitle="Latest releases from world-class animation studios"
          icon="🆕"
          movies={recentlyReleasedAnimated}
        />
      )}
    </div>
  );
};
