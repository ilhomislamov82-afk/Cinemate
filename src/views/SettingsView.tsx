import React, { useState } from 'react';
import {
  Settings,
  ShieldCheck,
  Globe,
  Film,
  Sparkles,
  Trash2,
  RotateCcw,
  Check,
  CheckCircle2,
  Database
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GENRE_LIST } from '../data/movieDatabase';
import { SupportedLanguage } from '../types';

export const SettingsView: React.FC<{ onOpenApiModal: () => void }> = ({ onOpenApiModal }) => {
  const {
    preferences,
    updateNickname,
    updateContentPreference,
    updateFavoriteGenres,
    updateLanguage,
    clearFavorites,
    clearWatchlist,
    resetPreferences,
    t,
  } = useApp();

  const [nicknameInput, setNicknameInput] = useState(preferences.username || '');
  const [saveAlert, setSaveAlert] = useState(false);

  const handleSaveNickname = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nicknameInput.trim()) return;
    updateNickname(nicknameInput);
    setSaveAlert(true);
    setTimeout(() => setSaveAlert(false), 3000);
  };

  const toggleGenre = (genre: string) => {
    const current = preferences.favoriteGenres;
    if (current.includes(genre)) {
      if (current.length > 1) {
        updateFavoriteGenres(current.filter((g) => g !== genre));
      }
    } else {
      updateFavoriteGenres([...current, genre]);
    }
  };

  const languages: { code: SupportedLanguage; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'uz', label: 'Oʻzbekcha (Uzbek)', flag: '🇺🇿' },
    { code: 'ru', label: 'Русский (Russian)', flag: '🇷🇺' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 pb-28">
      {/* Header */}
      <div className="space-y-1 border-b border-white/5 pb-5">
        <div className="flex items-center gap-2.5">
          <Settings className="w-6 h-6 text-amber-400" />
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-['Outfit'] tracking-tight">
            {t.settings.title}
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-400">
          {t.settings.subtitle}
        </p>
      </div>

      {/* Profile Section (Nickname only, privacy-enforced) */}
      <div className="p-6 rounded-3xl bg-[#111522] border border-white/5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-white font-['Outfit']">
            {t.settings.profileSection}
          </h2>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
            Privacy Protected
          </span>
        </div>

        <form onSubmit={handleSaveNickname} className="space-y-3">
          <label className="block text-xs font-semibold text-slate-300">
            {t.settings.nicknameLabel}
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={nicknameInput}
              onChange={(e) => setNicknameInput(e.target.value)}
              placeholder="e.g. MovieMaster42"
              className="flex-1 px-4 py-3 rounded-2xl bg-[#0b0e14] border border-white/10 text-white placeholder-slate-500 text-sm font-medium focus:outline-none focus:border-amber-500"
              maxLength={25}
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs sm:text-sm transition-all shadow-md shadow-amber-500/20 active:scale-95 flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>{t.settings.saveNickname}</span>
            </button>
          </div>
          <div className="flex items-center gap-2 text-xs text-amber-300/80 pt-1">
            <ShieldCheck className="w-4 h-4 flex-shrink-0 text-amber-400" />
            <span>{t.settings.nicknameNotice}</span>
          </div>
          {saveAlert && (
            <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>{t.settings.savedSuccess}</span>
            </p>
          )}
        </form>
      </div>

      {/* Language Section */}
      <div className="p-6 rounded-3xl bg-[#111522] border border-white/5 space-y-4">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-400" />
          <h2 className="text-base sm:text-lg font-bold text-white font-['Outfit']">
            {t.settings.languageSection}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {languages.map((lang) => {
            const isSelected = preferences.language === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => updateLanguage(lang.code)}
                className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-500 text-white shadow-md'
                    : 'bg-[#0b0e14] border-white/10 text-slate-300 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="text-xs sm:text-sm font-bold">{lang.label}</span>
                </div>
                {isSelected && <Check className="w-4 h-4 text-amber-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Preferences Section */}
      <div className="p-6 rounded-3xl bg-[#111522] border border-white/5 space-y-4">
        <div className="flex items-center gap-2">
          <Film className="w-5 h-5 text-amber-400" />
          <h2 className="text-base sm:text-lg font-bold text-white font-['Outfit']">
            {t.settings.contentSection}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => updateContentPreference('movies')}
            className={`p-4 rounded-2xl border text-left transition-all space-y-1 ${
              preferences.contentPreference === 'movies'
                ? 'bg-amber-500/20 border-amber-500 text-white shadow-md'
                : 'bg-[#0b0e14] border-white/10 text-slate-300 hover:bg-white/5'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm">🎬 Movies Only</span>
              {preferences.contentPreference === 'movies' && <Check className="w-4 h-4 text-amber-400" />}
            </div>
            <p className="text-[11px] text-slate-400">
              Live-action feature films and cinematic releases
            </p>
          </button>

          <button
            onClick={() => updateContentPreference('animated')}
            className={`p-4 rounded-2xl border text-left transition-all space-y-1 ${
              preferences.contentPreference === 'animated'
                ? 'bg-purple-500/20 border-purple-500 text-white shadow-md'
                : 'bg-[#0b0e14] border-white/10 text-slate-300 hover:bg-white/5'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm">🎨 Animated Only</span>
              {preferences.contentPreference === 'animated' && <Check className="w-4 h-4 text-purple-400" />}
            </div>
            <p className="text-[11px] text-slate-400">
              Feature-length animated stories, anime & CGI
            </p>
          </button>

          <button
            onClick={() => updateContentPreference('both')}
            className={`p-4 rounded-2xl border text-left transition-all space-y-1 ${
              preferences.contentPreference === 'both'
                ? 'bg-gradient-to-br from-amber-500/20 to-purple-500/20 border-amber-400 text-white shadow-md'
                : 'bg-[#0b0e14] border-white/10 text-slate-300 hover:bg-white/5'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm">✨ Both Categories</span>
              {preferences.contentPreference === 'both' && <Check className="w-4 h-4 text-amber-400" />}
            </div>
            <p className="text-[11px] text-slate-400">
              Personalize recommendations for both realms
            </p>
          </button>
        </div>
      </div>

      {/* Favorite Genres Selection */}
      <div className="p-6 rounded-3xl bg-[#111522] border border-white/5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <h2 className="text-base sm:text-lg font-bold text-white font-['Outfit']">
              {t.settings.genresSection}
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            {preferences.favoriteGenres.length} selected
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {GENRE_LIST.map((genre) => {
            const isSelected = preferences.favoriteGenres.includes(genre);
            return (
              <button
                key={genre}
                onClick={() => toggleGenre(genre)}
                className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                    : 'bg-[#0b0e14] border-white/5 text-slate-400 hover:bg-white/5'
                }`}
              >
                <span>{genre}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* API Data & Metadata Architecture */}
      <div className="p-6 rounded-3xl bg-[#111522] border border-white/5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-amber-400" />
            <h2 className="text-base sm:text-lg font-bold text-white font-['Outfit']">
              {t.settings.apiStatusTitle}
            </h2>
          </div>
          <button
            onClick={onOpenApiModal}
            className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
          >
            Configure & Docs
          </button>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          {t.settings.apiStatusDesc}
        </p>
        <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 font-medium">
          {t.settings.demoNotice}
        </div>
      </div>

      {/* Data & Privacy Management */}
      <div className="p-6 rounded-3xl bg-[#111522] border border-white/5 space-y-4">
        <h2 className="text-base sm:text-lg font-bold text-white font-['Outfit']">
          {t.settings.dataSection}
        </h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => {
              if (window.confirm(t.settings.clearFavoritesConfirm)) {
                clearFavorites();
              }
            }}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 text-xs font-semibold border border-white/10 transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Favorites ({preferences.favorites.length})</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm(t.settings.clearWatchlistConfirm)) {
                clearWatchlist();
              }
            }}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 text-xs font-semibold border border-white/10 transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Watchlist ({preferences.watchlist.length})</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm(t.settings.resetAllConfirm)) {
                resetPreferences();
              }
            }}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-300 text-xs font-semibold border border-white/10 transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Preferences</span>
          </button>
        </div>
      </div>
    </div>
  );
};
