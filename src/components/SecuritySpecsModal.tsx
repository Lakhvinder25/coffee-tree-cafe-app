import React from 'react';
import { X, ShieldCheck, KeyRound, Lock, Smartphone, Server } from 'lucide-react';

interface SecuritySpecsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecuritySpecsModal: React.FC<SecuritySpecsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const securityFeatures = [
    {
      title: 'Password Strength Guidance',
      desc: 'The signup screen provides a visual strength guide. The server requires passwords to be at least 8 characters.',
      icon: KeyRound,
      tag: 'User Guidance',
    },
    {
      title: 'Scrypt Password Hashing',
      desc: 'Passwords are stored as per-account salted scrypt hashes. Plaintext passwords are never saved.',
      icon: Lock,
      tag: 'Credential Storage',
    },
    {
      title: 'External Sign-in Providers',
      desc: 'Google, Apple, and passkey sign-in are not configured. Email and password is the available sign-in method.',
      icon: Smartphone,
      tag: 'Not Configured',
    },
    {
      title: 'Server-Managed Sessions',
      desc: 'A random session token is stored only as a hash in MySQL, expires after 12 hours, and is revoked on sign-out.',
      icon: ShieldCheck,
      tag: 'HTTP-only Cookie',
    },
    {
      title: 'Authentication Rate Limiting',
      desc: 'Signup and sign-in endpoints allow up to 10 attempts per 15 minutes per client IP.',
      icon: Server,
      tag: 'Network Defense',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[85vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-emerald-800 uppercase mb-1">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>Coffee Tree Cafe Security Protocol</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
          Secure Authentication Architecture
        </h3>
        <p className="text-xs text-slate-500 mb-6 leading-relaxed">
          This local Docker stack uses hashed passwords and server-managed sessions. Configure HTTPS and set SESSION_COOKIE_SECURE=true before exposing it beyond localhost.
        </p>

        <div className="space-y-3.5">
          {securityFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="p-4 rounded-2xl bg-[#fbfbfa] border border-slate-200 flex items-start gap-3.5"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800 shrink-0 mt-0.5">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-slate-900 text-sm">
                      {feat.title}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100/70 text-emerald-900 text-[10px] font-semibold">
                      {feat.tag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-light">
                    {feat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Security controls shown reflect the current local implementation.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-[#183324] text-white font-medium hover:bg-[#12281c] cursor-pointer"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
