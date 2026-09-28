import React from 'react';
import { X, ExternalLink, Film } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TrailerModal: React.FC = () => {
  const { activeTrailer, closeTrailer } = useApp();

  if (!activeTrailer) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="fixed inset-0 -z-10" onClick={closeTrailer} />

      <div className="relative w-full max-w-4xl bg-[#0f131d] rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <Film className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white font-['Outfit'] line-clamp-1">
                {activeTrailer.title} — Official Trailer
              </h3>
              <p className="text-[11px] text-slate-400">
                Official studio teaser & trailer via YouTube
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`https://www.youtube.com/watch?v=${activeTrailer.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
              title="Watch directly on YouTube"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={closeTrailer}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors focus:outline-none"
              aria-label="Close trailer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Player Frame */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${activeTrailer.youtubeId}?autoplay=1&rel=0`}
            title={`${activeTrailer.title} Official Trailer`}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};
