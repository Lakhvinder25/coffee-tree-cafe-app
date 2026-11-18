import React from 'react';

interface CoffeeTreeLogoProps {
  variant?: 'banner' | 'compact' | 'minimal';
  className?: string;
}

export const CoffeeTreeLogo: React.FC<CoffeeTreeLogoProps> = ({
  variant = 'compact',
  className = '',
}) => {
  if (variant === 'banner') {
    return (
      <div className={`w-full max-w-sm mx-auto bg-[#f4f2ec] border border-[#e5e0d4] rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-xs ${className}`}>
        {/* Tree emblem */}
        <div className="mb-2 text-[#244230] flex flex-col items-center">
          <svg
            viewBox="0 0 100 85"
            className="w-14 h-12 text-[#22402e]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Elegant botanical tree branches and coffee cherry nodes */}
            <path d="M50 78 V 46" strokeWidth="2.5" />
            <path d="M50 62 C 40 56, 32 46, 34 32 C 35 22, 45 16, 50 12 C 55 16, 65 22, 66 32 C 68 46, 60 56, 50 62 Z" fill="#22402e" fillOpacity="0.08" />
            <path d="M50 48 C 38 42, 28 32, 25 18 C 34 16, 44 24, 50 32" />
            <path d="M50 48 C 62 42, 72 32, 75 18 C 66 16, 56 24, 50 32" />
            <path d="M50 36 C 44 28, 42 18, 50 10 C 58 18, 56 28, 50 36" />
            {/* Coffee cherries */}
            <circle cx="38" cy="28" r="2.5" fill="#c89b65" stroke="none" />
            <circle cx="62" cy="28" r="2.5" fill="#c89b65" stroke="none" />
            <circle cx="50" cy="22" r="2.2" fill="#c89b65" stroke="none" />
            <circle cx="32" cy="38" r="2" fill="#c89b65" stroke="none" />
            <circle cx="68" cy="38" r="2" fill="#c89b65" stroke="none" />
            {/* Soil / hearth lines */}
            <path d="M38 78 H 62" strokeWidth="2" />
          </svg>
          <div className="text-[11px] tracking-[0.28em] font-semibold text-[#183324] uppercase mt-1">
            Coffee Tree
          </div>
          <div className="text-[8px] tracking-[0.35em] text-[#6b776f] uppercase font-medium">
            Cafe
          </div>
        </div>

        <div className="w-full pt-2 border-t border-[#e2ddd1] flex items-center justify-center">
          <span className="text-[10px] tracking-[0.2em] font-semibold text-[#22402e] uppercase">
            Artisanal Coffee & Hearth Roastery
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <div className="w-10 h-10 rounded-xl bg-[#f4f2ec] border border-[#e5e0d4] flex items-center justify-center text-[#1c3727] shrink-0">
        <svg
          viewBox="0 0 100 85"
          className="w-6 h-6 text-[#1c3727]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M50 78 V 46" strokeWidth="3" />
          <path d="M50 62 C 40 56, 32 46, 34 32 C 35 22, 45 16, 50 12 C 55 16, 65 22, 66 32 C 68 46, 60 56, 50 62 Z" fill="#22402e" fillOpacity="0.1" />
          <path d="M50 48 C 38 42, 28 32, 25 18 C 34 16, 44 24, 50 32" />
          <path d="M50 48 C 62 42, 72 32, 75 18 C 66 16, 56 24, 50 32" />
          <circle cx="38" cy="28" r="3" fill="#c89b65" stroke="none" />
          <circle cx="62" cy="28" r="3" fill="#c89b65" stroke="none" />
          <path d="M38 78 H 62" strokeWidth="2.5" />
        </svg>
      </div>
      <div>
        <div className="text-xs tracking-[0.22em] font-bold text-[#152e20] uppercase leading-none">
          Coffee Tree
        </div>
        <div className="text-[9px] tracking-[0.28em] text-[#718076] uppercase font-medium mt-1">
          Artisan Roastery
        </div>
      </div>
    </div>
  );
};
