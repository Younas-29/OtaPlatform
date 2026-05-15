import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Globe, ArrowRight, CheckCircle, Sparkles, Gift } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const JK = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const IN = { fontFamily: "'Inter', sans-serif" };

const HERO_IMG = 'https://images.unsplash.com/photo-1777199663418-3dd126c9fd40?w=1200&q=85&fit=crop';

const countries = [
  'United States', 'United Kingdom', 'United Arab Emirates', 'France', 'Germany',
  'Japan', 'Australia', 'Canada', 'Singapore', 'Switzerland', 'Saudi Arabia', 'Qatar',
];

const loyaltyBenefits = [
  { icon: Gift, title: '5,000 Welcome Points', desc: 'Instantly credited on signup' },
  { icon: CheckCircle, title: 'Members-Only Pricing', desc: 'Exclusive rates unavailable publicly' },
  { icon: Sparkles, title: 'AI Travel Concierge', desc: 'Personalised recommendations 24/7' },
];

function PasswordStrength({ password }: { password: string }) {
  const score = Math.min(
    (password.length >= 8 ? 1 : 0) +
    (/[A-Z]/.test(password) ? 1 : 0) +
    (/[0-9]/.test(password) ? 1 : 0) +
    (/[^A-Za-z0-9]/.test(password) ? 1 : 0),
    4
  );
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const colors = ['', '#EF4444', '#F97316', '#EAB308', '#22C55E'];
  if (!password) return null;
  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4].map(i => (
          <div
            key={i}
            className="flex-1 h-1 rounded-full transition-all"
            style={{ backgroundColor: i <= score ? colors[score] : '#E2E8F0' }}
          />
        ))}
      </div>
      <p className="text-xs" style={{ color: colors[score], fontFamily: "'Inter', sans-serif" }}>
        {labels[score]}
      </p>
    </div>
  );
}

export function SignupPage() {
  const { navigate, login } = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', country: '', terms: false });

  const handleChange = (field: string, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login();
  };

  return (
    <div className="flex min-h-screen">
      {/* Left: Benefits panel (hidden on mobile) */}
      <div className="hidden lg:block flex-[0.38] relative overflow-hidden">
        <ImageWithFallback
          src={HERO_IMG}
          alt="Maldives luxury overwater bungalows"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(15,23,42,0.4) 0%, rgba(15,23,42,0.75) 100%)' }} />

        <div className="relative h-full flex flex-col justify-end p-10">
          <div className="mb-6">
            <p className="text-cyan-400 text-xs font-bold tracking-widest uppercase mb-2" style={IN}>
              Safawell Membership
            </p>
            <h2 className="text-white text-2xl font-bold mb-3" style={JK}>
              Join 2 million luxury travelers
            </h2>
            <p className="text-white/70 text-sm leading-relaxed" style={IN}>
              Unlock exclusive member rates, earn loyalty points on every stay, and enjoy a personalised travel experience designed around you.
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-4">
            {loyaltyBenefits.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
                  <Icon size={16} className="text-cyan-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm" style={JK}>{title}</p>
                  <p className="text-white/60 text-xs mt-0.5" style={IN}>{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-8 pt-6 border-t border-white/20 grid grid-cols-3 gap-4">
            {[
              { value: '5K', label: 'Welcome pts' },
              { value: '15%', label: 'Member savings' },
              { value: '180+', label: 'Countries' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-white text-xl font-bold" style={JK}>{value}</p>
                <p className="text-white/50 text-xs mt-0.5" style={IN}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Form panel */}
      <div className="flex-1 lg:flex-[0.62] flex items-center justify-center px-8 lg:px-14 py-10 bg-white overflow-y-auto">
        <div className="w-full max-w-[480px]">
          {/* Header */}
          <div className="mb-7">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 mb-4">
              <Gift size={12} className="text-cyan-600" />
              <span className="text-xs font-semibold text-cyan-700" style={IN}>
                5,000 free points on signup
              </span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2" style={JK}>
              Create your account
            </h1>
            <p className="text-slate-500 text-sm" style={IN}>
              Start your luxury travel journey with Safawell today.
            </p>
          </div>

          {/* Social signup */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <button type="button" className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all text-sm font-medium text-slate-700" style={IN}>
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button type="button" className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all text-sm font-medium text-slate-700" style={IN}>
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.42c1.37.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 3.97zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              Apple
            </button>
          </div>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400 font-medium" style={IN}>or create with email</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5" style={JK}>First name</label>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={e => handleChange('firstName', e.target.value)}
                    placeholder="James"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                    style={IN}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5" style={JK}>Last name</label>
                <input
                  type="text"
                  value={form.lastName}
                  onChange={e => handleChange('lastName', e.target.value)}
                  placeholder="Davidson"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                  style={IN}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5" style={JK}>Email address</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={form.email}
                  onChange={e => handleChange('email', e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                  style={IN}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5" style={JK}>Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => handleChange('password', e.target.value)}
                  placeholder="Create a strong password"
                  className="w-full pl-10 pr-11 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                  style={IN}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              <PasswordStrength password={form.password} />
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5" style={JK}>Country of residence</label>
              <div className="relative">
                <Globe size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <select
                  value={form.country}
                  onChange={e => handleChange('country', e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all appearance-none cursor-pointer"
                  style={IN}
                >
                  <option value="">Select your country</option>
                  {countries.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.terms}
                onChange={e => handleChange('terms', e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-slate-300 accent-blue-600 cursor-pointer flex-shrink-0"
              />
              <span className="text-sm text-slate-600 leading-relaxed" style={IN}>
                I agree to Safawell's{' '}
                <span className="text-blue-600 font-semibold cursor-pointer hover:underline">Terms of Service</span>
                {' '}and{' '}
                <span className="text-blue-600 font-semibold cursor-pointer hover:underline">Privacy Policy</span>.
                I agree to receive personalised travel offers via email.
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98] mt-2"
              style={{ backgroundColor: '#1B4FD8', fontFamily: "'Inter', sans-serif" }}
            >
              Create My Account
              <ArrowRight size={16} />
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-5" style={IN}>
            Already have an account?{' '}
            <button
              onClick={() => navigate('login')}
              className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Sign in instead
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
