import React, { useState } from 'react';
import {
  Sparkles,
  Film,
  Check,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GENRE_LIST } from '../data/movieDatabase';
import { SupportedLanguage } from '../types';

export const OnboardingModal: React.FC = () => {
  const {
    preferences,
    updateNickname,
    updateContentPreference,
    updateFavoriteGenres,
    updateLanguage,
    completeOnboarding,
    skipOnboarding,
    t,
  } = useApp();

  const [currentStep, setCurrentStep] = useState(1);
  const [usernameInput, setUsernameInput] = useState(preferences.username || '');
  const [usernameError, setUsernameError] = useState('');
  const [contentPref, setContentPref] = useState<'movies' | 'animated' | 'both'>(
    preferences.contentPreference || 'both'
  );
  const [selectedGenres, setSelectedGenres] = useState<string[]>(
    preferences.favoriteGenres || ['Adventure', 'Science Fiction', 'Animation']
  );
  const [chosenLang, setChosenLang] = useState<SupportedLanguage>(preferences.language || 'en');

  // If already onboarded, do not display
  if (preferences.isOnboarded) {
    return null;
  }

  const exampleNicknames = ['MovieFan27', 'CineMaster', 'BlueFox', 'FilmExplorer', 'StarlightRider'];

  const handleStep1Next = () => {
    if (!usernameInput.trim()) {
      setUsernameError(t.onboarding.usernameRequired);
      return;
    }
    setUsernameError('');
    updateNickname(usernameInput);
    setCurrentStep(2);
  };

  const handleStep2Next = () => {
    updateContentPreference(contentPref);
    setCurrentStep(3);
  };

  const handleStep3Next = () => {
    updateFavoriteGenres(selectedGenres.length > 0 ? selectedGenres : ['Adventure', 'Animation']);
    setCurrentStep(4);
  };

  const handleFinish = () => {
    updateLanguage(chosenLang);
    completeOnboarding();
  };

  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const languages: { code: SupportedLanguage; label: string; flag: string; native: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧', native: 'English' },
    { code: 'uz', label: 'Uzbek', flag: '🇺🇿', native: 'Oʻzbekcha' },
    { code: 'ru', label: 'Russian', flag: '🇷🇺', native: 'Русский' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#07090e]/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0f131d] rounded-3xl border border-white/10 shadow-2xl p-6 sm:p-10 space-y-6 animate-in zoom-in-95 duration-200">
        {/* Top Progress Indicator Header */}
        <div className="space-y-3 border-b border-white/5 pb-5">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <span className="flex items-center gap-1.5 text-amber-400">
              <Film className="w-4 h-4" />
              <span>CineMate Setup</span>
            </span>
            <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
              {t.onboarding.step} {currentStep} {t.onboarding.of} 4
            </span>
          </div>

          {/* Progress Bar Track */}
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-indigo-500 transition-all duration-300 rounded-full"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* ==================================================== */}
        {/* STEP 1: USERNAME (NICKNAME ONLY) */}
        {/* ==================================================== */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] tracking-tight">
                {t.onboarding.step1Title}
              </h2>
              <p className="text-sm text-slate-400">
                {t.onboarding.step1Subtitle}
              </p>
            </div>

            {/* Privacy Warning Callout */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3 text-amber-300 text-xs sm:text-sm">
              <ShieldCheck className="w-5 h-5 flex-shrink-0 text-amber-400 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold">
                  {t.onboarding.step1Note}
                </p>
                <p className="text-xs text-amber-200/70">
                  To protect your privacy, CineMate does not collect real names, surnames, phone numbers, or addresses. Choose an imaginative handle for your discovery profile.
                </p>
              </div>
            </div>

            {/* Input field */}
            <div className="space-y-2">
              <input
                type="text"
                value={usernameInput}
                onChange={(e) => {
                  setUsernameInput(e.target.value);
                  if (usernameError) setUsernameError('');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleStep1Next();
                }}
                placeholder={t.onboarding.usernamePlaceholder}
                className="w-full px-4 py-3.5 rounded-2xl bg-[#141926] border border-white/15 text-white placeholder-slate-500 text-base font-medium focus:outline-none focus:border-amber-500 transition-colors shadow-inner"
                maxLength={25}
                autoFocus
              />
              {usernameError && (
                <p className="text-xs text-rose-400 font-semibold">{usernameError}</p>
              )}
            </div>

            {/* Example Nickname Pills */}
            <div className="space-y-2">
              <span className="text-xs text-slate-400 font-medium">
                {t.onboarding.nicknameExamples}
              </span>
              <div className="flex flex-wrap gap-2">
                {exampleNicknames.map((ex) => (
                  <button
                    key={ex}
                    onClick={() => {
                      setUsernameInput(ex);
                      if (usernameError) setUsernameError('');
                    }}
                    type="button"
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold border border-white/10 transition-colors"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* STEP 2: CONTENT PREFERENCE */}
        {/* ==================================================== */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] tracking-tight">
                {t.onboarding.step2Title}
              </h2>
              <p className="text-sm text-slate-400">
                {t.onboarding.step2Subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Movies Option */}
              <button
                type="button"
                onClick={() => setContentPref('movies')}
                className={`p-5 rounded-2xl border text-left transition-all space-y-2 relative ${
                  contentPref === 'movies'
                    ? 'bg-amber-500/20 border-amber-500 text-white shadow-lg shadow-amber-500/10'
                    : 'bg-[#141926] border-white/10 text-slate-300 hover:border-white/20'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 text-lg">
                  🎬
                </div>
                <h3 className="font-bold text-sm text-white">
                  {t.onboarding.moviesOption}
                </h3>
                <p className="text-xs text-slate-400">
                  {t.onboarding.moviesOptionDesc}
                </p>
                {contentPref === 'movies' && (
                  <div className="absolute top-3 right-3 p-1 rounded-full bg-amber-500 text-black">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
              </button>

              {/* Animated Movies Option */}
              <button
                type="button"
                onClick={() => setContentPref('animated')}
                className={`p-5 rounded-2xl border text-left transition-all space-y-2 relative ${
                  contentPref === 'animated'
                    ? 'bg-purple-500/20 border-purple-500 text-white shadow-lg shadow-purple-500/10'
                    : 'bg-[#141926] border-white/10 text-slate-300 hover:border-white/20'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 text-lg">
                  🎨
                </div>
                <h3 className="font-bold text-sm text-white">
                  {t.onboarding.animatedOption}
                </h3>
                <p className="text-xs text-slate-400">
                  {t.onboarding.animatedOptionDesc}
                </p>
                {contentPref === 'animated' && (
                  <div className="absolute top-3 right-3 p-1 rounded-full bg-purple-500 text-white">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
              </button>

              {/* Both Option */}
              <button
                type="button"
                onClick={() => setContentPref('both')}
                className={`p-5 rounded-2xl border text-left transition-all space-y-2 relative ${
                  contentPref === 'both'
                    ? 'bg-gradient-to-br from-amber-500/20 to-purple-500/20 border-amber-400/80 text-white shadow-lg'
                    : 'bg-[#141926] border-white/10 text-slate-300 hover:border-white/20'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-lg">
                  ✨
                </div>
                <h3 className="font-bold text-sm text-white">
                  {t.onboarding.bothOption}
                </h3>
                <p className="text-xs text-slate-400">
                  Curate the best of both live-action cinema & animation.
                </p>
                {contentPref === 'both' && (
                  <div className="absolute top-3 right-3 p-1 rounded-full bg-amber-400 text-black">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* STEP 3: FAVORITE GENRES */}
        {/* ==================================================== */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] tracking-tight">
                {t.onboarding.step3Title}
              </h2>
              <p className="text-sm text-slate-400">
                {t.onboarding.step3Subtitle}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-72 overflow-y-auto pr-1">
              {GENRE_LIST.map((genre) => {
                const isSelected = selectedGenres.includes(genre);
                return (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => toggleGenre(genre)}
                    className={`py-3 px-3.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-500 text-amber-200'
                        : 'bg-[#141926] border-white/5 text-slate-300 hover:bg-white/5 hover:border-white/15'
                    }`}
                  >
                    <span>{genre}</span>
                    {isSelected && <Check className="w-4 h-4 text-amber-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* STEP 4: INTERFACE LANGUAGE */}
        {/* ==================================================== */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] tracking-tight">
                {t.onboarding.step4Title}
              </h2>
              <p className="text-sm text-slate-400">
                {t.onboarding.step4Subtitle}
              </p>
            </div>

            <div className="space-y-3">
              {languages.map((lang) => {
                const isSelected = chosenLang === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      setChosenLang(lang.code);
                      updateLanguage(lang.code);
                    }}
                    className={`w-full p-4 rounded-2xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-500 text-white shadow-lg shadow-amber-500/10'
                        : 'bg-[#141926] border-white/10 text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="text-2xl">{lang.flag}</span>
                      <div className="text-left">
                        <p className="font-bold text-sm text-white">{lang.native}</p>
                        <p className="text-xs text-slate-400">{lang.label}</p>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="p-1.5 rounded-full bg-amber-500 text-black">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer Navigation Buttons */}
        <div className="flex items-center justify-between border-t border-white/5 pt-5">
          {/* Skip for now option */}
          <button
            type="button"
            onClick={skipOnboarding}
            className="text-xs sm:text-sm font-semibold text-slate-400 hover:text-white transition-colors"
          >
            {t.onboarding.skip}
          </button>

          <div className="flex items-center gap-3">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep((s) => s - 1)}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t.onboarding.back}</span>
              </button>
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={() => {
                  if (currentStep === 1) handleStep1Next();
                  else if (currentStep === 2) handleStep2Next();
                  else if (currentStep === 3) handleStep3Next();
                }}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 shadow-lg shadow-amber-500/20 active:scale-95"
              >
                <span>{t.onboarding.next}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black text-xs sm:text-sm font-extrabold transition-all flex items-center gap-1.5 shadow-xl shadow-amber-500/30 active:scale-95"
              >
                <span>{t.onboarding.finish}</span>
                <Sparkles className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
