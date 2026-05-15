import { Download, Calendar, MapPin, Star, Sparkles, ArrowRight, Check, Share2, Plane, Heart } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const JK = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const IN = { fontFamily: "'Inter', sans-serif" };
const BLUE = '#1B4FD8';

const aiSuggestions = [
  {
    name: 'Anantara Veli Maldives',
    image: 'https://images.unsplash.com/photo-1622779536320-bb5f5b501a06?w=400&q=80&fit=crop',
    price: '$850/night',
    reason: 'Perfect next stop from Bali',
    location: 'Maldives',
  },
  {
    name: 'Katikies Santorini',
    image: 'https://images.unsplash.com/photo-1629470035936-3296c3bd8237?w=400&q=80&fit=crop',
    price: '$650/night',
    reason: 'Trending with Bali travelers',
    location: 'Greece',
  },
  {
    name: 'Hôtel de Crillon Paris',
    image: 'https://images.unsplash.com/photo-1677129667171-92abd8740fa3?w=400&q=80&fit=crop',
    price: '$1,200/night',
    reason: 'Extend your luxury journey',
    location: 'France',
  },
];

export function BookingConfirmationPage() {
  const { navigate } = useNavigation();

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8FAFC', paddingTop: 72 }}>

      {/* Hero confirmation section */}
      <div style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E3A5F 50%, #1B4FD8 100%)' }}>
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          {/* Success icon with animated ring */}
          <div className="relative flex justify-center mb-6">
            <div className="absolute w-24 h-24 rounded-full bg-green-400/20 animate-ping" />
            <div className="relative w-20 h-20 rounded-full bg-green-500 flex items-center justify-center shadow-xl">
              <Check size={36} className="text-white" strokeWidth={3} />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-4">
            <Sparkles size={12} className="text-cyan-400" />
            <span className="text-xs font-bold text-white/80 uppercase tracking-wide" style={IN}>Booking Confirmed</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3" style={JK}>
            Your escape is booked, James!
          </h1>
          <p className="text-white/70 text-base mb-2" style={IN}>
            Confirmation sent to <strong className="text-white">james@example.com</strong>
          </p>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 mt-2">
            <span className="text-white/60 text-sm" style={IN}>Booking ID:</span>
            <span className="text-white font-bold text-sm" style={JK}>SFW-20621</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">

        {/* Booking summary card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="relative h-48 overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=900&q=80&fit=crop"
              alt="Four Seasons Bali"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(10,20,50,0.7), transparent)' }} />
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <div className="flex items-center gap-1 mb-1">
                {[1,2,3,4,5].map(i => <Star key={i} size={11} fill="#F59E0B" className="text-amber-400" />)}
              </div>
              <h2 className="text-white text-xl font-bold" style={JK}>Four Seasons Resort Bali at Sayan</h2>
              <div className="flex items-center gap-1.5 mt-1">
                <MapPin size={12} className="text-white/70" />
                <span className="text-white/80 text-sm" style={IN}>Ubud, Bali, Indonesia</span>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-6">
              {[
                { label: 'Check-in', value: 'May 23, 2026', sub: 'From 3:00 PM' },
                { label: 'Check-out', value: 'May 30, 2026', sub: 'Until 12:00 PM' },
                { label: 'Duration', value: '7 nights', sub: 'Half Board' },
                { label: 'Guests', value: '2 Adults', sub: 'Overwater Villa' },
              ].map(({ label, value, sub }) => (
                <div key={label}>
                  <p className="text-xs text-slate-400 mb-0.5" style={IN}>{label}</p>
                  <p className="font-bold text-slate-900 text-sm" style={JK}>{value}</p>
                  <p className="text-xs text-slate-500" style={IN}>{sub}</p>
                </div>
              ))}
            </div>

            {/* Payment confirmed */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-green-50 border border-green-200 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                  <Check size={15} className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-green-800" style={JK}>Payment Confirmed · $6,130</p>
                  <p className="text-xs text-green-600" style={IN}>Charged to Mastercard ending 4821</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-green-600 font-semibold" style={IN}>+890 Reward Points</p>
                <p className="text-xs text-green-500" style={IN}>added to your account</p>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { icon: Download, label: 'Download Voucher', primary: true },
                { icon: Download, label: 'Get Invoice', primary: false },
                { icon: Calendar, label: 'Add to Calendar', primary: false },
                { icon: Share2, label: 'Share Trip', primary: false },
              ].map(({ icon: Icon, label, primary }) => (
                <button
                  key={label}
                  className={`flex flex-col items-center gap-2 py-3.5 rounded-xl text-xs font-semibold border transition-all ${
                    primary
                      ? 'text-white border-transparent hover:opacity-90'
                      : 'text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                  style={primary ? { backgroundColor: BLUE, fontFamily: "'Inter', sans-serif" } : { fontFamily: "'Inter', sans-serif" }}
                >
                  <Icon size={16} />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* What's next */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="font-bold text-slate-900 mb-5" style={JK}>What's Next?</h2>
          <div className="space-y-4">
            {[
              {
                step: '1', title: 'Check your email', desc: 'Your voucher and booking details have been sent to james@example.com',
                color: '#1B4FD8',
              },
              {
                step: '2', title: 'Add airport transfer', desc: 'Book a seaplane or speedboat from Ngurah Rai Airport to the resort',
                color: '#06B6D4', action: 'Add Transfer', cta: true,
              },
              {
                step: '3', title: 'Complete your profile', desc: 'Add passport details and travel preferences to speed up future bookings',
                color: '#7C3AED', action: 'Update Profile', cta: true,
              },
              {
                step: '4', title: 'Check in online', desc: 'Online check-in opens 48 hours before your arrival on May 21, 2026',
                color: '#059669',
              },
            ].map(({ step, title, desc, color, action, cta }) => (
              <div key={step} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ backgroundColor: color }}>
                  {step}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800" style={JK}>{title}</p>
                  <p className="text-xs text-slate-500 mt-0.5" style={IN}>{desc}</p>
                </div>
                {cta && action && (
                  <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 whitespace-nowrap flex items-center gap-1" style={IN} onClick={() => action === 'Update Profile' ? navigate('profile') : null}>
                    {action} <ArrowRight size={11} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* AI travel suggestions */}
        <div className="rounded-2xl overflow-hidden border border-cyan-200">
          <div className="px-6 py-4 flex items-center gap-2" style={{ background: 'linear-gradient(135deg, #ECFEFF, #EFF6FF)' }}>
            <Sparkles size={15} className="text-cyan-600" />
            <h2 className="font-bold text-slate-800" style={JK}>Continue Your Journey — AI Picks</h2>
          </div>
          <div className="bg-white p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {aiSuggestions.map(s => (
              <div
                key={s.name}
                onClick={() => navigate('hotel-detail')}
                className="rounded-2xl overflow-hidden border border-slate-100 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="relative h-36 overflow-hidden">
                  <ImageWithFallback
                    src={s.image}
                    alt={s.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }} />
                  <div className="absolute bottom-3 left-3">
                    <p className="text-white font-bold text-sm" style={JK}>{s.name}</p>
                  </div>
                </div>
                <div className="p-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-cyan-600 font-semibold" style={IN}>{s.reason}</p>
                    <p className="text-sm font-bold text-slate-900 mt-0.5" style={JK}>From {s.price}</p>
                  </div>
                  <button className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:border-red-200 hover:bg-red-50 transition-all">
                    <Heart size={13} className="text-slate-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Manage / Go to trips */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate('my-trips')}
            className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl text-white font-bold text-sm transition-all hover:opacity-90"
            style={{ backgroundColor: BLUE, fontFamily: "'Inter', sans-serif" }}
          >
            View in My Trips
            <ArrowRight size={16} />
          </button>
          <button
            onClick={() => navigate('home')}
            className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl text-slate-700 font-bold text-sm border border-slate-200 hover:bg-slate-50 transition-all"
            style={IN}
          >
            Continue Exploring
          </button>
        </div>

        {/* Airport transfer upsell */}
        <div className="rounded-2xl p-5 border border-blue-200 bg-blue-50 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Plane size={18} style={{ color: BLUE }} />
            </div>
            <div>
              <p className="text-sm font-bold text-blue-800" style={JK}>Don't forget your airport transfer</p>
              <p className="text-xs text-blue-600 mt-0.5" style={IN}>Seaplane from Ngurah Rai to the resort · $850/person · 30-min scenic flight</p>
            </div>
          </div>
          <button
            className="flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: BLUE, fontFamily: "'Inter', sans-serif" }}
          >
            Add Now
          </button>
        </div>

      </div>
    </div>
  );
}
