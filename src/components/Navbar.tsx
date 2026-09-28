import React, { useState } from 'react';
import {
  Film,
  Sparkles,
  Search,
  Heart,
  Bookmark,
  Settings,
  Menu,
  X,
  Compass,
  Database,
  Globe
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SupportedLanguage } from '../types';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenApiModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab, onOpenApiModal }) => {
  const { preferences, t, updateLanguage } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const favoriteCount = preferences.favorites.length;
  const watchlistCount = preferences.watchlist.length;

  const languages: { code: SupportedLanguage; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'uz', label: 'Oʻzbekcha', flag: '🇺🇿' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  ];

  const handleTabClick = (tab: string) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#0b0e14]/90 border-b border-white/5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => handleTabClick('home')}
          className="flex items-center gap-3 group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-xl p-1"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-orange-400 p-[1px] shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/35 transition-all duration-300">
            <div className="w-full h-full bg-[#0d111a] rounded-2xl flex items-center justify-center">
              <Film className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-white font-['Outfit']">
                Cine<span className="text-amber-400">Mate</span>
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block font-medium">
              Discover & Experience
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 bg-[#121622]/80 p-1.5 rounded-2xl border border-white/5">
          <button
            onClick={() => handleTabClick('home')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
              currentTab === 'home'
                ? 'bg-white/10 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <Compass className="w-4 h-4 text-amber-400" />
            {t.nav.home}
          </button>

          {/* Movies tab - distinct amber cinema vibe */}
          <button
            onClick={() => handleTabClick('movies')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
              currentTab === 'movies'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm shadow-amber-500/10'
                : 'text-slate-400 hover:text-amber-300 hover:bg-amber-500/10'
            }`}
          >
            <Film className="w-4 h-4 text-amber-400" />
            <span>{t.nav.movies}</span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-amber-500/20 text-amber-300">
              Cinema
            </span>
          </button>

          {/* Animated tab - distinct creative violet/fuchsia vibe */}
          <button
            onClick={() => handleTabClick('animated')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
              currentTab === 'animated'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30 shadow-sm shadow-purple-500/10'
                : 'text-slate-400 hover:text-purple-300 hover:bg-purple-500/10'
            }`}
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>{t.nav.animated}</span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-purple-500/20 text-purple-300">
              Art
            </span>
          </button>

          <button
            onClick={() => handleTabClick('search')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
              currentTab === 'search'
                ? 'bg-white/10 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <Search className="w-4 h-4 text-blue-400" />
            {t.nav.search}
          </button>

          <button
            onClick={() => handleTabClick('favorites')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 relative ${
              currentTab === 'favorites'
                ? 'bg-white/10 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <Heart className={`w-4 h-4 ${favoriteCount > 0 ? 'text-rose-500 fill-rose-500' : 'text-slate-400'}`} />
            {t.nav.favorites}
            {favoriteCount > 0 && (
              <span className="ml-1 text-[11px] font-bold px-1.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                {favoriteCount}
              </span>
            )}
          </button>

          <button
            onClick={() => handleTabClick('watchlist')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 relative ${
              currentTab === 'watchlist'
                ? 'bg-white/10 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${watchlistCount > 0 ? 'text-cyan-400 fill-cyan-400' : 'text-slate-400'}`} />
            {t.nav.watchlist}
            {watchlistCount > 0 && (
              <span className="ml-1 text-[11px] font-bold px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {watchlistCount}
              </span>
            )}
          </button>
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Demo Mode API Badge */}
          <button
            onClick={onOpenApiModal}
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/25 text-xs font-medium transition-all"
            title="Metadata Architecture & API Status"
          >
            <Database className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">{t.demoBanner.badge}</span>
          </button>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#131722] hover:bg-[#1c2233] border border-white/10 text-xs font-semibold text-slate-300 transition-all focus:outline-none"
              aria-label="Change interface language"
            >
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span>
                {languages.find((l) => l.code === preferences.language)?.flag}
              </span>
              <span className="uppercase text-[11px] font-bold tracking-wider">
                {preferences.language}
              </span>
            </button>

            {langDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setLangDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-36 rounded-2xl bg-[#141926] border border-white/10 shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        updateLanguage(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all text-left ${
                        preferences.language === lang.code
                          ? 'bg-amber-500/20 text-amber-300 font-semibold'
                          : 'text-slate-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span className="text-sm">{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* User Nickname Avatar Pill */}
          <button
            onClick={() => handleTabClick('settings')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#131722] hover:bg-[#1a2030] border border-white/10 transition-all group"
            title="User Profile & Settings"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-sm">
              {(preferences.username || 'M').charAt(0).toUpperCase()}
            </div>
            <span className="text-xs font-medium text-slate-200 hidden sm:inline max-w-[100px] truncate">
              {preferences.username || 'MovieFan'}
            </span>
            <Settings className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400 transition-colors" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-[#131722] text-slate-300 hover:text-white border border-white/10"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/5 bg-[#0e121b] px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
          <button
            onClick={() => handleTabClick('home')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
              currentTab === 'home' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-300 hover:bg-white/5'
            }`}
          >
            <Compass className="w-5 h-5 text-amber-400" />
            {t.nav.home}
          </button>

          <button
            onClick={() => handleTabClick('movies')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium ${
              currentTab === 'movies' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-slate-300 hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <Film className="w-5 h-5 text-amber-400" />
              <span>{t.nav.movies}</span>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300">
              Cinema
            </span>
          </button>

          <button
            onClick={() => handleTabClick('animated')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium ${
              currentTab === 'animated' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'text-slate-300 hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span>{t.nav.animated}</span>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300">
              Animation
            </span>
          </button>

          <button
            onClick={() => handleTabClick('search')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
              currentTab === 'search' ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5'
            }`}
          >
            <Search className="w-5 h-5 text-blue-400" />
            {t.nav.search}
          </button>

          <button
            onClick={() => handleTabClick('favorites')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium ${
              currentTab === 'favorites' ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <Heart className={`w-5 h-5 ${favoriteCount > 0 ? 'text-rose-500 fill-rose-500' : 'text-slate-400'}`} />
              <span>{t.nav.favorites}</span>
            </div>
            {favoriteCount > 0 && (
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300">
                {favoriteCount}
              </span>
            )}
          </button>

          <button
            onClick={() => handleTabClick('watchlist')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium ${
              currentTab === 'watchlist' ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <Bookmark className={`w-5 h-5 ${watchlistCount > 0 ? 'text-cyan-400 fill-cyan-400' : 'text-slate-400'}`} />
              <span>{t.nav.watchlist}</span>
            </div>
            {watchlistCount > 0 && (
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300">
                {watchlistCount}
              </span>
            )}
          </button>

          <button
            onClick={() => handleTabClick('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
              currentTab === 'settings' ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5'
            }`}
          >
            <Settings className="w-5 h-5 text-amber-400" />
            {t.nav.settings}
          </button>

          <div className="pt-2 border-t border-white/5 flex items-center justify-between px-2">
            <span className="text-xs text-slate-400">{t.demoBanner.badge}</span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenApiModal();
              }}
              className="text-xs text-amber-400 font-medium hover:underline flex items-center gap-1"
            >
              <Database className="w-3.5 h-3.5" />
              {t.demoBanner.viewApiStatus}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
