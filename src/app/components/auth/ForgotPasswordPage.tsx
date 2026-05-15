import { useState } from 'react';
import { Mail, ArrowLeft, ArrowRight, CheckCircle, Lock } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

const JK = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const IN = { fontFamily: "'Inter', sans-serif" };

export function ForgotPasswordPage() {
  const { navigate } = useNavigation();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-16"
      style={{ backgroundColor: '#F8FAFC' }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #DBEAFE 0%, transparent 70%)', filter: 'blur(40px)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #CFFAFE 0%, transparent 70%)', filter: 'blur(40px)' }}
        />
      </div>

      <div className="relative w-full max-w-[440px]">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-10">
          {!submitted ? (
            <>
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#EFF6FF' }}>
                  <Lock size={28} style={{ color: '#1B4FD8' }} />
                </div>
              </div>

              {/* Heading */}
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-slate-900 mb-2" style={JK}>
                  Reset your password
                </h1>
                <p className="text-slate-500 text-sm leading-relaxed" style={IN}>
                  Enter the email address linked to your Safawell account and we'll send you a secure reset link.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
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
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                      style={IN}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98]"
                  style={{ backgroundColor: '#1B4FD8', fontFamily: "'Inter', sans-serif" }}
                >
                  Send Reset Link
                  <ArrowRight size={16} />
                </button>
              </form>

              {/* Back to login */}
              <button
                onClick={() => navigate('login')}
                className="w-full flex items-center justify-center gap-2 mt-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition-all"
                style={IN}
              >
                <ArrowLeft size={15} />
                Return to Sign In
              </button>

              {/* Help text */}
              <p className="text-center text-xs text-slate-400 mt-6 leading-relaxed" style={IN}>
                Didn't receive the email? Check your spam folder or{' '}
                <span className="text-blue-600 cursor-pointer hover:underline font-medium">contact support</span>.
              </p>
            </>
          ) : (
            /* Success state */
            <>
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-green-50">
                  <CheckCircle size={28} className="text-green-500" />
                </div>
              </div>

              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-slate-900 mb-2" style={JK}>
                  Check your inbox
                </h1>
                <p className="text-slate-500 text-sm leading-relaxed" style={IN}>
                  We've sent a password reset link to
                </p>
                <p className="font-semibold text-slate-800 text-sm mt-1" style={JK}>
                  {email}
                </p>
                <p className="text-slate-400 text-xs mt-3" style={IN}>
                  The link will expire in 30 minutes for your security.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => navigate('login')}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90"
                  style={{ backgroundColor: '#1B4FD8', fontFamily: "'Inter', sans-serif" }}
                >
                  Back to Sign In
                </button>

                <button
                  onClick={() => setSubmitted(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition-all border border-slate-200 hover:border-blue-200"
                  style={IN}
                >
                  Try a different email
                </button>
              </div>

              {/* Security note */}
              <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-xs text-slate-500 leading-relaxed text-center" style={IN}>
                  For your security, Safawell will never ask for your password via email. If you didn't request this, please ignore the email.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Bottom hint */}
        <p className="text-center text-xs text-slate-400 mt-5" style={IN}>
          Need help?{' '}
          <span className="text-blue-600 cursor-pointer hover:underline font-medium">Contact Safawell Support</span>
        </p>
      </div>
    </div>
  );
}
