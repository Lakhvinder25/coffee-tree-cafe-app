import React, { useState, useId } from 'react';
import { Mail, Eye, EyeOff, User, MessageSquare, ArrowRight, ChevronRight } from 'lucide-react';
import { CoffeeTreeLogo } from './CoffeeTreeLogo';
import { SocialAuthButtons } from './SocialAuthButtons';
import { UserSession } from '../types/auth';

interface SignUpScreenProps {
  onSwitchToLogin: () => void;
  onSignUpSuccess: (user: UserSession) => void;
  onExploreMenu: () => void;
  onOpenTerms: () => void;
  showToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const SignUpScreen: React.FC<SignUpScreenProps> = ({
  onSwitchToLogin,
  onSignUpSuccess,
  onExploreMenu,
  onOpenTerms,
  showToast,
}) => {
  const [fullName, setFullName] = useState('Sophia Martinez');
  const [email, setEmail] = useState('sophia@example.com');
  const [phone, setPhone] = useState('(555) 432-8765');
  const [password, setPassword] = useState('HeirloomTimberRoast2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [newsletterConsent, setNewsletterConsent] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ fullName?: string; email?: string; terms?: string }>({});

  const newsletterConsentId = useId();
  const termsAcceptedId = useId();

  // Dynamic Roast Security Level calculation
  const getRoastSecurity = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12 && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) score++;
    if (pwd.length >= 14 && /[^A-Za-z0-9]/.test(pwd)) score++;

    if (score === 0) {
      return {
        level: 1,
        title: 'Light City Roast',
        desc: 'Adequate for casual browsing',
        color: 'bg-amber-600',
      };
    } else if (score === 1) {
      return {
        level: 2,
        title: 'Full City Roast',
        desc: 'Balanced encryption security',
        color: 'bg-emerald-600',
      };
    } else {
      return {
        level: 3,
        title: 'Strong Velvet Roast',
        desc: 'Cryptographically hardened password',
        color: 'bg-[#183324]',
      };
    }
  };

  const roastSecurity = getRoastSecurity(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { fullName?: string; email?: string; terms?: string } = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Please enter your full name';
    }
    if (!email || !email.includes('@')) {
      newErrors.email = 'Please provide a valid email';
    }
    if (!termsAccepted) {
      newErrors.terms = 'Please accept the Terms and Privacy Policy';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast('Please verify required fields and terms agreement', 'error');
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      showToast('Welcome to Coffee Tree! Account registered.', 'success');
      onSignUpSuccess({
        fullName,
        email,
        phone,
        coffeeBeans: 25, // bonus signup reward beans!
        memberTier: 'Inaugural Craft Member',
        preferredBrew: 'House Specialty',
        joinedDate: 'Today',
      });
    }, 700);
  };

  const handleSocialAuth = (provider: 'Google' | 'Apple') => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast(`Account registered via ${provider}!`, 'success');
      onSignUpSuccess({
        fullName: provider === 'Google' ? fullName || 'Sophia Martinez' : 'Sophia Martinez',
        email: email || 'sophia@example.com',
        phone: phone,
        coffeeBeans: 25,
        memberTier: 'Inaugural Craft Member',
        preferredBrew: 'House Specialty',
        joinedDate: 'Today',
      });
    }, 700);
  };

  return (
    <div className="w-full max-w-lg mx-auto rounded-3xl bg-white shadow-2xl border border-slate-200/80 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
      <div>
        {/* Header Row: Logo & Explore Menu */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <CoffeeTreeLogo variant="compact" />
          <button
            type="button"
            onClick={onExploreMenu}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-[#183324] transition-colors cursor-pointer"
          >
            <span>Explore Menu</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Titles */}
        <div className="mb-6">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Join the Coffee Tree Family
          </h1>
          <p className="text-xs sm:text-[13px] text-slate-500 mt-1.5 leading-relaxed">
            Create an account to start ordering ahead, customize your brew, and unlock free artisan drinks.
          </p>
        </div>

        {/* Social Auth Buttons */}
        <div className="mb-5">
          <SocialAuthButtons
            onGoogleClick={() => handleSocialAuth('Google')}
            onAppleClick={() => handleSocialAuth('Apple')}
            isLoading={isSubmitting}
            compactLabels={true}
          />
        </div>

        {/* Divider */}
        <div className="relative my-5 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative px-3 bg-white text-[10px] tracking-wider font-semibold text-slate-400 uppercase">
            Or craft with email
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Sophia Martinez"
                className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1a3827] focus:border-transparent transition-all shadow-2xs"
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
            </div>
            {errors.fullName && (
              <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.fullName}</p>
            )}
          </div>

          {/* Split Row: Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sophia@example.com"
                  className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1a3827] focus:border-transparent transition-all shadow-2xs"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
              </div>
              {errors.email && (
                <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.email}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <label className="font-semibold text-slate-700">Phone Number</label>
                <span className="text-[11px] text-slate-400">SMS Pickup Alerts</span>
              </div>
              <div className="relative">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(555) 432-8765"
                  className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1a3827] focus:border-transparent transition-all shadow-2xs"
                />
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                  <MessageSquare className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••••••••••••••"
                className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1a3827] focus:border-transparent transition-all tracking-wider shadow-2xs"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Dynamic Roast Security Level Bar */}
            <div className="mt-2 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Roast Security Level</span>
                <span className="font-semibold text-[#183324]">{roastSecurity.title}</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                <div
                  className={`h-1.5 rounded-full transition-colors duration-300 ${
                    roastSecurity.level >= 1 ? 'bg-[#183324]' : 'bg-slate-200'
                  }`}
                />
                <div
                  className={`h-1.5 rounded-full transition-colors duration-300 ${
                    roastSecurity.level >= 2 ? 'bg-[#183324]' : 'bg-slate-200'
                  }`}
                />
                <div
                  className={`h-1.5 rounded-full transition-colors duration-300 ${
                    roastSecurity.level >= 3 ? 'bg-[#183324]' : 'bg-slate-200'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Consent Checkboxes */}
          <div className="space-y-2 pt-2 text-xs text-slate-600">
            <div className="flex items-start gap-2.5">
              <input
                type="checkbox"
                id={newsletterConsentId}
                checked={newsletterConsent}
                onChange={(e) => setNewsletterConsent(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-[#183324] focus:ring-[#183324] border-slate-300 accent-[#183324] cursor-pointer"
              />
              <label htmlFor={newsletterConsentId} className="cursor-pointer leading-tight">
                Send me secret seasonal menu drops, roaster tastings, and member <strong className="text-slate-900 font-semibold">Double-Bean Days</strong>.
              </label>
            </div>

            <div className="flex items-start gap-2.5">
              <input
                type="checkbox"
                id={termsAcceptedId}
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-[#183324] focus:ring-[#183324] border-slate-300 accent-[#183324] cursor-pointer"
              />
              <label htmlFor={termsAcceptedId} className="cursor-pointer leading-tight">
                I agree to the{' '}
                <button
                  type="button"
                  onClick={onOpenTerms}
                  className="underline text-slate-900 font-semibold hover:text-[#183324]"
                >
                  Terms of Service
                </button>{' '}
                &{' '}
                <button
                  type="button"
                  onClick={onOpenTerms}
                  className="underline text-slate-900 font-semibold hover:text-[#183324]"
                >
                  Loyalty Privacy Policy
                </button>
                .
              </label>
            </div>
            {errors.terms && (
              <p className="text-[11px] text-red-600 font-medium">{errors.terms}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 rounded-full bg-[#183324] hover:bg-[#12281c] active:bg-[#0c1c13] text-white font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-75 cursor-pointer mt-3"
          >
            <span>{isSubmitting ? 'Creating Roastery Account...' : 'Create My Account'}</span>
            <span className="text-[#c89b65] font-serif text-lg leading-none">☕</span>
          </button>
        </form>
      </div>

      {/* Footer Link */}
      <div className="mt-8 text-center text-xs text-slate-600">
        <span>Already a member? </span>
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="font-semibold text-slate-900 hover:text-[#183324] inline-flex items-center gap-0.5 cursor-pointer"
        >
          <span>Sign in to your account</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
