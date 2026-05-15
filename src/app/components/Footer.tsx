import { Globe, Twitter, Instagram, Linkedin, Facebook, Youtube, Shield, Lock, Award, Star } from 'lucide-react';

const JK = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const IN = { fontFamily: "'Inter', sans-serif" };

const footerLinks = {
  Company: ['About Safawell', 'Careers', 'Press & Media', 'Investor Relations', 'Partner with Us'],
  Destinations: ['Maldives', 'Santorini, Greece', 'Dubai, UAE', 'Bali, Indonesia', 'Paris, France', 'Tokyo, Japan'],
  Support: ['Help Center', 'Contact Us', 'Manage Booking', 'Cancellation Policy', 'Travel Insurance', 'Accessibility'],
  Policies: ['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Refund Policy', 'GDPR Compliance'],
};

const socials = [
  { icon: Twitter, label: 'Twitter' },
  { icon: Instagram, label: 'Instagram' },
  { icon: Facebook, label: 'Facebook' },
  { icon: Linkedin, label: 'LinkedIn' },
  { icon: Youtube, label: 'YouTube' },
];

const trustBadges = [
  { icon: Shield, label: 'Secure Payments' },
  { icon: Lock, label: 'SSL Encrypted' },
  { icon: Award, label: 'IATA Certified' },
  { icon: Star, label: 'Award Winning' },
];

export function Footer() {
  return (
    <footer style={{ backgroundColor: '#0F172A' }}>
      {/* Newsletter */}
      <div className="border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-1" style={JK}>
                Exclusive deals, curated just for you
              </h3>
              <p className="text-slate-400 text-sm" style={IN}>
                Subscribe and receive personalised hotel offers, early access to flash sales, and travel inspiration.
              </p>
            </div>
            <div className="flex gap-2 w-full lg:w-auto lg:min-w-[420px]">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                style={IN}
              />
              <button
                className="px-5 py-3 rounded-xl text-white text-sm font-semibold whitespace-nowrap transition-all hover:opacity-90"
                style={{ backgroundColor: '#1B4FD8', fontFamily: "'Inter', sans-serif" }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer links */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#1B4FD8' }}>
                <Globe size={16} className="text-white" />
              </div>
              <span className="text-lg font-bold text-white" style={JK}>Safawell</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6" style={IN}>
              Your gateway to luxury travel experiences worldwide. Premium hotels, curated stays, and AI-powered recommendations.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
                >
                  <Icon size={14} className="text-slate-400 hover:text-white" />
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm mb-4 tracking-wide" style={JK}>
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-slate-200 text-sm transition-colors"
                      style={IN}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Trust badges + copyright */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Trust badges */}
            <div className="flex items-center gap-6">
              {trustBadges.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <Icon size={13} className="text-slate-500" />
                  <span className="text-xs text-slate-500" style={IN}>{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <p className="text-xs text-slate-600" style={IN}>
                © 2026 Safawell International. All rights reserved.
              </p>
              <div className="flex items-center gap-4">
                {['Privacy', 'Terms', 'Cookies'].map(item => (
                  <a key={item} href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors" style={IN}>
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
