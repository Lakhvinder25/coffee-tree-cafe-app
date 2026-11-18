import React, { useState } from 'react';
import { Leaf, Award, Sparkles } from 'lucide-react';

export const BaristaCard: React.FC = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-emerald-900/40 shadow-lg group bg-[#0e1d15]">
      {/* Photo frame */}
      <div className="relative h-44 sm:h-48 md:h-52 w-full overflow-hidden">
        {!imgError ? (
          <img
            src="/assets/aistudio/signup-screen_ed37a752.png"
            alt="Artisan Barista pouring velvety latte art into handcrafted ceramic cup"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-[15%_48%] transform group-hover:scale-105 transition-transform duration-700 ease-out brightness-95 contrast-105"
          />
        ) : (
          /* High-fidelity CSS/SVG Fallback composition */
          <div className="w-full h-full bg-gradient-to-tr from-[#14281d] via-[#234230] to-[#12241a] flex flex-col items-center justify-center p-6 text-emerald-100">
            <div className="w-14 h-14 rounded-full bg-emerald-800/40 border border-emerald-500/30 flex items-center justify-center mb-2">
              <Sparkles className="w-7 h-7 text-[#c89b65]" />
            </div>
            <div className="text-sm font-serif font-bold text-emerald-50">Master Roast Reserve</div>
            <div className="text-xs text-emerald-300/80">Artisan Hearth Pour</div>
          </div>
        )}

        {/* Ambient warm gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e1d15] via-[#0e1d15]/40 to-transparent" />
      </div>

      {/* Overlay caption bar */}
      <div className="absolute bottom-0 inset-x-0 p-3.5 bg-gradient-to-t from-[#0e1d15] to-[#0e1d15]/90 flex items-center justify-between border-t border-emerald-800/30 backdrop-blur-xs">
        <div>
          <div className="text-[10px] tracking-wider uppercase text-emerald-300/70 font-semibold flex items-center gap-1.5">
            <Award className="w-3 h-3 text-[#c89b65]" />
            First Sip Guarantee
          </div>
          <div className="text-sm font-serif font-bold text-white tracking-wide mt-0.5">
            Ethically Sourced Micro-Lots
          </div>
        </div>

        <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-emerald-300 shadow-inner shrink-0">
          <Leaf className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
