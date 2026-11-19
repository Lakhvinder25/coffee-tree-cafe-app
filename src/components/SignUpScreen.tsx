import React, { useId, useState } from 'react';
import { ChevronRight, Eye, EyeOff, Mail, MapPin, User } from 'lucide-react';
import { CoffeeTreeLogo } from './CoffeeTreeLogo';
import { UserSession } from '../types/auth';
import { registerAccount, toUserSession } from '../services/auth';

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
  onOpenTerms,
  showToast,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ fullName?: string; email?: string; city?: string; terms?: string }>({});
  const termsAcceptedId = useId();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { fullName?: string; email?: string; city?: string; terms?: string } = {};

    if (!fullName.trim()) newErrors.fullName = 'Please enter your full name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) newErrors.email = 'Please provide a valid email';
    if (!city.trim()) newErrors.city = 'Please enter your city';
    if (!termsAccepted) newErrors.terms = 'Please accept the Terms and Privacy Policy';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast('Please complete the required fields', 'error');
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    try {
      const user = await registerAccount({ fullName, email, phone: '', city, password });
      showToast('Welcome to Coffee Tree Cafe!', 'success');
      onSignUpSuccess(toUserSession(user));
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Could not create your account.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto rounded-3xl bg-white shadow-2xl border border-slate-200/80 p-6 sm:p-10">
      <div className="flex justify-center pb-5 border-b border-slate-100 mb-6">
        <CoffeeTreeLogo variant="compact" />
      </div>

      <div className="text-center mb-6">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Create your account
        </h1>
        <p className="text-sm text-slate-500 mt-2">Join the Coffee Tree Cafe community.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Full Name</label>
          <div className="relative">
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your full name"
              className="w-full px-3.5 py-3 pr-10 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1a3827] focus:border-transparent"
              required
            />
            <User className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          </div>
          {errors.fullName && <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Address</label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              className="w-full px-3.5 py-3 pr-10 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1a3827] focus:border-transparent"
              required
            />
            <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          </div>
          {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">City</label>
          <div className="relative">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Your city"
              autoComplete="address-level2"
              maxLength={100}
              className="w-full px-3.5 py-3 pr-10 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1a3827] focus:border-transparent"
              required
            />
            <MapPin className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          </div>
          {errors.city && <p className="text-[11px] text-red-600 mt-1">{errors.city}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a strong password"
              autoComplete="new-password"
              minLength={8}
              maxLength={128}
              className="w-full px-3.5 py-3 pr-10 rounded-xl border border-slate-200 bg-white text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1a3827] focus:border-transparent"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-start gap-2.5 text-xs text-slate-600 pt-1">
          <input
            type="checkbox"
            id={termsAcceptedId}
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded accent-[#183324]"
          />
          <label htmlFor={termsAcceptedId} className="leading-relaxed">
            I agree to the{' '}
            <button type="button" onClick={onOpenTerms} className="underline font-semibold text-slate-900">
              Terms and Privacy Policy
            </button>
            .
          </label>
        </div>
        {errors.terms && <p className="text-[11px] text-red-600">{errors.terms}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 rounded-full bg-[#183324] hover:bg-[#12281c] text-white font-medium text-sm transition-colors disabled:opacity-75"
        >
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      <div className="mt-7 text-center text-xs text-slate-600">
        <span>Already have an account? </span>
        <button type="button" onClick={onSwitchToLogin} className="font-semibold text-slate-900 inline-flex items-center">
          Sign in <ChevronRight className="w-3.5 h-3.5" />
        </button>
        <p className="mt-3 text-slate-400">Coffee Tree Cafe · Owned by Lakhvinder</p>
      </div>
    </div>
  );
};
