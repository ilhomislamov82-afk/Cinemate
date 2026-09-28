import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MovieItem } from '../types';
import { MovieCard } from './MovieCard';

interface MovieRowProps {
  title: string;
  subtitle?: string;
  badge?: string;
  icon?: React.ReactNode;
  movies: MovieItem[];
  showRankBadges?: boolean;
}

export const MovieRow: React.FC<MovieRowProps> = ({
  title,
  subtitle,
  badge,
  icon,
  movies,
  showRankBadges = false,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!movies || movies.length === 0) {
    return null;
  }

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -600 : 600;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-4 space-y-4">
      {/* Row Header */}
      <div className="flex items-end justify-between px-4 sm:px-6 lg:px-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            {icon && <span className="text-xl">{icon}</span>}
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-['Outfit']">
              {title}
            </h3>
            {badge && (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/25">
                {badge}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs sm:text-sm text-slate-400 font-normal">
              {subtitle}
            </p>
          )}
        </div>

        {/* Desktop Carousel Controls */}
        <div className="hidden sm:flex items-center gap-1.5">
          <button
            onClick={() => handleScroll('left')}
            className="p-2 rounded-xl bg-[#141824] hover:bg-[#1f2538] text-slate-300 hover:text-white border border-white/10 transition-colors focus:outline-none"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            className="p-2 rounded-xl bg-[#141824] hover:bg-[#1f2538] text-slate-300 hover:text-white border border-white/10 transition-colors focus:outline-none"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Area */}
      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-none px-4 sm:px-6 lg:px-8 scroll-smooth pb-3 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {movies.map((movie, idx) => (
          <div key={movie.id} className="snap-start">
            <MovieCard
              movie={movie}
              rank={showRankBadges ? idx + 1 : undefined}
              showRankBadge={showRankBadges}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
