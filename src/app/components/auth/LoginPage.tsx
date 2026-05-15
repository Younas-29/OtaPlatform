import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const JK = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const IN = { fontFamily: "'Inter', sans-serif" };

const HERO_IMG = 'https://images.unsplash.com/photo-1677129667171-92abd8740fa3?w=1400&q=85&fit=crop';

const trustPoints = [
  'Book 2M+ luxury hotels worldwide',
  'Best price guarantee',
  'Free cancellation on most rooms',
];

export function LoginPage() {
  const { navigate, login } = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login();
  };

  return (
    <div className="flex min-h-screen">
      {/* Left: Form panel */}
      <div className="flex-[0.58] flex items-center justify-center px-8 lg:px-16 py-12 bg-white">
        <div className="w-full max-w-[420px]">
          {/* Greeting */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-5">
              <Sparkles size={12} className="text-blue-600" />
              <span className="text-xs font-semibold text-blue-700" style={IN}>
                Welcome back to Safawell
              </span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2" style={JK}>
              Sign in to your account
            </h1>
            <p className="text-slate-500 text-sm" style={IN}>
              Your next luxury experience is one step away.
            </p>
          </div>

          {/* Social login */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all text-sm font-medium text-slate-700"
              style={IN}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all text-sm font-medium text-slate-700"
              style={IN}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.42c1.37.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 3.97zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              Apple
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400 font-medium" style={IN}>or sign in with email</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Email/password form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5" style={JK}>
                Email address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                  style={IN}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5" style={JK}>
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-11 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                  style={IN}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember me + Forgot password */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 accent-blue-600 cursor-pointer"
                />
                <span className="text-sm text-slate-600" style={IN}>Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => navigate('forgot-password')}
                className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                style={IN}
              >
                Forgot password?
              </button>
            </div>

            {/* Sign in CTA */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98] mt-2"
              style={{ backgroundColor: '#1B4FD8', fontFamily: "'Inter', sans-serif" }}
            >
              Sign In to Safawell
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Sign up redirect */}
          <p className="text-center text-sm text-slate-500 mt-6" style={IN}>
            Don't have an account?{' '}
            <button
              onClick={() => navigate('signup')}
              className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Create your free account
            </button>
          </p>
        </div>
      </div>

      {/* Right: Cinematic hero image */}
      <div className="hidden lg:block flex-[0.42] relative overflow-hidden">
        <ImageWithFallback
          src={HERO_IMG}
          alt="Luxury hotel lobby"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(15,23,42,0.25) 0%, rgba(15,23,42,0.65) 100%)' }} />

        {/* Floating trust card */}
        <div className="absolute bottom-12 left-8 right-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
            <p className="text-white text-base font-bold mb-4" style={JK}>
              Why 2M+ travelers choose Safawell
            </p>
            <div className="space-y-3">
              {trustPoints.map(point => (
                <div key={point} className="flex items-center gap-3">
                  <CheckCircle size={15} className="text-cyan-400 flex-shrink-0" />
                  <span className="text-white/90 text-sm" style={IN}>{point}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-white/20 flex items-center gap-4">
              <div>
                <p className="text-white font-bold text-lg" style={JK}>4.9★</p>
                <p className="text-white/60 text-xs" style={IN}>App rating</p>
              </div>
              <div>
                <p className="text-white font-bold text-lg" style={JK}>2M+</p>
                <p className="text-white/60 text-xs" style={IN}>Happy travelers</p>
              </div>
              <div>
                <p className="text-white font-bold text-lg" style={JK}>180+</p>
                <p className="text-white/60 text-xs" style={IN}>Countries</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
