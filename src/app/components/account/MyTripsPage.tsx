import { useState } from 'react';
import { MapPin, Calendar, Users, ChevronRight, Download, Star, Sparkles, ArrowRight, Clock, CheckCircle, XCircle, AlertCircle, Plane, RotateCcw } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const JK = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const IN = { fontFamily: "'Inter', sans-serif" };

type TripStatus = 'confirmed' | 'pending' | 'cancelled' | 'completed';

interface Trip {
  id: string;
  hotel: string;
  location: string;
  country: string;
  image: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  roomType: string;
  nights: number;
  totalPrice: string;
  status: TripStatus;
  paymentStatus: string;
  bookingId: string;
  stars: number;
}

const upcomingTrips: Trip[] = [
  {
    id: '1',
    hotel: 'The St. Regis Maldives Vommuli Resort',
    location: 'Dhaalu Atoll',
    country: 'Maldives',
    image: 'https://images.unsplash.com/photo-1743356174397-d6da6f014f8f?w=800&q=80&fit=crop',
    checkIn: 'May 23, 2026',
    checkOut: 'May 30, 2026',
    guests: 2,
    roomType: 'Overwater Villa — Half Board',
    nights: 7,
    totalPrice: '$8,750',
    status: 'confirmed',
    paymentStatus: 'Paid',
    bookingId: 'SFW-20482',
    stars: 5,
  },
  {
    id: '2',
    hotel: 'Çırağan Palace Kempinski Istanbul',
    location: 'Beşiktaş, Bosphorus',
    country: 'Turkey',
    image: 'https://images.unsplash.com/photo-1514294393539-47d3b28b819d?w=800&q=80&fit=crop',
    checkIn: 'Jun 15, 2026',
    checkOut: 'Jun 20, 2026',
    guests: 2,
    roomType: 'Palace Room — Bosphorus View',
    nights: 5,
    totalPrice: '$4,200',
    status: 'confirmed',
    paymentStatus: 'Paid',
    bookingId: 'SFW-20533',
    stars: 5,
  },
];

const completedTrips: Trip[] = [
  {
    id: '3',
    hotel: 'Four Seasons Hotel Santorini',
    location: 'Imerovigli Caldera',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1629470035936-3296c3bd8237?w=800&q=80&fit=crop',
    checkIn: 'Apr 5, 2026',
    checkOut: 'Apr 10, 2026',
    guests: 2,
    roomType: 'Infinity Pool Suite',
    nights: 5,
    totalPrice: '$6,250',
    status: 'completed',
    paymentStatus: 'Paid',
    bookingId: 'SFW-19801',
    stars: 5,
  },
  {
    id: '4',
    hotel: 'Amangiri Desert Resort',
    location: 'Canyon Point',
    country: 'United States',
    image: 'https://images.unsplash.com/photo-1536031696538-924fe11c7037?w=800&q=80&fit=crop',
    checkIn: 'Feb 12, 2026',
    checkOut: 'Feb 17, 2026',
    guests: 2,
    roomType: 'Mesa Suite',
    nights: 5,
    totalPrice: '$9,100',
    status: 'completed',
    paymentStatus: 'Paid',
    bookingId: 'SFW-19204',
    stars: 5,
  },
];

const cancelledTrips: Trip[] = [
  {
    id: '5',
    hotel: 'Burj Al Arab Jumeirah',
    location: 'Jumeirah Beach',
    country: 'UAE',
    image: 'https://images.unsplash.com/photo-1609601540898-52ca92508901?w=800&q=80&fit=crop',
    checkIn: 'Mar 1, 2026',
    checkOut: 'Mar 7, 2026',
    guests: 2,
    roomType: 'One-Bedroom Suite',
    nights: 6,
    totalPrice: '$12,600',
    status: 'cancelled',
    paymentStatus: 'Refunded',
    bookingId: 'SFW-18992',
    stars: 5,
  },
];

const statusConfig: Record<TripStatus, { label: string; color: string; bg: string; icon: typeof CheckCircle }> = {
  confirmed: { label: 'Confirmed', color: '#15803D', bg: '#F0FDF4', icon: CheckCircle },
  pending: { label: 'Pending', color: '#92400E', bg: '#FFFBEB', icon: AlertCircle },
  cancelled: { label: 'Cancelled', color: '#B91C1C', bg: '#FEF2F2', icon: XCircle },
  completed: { label: 'Completed', color: '#1D4ED8', bg: '#EFF6FF', icon: CheckCircle },
};

function TripCard({ trip, onView }: { trip: Trip; onView: () => void }) {
  const s = statusConfig[trip.status];
  const StatusIcon = s.icon;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="sm:w-52 lg:w-64 h-48 sm:h-auto relative flex-shrink-0 overflow-hidden">
          <ImageWithFallback
            src={trip.image}
            alt={trip.hotel}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3">
            <div className="flex">
              {Array.from({ length: trip.stars }).map((_, i) => (
                <Star key={i} size={10} fill="#F59E0B" className="text-amber-400" />
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            {/* Top row */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-900 text-base leading-tight mb-1" style={JK}>
                  {trip.hotel}
                </h3>
                <div className="flex items-center gap-1.5">
                  <MapPin size={12} className="text-slate-400 flex-shrink-0" />
                  <span className="text-sm text-slate-500" style={IN}>
                    {trip.location}, {trip.country}
                  </span>
                </div>
              </div>
              {/* Status chip */}
              <div
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold flex-shrink-0"
                style={{ backgroundColor: s.bg, color: s.color, fontFamily: "'Inter', sans-serif" }}
              >
                <StatusIcon size={11} />
                {s.label}
              </div>
            </div>

            {/* Trip details */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
              <div>
                <p className="text-xs text-slate-400 mb-0.5" style={IN}>Check-in</p>
                <p className="text-sm font-semibold text-slate-700" style={JK}>{trip.checkIn}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-0.5" style={IN}>Check-out</p>
                <p className="text-sm font-semibold text-slate-700" style={JK}>{trip.checkOut}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-0.5" style={IN}>Guests</p>
                <div className="flex items-center gap-1">
                  <Users size={12} className="text-slate-400" />
                  <p className="text-sm font-semibold text-slate-700" style={JK}>{trip.guests} guests</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-xs text-slate-600" style={IN}>
                <Clock size={11} />
                {trip.nights} nights
              </div>
              <div className="text-xs text-slate-500" style={IN}>{trip.roomType}</div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
            <div>
              <p className="text-xs text-slate-400" style={IN}>Total · Booking #{trip.bookingId}</p>
              <p className="text-base font-bold text-slate-900" style={JK}>{trip.totalPrice}</p>
            </div>
            <div className="flex items-center gap-2">
              {trip.status === 'completed' && (
                <button
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all"
                  style={IN}
                >
                  <RotateCcw size={12} />
                  Book Again
                </button>
              )}
              {trip.status !== 'cancelled' && (
                <button
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all"
                  style={IN}
                >
                  <Download size={12} />
                  Voucher
                </button>
              )}
              <button
                onClick={onView}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: '#1B4FD8', fontFamily: "'Inter', sans-serif" }}
              >
                View Details
                <ChevronRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const tabs = [
  { id: 'upcoming', label: 'Upcoming', count: 2 },
  { id: 'completed', label: 'Completed', count: 2 },
  { id: 'cancelled', label: 'Cancelled', count: 1 },
];

export function MyTripsPage() {
  const { navigate } = useNavigation();
  const [activeTab, setActiveTab] = useState('upcoming');

  const currentTrips = activeTab === 'upcoming' ? upcomingTrips : activeTab === 'completed' ? completedTrips : cancelledTrips;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8FAFC', paddingTop: 72 }}>
      {/* Hero banner */}
      <div
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E3A5F 50%, #1B4FD8 100%)' }}
      >
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1609601540898-52ca92508901?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-cyan-400 text-xs font-bold tracking-widest uppercase mb-2" style={IN}>
                My Account
              </p>
              <h1 className="text-3xl font-bold text-white mb-3" style={JK}>
                My Trips
              </h1>
              <p className="text-white/70 text-sm" style={IN}>
                Manage all your bookings, download vouchers, and plan future escapes.
              </p>
            </div>
            {/* Stats row */}
            <div className="hidden md:flex items-center gap-6">
              {[
                { value: '2', label: 'Upcoming' },
                { value: '12', label: 'Completed' },
                { value: '1', label: 'Cancelled' },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="text-white text-2xl font-bold" style={JK}>{value}</p>
                  <p className="text-white/50 text-xs" style={IN}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Loyalty bar */}
          <div className="mt-8 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 inline-flex items-center gap-4">
            <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center">
              <Star size={16} className="text-amber-400" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold" style={JK}>Gold Member · 14,250 points</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-32 h-1.5 rounded-full bg-white/20">
                  <div className="h-full rounded-full bg-amber-400" style={{ width: '65%' }} />
                </div>
                <span className="text-white/60 text-xs" style={IN}>5,750 pts to Platinum</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Tab navigation */}
        <div className="flex items-center gap-1 mb-8 border-b border-slate-200">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold transition-all border-b-2 -mb-px ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-700'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
              style={IN}
            >
              {tab.label}
              <span
                className={`px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Trip list */}
          <div className="flex-1 space-y-5">
            {currentTrips.map(trip => (
              <TripCard
                key={trip.id}
                trip={trip}
                onView={() => navigate('booking-details')}
              />
            ))}

            {currentTrips.length === 0 && (
              <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                  <Calendar size={28} className="text-slate-400" />
                </div>
                <p className="text-slate-700 font-semibold text-base mb-1" style={JK}>No trips found</p>
                <p className="text-slate-400 text-sm" style={IN}>Start planning your next luxury escape.</p>
                <button
                  className="mt-5 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: '#1B4FD8', fontFamily: "'Inter', sans-serif" }}
                >
                  Explore Hotels
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 space-y-5">
            {/* AI Recommendation banner */}
            <div className="rounded-2xl p-5 border border-cyan-200 overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #ECFEFF 0%, #EFF6FF 100%)' }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-cyan-100 flex items-center justify-center">
                  <Sparkles size={14} className="text-cyan-600" />
                </div>
                <span className="text-xs font-bold text-cyan-700 uppercase tracking-wide" style={IN}>
                  AI Recommendation
                </span>
              </div>
              <p className="text-slate-800 font-semibold text-sm mb-1" style={JK}>
                Ready for your next trip, James?
              </p>
              <p className="text-slate-600 text-xs leading-relaxed mb-4" style={IN}>
                Based on your love of overwater villas, we've found exceptional deals in Bora Bora and the Seychelles for July.
              </p>
              <button
                className="flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-800 transition-colors"
                style={IN}
              >
                Explore recommendations
                <ArrowRight size={12} />
              </button>
            </div>

            {/* Quick actions */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <h3 className="font-bold text-slate-900 text-sm mb-4" style={JK}>Quick Actions</h3>
              <div className="space-y-2">
                {[
                  { icon: Plane, label: 'Add Airport Transfer', desc: 'For upcoming Maldives trip' },
                  { icon: Download, label: 'Download Vouchers', desc: 'All upcoming bookings' },
                  { icon: Calendar, label: 'Add to Calendar', desc: 'Sync your upcoming stays' },
                ].map(({ icon: Icon, label, desc }) => (
                  <button
                    key={label}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-all text-left"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <Icon size={14} style={{ color: '#1B4FD8' }} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800" style={JK}>{label}</p>
                      <p className="text-xs text-slate-400" style={IN}>{desc}</p>
                    </div>
                    <ChevronRight size={14} className="text-slate-300 ml-auto" />
                  </button>
                ))}
              </div>
            </div>

            {/* Promo offer */}
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1622779536320-bb5f5b501a06?w=600&q=80&fit=crop"
                alt="Maldives offer"
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold text-white" style={{ backgroundColor: '#1B4FD8', fontFamily: "'Inter', sans-serif" }}>
                    Members Only
                  </span>
                </div>
                <p className="text-slate-800 font-bold text-sm" style={JK}>Maldives Flash Sale</p>
                <p className="text-slate-500 text-xs mt-1" style={IN}>Up to 35% off overwater villas · Jun–Aug 2026</p>
                <button
                  className="mt-3 w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold transition-all hover:opacity-90 text-white"
                  style={{ backgroundColor: '#1B4FD8', fontFamily: "'Inter', sans-serif" }}
                >
                  View Offer <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
