import React from 'react';
import { X, Database, ShieldCheck, CheckCircle2, Code2, Server } from 'lucide-react';
import { movieService } from '../services/movieService';

interface ApiStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiStatusModal: React.FC<ApiStatusModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const status = movieService.getApiStatus();

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#0f131d] rounded-3xl border border-white/10 shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white font-['Outfit']">
                  Movie Data Architecture
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  DEMO MODE
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Decoupled Service Layer (`movieService.ts`)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
            aria-label="Close API info"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status details */}
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-[#141926] border border-white/5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Current Data Provider: {status.provider}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              CineMate is operating in clean Demo Mode with handpicked legitimate movie metadata, accurate credits, directors, cast lists, synopsis overviews, and official YouTube trailer IDs.
            </p>
          </div>

          {/* Architecture info */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Production API Integration Guide</span>
            </h4>
            <div className="p-4 rounded-2xl bg-[#0b0e14] border border-white/10 font-mono text-xs text-slate-300 space-y-2">
              <p className="text-slate-400">// 1. Add your TMDB or IMDb key to server environment:</p>
              <p className="text-amber-300">TMDB_API_KEY="your_api_key_here"</p>
              <p className="text-slate-400 pt-2">// 2. Toggle service layer in src/services/movieService.ts:</p>
              <p className="text-slate-300">
                <span className="text-purple-400">class</span> <span className="text-amber-400">MovieService</span> &#123;<br />
                &nbsp;&nbsp;<span className="text-blue-400">private</span> isDemoMode: <span className="text-blue-300">boolean</span> = <span className="text-emerald-400">false</span>;<br />
                &#125;
              </p>
            </div>
          </div>

          {/* Privacy & Legal notice */}
          <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <p className="font-bold text-indigo-300">
                Legitimate Metadata & Legal Trailer Streaming
              </p>
              <p className="text-indigo-200/70">
                CineMate does NOT host, upload, or illegally distribute copyrighted movies. All trailers are served through legitimate, authorized embeds.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
