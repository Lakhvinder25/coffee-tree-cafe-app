import React from 'react';
import { Coffee, Award, Sparkles, LogOut, CheckCircle, Clock, ShieldCheck, ChevronRight, Gift } from 'lucide-react';
import { UserSession } from '../types/auth';

interface MemberDashboardProps {
  user: UserSession;
  onSignOut: () => void;
  onExploreMenu: () => void;
  showToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const MemberDashboard: React.FC<MemberDashboardProps> = ({
  user,
  onSignOut,
  onExploreMenu,
  showToast,
}) => {
  const handleRepeatOrder = () => {
    showToast(`1-Click order sent to barista: ${user.preferredBrew}! Ready in 7 mins.`, 'success');
  };

  const handleRedeemBeans = () => {
    showToast('Redeemed 50 Beans for a complimentary artisan cardamom pastry!', 'success');
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl bg-white shadow-xl border border-slate-200/80 overflow-hidden">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#13281c] via-[#183324] to-[#0a1810] p-6 sm:p-8 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/10 border border-white/15 text-[11px] font-medium tracking-wider text-emerald-200 uppercase">
            <Award className="w-3.5 h-3.5 text-[#c89b65]" />
            <span>{user.memberTier}</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-emerald-50">
            Welcome, {user.fullName}
          </h1>
          <p className="text-xs text-emerald-200/70">
            Authenticated via {user.email} · Member since {user.joinedDate}
          </p>
        </div>

        <button
          type="button"
          onClick={onSignOut}
          className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/20 text-xs font-medium text-white transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out / Switch Screen</span>
        </button>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {/* Coffee Bean Rewards Balance Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-[#edf5ef] border border-emerald-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                Coffee Bean Balance
              </span>
              <Coffee className="w-4 h-4 text-[#183324]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl font-bold text-[#183324]">{user.coffeeBeans}</span>
              <span className="text-xs font-semibold text-emerald-800">Beans</span>
            </div>
            <div className="w-full bg-emerald-200/60 rounded-full h-1.5 mt-2 overflow-hidden">
              <div
                className="bg-[#183324] h-1.5 rounded-full"
                style={{ width: `${Math.min(100, (user.coffeeBeans / 150) * 100)}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-emerald-800 pt-1">
              <span>{Math.max(0, 150 - user.coffeeBeans)} beans to Free Geisha Pour Over</span>
              <button
                type="button"
                onClick={handleRedeemBeans}
                className="font-semibold underline cursor-pointer hover:text-emerald-950"
              >
                Redeem
              </button>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#fbfbfa] border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Favorite 1-Click Brew
              </span>
              <Sparkles className="w-4 h-4 text-[#c89b65]" />
            </div>
            <div className="font-serif text-lg font-bold text-slate-900 truncate">
              {user.preferredBrew}
            </div>
            <p className="text-xs text-slate-500">
              Steamed with oat micro-foam at 145°F
            </p>
            <button
              type="button"
              onClick={handleRepeatOrder}
              className="mt-2 w-full py-2 px-3 rounded-xl bg-[#183324] text-white text-xs font-medium hover:bg-[#12281c] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Coffee className="w-3.5 h-3.5 text-[#c89b65]" />
              <span>1-Click Reorder Now</span>
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-[#fbfbfa] border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Live Roastery Queue
              </span>
              <Clock className="w-4 h-4 text-emerald-700" />
            </div>
            <div className="font-serif text-lg font-bold text-slate-900">
              Heirloom Batch #48
            </div>
            <div className="text-xs text-emerald-800 font-medium flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
              <span>Express Bar: 3 min wait time</span>
            </div>
            <button
              type="button"
              onClick={onExploreMenu}
              className="mt-2 w-full py-2 px-3 rounded-xl border border-slate-200 text-slate-700 text-xs font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Explore Fresh Batch</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Security & Device Status Info */}
        <div className="p-4 rounded-2xl border border-slate-200 bg-[#f4f2ec]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
            <div>
              <span className="font-semibold text-slate-800">Device Recognized & Cryptographically Pinned</span>
              <span className="block text-[11px] text-slate-500">Session protected with TLS 1.3 & client-side salted auth tokens.</span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-emerald-100/80 text-emerald-900 font-semibold text-[10px] uppercase tracking-wider shrink-0">
            ✓ Authenticated
          </span>
        </div>
      </div>
    </div>
  );
};
