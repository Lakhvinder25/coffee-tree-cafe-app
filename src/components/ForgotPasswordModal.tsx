import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  showToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div>
            <div className="w-10 h-10 rounded-xl bg-[#183324]/10 text-[#183324] flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>

            <h3 className="font-serif text-2xl font-bold text-slate-900 mb-1">
              Reset Your Password
            </h3>
            <p className="text-xs text-slate-500 mb-5 leading-relaxed">
              Password recovery is not connected yet, so this app cannot send a reset email. Contact the cafe team for help restoring access.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 rounded-full bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Return to Login
            </button>
        </div>
      </div>
    </div>
  );
};
