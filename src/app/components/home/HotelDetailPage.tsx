import { useState } from 'react';
import {
  MapPin, Star, Wifi, Coffee, Dumbbell, Waves,
  ChevronLeft, ChevronRight, Users, Calendar, Sparkles,
  Check, Heart, Share2, Award, Plane, ArrowRight, X,
  Shield, Utensils, Car, Briefcase, Compass, Camera, ChevronDown,
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const JK = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const IN = { fontFamily: "'Inter', sans-serif" };
const BLUE = '#1B4FD8';

type Tab = 'overview' | 'rooms' | 'amenities' | 'location' | 'reviews';

const galleryImages = [
  'https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=1200&q=85&fit=crop',
  'https://images.unsplash.com/photo-1776761603930-e4509e386fbf?w=700&q=80&fit=crop',
  'https://images.unsplash.com/photo-1709187516056-d4929b67e89f?w=700&q=80&fit=crop',
  'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=700&q=80&fit=crop',
  'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=700&q=80&fit=crop',
];

const roomInventory = [
  {
    id: 'deluxe-garden',
    name: 'Deluxe Garden Room',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=700&q=80&fit=crop',
    size: '55 m²', maxGuests: 2, beds: '1 King bed', view: 'Garden & Pool',
    meal: 'Room Only', mealStyle: 'text-slate-600 bg-slate-100',
    cancellation: 'Free cancellation until May 19', refundable: true,
    pricePerNight: 450, originalPrice: 580,
    features: ['Garden Terrace', 'Rain Shower', 'Free WiFi', 'Mini Bar'],
    availability: 3, aiPick: false,
  },
  {
    id: 'overwater-villa',
    name: 'Overwater Grand Villa',
    image: 'https://images.unsplash.com/photo-1776761603930-e4509e386fbf?w=700&q=80&fit=crop',
    size: '85 m²', maxGuests: 2, beds: '1 King bed', view: 'Lagoon & Ocean',
    meal: 'Breakfast Included', mealStyle: 'text-green-700 bg-green-50 border border-green-200',
    cancellation: 'Free cancellation until May 19', refundable: true,
    pricePerNight: 890, originalPrice: 1150,
    features: ['Private Plunge Pool', 'Glass Floor Panel', 'Outdoor Deck', 'Butler Service'],
    availability: 2, aiPick: true,
  },
  {
    id: 'beach-pool-villa',
    name: 'Beach Pool Villa',
    image: 'https://images.unsplash.com/photo-1709187516056-d4929b67e89f?w=700&q=80&fit=crop',
    size: '120 m²', maxGuests: 2, beds: '1 King bed', view: 'Beachfront',
    meal: 'Half Board', mealStyle: 'text-amber-700 bg-amber-50 border border-amber-200',
    cancellation: 'Free cancellation until May 17', refundable: true,
    pricePerNight: 1250, originalPrice: null,
    features: ['Private Beach', 'Infinity Pool', 'Indoor Shower', 'Living Room'],
    availability: 1, aiPick: false,
  },
  {
    id: 'overwater-retreat',
    name: 'Two-Bedroom Retreat',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=700&q=80&fit=crop',
    size: '190 m²', maxGuests: 4, beds: '2 King beds', view: 'Panoramic Ocean',
    meal: 'All Inclusive', mealStyle: 'text-purple-700 bg-purple-50 border border-purple-200',
    cancellation: 'Non-refundable', refundable: false,
    pricePerNight: 2100, originalPrice: 2500,
    features: ['2 Private Pools', 'Separate Living Areas', 'Outdoor Dining', 'Dedicated Butler'],
    availability: 1, aiPick: false,
  },
];

const amenityCategories = [
  {
    title: 'Wellness & Spa', icon: Sparkles, color: '#7C3AED', bg: '#F5F3FF',
    desc: 'Award-winning spa with transformative treatments',
    items: ['6 private treatment rooms', 'Hydrotherapy circuit', 'Yoga pavilion', 'Meditation garden', 'Fitness center 24hrs', 'Personal training'],
  },
  {
    title: 'Dining & Bar', icon: Utensils, color: '#D97706', bg: '#FFFBEB',
    desc: 'World-class culinary experiences across four venues',
    items: ['Sundara Beach Restaurant', 'Jati Bar & Terrace', 'River Café', 'In-villa private dining', 'Cooking classes', 'Afternoon tea'],
  },
  {
    title: 'Pool & Beach', icon: Waves, color: '#0891B2', bg: '#ECFEFF',
    desc: 'Stunning aquatic facilities with lagoon access',
    items: ['2 outdoor infinity pools', 'Adults-only quiet pool', "Children's pool", 'Private beach', 'Snorkeling equipment', 'Water sports'],
  },
  {
    title: 'Concierge & Services', icon: Award, color: '#059669', bg: '#F0FDF4',
    desc: 'Personalised service from arrival to departure',
    items: ['24/7 Butler service', 'Airport seaplane transfers', 'Dolphin sunset cruises', 'Temple visits', 'Island hopping', 'Personal shopper'],
  },
  {
    title: 'Connectivity & Tech', icon: Wifi, color: BLUE, bg: '#EFF6FF',
    desc: 'Seamless connectivity throughout the resort',
    items: ['Complimentary high-speed WiFi', 'Smart room controls', '65" 4K Smart TV', 'Nespresso machine', 'In-room tablet', 'EV charging'],
  },
  {
    title: 'Business & Events', icon: Briefcase, color: '#DC2626', bg: '#FEF2F2',
    desc: 'Premium event and meeting facilities',
    items: ['Meeting rooms (up to 50 pax)', 'Event lawn', 'AV equipment', 'Secretarial services', 'Private dining rooms', 'Corporate rates'],
  },
];

const nearbyAttractions = [
  { name: 'Ubud Royal Palace', distance: '1.2 km', type: 'Culture', time: '5 min', icon: '🏛️' },
  { name: 'Tegallalang Rice Terraces', distance: '4.5 km', type: 'Nature', time: '12 min', icon: '🌾' },
  { name: 'Sacred Monkey Forest', distance: '2.1 km', type: 'Nature', time: '7 min', icon: '🌿' },
  { name: 'Ubud Art Market', distance: '1.5 km', type: 'Shopping', time: '6 min', icon: '🎨' },
  { name: 'Tirta Empul Temple', distance: '6.0 km', type: 'Culture', time: '15 min', icon: '⛩️' },
  { name: 'Ngurah Rai Airport (DPS)', distance: '36 km', type: 'Transport', time: '55 min', icon: '✈️' },
];

const reviewsData = [
  {
    name: 'Sophie M.', country: 'France', flag: '🇫🇷', rating: 10, date: 'April 2026',
    type: 'Couple', typeColor: 'text-pink-700 bg-pink-50',
    comment: 'Absolutely flawless. The overwater villa exceeded every expectation. Waking up to the turquoise lagoon every morning is something I will never forget. The butler service was impeccable.',
    avatar: 'SM', photos: 2, verified: true,
  },
  {
    name: 'James K.', country: 'United Kingdom', flag: '🇬🇧', rating: 9.8, date: 'March 2026',
    type: 'Business', typeColor: 'text-blue-700 bg-blue-50',
    comment: 'Incredible resort. The snorkeling directly from the villa deck is phenomenal. Staff remembered every preference without being asked. True luxury at its finest.',
    avatar: 'JK', photos: 0, verified: true,
  },
  {
    name: 'Aisha R.', country: 'UAE', flag: '🇦🇪', rating: 10, date: 'March 2026',
    type: 'Honeymoon', typeColor: 'text-red-700 bg-red-50',
    comment: 'Honeymoon stay — magical in every sense. The sunset dolphin cruise arranged by the concierge was a highlight. Room decoration was breathtaking. Will return.',
    avatar: 'AR', photos: 4, verified: true,
  },
  {
    name: 'Chen W.', country: 'Singapore', flag: '🇸🇬', rating: 9.5, date: 'February 2026',
    type: 'Family', typeColor: 'text-green-700 bg-green-50',
    comment: 'Brought the family for a special celebration. The kids loved the marine activities and staff went above and beyond. The two-bedroom villa gave us ample space and privacy.',
    avatar: 'CW', photos: 3, verified: true,
  },
  {
    name: 'Oliver T.', country: 'Australia', flag: '🇦🇺', rating: 9.7, date: 'January 2026',
    type: 'Solo', typeColor: 'text-slate-700 bg-slate-100',
    comment: 'As a solo traveler, I was welcomed as warmly as any couple or family. The yoga and meditation sessions at dawn were transformative. The food quality is Michelin-level.',
    avatar: 'OT', photos: 1, verified: true,
  },
];

export function HotelDetailPage() {
  const { navigate } = useNavigation();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [activeGallery, setActiveGallery] = useState(0);
  const [guests, setGuests] = useState(2);
  const [wishlist, setWishlist] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [compareRooms, setCompareRooms] = useState<string[]>([]);
  const [reviewFilter, setReviewFilter] = useState('all');
  const nights = 7;

  const toggleCompare = (id: string) => {
    setCompareRooms(prev =>
      prev.includes(id) ? prev.filter(r => r !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  // ─── OVERVIEW CONTENT ────────────────────────────────────────────────────────
  const renderOverviewContent = () => (
    <div className="space-y-8">
      {/* About */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-3" style={JK}>About the Resort</h2>
        <p className="text-slate-600 leading-relaxed text-sm" style={IN}>
          Perched atop the Ayung River gorge in Ubud, the Four Seasons Resort Bali at Sayan is one of the world's most celebrated retreats. Inspired by Bali's natural landscape and spiritual traditions, the resort offers an extraordinary immersion in Balinese culture set within a breathtaking jungle sanctuary.
        </p>
        <p className="text-slate-600 leading-relaxed text-sm mt-3" style={IN}>
          Guests enjoy world-class dining at Sundara and Jati Bar, transformative spa journeys at the renowned Spa at Four Seasons, and a rich activity program from rice-field treks to temple visits and traditional cooking classes.
        </p>
      </div>

      {/* AI Insight */}
      <div className="flex items-start gap-3 p-4 rounded-2xl border border-cyan-200" style={{ background: 'linear-gradient(135deg, #ECFEFF, #EFF6FF)' }}>
        <Sparkles size={15} className="text-cyan-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-slate-800" style={JK}>Safawell AI Insight</p>
          <p className="text-xs text-slate-600 mt-0.5 leading-relaxed" style={IN}>
            This property is ranked <strong>#1 in Bali for couples</strong> and is especially popular for honeymoons. 94% of recent guests rated their stay as "Exceptional." Best rooms book out 6 weeks in advance — we recommend the Overwater Grand Villa starting from $890/night.
          </p>
        </div>
      </div>

      {/* Amenities Highlights */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900" style={JK}>Highlights</h2>
          <button onClick={() => setActiveTab('amenities')} className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1" style={IN}>
            All amenities <ArrowRight size={13} />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: Sparkles, label: 'Luxury Spa' },
            { icon: Waves, label: 'Infinity Pool' },
            { icon: Utensils, label: 'Fine Dining' },
            { icon: Dumbbell, label: 'Fitness Center' },
            { icon: Award, label: 'Butler Service' },
            { icon: Wifi, label: 'Free WiFi' },
            { icon: Plane, label: 'Airport Transfer' },
            { icon: Check, label: 'Concierge 24/7' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-100 bg-slate-50">
              <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                <Icon size={13} style={{ color: BLUE }} />
              </div>
              <span className="text-xs font-semibold text-slate-700" style={JK}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Rooms Preview */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900" style={JK}>Featured Rooms</h2>
          <button onClick={() => setActiveTab('rooms')} className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1" style={IN}>
            View all rooms <ArrowRight size={13} />
          </button>
        </div>
        <div className="space-y-3">
          {roomInventory.slice(1, 3).map(room => (
            <div
              key={room.id}
              className="flex items-center gap-4 p-3 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all cursor-pointer"
              onClick={() => setActiveTab('rooms')}
            >
              <div className="w-24 h-16 rounded-xl overflow-hidden flex-shrink-0">
                <ImageWithFallback src={room.image} alt={room.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-800" style={JK}>{room.name}</p>
                <p className="text-xs text-slate-500 mt-0.5" style={IN}>{room.size} · {room.beds} · {room.view}</p>
                <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold ${room.mealStyle}`} style={IN}>{room.meal}</span>
              </div>
              <div className="text-right flex-shrink-0">
                {room.originalPrice && <p className="text-xs text-slate-400 line-through" style={IN}>${room.originalPrice}</p>}
                <p className="text-base font-bold text-slate-900" style={JK}>${room.pricePerNight}</p>
                <p className="text-xs text-slate-400" style={IN}>/night</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Location Preview */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900" style={JK}>Location</h2>
          <button onClick={() => setActiveTab('location')} className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1" style={IN}>
            View map <ArrowRight size={13} />
          </button>
        </div>
        <div className="rounded-2xl overflow-hidden border border-slate-100">
          <div className="h-36 relative flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #DBEAFE 0%, #BAE6FD 50%, #A7F3D0 100%)' }}>
            <div className="text-center">
              <MapPin size={28} style={{ color: BLUE }} className="mx-auto mb-1" />
              <p className="text-sm font-bold text-slate-700" style={JK}>Ubud, Bali, Indonesia</p>
              <p className="text-xs text-slate-500 mt-0.5" style={IN}>Click to explore map</p>
            </div>
          </div>
          <div className="p-4 grid grid-cols-3 gap-3">
            {[
              { label: 'Airport', value: '36 km', sub: '55 min drive' },
              { label: 'City Center', value: '1.5 km', sub: '5 min drive' },
              { label: 'Beaches', value: '25 km', sub: '40 min drive' },
            ].map(({ label, value, sub }) => (
              <div key={label} className="text-center">
                <p className="text-sm font-bold text-slate-800" style={JK}>{value}</p>
                <p className="text-xs text-slate-500" style={IN}>{label}</p>
                <p className="text-xs text-slate-400" style={IN}>{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Review Summary */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900" style={JK}>Guest Reviews</h2>
          <button onClick={() => setActiveTab('reviews')} className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1" style={IN}>
            All 2,840 reviews <ArrowRight size={13} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            { label: 'Location', score: 9.7 },
            { label: 'Cleanliness', score: 9.9 },
            { label: 'Service', score: 9.8 },
            { label: 'Value', score: 9.1 },
          ].map(({ label, score }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="text-xs text-slate-500 w-20 flex-shrink-0" style={IN}>{label}</span>
              <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${score * 10}%`, backgroundColor: BLUE }} />
              </div>
              <span className="text-xs font-bold text-slate-700 w-7 text-right" style={JK}>{score}</span>
            </div>
          ))}
        </div>
        <div className="space-y-3">
          {reviewsData.slice(0, 2).map(review => (
            <div key={review.name} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: BLUE }}>
                    {review.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800" style={JK}>{review.name}</p>
                    <p className="text-xs text-slate-400" style={IN}>{review.flag} {review.country} · {review.date}</p>
                  </div>
                </div>
                <span className="text-sm font-bold px-2 py-1 rounded-xl text-white" style={{ backgroundColor: BLUE }}>{review.rating}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed" style={IN}>"{review.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ─── ROOMS CONTENT ───────────────────────────────────────────────────────────
  const renderRoomsContent = () => (
    <div>
      <div className="mb-5">
        <h2 className="text-xl font-bold text-slate-900" style={JK}>Available Rooms & Villas</h2>
        <p className="text-sm text-slate-500 mt-0.5" style={IN}>4 room types · May 23–30, 2026 · {guests} guests · {nights} nights</p>
      </div>

      {/* Filter chips */}
      <div className="flex items-center gap-2 mb-5 flex-wrap">
        {['All Types', 'Rooms', 'Villas', 'Breakfast Incl.', 'Free Cancellation'].map((f, i) => (
          <button
            key={f}
            type="button"
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              i === 0 ? 'text-white border-transparent' : 'text-slate-600 border-slate-200 hover:border-slate-300 bg-white'
            }`}
            style={i === 0 ? { backgroundColor: BLUE, fontFamily: "'Inter', sans-serif" } : IN}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {roomInventory.map(room => (
          <div
            key={room.id}
            className={`rounded-2xl border transition-all overflow-hidden ${
              room.aiPick ? 'border-cyan-200 shadow-md' : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
            }`}
          >
            {room.aiPick && (
              <div className="px-4 py-2 flex items-center gap-2" style={{ background: 'linear-gradient(135deg, #ECFEFF, #EFF6FF)' }}>
                <Sparkles size={12} className="text-cyan-600" />
                <span className="text-xs font-bold text-cyan-700" style={IN}>AI Recommended · Most booked for your dates</span>
              </div>
            )}
            <div className="flex flex-col sm:flex-row">
              {/* Image */}
              <div className="sm:w-52 h-44 sm:h-auto overflow-hidden flex-shrink-0 relative">
                <ImageWithFallback src={room.image} alt={room.name} className="w-full h-full object-cover" />
                {room.availability === 1 && (
                  <div className="absolute top-2 left-2 px-2 py-1 rounded-lg text-xs font-bold text-white bg-red-500" style={IN}>Last room!</div>
                )}
                {room.availability === 2 && (
                  <div className="absolute top-2 left-2 px-2 py-1 rounded-lg text-xs font-bold text-white bg-amber-500" style={IN}>Only 2 left</div>
                )}
                <button
                  type="button"
                  onClick={() => toggleCompare(room.id)}
                  className={`absolute bottom-2 left-2 flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                    compareRooms.includes(room.id)
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-white/90 border-white/60 text-slate-700 hover:bg-white'
                  }`}
                  style={IN}
                >
                  {compareRooms.includes(room.id) ? <Check size={10} /> : <span className="w-2.5 h-2.5 border border-current rounded-sm inline-block" />}
                  Compare
                </button>
              </div>

              {/* Details */}
              <div className="flex-1 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 text-base mb-1" style={JK}>{room.name}</h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 mb-3" style={IN}>
                      <span>{room.size}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><Users size={11} />{room.maxGuests} guests max</span>
                      <span>·</span>
                      <span>{room.beds}</span>
                      <span>·</span>
                      <span>{room.view}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {room.features.map(f => (
                        <span key={f} className="px-2 py-0.5 rounded-full text-xs text-slate-600 bg-slate-100" style={IN}>{f}</span>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${room.mealStyle}`} style={IN}>
                        <Coffee size={10} />{room.meal}
                      </span>
                      <span className={`flex items-center gap-1 text-xs font-semibold ${room.refundable ? 'text-green-600' : 'text-red-500'}`} style={IN}>
                        <Shield size={10} />{room.cancellation}
                      </span>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    {room.originalPrice && (
                      <p className="text-xs text-slate-400 line-through mb-0.5" style={IN}>${room.originalPrice.toLocaleString()}/night</p>
                    )}
                    <p className="text-2xl font-bold text-slate-900" style={JK}>${room.pricePerNight.toLocaleString()}</p>
                    <p className="text-xs text-slate-400 mb-0.5" style={IN}>per night</p>
                    <p className="text-xs text-slate-500 mb-4" style={IN}>
                      ${(room.pricePerNight * nights).toLocaleString()} total · {nights} nights
                    </p>
                    <button
                      type="button"
                      onClick={() => navigate('room-detail')}
                      className="px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95"
                      style={{ backgroundColor: BLUE, fontFamily: "'Inter', sans-serif" }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Compare bar */}
      {compareRooms.length >= 2 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-2xl px-6 py-4 flex items-center justify-between">
          <p className="text-sm font-bold text-slate-800" style={JK}>{compareRooms.length} rooms selected for comparison</p>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setCompareRooms([])} className="text-sm text-slate-500 hover:text-slate-700 font-medium" style={IN}>Clear all</button>
            <button type="button" className="px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90" style={{ backgroundColor: BLUE, fontFamily: "'Inter', sans-serif" }}>
              Compare Rooms
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // ─── AMENITIES CONTENT ───────────────────────────────────────────────────────
  const renderAmenitiesContent = () => (
    <div>
      <h2 className="text-xl font-bold text-slate-900 mb-5" style={JK}>Amenities & Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {amenityCategories.map(({ title, icon: Icon, color, bg, desc, items }) => (
          <div key={title} className="rounded-2xl border border-slate-100 overflow-hidden">
            <div className="p-4 flex items-center gap-3" style={{ backgroundColor: bg }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: color + '20' }}>
                <Icon size={18} style={{ color }} />
              </div>
              <div>
                <p className="font-bold text-slate-800 text-sm" style={JK}>{title}</p>
                <p className="text-xs text-slate-500 mt-0.5" style={IN}>{desc}</p>
              </div>
            </div>
            <div className="p-4 bg-white">
              <div className="grid grid-cols-2 gap-y-2.5">
                {items.map(item => (
                  <div key={item} className="flex items-start gap-2">
                    <Check size={11} style={{ color, marginTop: 2 }} className="flex-shrink-0" />
                    <span className="text-xs text-slate-600" style={IN}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ─── LOCATION CONTENT ────────────────────────────────────────────────────────
  const renderLocationContent = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-slate-900" style={JK}>Location & Surroundings</h2>

      {/* Map placeholder */}
      <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
        <div
          className="h-64 relative flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #BFDBFE 0%, #BAE6FD 40%, #A7F3D0 80%, #D1FAE5 100%)' }}
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/3 w-32 h-0.5 bg-slate-600 rotate-12 rounded-full" />
            <div className="absolute top-1/2 left-1/5 w-44 h-0.5 bg-slate-600 -rotate-6 rounded-full" />
            <div className="absolute top-2/3 left-2/5 w-28 h-0.5 bg-slate-600 rotate-45 rounded-full" />
          </div>
          <div className="relative text-center">
            <div className="w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center mx-auto mb-2">
              <MapPin size={20} style={{ color: BLUE }} />
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
              <p className="text-sm font-bold text-slate-800" style={JK}>Four Seasons Bali at Sayan</p>
              <p className="text-xs text-slate-500 mt-0.5" style={IN}>Ubud, Bali, Indonesia</p>
            </div>
          </div>
          <div className="absolute bottom-3 right-3 bg-white rounded-lg px-2.5 py-1.5 shadow-md flex items-center gap-1.5 cursor-pointer hover:bg-slate-50 transition-all">
            <Compass size={12} style={{ color: BLUE }} />
            <span className="text-xs font-semibold text-slate-700" style={IN}>Open in Maps</span>
          </div>
        </div>
      </div>

      {/* Getting There */}
      <div>
        <h3 className="font-bold text-slate-800 mb-3" style={JK}>Getting There</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { icon: Plane, title: 'By Air', desc: "Ngurah Rai Int'l Airport (DPS)", distance: '36 km · 55 min drive', color: BLUE },
            { icon: Car, title: 'By Car', desc: 'Fully equipped transfer service', distance: 'Private transfers available', color: '#059669' },
            { icon: Waves, title: 'By Water', desc: 'River cruise from riverside dock', distance: 'Scenic 20-min journey', color: '#0891B2' },
          ].map(({ icon: Icon, title, desc, distance, color }) => (
            <div key={title} className="p-4 rounded-2xl border border-slate-100 bg-slate-50">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: color + '15' }}>
                <Icon size={16} style={{ color }} />
              </div>
              <p className="text-sm font-bold text-slate-800 mb-0.5" style={JK}>{title}</p>
              <p className="text-xs text-slate-500" style={IN}>{desc}</p>
              <p className="text-xs font-semibold mt-1.5" style={{ color, fontFamily: "'Inter', sans-serif" }}>{distance}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Nearby Attractions */}
      <div>
        <h3 className="font-bold text-slate-800 mb-3" style={JK}>Nearby Attractions</h3>
        <div className="space-y-2">
          {nearbyAttractions.map(({ name, distance, type, time, icon }) => (
            <div key={name} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all">
              <div className="flex items-center gap-3">
                <span className="text-xl">{icon}</span>
                <div>
                  <p className="text-sm font-semibold text-slate-800" style={JK}>{name}</p>
                  <p className="text-xs text-slate-400 mt-0.5" style={IN}>{distance} · {time} drive</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold text-slate-600 bg-white border border-slate-200 flex-shrink-0" style={IN}>{type}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Neighborhood */}
      <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50">
        <h3 className="font-bold text-slate-800 mb-2" style={JK}>About Ubud</h3>
        <p className="text-sm text-slate-600 leading-relaxed" style={IN}>
          Ubud is Bali's cultural heartland, nestled among rice terraces and jungle ravines. Known for its thriving arts scene, traditional crafts, and sacred temples, it offers a serene contrast to the island's coastal resorts. The town center features galleries, organic cafés, and nightly Balinese dance performances.
        </p>
      </div>
    </div>
  );

  // ─── REVIEWS CONTENT ─────────────────────────────────────────────────────────
  const renderReviewsContent = () => (
    <div className="space-y-6">
      {/* AI Review Summary */}
      <div className="p-4 rounded-2xl border border-cyan-200" style={{ background: 'linear-gradient(135deg, #ECFEFF, #EFF6FF)' }}>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={14} className="text-cyan-600" />
          <p className="text-sm font-bold text-slate-800" style={JK}>AI Review Summary</p>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed" style={IN}>
          Based on 2,840 verified reviews, guests consistently praise the <strong>butler service</strong>, <strong>overwater villa experience</strong>, and <strong>culinary excellence</strong>. Top highlights include snorkeling from villa decks, sunrise yoga, and personalized staff attention. Couples and honeymooners represent 68% of guests.
        </p>
      </div>

      {/* Overall Rating */}
      <div className="flex items-start gap-6">
        <div className="text-center flex-shrink-0">
          <p className="text-5xl font-bold text-slate-900" style={JK}>9.5</p>
          <p className="text-sm font-bold text-slate-700 mt-1" style={JK}>Exceptional</p>
          <p className="text-xs text-slate-400 mt-0.5" style={IN}>2,840 reviews</p>
        </div>
        <div className="flex-1 space-y-2">
          {[
            { label: 'Location', score: 9.7 },
            { label: 'Cleanliness', score: 9.9 },
            { label: 'Service', score: 9.8 },
            { label: 'Facilities', score: 9.6 },
            { label: 'Value', score: 9.1 },
            { label: 'Dining', score: 9.5 },
          ].map(({ label, score }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="text-xs text-slate-500 w-20 flex-shrink-0" style={IN}>{label}</span>
              <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${score * 10}%`, backgroundColor: BLUE }} />
              </div>
              <span className="text-xs font-bold text-slate-700 w-7 text-right" style={JK}>{score}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex items-center gap-2 flex-wrap">
        {['All', 'Couples', 'Honeymoon', 'Business', 'Family', 'Solo'].map(f => (
          <button
            key={f}
            onClick={() => setReviewFilter(f.toLowerCase())}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              reviewFilter === f.toLowerCase()
                ? 'text-white border-transparent'
                : 'text-slate-600 border-slate-200 hover:border-slate-300 bg-white'
            }`}
            style={reviewFilter === f.toLowerCase() ? { backgroundColor: BLUE, fontFamily: "'Inter', sans-serif" } : IN}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Reviews list */}
      <div className="space-y-4">
        {reviewsData.map(review => (
          <div key={review.name} className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ backgroundColor: BLUE }}>
                  {review.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-slate-800" style={JK}>{review.name}</p>
                    {review.verified && (
                      <span className="flex items-center gap-1 text-xs font-semibold text-green-600" style={IN}>
                        <Check size={10} />Verified
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5" style={IN}>{review.flag} {review.country} · {review.date}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <span className="text-sm font-bold px-2.5 py-1 rounded-xl text-white" style={{ backgroundColor: BLUE }}>{review.rating}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${review.typeColor}`} style={IN}>{review.type}</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed" style={IN}>"{review.comment}"</p>
            {review.photos > 0 && (
              <div className="flex items-center gap-1.5 mt-3">
                <Camera size={12} className="text-slate-400" />
                <span className="text-xs text-blue-600 font-semibold cursor-pointer hover:text-blue-700" style={IN}>
                  {review.photos} photo{review.photos > 1 ? 's' : ''} attached
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <button className="w-full py-3 rounded-2xl border border-slate-200 text-sm font-semibold text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center gap-2" style={IN}>
        Show More Reviews <ChevronDown size={14} />
      </button>
    </div>
  );

  // ─── SIDEBARS ─────────────────────────────────────────────────────────────────
  const renderOverviewSidebar = () => (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl sticky top-24 overflow-hidden">
      <div className="p-5 border-b border-slate-100">
        <p className="text-xs text-slate-400 mb-0.5" style={IN}>Starting from</p>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-slate-900" style={JK}>$450</span>
          <span className="text-slate-400 text-sm" style={IN}>/ night</span>
        </div>
        <div className="flex items-center gap-1.5 mt-2">
          <div className="px-2 py-0.5 rounded-lg text-xs font-bold text-white" style={{ backgroundColor: BLUE }}>9.5</div>
          <span className="text-xs text-slate-500" style={IN}>Exceptional · 2,840 reviews</span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Check-in', value: 'May 23, 2026' },
            { label: 'Check-out', value: 'May 30, 2026' },
          ].map(({ label, value }) => (
            <div key={label} className="p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:border-blue-300 transition-all">
              <div className="flex items-center gap-1 mb-1">
                <Calendar size={10} className="text-slate-400" />
                <p className="text-xs text-slate-400" style={IN}>{label}</p>
              </div>
              <p className="text-xs font-bold text-slate-800" style={JK}>{value}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50 hover:border-blue-300 transition-all cursor-pointer">
          <div className="flex items-center gap-2">
            <Users size={13} className="text-slate-400" />
            <div>
              <p className="text-xs text-slate-400" style={IN}>Guests</p>
              <p className="text-xs font-bold text-slate-800" style={JK}>{guests} adults · 1 room</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:border-blue-300 hover:text-blue-600 transition-all text-sm">−</button>
            <span className="text-sm font-bold text-slate-700 w-4 text-center" style={JK}>{guests}</span>
            <button onClick={() => setGuests(Math.min(6, guests + 1))} className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:border-blue-300 hover:text-blue-600 transition-all text-sm">+</button>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-xs text-blue-700 font-semibold flex items-center gap-2" style={IN}>
          <Check size={12} />4 room types available for your dates
        </div>

        <button
          onClick={() => setActiveTab('rooms')}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-bold text-sm transition-all hover:opacity-90 active:scale-[0.98]"
          style={{ backgroundColor: BLUE, fontFamily: "'Inter', sans-serif" }}
        >
          View Available Rooms
          <ArrowRight size={16} />
        </button>

        <p className="text-xs text-center text-slate-400" style={IN}>No payment required at this stage</p>
      </div>

      <div className="px-5 pb-5 space-y-2">
        {[
          { text: 'Free cancellation on most rooms', color: 'text-green-600' },
          { text: 'Best price guaranteed by Safawell', color: 'text-blue-600' },
          { text: 'Instant confirmation', color: 'text-slate-600' },
        ].map(({ text, color }) => (
          <div key={text} className={`flex items-center gap-2 text-xs font-medium ${color}`} style={IN}>
            <Check size={12} />{text}
          </div>
        ))}
      </div>
    </div>
  );

  const renderRoomsSidebar = () => (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl sticky top-24 overflow-hidden">
      <div className="h-32 overflow-hidden">
        <ImageWithFallback src={galleryImages[0]} alt="Four Seasons Bali" className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-1 mb-1">
          {[1,2,3,4,5].map(i => <Star key={i} size={10} fill="#F59E0B" className="text-amber-400" />)}
        </div>
        <p className="text-sm font-bold text-slate-900" style={JK}>Four Seasons Bali at Sayan</p>
        <div className="flex items-center gap-1.5 mt-1 mb-4">
          <div className="px-2 py-0.5 rounded-lg text-xs font-bold text-white" style={{ backgroundColor: BLUE }}>9.5</div>
          <span className="text-xs text-slate-500" style={IN}>Exceptional</span>
        </div>

        <div className="space-y-2 border-t border-slate-100 pt-4">
          <div className="flex items-center justify-between text-xs" style={IN}>
            <span className="text-slate-500 flex items-center gap-1"><Calendar size={11} />Dates</span>
            <span className="font-semibold text-slate-700">May 23 – May 30</span>
          </div>
          <div className="flex items-center justify-between text-xs" style={IN}>
            <span className="text-slate-500 flex items-center gap-1"><Users size={11} />Guests</span>
            <span className="font-semibold text-slate-700">{guests} Adults · {nights} Nights</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100">
          <p className="text-xs text-slate-400 mb-0.5" style={IN}>Rooms from</p>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-slate-900" style={JK}>$450</span>
            <span className="text-xs text-slate-400" style={IN}>/night</span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5" style={IN}>Price shown per room · incl. taxes</p>
        </div>

        {compareRooms.length > 0 && (
          <button
            className="mt-4 w-full py-3 rounded-xl text-sm font-bold border-2 transition-all flex items-center justify-center gap-2"
            style={{ borderColor: BLUE, color: BLUE, fontFamily: "'Inter', sans-serif" }}
          >
            Compare {compareRooms.length} Room{compareRooms.length > 1 ? 's' : ''}
          </button>
        )}

        <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
          {[
            { text: 'Most rooms free cancellation', color: 'text-green-600' },
            { text: 'Best price guaranteed', color: 'text-blue-600' },
          ].map(({ text, color }) => (
            <div key={text} className={`flex items-center gap-2 text-xs font-medium ${color}`} style={IN}>
              <Check size={11} />{text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCompactSidebar = () => (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl sticky top-24 overflow-hidden">
      <div className="h-28 overflow-hidden">
        <ImageWithFallback src={galleryImages[0]} alt="Four Seasons Bali" className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-1 mb-1">
          {[1,2,3,4,5].map(i => <Star key={i} size={10} fill="#F59E0B" className="text-amber-400" />)}
        </div>
        <p className="text-sm font-bold text-slate-900 mb-3" style={JK}>Four Seasons Bali at Sayan</p>

        <div className="space-y-1.5 text-xs border-t border-slate-100 pt-3 mb-4" style={IN}>
          <div className="flex justify-between">
            <span className="text-slate-500">Dates</span>
            <span className="font-semibold text-slate-700">May 23 – 30, 2026</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Guests</span>
            <span className="font-semibold text-slate-700">{guests} Adults · {nights} Nights</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">From</span>
            <span className="font-bold text-slate-900">$450/night</span>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('rooms')}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-bold text-sm transition-all hover:opacity-90"
          style={{ backgroundColor: BLUE, fontFamily: "'Inter', sans-serif" }}
        >
          View Available Rooms <ArrowRight size={14} />
        </button>

        <div className="mt-3 space-y-1.5">
          {[
            { text: 'Free cancellation on most rooms', color: 'text-green-600' },
            { text: 'Best price guaranteed', color: 'text-blue-600' },
          ].map(({ text, color }) => (
            <div key={text} className={`flex items-center gap-2 text-xs font-medium ${color}`} style={IN}>
              <Check size={11} />{text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSidebar = () => {
    switch (activeTab) {
      case 'overview': return renderOverviewSidebar();
      case 'rooms': return renderRoomsSidebar();
      default: return renderCompactSidebar();
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverviewContent();
      case 'rooms': return renderRoomsContent();
      case 'amenities': return renderAmenitiesContent();
      case 'location': return renderLocationContent();
      case 'reviews': return renderReviewsContent();
    }
  };

  return (
    <div className="min-h-screen bg-white" style={{ paddingTop: 72 }}>
      {/* Breadcrumb */}
      <div className="border-b border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-2 text-sm" style={IN}>
          <button onClick={() => navigate('home')} className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
            <ChevronLeft size={14} />Hotels
          </button>
          <span className="text-slate-300">/</span>
          <span className="text-slate-500">Bali</span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-700 font-medium">Four Seasons Resort Bali at Sayan</span>
        </div>
      </div>

      {/* Gallery */}
      <div className="bg-slate-900 relative" style={{ height: '56vh' }}>
        <ImageWithFallback src={galleryImages[activeGallery]} alt="Hotel gallery" className="w-full h-full object-cover opacity-95" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.4))' }} />

        <button onClick={() => setActiveGallery(p => (p - 1 + galleryImages.length) % galleryImages.length)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/30 transition-all">
          <ChevronLeft size={18} className="text-white" />
        </button>
        <button onClick={() => setActiveGallery(p => (p + 1) % galleryImages.length)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/30 transition-all">
          <ChevronRight size={18} className="text-white" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {galleryImages.map((_, i) => (
            <button key={i} onClick={() => setActiveGallery(i)} className={`rounded-full transition-all ${i === activeGallery ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/50'}`} />
          ))}
        </div>

        <div className="absolute bottom-4 right-4 flex gap-2">
          {galleryImages.slice(1, 4).map((img, i) => (
            <button key={i} onClick={() => setActiveGallery(i + 1)} className="w-16 h-12 rounded-lg overflow-hidden border-2 border-white/30 hover:border-white transition-all">
              <ImageWithFallback src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
          <button onClick={() => setGalleryOpen(true)} className="w-16 h-12 rounded-lg bg-black/60 border-2 border-white/30 flex items-center justify-center text-white text-xs font-bold hover:bg-black/70 transition-all" style={IN}>
            +{galleryImages.length - 4}
          </button>
        </div>

        <div className="absolute top-4 right-4 flex items-center gap-2">
          <button onClick={() => setWishlist(!wishlist)} className={`w-9 h-9 rounded-full flex items-center justify-center border border-white/30 backdrop-blur-sm transition-all ${wishlist ? 'bg-red-500' : 'bg-white/20'}`}>
            <Heart size={15} className="text-white" fill={wishlist ? 'white' : 'none'} />
          </button>
          <button className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
            <Share2 size={15} className="text-white" />
          </button>
        </div>
      </div>

      {/* Hotel header + Tab nav */}
      <div className="max-w-7xl mx-auto px-6 pt-6 pb-0">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <div className="flex items-center gap-1 mb-2">
                  {[1,2,3,4,5].map(i => <Star key={i} size={13} fill="#F59E0B" className="text-amber-400" />)}
                  <span className="ml-2 text-xs text-slate-500 font-medium" style={IN}>Luxury Resort</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight" style={JK}>
                  Four Seasons Resort Bali at Sayan
                </h1>
              </div>
              <div className="flex-shrink-0 text-right hidden sm:block">
                <div className="flex items-center gap-2 justify-end">
                  <div className="px-3 py-1.5 rounded-xl text-sm font-bold text-white" style={{ backgroundColor: BLUE }}>9.5</div>
                  <div>
                    <p className="text-sm font-bold text-slate-900" style={JK}>Exceptional</p>
                    <p className="text-xs text-slate-400" style={IN}>2,840 reviews</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin size={14} className="text-slate-400" />
              <span className="text-slate-600 text-sm" style={IN}>Ubud, Bali, Indonesia · 36 km from Ngurah Rai Airport</span>
            </div>
          </div>
          <div className="w-full lg:w-80 flex-shrink-0" />
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 border-b border-slate-200 mt-5 overflow-x-auto">
          {(['Overview', 'Rooms', 'Amenities', 'Location', 'Reviews'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase() as Tab)}
              className={`px-4 py-3 text-sm font-semibold transition-all border-b-2 -mb-px whitespace-nowrap ${
                activeTab === tab.toLowerCase()
                  ? 'border-blue-600 text-blue-700'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
              style={IN}
            >
              {tab}
              {tab === 'Rooms' && <span className="ml-1.5 text-xs px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-600 font-bold" style={IN}>4</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            {renderContent()}
          </div>
          <div className="w-full lg:w-80 flex-shrink-0">
            {renderSidebar()}
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
            <ImageWithFallback src={galleryImages[activeGallery]} alt="Gallery" className="w-full max-h-[80vh] object-contain rounded-xl" />
            <div className="flex justify-center gap-3 mt-4">
              {galleryImages.map((img, i) => (
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
