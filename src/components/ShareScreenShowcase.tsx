import React from 'react';
import { ArrowRight, Sparkles, Shield, Coffee, Smartphone, Monitor, Layers, CheckCircle, ExternalLink } from 'lucide-react';
import { ScreenView } from '../types/auth';

interface ShareScreenShowcaseProps {
  onSelectScreen: (screen: ScreenView) => void;
  onOpenSecuritySpecs: () => void;
}

export const ShareScreenShowcase: React.FC<ShareScreenShowcaseProps> = ({
  onSelectScreen,
  onOpenSecuritySpecs,
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-12 py-4">
      {/* Editorial Showcase Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#183324]/10 border border-[#183324]/20 text-[#183324] text-xs font-semibold tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#c89b65]" />
          Design System & Screen Showcase
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
          Modern Minimalist Authentication for Artisanal Roasteries
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          A pair of authentication screens designed for Coffee Tree Cafe, uniting warm botanical storytelling with high-security credentials, roast-tier entropy evaluation, and 1-click brew preferences.
        </p>

        {/* Quick Jump Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => onSelectScreen('login')}
            className="px-5 py-2.5 rounded-full bg-[#183324] text-white text-xs font-medium hover:bg-[#12281c] transition-all flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <span>Live Login Screen</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onSelectScreen('signup')}
            className="px-5 py-2.5 rounded-full bg-white text-slate-800 border border-slate-300 text-xs font-medium hover:bg-slate-50 transition-all flex items-center gap-2 shadow-2xs cursor-pointer"
          >
            <span>Live Sign Up Screen</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onOpenSecuritySpecs}
            className="px-4 py-2.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-medium hover:bg-emerald-100 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Shield className="w-3.5 h-3.5 text-emerald-700" />
            <span>Security Architecture</span>
          </button>
        </div>
      </div>

      {/* Side-by-Side Mockup Artboards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Artboard 1: Login Screen */}
        <div className="space-y-3 group">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span className="font-semibold text-slate-800 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#183324] text-white text-[10px] flex items-center justify-center font-bold">1</span>
              Member Sign In Flow
            </span>
            <button
              type="button"
              onClick={() => onSelectScreen('login')}
              className="text-[#183324] font-medium hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Test Interactive Page</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div
            onClick={() => onSelectScreen('login')}
            className="rounded-3xl border border-slate-200/80 bg-white p-2 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden relative group-hover:border-[#183324]/40"
          >
            <div className="rounded-2xl overflow-hidden relative aspect-[4/3] sm:aspect-[16/11] bg-slate-100">
              <img
                src="/assets/aistudio/login-screen_dc1fdd92.png"
                alt="Coffee Tree Cafe Login Screen design mockup"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity px-4 py-2 rounded-full bg-[#183324] text-white text-xs font-semibold shadow-lg">
                  Click to open interactive login →
                </span>
              </div>
            </div>

            <div className="p-4 space-y-2">
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Focused Return-to-Order Experience
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Streamlined, modern minimalist sign-in card with email/password & social authentication, device trust state, and instant daily bean perks.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-slate-500">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">Remember Device</span>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">Express Bar Pickup</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60">10 Daily Perk Beans</span>
              </div>
            </div>
          </div>
        </div>

        {/* Artboard 2: Sign Up Screen */}
        <div className="space-y-3 group">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span className="font-semibold text-slate-800 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#183324] text-white text-[10px] flex items-center justify-center font-bold">2</span>
              Membership & Craft Registration
            </span>
            <button
              type="button"
              onClick={() => onSelectScreen('signup')}
              className="text-[#183324] font-medium hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Test Interactive Page</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div
            onClick={() => onSelectScreen('signup')}
            className="rounded-3xl border border-slate-200/80 bg-white p-2 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden relative group-hover:border-[#183324]/40"
          >
            <div className="rounded-2xl overflow-hidden relative aspect-[4/3] sm:aspect-[16/11] bg-slate-100">
              <img
                src="/assets/aistudio/signup-screen_ed37a752.png"
                alt="Coffee Tree Cafe Sign Up Screen design mockup"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity px-4 py-2 rounded-full bg-[#183324] text-white text-xs font-semibold shadow-lg">
                  Click to open interactive sign up →
                </span>
              </div>
            </div>

            <div className="p-4 space-y-2">
              <h3 className="font-serif text-lg font-bold text-slate-900">
                Artisanal Onboarding & Brew Profile
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Streamlined, modern minimalist membership registration with SMS alerts, dynamic roast-tier password entropy indicator, and 1-tap social onboarding.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-slate-500">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">Roast Security Meter</span>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">SMS Alerts</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60">Social 1-Tap Auth</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Design System & Aesthetic Foundation Specs */}
      <div className="rounded-3xl bg-[#ffffff] border border-slate-200/80 p-8 shadow-md space-y-8">
        <div className="border-b border-slate-100 pb-5">
          <div className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">
            Artisanal Foundation
          </div>
          <h2 className="font-serif text-2xl font-bold text-slate-900 mt-1">
            Design Tokens & Aesthetic Architecture
          </h2>
        </div>

        {/* Color Palette Grid */}
        <div className="space-y-3">
          <div className="text-xs font-semibold text-slate-700">Curated Botanical Palette</div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="p-3 rounded-2xl bg-[#13281c] text-white space-y-1">
              <div className="text-xs font-semibold">Deep Hearth</div>
              <div className="font-mono text-[10px] text-emerald-200/70">#13281C</div>
              <div className="text-[10px] text-emerald-100/50">Primary brand canvas</div>
            </div>

            <div className="p-3 rounded-2xl bg-[#183324] text-white space-y-1">
              <div className="text-xs font-semibold">Botanical Card</div>
              <div className="font-mono text-[10px] text-emerald-200/70">#183324</div>
              <div className="text-[10px] text-emerald-100/50">CTA & interactive buttons</div>
            </div>

            <div className="p-3 rounded-2xl bg-[#c89b65] text-slate-950 space-y-1">
              <div className="text-xs font-bold">Artisan Gold</div>
              <div className="font-mono text-[10px] text-slate-900/80">#C89B65</div>
              <div className="text-[10px] text-slate-900/70">Warm craft accents</div>
            </div>

            <div className="p-3 rounded-2xl bg-[#edf5ef] border border-emerald-200 text-emerald-950 space-y-1">
              <div className="text-xs font-semibold">Sage Milk</div>
              <div className="font-mono text-[10px] text-emerald-700">#EDF5EF</div>
              <div className="text-[10px] text-emerald-800/70">Perk banners & success</div>
            </div>

            <div className="p-3 rounded-2xl bg-[#f4f2ec] border border-[#e5e0d4] text-slate-900 space-y-1">
              <div className="text-xs font-semibold">Warm Paper</div>
              <div className="font-mono text-[10px] text-slate-500">#F4F2EC</div>
              <div className="text-[10px] text-slate-600">Emblems & input pills</div>
            </div>
          </div>
        </div>

        {/* Typography & Security Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
          {/* Typography pairing */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-slate-700">Typographic Pairing</div>
            <div className="p-4 rounded-2xl bg-[#fbfbfa] border border-slate-200 space-y-3">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">Display Face</span>
                <div className="font-serif text-xl font-bold text-slate-900">Playfair Display</div>
                <p className="text-xs text-slate-500 font-light mt-0.5">
                  Editorial serif conveying warmth, heirloom roasting heritage, and literary calm.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">Interface & Body</span>
                <div className="font-sans text-base font-semibold text-slate-900">Plus Jakarta Sans</div>
                <p className="text-xs text-slate-500 font-light mt-0.5">
                  Geometric humanist sans-serif optimized for crisp form inputs, readability, and micro-labels.
                </p>
              </div>
            </div>
          </div>

          {/* Security Features */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-slate-700">Security Invariants</div>
            <div className="p-4 rounded-2xl bg-[#fbfbfa] border border-slate-200 space-y-2.5">
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-slate-900 font-semibold">Password Guidance:</strong> A client-side strength indicator is paired with server-side minimum length validation.
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-slate-900 font-semibold">Server Sessions:</strong> HTTP-only session cookies are backed by revocable, hashed tokens in MySQL.
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-slate-900 font-semibold">Rate-Limited Sign-In:</strong> Email/password signup and login endpoints are rate limited; external OAuth providers are not configured.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
