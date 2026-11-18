import React from 'react';
import { X, Shield, Leaf, Heart } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[85vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-[#183324] uppercase mb-1">
          <Leaf className="w-4 h-4 text-[#c89b65]" />
          <span>Coffee Tree Cafe Member Charter</span>
        </div>
        <h3 className="font-serif text-2xl font-bold text-slate-900 mb-4">
          Terms of Service & Loyalty Privacy Policy
        </h3>

        <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
          <div className="p-3.5 rounded-2xl bg-[#fbfbfa] border border-slate-200">
            <h4 className="font-serif font-bold text-slate-900 mb-1">
              1. The Roaster's Privacy Pledge
            </h4>
            <p>
              Your personal data, milk preferences, and order history are exclusively utilized to tailor your coffee bar collection and coffee bean points. We never sell, broker, or monetize your contact details with advertising brokers.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#fbfbfa] border border-slate-200">
            <h4 className="font-serif font-bold text-slate-900 mb-1">
              2. Loyalty Coffee Beans & Reward Expiration
            </h4>
            <p>
              Earn 1 Bean per dollar spent in-store or online. Coffee Beans remain active for 12 rolling months from last transaction. Beans may be redeemed for single-origin whole bean bags, artisan hearth pastries, and handcrafted seasonal beverages.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#fbfbfa] border border-slate-200">
            <h4 className="font-serif font-bold text-slate-900 mb-1">
              3. Secure Express Curbside & Counter Pickup
            </h4>
            <p>
              Mobile pickup orders are prepared to order temperature tolerances (latte milk served 140°F–150°F). If delayed, order temperature management guarantees an instant fresh re-pour upon arrival at no extra charge.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-full bg-[#183324] text-white text-xs font-semibold hover:bg-[#12281c] cursor-pointer"
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
};
