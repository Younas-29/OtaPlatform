import { useState } from 'react';
import {
  ChevronLeft, ChevronRight, Users, Calendar,
  Check, Shield, Coffee, Wifi, Waves, Dumbbell, Award,
  ArrowRight, X, MapPin, Sparkles,
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const JK = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const IN = { fontFamily: "'Inter', sans-serif" };
const BLUE = '#1B4FD8';

const roomGallery = [
  'https://images.unsplash.com/photo-1776761603930-e4509e386fbf?w=1200&q=85&fit=crop',
  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=700&q=80&fit=crop',
  'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=700&q=80&fit=crop',
  'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=700&q=80&fit=crop',
  'https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=700&q=80&fit=crop',
];

const roomAmenities = [
  { icon: Wifi, label: 'High-Speed WiFi', desc: 'Complimentary throughout' },
  { icon: Waves, label: 'Private Plunge Pool', desc: '4m × 2m infinity pool' },
  { icon: Coffee, label: 'In-Villa Dining', desc: 'Private chef on request' },
  { icon: Award, label: 'Butler Service', desc: '24/7 dedicated butler' },
  { icon: Dumbbell, label: 'Fitness Access', desc: 'Full resort gym included' },
  { icon: Sparkles, label: 'Spa Credits', desc: '$100 credit per stay' },
  { icon: Check, label: 'Turndown Service', desc: 'Nightly with amenities' },
  { icon: Coffee, label: 'Nespresso Machine', desc: 'Premium pods included' },
];

const upgradeOptions = [
  {
    name: 'Beach Pool Villa',
    diff: '+$360/night',
    size: '120 m²',
    highlight: 'Private beachfront access + Infinity Pool',
    image: 'https://images.unsplash.com/photo-1709187516056-d4929b67e89f?w=500&q=80&fit=crop',
  },
  {
    name: 'Two-Bedroom Retreat',
    diff: '+$1,210/night',
    size: '190 m²',
    highlight: 'Dual villas · Panoramic ocean views',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=500&q=80&fit=crop',
  },
];

export function RoomDetailPage() {
  const { navigate } = useNavigation();
  const [activeGallery, setActiveGallery] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [guests, setGuests] = useState(2);

  const nights = 7;
  const pricePerNight = 890;
  const originalPrice = 1150;
  const taxes = Math.round(pricePerNight * nights * 0.12);
  const memberDiscount = 350;
  const total = pricePerNight * nights + taxes - memberDiscount;

  return (
    <div className="min-h-screen bg-white" style={{ paddingTop: 72 }}>
      {/* Breadcrumb */}
      <div className="border-b border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-2 text-sm flex-wrap" style={IN}>
          <button onClick={() => navigate('home')} className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
            <ChevronLeft size={14} />Hotels
          </button>
          <span className="text-slate-300">/</span>
          <button onClick={() => navigate('hotel-detail')} className="text-blue-600 hover:text-blue-700 font-medium">
            Four Seasons Bali
          </button>
          <span className="text-slate-300">/</span>
          <button onClick={() => { navigate('hotel-detail'); }} className="text-blue-600 hover:text-blue-700 font-medium">
            Rooms
          </button>
          <span className="text-slate-300">/</span>
          <span className="text-slate-700 font-medium">Overwater Grand Villa</span>
        </div>
      </div>

      {/* Room Gallery */}
      <div className="bg-slate-900 relative" style={{ height: '52vh' }}>
        <ImageWithFallback src={roomGallery[activeGallery]} alt="Room gallery" className="w-full h-full object-cover opacity-95" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.35))' }} />

        <button
          onClick={() => setActiveGallery(p => (p - 1 + roomGallery.length) % roomGallery.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/30 transition-all"
        >
          <ChevronLeft size={18} className="text-white" />
        </button>
        <button
          onClick={() => setActiveGallery(p => (p + 1) % roomGallery.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/30 transition-all"
        >
          <ChevronRight size={18} className="text-white" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {roomGallery.map((_, i) => (
            <button key={i} onClick={() => setActiveGallery(i)} className={`rounded-full transition-all ${i === activeGallery ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/50'}`} />
          ))}
        </div>

        <div className="absolute bottom-4 right-4 flex gap-2">
          {roomGallery.slice(1, 4).map((img, i) => (
            <button key={i} onClick={() => setActiveGallery(i + 1)} className="w-16 h-12 rounded-lg overflow-hidden border-2 border-white/30 hover:border-white transition-all">
              <ImageWithFallback src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
          <button onClick={() => setGalleryOpen(true)} className="w-16 h-12 rounded-lg bg-black/60 border-2 border-white/30 flex items-center justify-center text-white text-xs font-bold hover:bg-black/70 transition-all" style={IN}>
            +{roomGallery.length - 4}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* LEFT: Room detail content */}
          <div className="flex-1 min-w-0 space-y-8">

            {/* Room header */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold text-green-700 bg-green-50 border border-green-200 flex items-center gap-1" style={IN}>
                  <Check size={10} />Breakfast Included
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold text-green-700 bg-green-50 border border-green-200 flex items-center gap-1" style={IN}>
                  <Shield size={10} />Free cancellation
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold text-cyan-700 bg-cyan-50 border border-cyan-200 flex items-center gap-1" style={IN}>
                  <Sparkles size={10} />AI Recommended
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight mb-2" style={JK}>
                Overwater Grand Villa
              </h1>
              <div className="flex items-center gap-1.5">
                <MapPin size={13} className="text-slate-400" />
                <span className="text-sm text-slate-500" style={IN}>Four Seasons Resort Bali at Sayan · Ubud, Bali</span>
              </div>

              {/* Key facts */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
                {[
                  { label: 'Room Size', value: '85 m²', emoji: '⬜' },
                  { label: 'Max Guests', value: '2 Adults', emoji: '👥' },
                  { label: 'Bed Type', value: '1 King Bed', emoji: '🛏️' },
                  { label: 'View', value: 'Lagoon & Ocean', emoji: '🌊' },
                ].map(({ label, value, emoji }) => (
                  <div key={label} className="p-3 rounded-xl border border-slate-100 bg-slate-50 text-center">
                    <span className="text-xl">{emoji}</span>
                    <p className="text-xs font-bold text-slate-800 mt-1.5" style={JK}>{value}</p>
                    <p className="text-xs text-slate-400 mt-0.5" style={IN}>{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Insight */}
            <div className="flex items-start gap-3 p-4 rounded-2xl border border-cyan-200" style={{ background: 'linear-gradient(135deg, #ECFEFF, #EFF6FF)' }}>
              <Sparkles size={15} className="text-cyan-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-slate-800" style={JK}>Why guests love this room</p>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed" style={IN}>
                  The Overwater Grand Villa is the most booked room at this resort for couples. The glass floor panel directly above the lagoon and private plunge pool with infinity edges are the #1 highlights. <strong>97% of guests</strong> in this villa rated their stay as "Exceptional."
                </p>
              </div>
            </div>

            {/* About This Room */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3" style={JK}>About This Room</h2>
              <p className="text-slate-600 leading-relaxed text-sm" style={IN}>
                The Overwater Grand Villa sits directly above the crystal-clear Ayung River lagoon, offering an unparalleled immersive experience. Spanning 85 square meters, the villa features a glass floor panel that reveals vibrant marine life below, an expansive outdoor deck, and a private infinity plunge pool that appears to merge seamlessly with the surrounding water.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm mt-3" style={IN}>
                Interiors are crafted with natural Balinese materials — teak, bamboo, and volcanic stone — blended with world-class luxury furnishings. Your dedicated butler is available around the clock to arrange in-villa dining, spa treatments, excursions, and any bespoke request.
              </p>
            </div>

            {/* What's Included */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4" style={JK}>What's Included</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { emoji: '🍳', title: 'Daily Breakfast for 2', desc: 'Full à la carte at Sundara restaurant' },
                  { emoji: '🛁', title: 'Turndown Service', desc: 'Nightly with premium bath amenities' },
                  { emoji: '☕', title: 'Minibar & Nespresso', desc: 'Fully stocked, replenished daily' },
                  { emoji: '🌊', title: 'Non-motorized Water Sports', desc: 'Kayaking, snorkeling equipment' },
                  { emoji: '🧘', title: 'Daily Yoga Class', desc: 'Sunrise yoga with certified instructor' },
                  { emoji: '🚗', title: 'Resort Buggy Transfer', desc: 'Complimentary within resort grounds' },
                ].map(({ emoji, title, desc }) => (
                  <div key={title} className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50">
                    <span className="text-xl flex-shrink-0">{emoji}</span>
                    <div>
                      <p className="text-sm font-semibold text-slate-800" style={JK}>{title}</p>
                      <p className="text-xs text-slate-500 mt-0.5" style={IN}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Room Amenities */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4" style={JK}>Room Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {roomAmenities.map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 text-center">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-2">
                      <Icon size={14} style={{ color: BLUE }} />
                    </div>
                    <p className="text-xs font-bold text-slate-800" style={JK}>{label}</p>
                    <p className="text-xs text-slate-400 mt-0.5" style={IN}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bed Configuration */}
            <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50">
              <h2 className="font-bold text-slate-900 mb-3" style={JK}>Bed Configuration</h2>
              <div className="flex items-center gap-4">
                <span className="text-3xl">🛏️</span>
                <div>
                  <p className="font-bold text-slate-800" style={JK}>1 Super King Bed</p>
                  <p className="text-sm text-slate-500 mt-0.5" style={IN}>180 × 200 cm · Premium mattress with custom bedding · Pillow menu available</p>
                </div>
              </div>
            </div>

            {/* Cancellation Policy */}
            <div className="p-5 rounded-2xl border border-green-200 bg-green-50">
              <div className="flex items-center gap-2 mb-3">
                <Shield size={16} className="text-green-600" />
                <h2 className="font-bold text-green-800" style={JK}>Cancellation Policy</h2>
              </div>
              <div className="space-y-2.5">
                {[
                  { text: 'Free cancellation until May 19, 2026 (4 days before check-in)', bold: true },
                  { text: 'Cancellation after May 19 incurs the first night charge only' },
                  { text: 'No-show or early departure: full remaining stay is charged' },
                  { text: 'Modifications subject to availability — no modification fees apply' },
                ].map(({ text, bold }) => (
                  <div key={text} className="flex items-start gap-2">
                    <Check size={12} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <p className={`text-xs leading-relaxed ${bold ? 'font-bold text-green-800' : 'text-green-700'}`} style={IN}>{text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Upgrade Options */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4" style={JK}>Consider an Upgrade</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {upgradeOptions.map(opt => (
                  <div
                    key={opt.name}
                    className="rounded-2xl border border-slate-200 overflow-hidden hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer group"
                    onClick={() => navigate('room-detail')}
                  >
                    <div className="h-32 overflow-hidden">
                      <ImageWithFallback
                        src={opt.image}
                        alt={opt.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-bold text-slate-800" style={JK}>{opt.name}</p>
                          <p className="text-xs text-slate-500 mt-0.5" style={IN}>{opt.size} · {opt.highlight}</p>
                        </div>
                        <span className="text-xs font-bold text-blue-600 whitespace-nowrap flex-shrink-0" style={IN}>{opt.diff}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT: Reserve This Room widget */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl sticky top-24 overflow-hidden">

              {/* Price header */}
              <div className="p-5 border-b border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-slate-400" style={IN}>Overwater Grand Villa</p>
                  <span className="text-xs font-bold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full" style={IN}>Free cancellation</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-slate-400 line-through" style={IN}>${originalPrice.toLocaleString()}</span>
                  <span className="text-2xl font-bold text-slate-900" style={JK}>${pricePerNight.toLocaleString()}</span>
                  <span className="text-slate-400 text-sm" style={IN}>/ night</span>
                </div>
                <p className="text-xs font-semibold mt-1" style={{ color: BLUE, fontFamily: "'Inter', sans-serif" }}>↓ 23% member rate automatically applied</p>
              </div>

              <div className="p-4 space-y-3">
                {/* Dates */}
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Check-in', value: 'May 23, 2026', sub: 'From 3:00 PM' },
                    { label: 'Check-out', value: 'May 30, 2026', sub: 'Until 12:00 PM' },
                  ].map(({ label, value, sub }) => (
                    <div key={label} className="p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:border-blue-300 transition-all">
                      <div className="flex items-center gap-1 mb-1">
                        <Calendar size={10} className="text-slate-400" />
                        <p className="text-xs text-slate-400" style={IN}>{label}</p>
                      </div>
                      <p className="text-xs font-bold text-slate-800" style={JK}>{value}</p>
                      <p className="text-xs text-slate-400 mt-0.5" style={IN}>{sub}</p>
                    </div>
                  ))}
                </div>

                {/* Guests */}
                <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50 hover:border-blue-300 transition-all cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Users size={13} className="text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-400" style={IN}>Guests · Max 2</p>
                      <p className="text-xs font-bold text-slate-800" style={JK}>{guests} adults · {nights} nights</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:border-blue-300 hover:text-blue-600 transition-all text-sm">−</button>
                    <span className="text-sm font-bold text-slate-700 w-4 text-center" style={JK}>{guests}</span>
                    <button onClick={() => setGuests(Math.min(2, guests + 1))} className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:border-blue-300 hover:text-blue-600 transition-all text-sm">+</button>
                  </div>
                </div>

                {/* Price breakdown */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2.5">
                  <div className="flex justify-between text-xs" style={IN}>
                    <span className="text-slate-500">${pricePerNight.toLocaleString()} × {nights} nights</span>
                    <span className="font-semibold text-slate-700">${(pricePerNight * nights).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs" style={IN}>
                    <span className="text-slate-500">Taxes & fees (12%)</span>
                    <span className="font-semibold text-slate-700">${taxes.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs font-semibold text-green-600" style={IN}>
                    <span>Safawell member discount</span>
                    <span>−${memberDiscount.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-slate-200 pt-2.5 flex justify-between">
                    <span className="text-sm font-bold text-slate-900" style={JK}>Total</span>
                    <div className="text-right">
                      <span className="text-sm font-bold text-slate-900" style={JK}>${total.toLocaleString()}</span>
                      <p className="text-xs text-slate-400 mt-0.5" style={IN}>for {nights} nights · {guests} guests</p>
                    </div>
                  </div>
                </div>

                {/* Reserve CTA — only on this page */}
                <button
                  onClick={() => navigate('checkout')}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-bold text-sm transition-all hover:opacity-90 active:scale-[0.98]"
                  style={{
                    backgroundColor: BLUE,
                    fontFamily: "'Inter', sans-serif",
                    boxShadow: '0 4px 16px rgba(27,79,216,0.35)',
                  }}
                >
                  Reserve This Room
                  <ArrowRight size={16} />
                </button>

                <p className="text-xs text-center text-slate-400" style={IN}>No payment charged now · Reserve for free</p>
              </div>

              {/* Trust signals */}
              <div className="px-5 pb-5 space-y-2.5 border-t border-slate-100 pt-4">
                {[
                  { text: 'Free cancellation until May 19, 2026', icon: Shield, color: 'text-green-600' },
                  { text: 'Best price guaranteed by Safawell', icon: Check, color: 'text-blue-600' },
                  { text: 'Instant confirmation · No hidden fees', icon: Check, color: 'text-slate-600' },
                ].map(({ text, icon: Icon, color }) => (
                  <div key={text} className={`flex items-center gap-2 text-xs font-medium ${color}`} style={IN}>
                    <Icon size={12} className="flex-shrink-0" />{text}
                  </div>
                ))}
              </div>
            </div>

            {/* Back to rooms */}
            <button
              onClick={() => navigate('hotel-detail')}
              className="mt-3 w-full py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
              style={IN}
            >
              <ChevronLeft size={14} />Back to All Rooms
            </button>
          </div>

        </div>
      </div>

      {/* Gallery modal */}
      {galleryOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setGalleryOpen(false)}>
          <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
            <X size={18} className="text-white" />
          </button>
          <div className="w-full max-w-5xl" onClick={e => e.stopPropagation()}>
            <ImageWithFallback src={roomGallery[activeGallery]} alt="Gallery" className="w-full max-h-[80vh] object-contain rounded-xl" />
            <div className="flex justify-center gap-3 mt-4">
              {roomGallery.map((img, i) => (
                <button key={i} onClick={() => setActiveGallery(i)} className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${i === activeGallery ? 'border-white' : 'border-transparent opacity-60'}`}>
                  <ImageWithFallback src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
