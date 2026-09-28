import React, { useState, useMemo } from 'react';
import { Search, X, RotateCcw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FilterState } from '../types';
import { movieService } from '../services/movieService';
import { MovieCard } from '../components/MovieCard';
import { GENRE_LIST } from '../data/movieDatabase';

export const SearchView: React.FC = () => {
  const { t } = useApp();

  const [filters, setFilters] = useState<FilterState>({
    query: '',
    type: 'all',
    genre: 'all',
    year: 'all',
    minRating: 0,
    sortBy: 'popularity',
  });

  const searchResults = useMemo(() => {
    return movieService.search(filters);
  }, [filters]);

  const handleResetFilters = () => {
    setFilters({
      query: '',
      type: 'all',
      genre: 'all',
      year: 'all',
      minRating: 0,
      sortBy: 'popularity',
    });
  };

  const years = ['all', '2024', '2023', '2022', '2021', '2019', '2017', '2014', '2008', '2001'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 pb-24">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-['Outfit'] tracking-tight">
          {t.search.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Find your next favorite film by title, director, cast members, genre, or release year
        </p>
      </div>

      {/* Prominent Global Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none text-slate-400">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={filters.query}
          onChange={(e) => setFilters((prev) => ({ ...prev, query: e.target.value }))}
          placeholder={t.search.placeholder}
          className="w-full pl-12 sm:pl-14 pr-12 py-4 rounded-2xl bg-[#121623] border border-white/10 text-white placeholder-slate-500 text-sm sm:text-base font-medium focus:outline-none focus:border-amber-500 shadow-xl transition-all"
          autoFocus
        />
        {filters.query && (
          <button
            onClick={() => setFilters((prev) => ({ ...prev, query: '' }))}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white"
            aria-label="Clear search query"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Filter Controls Row */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#111420] border border-white/5 space-y-4">
        {/* Category Filter Pills (All / Movies / Animated) */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0b0e14] border border-white/5">
            <button
              onClick={() => setFilters((prev) => ({ ...prev, type: 'all' }))}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filters.type === 'all'
                  ? 'bg-amber-500 text-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.search.allTypes}
            </button>
            <button
              onClick={() => setFilters((prev) => ({ ...prev, type: 'movie' }))}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                filters.type === 'movie'
                  ? 'bg-amber-500 text-black shadow-md'
                  : 'text-slate-400 hover:text-amber-300'
              }`}
            >
              <span>{t.search.moviesOnly}</span>
            </button>
            <button
              onClick={() => setFilters((prev) => ({ ...prev, type: 'animated' }))}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                filters.type === 'animated'
                  ? 'bg-purple-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-purple-300'
              }`}
            >
              <span>{t.search.animatedOnly}</span>
            </button>
          </div>

          {/* Reset Filters */}
          <button
            onClick={handleResetFilters}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 transition-colors font-medium px-2 py-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.search.clearFilters}</span>
          </button>
        </div>

        {/* Secondary Dropdown Filters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          {/* Genre Dropdown */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {t.search.allGenres}
            </label>
            <select
              value={filters.genre}
              onChange={(e) => setFilters((prev) => ({ ...prev, genre: e.target.value }))}
              className="w-full px-3 py-2 rounded-xl bg-[#0b0e14] border border-white/10 text-xs font-medium text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option value="all">{t.search.allGenres}</option>
              {GENRE_LIST.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          {/* Year Dropdown */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {t.search.allYears}
            </label>
            <select
              value={filters.year}
              onChange={(e) => setFilters((prev) => ({ ...prev, year: e.target.value }))}
              className="w-full px-3 py-2 rounded-xl bg-[#0b0e14] border border-white/10 text-xs font-medium text-slate-200 focus:outline-none focus:border-amber-500"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y === 'all' ? t.search.allYears : y}
                </option>
              ))}
            </select>
          </div>

          {/* Minimum Rating */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {t.search.minRating}
            </label>
            <select
              value={filters.minRating}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, minRating: parseFloat(e.target.value) }))
              }
              className="w-full px-3 py-2 rounded-xl bg-[#0b0e14] border border-white/10 text-xs font-medium text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option value="0">Any Rating</option>
              <option value="7.5">⭐ 7.5+ Score</option>
              <option value="8.0">⭐ 8.0+ High Quality</option>
              <option value="8.5">⭐ 8.5+ Masterpiece</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {t.search.sortBy}
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  sortBy: e.target.value as FilterState['sortBy'],
                }))
              }
              className="w-full px-3 py-2 rounded-xl bg-[#0b0e14] border border-white/10 text-xs font-medium text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option value="popularity">{t.search.sortPopular}</option>
              <option value="rating">{t.search.sortRating}</option>
              <option value="newest">{t.search.sortNewest}</option>
              <option value="title">{t.search.sortTitle}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs sm:text-sm font-semibold text-slate-400">
          <span className="text-white font-bold">{searchResults.length}</span> {t.search.resultsFound}
        </span>
      </div>

      {/* Results Grid */}
      {searchResults.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {searchResults.map((movie) => (
            <div key={movie.id} className="w-full">
              <MovieCard movie={movie} size="large" />
            </div>
          ))}
        </div>
      ) : (
        /* Empty Search State */
        <div className="p-12 text-center rounded-3xl bg-[#111420] border border-white/5 space-y-3">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-2xl">
            🔍
          </div>
          <h3 className="text-lg font-bold text-white font-['Outfit']">
            {t.search.noResults}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            {t.search.noResultsTip}
          </p>
          <button
            onClick={handleResetFilters}
            className="mt-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors"
          >
            {t.search.clearFilters}
          </button>
        </div>
      )}
    </div>
  );
};
