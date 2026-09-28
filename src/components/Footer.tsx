import React from 'react';
import { Film, Sparkles, Heart, ShieldCheck, Database } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenApiModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenApiModal }) => {
  const { preferences, t } = useApp();

  return (
    <footer className="w-full bg-[#080b11] border-t border-white/5 py-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Brand */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 p-[1px]">
                <div className="w-full h-full bg-[#0d111a] rounded-xl flex items-center justify-center">
                  <Film className="w-4 h-4 text-amber-400" />
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-['Outfit']">
                Cine<span className="text-amber-400">Mate</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm">
              {t.tagline}
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-slate-300">
            <button onClick={() => onNavigate('home')} className="hover:text-amber-400 transition-colors">
              {t.nav.home}
            </button>
            <button onClick={() => onNavigate('movies')} className="hover:text-amber-400 transition-colors">
              {t.nav.movies}
            </button>
            <button onClick={() => onNavigate('animated')} className="hover:text-purple-400 transition-colors">
              {t.nav.animated}
            </button>
            <button onClick={() => onNavigate('search')} className="hover:text-amber-400 transition-colors">
              {t.nav.search}
            </button>
            <button onClick={() => onNavigate('favorites')} className="hover:text-rose-400 transition-colors">
              {t.nav.favorites}
            </button>
            <button onClick={() => onNavigate('watchlist')} className="hover:text-cyan-400 transition-colors">
              {t.nav.watchlist}
            </button>
            <button onClick={() => onNavigate('settings')} className="hover:text-amber-400 transition-colors">
              {t.nav.settings}
            </button>
          </div>
        </div>

        {/* Disclaimer & Policy Notice */}
        <div className="p-4 rounded-2xl bg-[#0f131f] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>
              CineMate is an informational discovery catalog. Does not illegally host, upload or stream copyrighted movie files.
            </span>
          </div>
          <button
            onClick={onOpenApiModal}
            className="flex items-center gap-1.5 text-amber-400 font-semibold hover:underline w-fit"
          >
            <Database className="w-3.5 h-3.5" />
            <span>{t.demoBanner.info}</span>
          </button>
        </div>

        {/* Bottom credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 pt-2">
          <p>© {new Date().getFullYear()} CineMate. Crafted for cinema & animation lovers.</p>
          <div className="flex items-center gap-2">
            <span>Signed in as</span>
            <span className="text-slate-300 font-semibold">{preferences.username || 'MovieFan'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
