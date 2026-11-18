/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useEffect, useState } from 'react';
import { ScreenView, UserSession } from './types/auth';
import { LoginScreen } from './components/LoginScreen';
import { SignUpScreen } from './components/SignUpScreen';
import { ShareScreenShowcase } from './components/ShareScreenShowcase';
import { MemberDashboard } from './components/MemberDashboard';
import { ForgotPasswordModal } from './components/ForgotPasswordModal';
import { MenuModal } from './components/MenuModal';
import { SecuritySpecsModal } from './components/SecuritySpecsModal';
import { TermsModal } from './components/TermsModal';
import { ToastContainer, ToastMessage } from './components/Toast';
import { Coffee, Shield, Sparkles, Layers, LogIn, UserPlus } from 'lucide-react';
import { getCurrentUser, logoutAccount, toUserSession } from './services/auth';

export default function App() {
  const [currentView, setCurrentView] = useState<ScreenView>('login');
  const [session, setSession] = useState<UserSession | null>(null);
  const [isRestoringSession, setIsRestoringSession] = useState(true);

  // Modals state
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSecurityOpen, setIsSecurityOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  // Toasts state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((text: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  useEffect(() => {
    let active = true;
    getCurrentUser()
      .then((user) => {
        if (active && user) {
          setSession(toUserSession(user));
          setCurrentView('member');
        }
      })
      .catch((error) => {
        if (active) {
          showToast(error instanceof Error ? error.message : 'Could not restore your session.', 'error');
        }
      })
      .finally(() => {
        if (active) {
          setIsRestoringSession(false);
        }
      });

    return () => {
      active = false;
    };
  }, [showToast]);

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleLoginSuccess = (user: UserSession) => {
    setSession(user);
    setCurrentView('member');
  };

  const handleSignUpSuccess = (user: UserSession) => {
    setSession(user);
    setCurrentView('member');
  };

  const handleSignOut = async () => {
    try {
      await logoutAccount();
      setSession(null);
      setCurrentView('login');
      showToast('Signed out safely. Device session cleared.', 'info');
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Could not sign out.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f6f2] text-slate-800 flex flex-col justify-between selection:bg-[#183324] selection:text-white">
      {/* Top Bar Contract: Zone 1 (Wordmark) - Zone 2 (Nav links) - Zone 3 (1 Primary Action) */}
      <header className="sticky top-0 z-40 bg-[#f7f6f2]/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          type="button"
          onClick={() => setCurrentView('showcase')}
          className="text-base sm:text-lg font-serif font-bold tracking-tight text-[#14281d] hover:text-[#183324] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer"
        >
          <div className="w-7 h-7 rounded-lg bg-[#183324] text-[#c89b65] flex items-center justify-center font-bold text-xs shadow-xs">
            ☕
          </div>
          <span>Coffee Tree Cafe</span>
        </button>

        {/* Zone 2: 4-5 single-line clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-slate-600">
          <button
            type="button"
            onClick={() => setCurrentView('login')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentView === 'login' ? 'text-[#183324] font-bold border-b-2 border-[#183324] pb-0.5' : 'hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setCurrentView('signup')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentView === 'signup' ? 'text-[#183324] font-bold border-b-2 border-[#183324] pb-0.5' : 'hover:text-slate-900'
            }`}
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={() => setCurrentView('showcase')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentView === 'showcase' ? 'text-[#183324] font-bold border-b-2 border-[#183324] pb-0.5' : 'hover:text-slate-900'
            }`}
          >
            Share Screens
          </button>
          <button
            type="button"
            onClick={() => setIsSecurityOpen(true)}
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1"
          >
            <Shield className="w-3.5 h-3.5 text-emerald-700" />
            <span>Security Specs</span>
          </button>
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Artisan Menu
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-2.5 shrink-0">
          {session ? (
            <button
              type="button"
              onClick={() => setCurrentView('member')}
              className="px-3.5 py-1.5 rounded-full bg-[#183324] text-white text-xs font-medium hover:bg-[#12281c] transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-[#c89b65]" />
              <span>{session.fullName.split(' ')[0]}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                if (currentView === 'login') {
                  setCurrentView('signup');
                } else if (currentView === 'signup') {
                  setCurrentView('login');
                } else {
                  setCurrentView('login');
                }
              }}
              className="px-3.5 py-1.5 rounded-full bg-[#183324] text-white text-xs font-medium hover:bg-[#12281c] transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 shadow-2xs"
            >
              {currentView === 'login' ? (
                <>
                  <UserPlus className="w-3.5 h-3.5 text-[#c89b65]" />
                  <span>Switch to Sign Up</span>
                </>
              ) : (
                <>
                  <LogIn className="w-3.5 h-3.5 text-[#c89b65]" />
                  <span>Switch to Sign In</span>
                </>
              )}
            </button>
          )}
        </div>
      </header>

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 md:py-10 flex flex-col items-center justify-center">
        {isRestoringSession ? (
          <p role="status" className="text-sm text-slate-500">Checking your account...</p>
        ) : currentView === 'login' ? (
          <div className="w-full animate-in fade-in duration-300">
            <LoginScreen
              onSwitchToSignUp={() => setCurrentView('signup')}
              onLoginSuccess={handleLoginSuccess}
              onForgotPassword={() => setIsForgotOpen(true)}
              onOpenSecuritySpecs={() => setIsSecurityOpen(true)}
              showToast={showToast}
            />
          </div>
        ) : null}

        {!isRestoringSession && currentView === 'signup' && (
          <div className="w-full animate-in fade-in duration-300">
            <SignUpScreen
              onSwitchToLogin={() => setCurrentView('login')}
              onSignUpSuccess={handleSignUpSuccess}
              onExploreMenu={() => setIsMenuOpen(true)}
              onOpenTerms={() => setIsTermsOpen(true)}
              showToast={showToast}
            />
          </div>
        )}

        {!isRestoringSession && currentView === 'showcase' && (
          <div className="w-full animate-in fade-in duration-300">
            <ShareScreenShowcase
              onSelectScreen={(view) => setCurrentView(view)}
              onOpenSecuritySpecs={() => setIsSecurityOpen(true)}
            />
          </div>
        )}

        {!isRestoringSession && currentView === 'member' && session && (
          <div className="w-full animate-in fade-in duration-300">
            <MemberDashboard
              user={session}
              onSignOut={handleSignOut}
              onExploreMenu={() => setIsMenuOpen(true)}
              showToast={showToast}
            />
          </div>
        )}
      </main>

      {/* Modern Presentation Switcher Dock on Mobile / Small screens */}
      <div className="md:hidden sticky bottom-4 z-30 mx-auto px-4 w-full max-w-sm">
        <div className="bg-slate-900/90 backdrop-blur-md text-white rounded-full p-1.5 shadow-2xl border border-white/10 flex items-center justify-around text-xs">
          <button
            type="button"
            onClick={() => setCurrentView('login')}
            className={`px-3 py-1.5 rounded-full font-medium transition-colors ${
              currentView === 'login' ? 'bg-[#183324] text-white' : 'text-slate-300'
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setCurrentView('signup')}
            className={`px-3 py-1.5 rounded-full font-medium transition-colors ${
              currentView === 'signup' ? 'bg-[#183324] text-white' : 'text-slate-300'
            }`}
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={() => setCurrentView('showcase')}
            className={`px-3 py-1.5 rounded-full font-medium transition-colors ${
              currentView === 'showcase' ? 'bg-[#183324] text-white' : 'text-slate-300'
            }`}
          >
            Share View
          </button>
        </div>
      </div>

      {/* Quiet Clean Footer */}
      <footer className="border-t border-slate-200/80 py-6 px-4 sm:px-8 mt-10 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-slate-800">Coffee Tree Cafe</span>
            <span>·</span>
            <span>Artisanal Coffee & Hearth Roastery</span>
            <span>·</span>
            <span>Est. 2018</span>
          </div>

          <div className="flex items-center gap-5 text-slate-600">
            <button
              type="button"
              onClick={() => setIsSecurityOpen(true)}
              className="hover:text-slate-900 underline-offset-4 hover:underline cursor-pointer"
            >
              Security Protocol
            </button>
            <button
              type="button"
              onClick={() => setIsTermsOpen(true)}
              className="hover:text-slate-900 underline-offset-4 hover:underline cursor-pointer"
            >
              Member Charter & Privacy
            </button>
            <button
              type="button"
              onClick={() => setCurrentView('showcase')}
              className="hover:text-slate-900 underline-offset-4 hover:underline cursor-pointer"
            >
              Design Tokens
            </button>
          </div>
        </div>
      </footer>

      {/* Modals & Feedback */}
      <ForgotPasswordModal
        isOpen={isForgotOpen}
        onClose={() => setIsForgotOpen(false)}
        showToast={showToast}
      />
      <MenuModal
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
      <SecuritySpecsModal
        isOpen={isSecurityOpen}
        onClose={() => setIsSecurityOpen(false)}
      />
      <TermsModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
      />
      <ToastContainer
        toasts={toasts}
        onDismiss={dismissToast}
      />
    </div>
  );
}
