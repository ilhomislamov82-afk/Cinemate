import React, { useMemo } from 'react';
import { Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { movieService } from '../services/movieService';
import { HeroSection } from '../components/HeroSection';
import { MovieRow } from '../components/MovieRow';

export const AnimatedView: React.FC = () => {
  const { preferences, t } = useApp();

  // Featured animated hero movie
  const heroMovie = useMemo(() => {
    return movieService.getTrending('animated', 1)[0] || movieService.getByCategory('animated')[0];
  }, []);

  // Trending Animated This Month (Exactly 10)
  const trendingAnimated = useMemo(() => movieService.getTrending('animated', 10), []);

  // Top Rated Animated This Year
  const topRatedAnimated = useMemo(() => movieService.getTopRated('animated', 10), []);

  // Recently Released Animated
  const recentlyReleasedAnimated = useMemo(() => movieService.getRecentlyReleased('animated', 10), []);

  // Personalized Animated recommendations
  const recommendedAnimated = useMemo(() => {
    return movieService.getPersonalizedRecommendations(preferences, 'animated', 10);
  }, [preferences]);

  // Genre specific rows for Animated only
  const fantasyAnimated = useMemo(() => movieService.getByGenre('Fantasy', 'animated', 8), []);
  const familyAnimated = useMemo(() => movieService.getByGenre('Family', 'animated', 8), []);
  const adventureAnimated = useMemo(() => movieService.getByGenre('Adventure', 'animated', 8), []);

  return (
    <div className="space-y-6 pb-20">
      {/* Category Header Banner */}
      <div className="flex items-center justify-between px-4 sm:px-8 pt-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] tracking-tight">
              {t.categories.animatedOnly}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              {t.categories.animatedDesc}
            </p>
          </div>
        </div>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">
          Animation Studio
        </span>
      </div>

      {/* Featured Animated Hero */}
      {heroMovie && <HeroSection movie={heroMovie} />}

      {/* Recommended Animated For You */}
      {recommendedAnimated.length > 0 && (
        <MovieRow
          title={t.home.recommendedForYou}
          subtitle="Curated animated masterpieces tailored to your style and favorites"
          badge="For You"
          icon="❤️"
          movies={recommendedAnimated}
        />
      )}

      {/* Trending Animated This Month (Exactly 10) */}
      <MovieRow
        title={t.home.trendingAnimated}
        subtitle="The 10 most viral and celebrated animated films of the month"
        badge={t.home.tenItemsCount}
        icon="🔥"
        movies={trendingAnimated}
        showRankBadges
      />

      {/* Top Rated Animated This Year */}
      <MovieRow
        title={t.home.topRatedAnimated}
        subtitle="Unmatched artistic brilliance and audience favorites"
        icon="🏆"
        movies={topRatedAnimated}
      />

      {/* Recently Released Animated */}
      <MovieRow
        title={t.home.recentlyReleasedAnimated}
        subtitle="Fresh animated wonders straight from premier creative studios"
        icon="🆕"
        movies={recentlyReleasedAnimated}
      />

      {/* Magical & Fantasy Animation */}
      {fantasyAnimated.length > 0 && (
        <MovieRow
          title="Magical Realms & Mythological Worlds"
          subtitle="Studio Ghibli-inspired dreams and mystical realms"
          icon="✨"
          movies={fantasyAnimated}
        />
      )}

      {/* Family & Heartwarming */}
      {familyAnimated.length > 0 && (
        <MovieRow
          title="Heartfelt Stories & Family Adventures"
          subtitle="Emotional journeys for all ages filled with laughter and heart"
          icon="🎈"
          movies={familyAnimated}
        />
      )}

      {/* High-Flyer Adventures */}
      {adventureAnimated.length > 0 && (
        <MovieRow
          title="Epic Animated Quests"
          subtitle="Breathtaking voyages across islands, space, and parallel dimensions"
          icon="🗺️"
          movies={adventureAnimated}
        />
      )}
    </div>
  );
};
