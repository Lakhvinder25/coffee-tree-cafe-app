import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Coffee, ArrowRight } from 'lucide-react';
import { CoffeeTreeLogo } from './CoffeeTreeLogo';
import { UserSession } from '../types/auth';
import { loginAccount, toUserSession } from '../services/auth';

interface LoginScreenProps {
  onSwitchToSignUp: () => void;
  onLoginSuccess: (user: UserSession) => void;
  onForgotPassword: () => void;
  onOpenSecuritySpecs: () => void;
  showToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onSwitchToSignUp,
  onLoginSuccess,
  onForgotPassword,
  showToast,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; password?: string } = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please provide a valid account email';
    }
    if (!password) {
      newErrors.password = 'Please enter your password';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast('Please check your login credentials', 'error');
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    try {
      const user = await loginAccount(email, password);
      showToast(`Welcome back, ${user.fullName.split(' ')[0]}! Order ahead unlocked.`, 'success');
      onLoginSuccess(toUserSession(user));
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Could not sign in.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto rounded-3xl bg-white shadow-2xl border border-slate-200/80 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
      <div>
        {/* Top Emblem Box */}
        <CoffeeTreeLogo variant="banner" className="mb-6" />

        {/* Headings */}
        <div className="text-center max-w-md mx-auto mb-6">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Welcome back to Coffee Tree Cafe
          </h1>
          <p className="text-xs sm:text-[13px] text-slate-500 mt-2 leading-relaxed">
            Sign in to order your daily roast, redeem coffee bean rewards, and track pickup.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
          {/* Email Address */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <label className="font-semibold text-slate-700">Email Address</label>
              <span className="text-slate-400 text-[11px]">Account email</span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="barista@coffeetree.com"
                autoComplete="email"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1a3827] focus:border-transparent transition-all shadow-2xs"
                required
              />
            </div>
            {errors.email && (
              <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <label className="font-semibold text-slate-700">Password</label>
              <button
                type="button"
                onClick={onForgotPassword}
                className="text-xs text-slate-500 hover:text-[#1a3827] hover:underline cursor-pointer"
              >
                Forgot your password?
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••••••••••••••"
                autoComplete="current-password"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1a3827] focus:border-transparent transition-all tracking-wider shadow-2xs"
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
            {errors.password && (
              <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.password}</p>
            )}
          </div>

          {/* Primary CTA */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-6 rounded-full bg-[#183324] hover:bg-[#12281c] active:bg-[#0c1c13] text-white font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-75 cursor-pointer mt-2"
          >
            <Coffee className="w-4 h-4 text-[#c89b65]" />
            <span>{isSubmitting ? 'Verifying Credentials...' : 'Sign In to Order'}</span>
            <ArrowRight className="w-4 h-4 ml-0.5" />
          </button>

        </form>
      </div>

      {/* Footer Link */}
      <div className="mt-8 text-center text-xs text-slate-600">
        <span>Don't have an account yet? </span>
        <button
          type="button"
          onClick={onSwitchToSignUp}
          className="font-semibold text-slate-900 underline underline-offset-4 hover:text-[#183324] cursor-pointer"
        >
          Create an account / Sign Up
        </button>
        <p className="mt-3 text-slate-400">Coffee Tree Cafe · Owned by Lakhvinder</p>
      </div>
    </div>
  );
};
