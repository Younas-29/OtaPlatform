import { useState } from 'react';
import { Heart, MapPin, Star, Bell, Trash2, ArrowRight, Sparkles, GitCompare, CheckSquare, Share2, Plus, Filter } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const JK = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const IN = { fontFamily: "'Inter', sans-serif" };

interface WishlistHotel {
  id: string;
  name: string;
  location: string;
  country: string;
  image: string;
  stars: number;
  rating: number;
  reviews: number;
  pricePerNight: number;
  originalPrice?: number;
  available: boolean;
  tags: string[];
  collection: string;
  priceAlert: boolean;
}

const wishlistHotels: WishlistHotel[] = [
  {
    id: '1',
    name: 'Anantara Veli Maldives Resort',
    location: 'South Malé Atoll',
    country: 'Maldives',
    image: 'https://images.unsplash.com/photo-1622779536320-bb5f5b501a06?w=800&q=80&fit=crop',
    stars: 5,
    rating: 9.4,
    reviews: 1840,
    pricePerNight: 850,
    originalPrice: 1100,
    available: true,
    tags: ['Overwater Villas', 'Adult Only', 'All-Inclusive'],
    collection: 'Maldives',
    priceAlert: true,
  },
  {
    id: '2',
    name: 'Hôtel de Crillon, A Rosewood Hotel',
    location: 'Place de la Concorde',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1677129667171-92abd8740fa3?w=800&q=80&fit=crop',
    stars: 5,
    rating: 9.7,
    reviews: 2340,
    pricePerNight: 1200,
    available: true,
    tags: ['Historic Palace', 'City Centre', 'Michelin Dining'],
    collection: 'European Palaces',
    priceAlert: false,
  },
  {
    id: '3',
    name: 'Amanjiwo Java Resort',
    location: 'Borobudur',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1709187516056-d4929b67e89f?w=800&q=80&fit=crop',
    stars: 5,
    rating: 9.5,
    reviews: 980,
    pricePerNight: 750,
    originalPrice: 950,
    available: true,
    tags: ['Jungle View', 'Temple Views', 'Cultural'],
    collection: 'Asia',
    priceAlert: true,
  },
  {
    id: '4',
    name: 'Aman Venice — Palazzo Papadopoli',
    location: 'Grand Canal',
    country: 'Italy',
    image: 'https://images.unsplash.com/photo-1675407952384-bfa83db66ad7?w=800&q=80&fit=crop',
    stars: 5,
    rating: 9.8,
    reviews: 760,
    pricePerNight: 2400,
    available: false,
    tags: ['Canal Views', 'Historic Palace', 'Private Boats'],
    collection: 'European Palaces',
    priceAlert: false,
  },
  {
    id: '5',
    name: 'COMO Shambhala Estate',
    location: 'Ubud',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1556426983-5705abbfcad6?w=800&q=80&fit=crop',
    stars: 5,
    rating: 9.3,
    reviews: 1120,
    pricePerNight: 640,
    available: true,
    tags: ['Wellness', 'Jungle', 'Ayurveda'],
    collection: 'Asia',
    priceAlert: false,
  },
  {
    id: '6',
    name: 'Katikies Hotel Santorini',
    location: 'Oia Caldera',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1629470035936-3296c3bd8237?w=800&q=80&fit=crop',
    stars: 5,
    rating: 9.6,
    reviews: 2100,
    pricePerNight: 890,
    originalPrice: 1050,
    available: true,
    tags: ['Caldera Views', 'Infinity Pool', 'Cave Suites'],
    collection: 'Mediterranean',
    priceAlert: true,
  },
];

const collections = ['All', 'Maldives', 'European Palaces', 'Asia', 'Mediterranean'];

const aiRecommendations = [
  {
    name: 'Soneva Jani',
    location: 'Noonu Atoll, Maldives',
    price: '$1,950',
    image: 'https://images.unsplash.com/photo-1777199663418-3dd126c9fd40?w=400&q=80&fit=crop',
    reason: 'Based on your love of overwater villas',
  },
  {
    name: 'Le Bristol Paris',
    location: '8th Arrondissement, France',
    price: '$1,450',
    image: 'https://images.unsplash.com/photo-1536031696538-924fe11c7037?w=400&q=80&fit=crop',
    reason: 'Similar to Crillon · Palace hotel fan',
  },
  {
    name: 'Nihi Sumba',
    location: 'Sumba Island, Indonesia',
    price: '$2,100',
    image: 'https://images.unsplash.com/photo-1743356174397-d6da6f014f8f?w=400&q=80&fit=crop',
    reason: 'Ranked #1 Resort in the World 2025',
  },
];

function HotelCard({
  hotel,
  comparing,
  onToggleCompare,
  onRemove,
}: {
  hotel: WishlistHotel;
  comparing: boolean;
  onToggleCompare: (id: string) => void;
  onRemove: (id: string) => void;
}) {
  const discount = hotel.originalPrice
    ? Math.round(((hotel.originalPrice - hotel.pricePerNight) / hotel.originalPrice) * 100)
    : null;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden group">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <ImageWithFallback
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Overlay actions */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <button
            onClick={() => onRemove(hotel.id)}
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-red-50 hover:text-red-500 transition-all"
          >
            <Trash2 size={14} className="text-slate-500" />
          </button>
          <button
            onClick={() => onToggleCompare(hotel.id)}
            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-all ${
              comparing ? 'bg-blue-600 text-white' : 'bg-white/90 backdrop-blur-sm text-slate-500 hover:bg-blue-50 hover:text-blue-600'
            }`}
          >
            <CheckSquare size={14} />
          </button>
        </div>
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {!hotel.available && (
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-slate-800/80 text-white" style={IN}>
              Sold Out
            </span>
          )}
          {discount && (
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-green-500 text-white" style={IN}>
              -{discount}%
            </span>
          )}
          {hotel.priceAlert && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-amber-900" style={IN}>
              <Bell size={10} />
              Price Alert On
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Stars + rating */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: hotel.stars }).map((_, i) => (
              <Star key={i} size={10} fill="#F59E0B" className="text-amber-400" />
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-lg text-xs font-bold" style={{ backgroundColor: '#1B4FD8', color: 'white', fontFamily: "'Inter', sans-serif" }}>
              {hotel.rating}
            </span>
            <span className="text-xs text-slate-400" style={IN}>{hotel.reviews.toLocaleString()} reviews</span>
          </div>
        </div>

        <h3 className="font-bold text-slate-900 text-sm leading-snug mb-1" style={JK}>
          {hotel.name}
        </h3>
        <div className="flex items-center gap-1 mb-3">
          <MapPin size={11} className="text-slate-400 flex-shrink-0" />
          <span className="text-xs text-slate-500" style={IN}>{hotel.location}, {hotel.country}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {hotel.tags.slice(0, 2).map(tag => (
            <span key={tag} className="px-2 py-0.5 rounded-full text-xs text-slate-600 bg-slate-100" style={IN}>
              {tag}
            </span>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-slate-900" style={JK}>
                ${hotel.pricePerNight.toLocaleString()}
              </span>
              <span className="text-xs text-slate-400" style={IN}>/night</span>
            </div>
            {hotel.originalPrice && (
              <span className="text-xs text-slate-400 line-through" style={IN}>
                ${hotel.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <button
            disabled={!hotel.available}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              hotel.available
                ? 'text-white hover:opacity-90 active:scale-95'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
            style={hotel.available ? { backgroundColor: '#1B4FD8', fontFamily: "'Inter', sans-serif" } : { fontFamily: "'Inter', sans-serif" }}
          >
            {hotel.available ? 'Book Now' : 'Unavailable'}
            {hotel.available && <ArrowRight size={12} />}
          </button>
        </div>
      </div>
    </div>
  );
}

export function WishlistPage() {
  const [activeCollection, setActiveCollection] = useState('All');
  const [comparing, setComparing] = useState<string[]>([]);
  const [hotels, setHotels] = useState(wishlistHotels);

  const filteredHotels = activeCollection === 'All'
    ? hotels
    : hotels.filter(h => h.collection === activeCollection);

  const toggleCompare = (id: string) => {
    setComparing(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const removeHotel = (id: string) => {
    setHotels(prev => prev.filter(h => h.id !== id));
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8FAFC', paddingTop: 72 }}>
      {/* Page header */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Heart size={18} style={{ color: '#1B4FD8' }} />
                <h1 className="text-2xl font-bold text-slate-900" style={JK}>My Wishlist</h1>
              </div>
              <p className="text-slate-500 text-sm" style={IN}>
                {hotels.length} saved properties · {comparing.length} selected for comparison
              </p>
            </div>
            <div className="flex items-center gap-2">
              {comparing.length >= 2 && (
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: '#1B4FD8', fontFamily: "'Inter', sans-serif" }}
                >
                  <GitCompare size={14} />
                  Compare {comparing.length}
                </button>
              )}
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all"
                style={IN}
              >
                <Share2 size={14} />
                Share
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all"
                style={IN}
              >
                <Plus size={14} />
                New Collection
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Collection chips + filter */}
        <div className="flex items-center justify-between mb-7">
          <div className="flex items-center gap-2 flex-wrap">
            {collections.map(col => (
              <button
                key={col}
                onClick={() => setActiveCollection(col)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeCollection === col
                    ? 'text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
                style={activeCollection === col ? { backgroundColor: '#1B4FD8', fontFamily: "'Inter', sans-serif" } : { fontFamily: "'Inter', sans-serif" }}
              >
                {col}
                {col !== 'All' && (
                  <span className={`ml-1.5 text-xs ${activeCollection === col ? 'text-white/70' : 'text-slate-400'}`}>
                    {hotels.filter(h => h.collection === col).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all" style={IN}>
            <Filter size={14} />
            Filter
          </button>
        </div>

        {/* Price alert banner */}
        {hotels.some(h => h.priceAlert) && (
          <div className="mb-7 flex items-center justify-between p-4 rounded-2xl border border-amber-200 bg-amber-50">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center">
                <Bell size={16} className="text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-amber-800" style={JK}>3 hotels have active price alerts</p>
                <p className="text-xs text-amber-600" style={IN}>Anantara Veli dropped by 23% · Amanjiwo 21% lower</p>
              </div>
            </div>
            <button
              className="px-4 py-2 rounded-xl text-sm font-semibold text-amber-700 bg-amber-100 hover:bg-amber-200 transition-all"
              style={IN}
            >
              View Deals
            </button>
          </div>
        )}

        {/* Hotel grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredHotels.map(hotel => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              comparing={comparing.includes(hotel.id)}
              onToggleCompare={toggleCompare}
              onRemove={removeHotel}
            />
          ))}
        </div>

        {/* AI Recommendations */}
        <div className="rounded-2xl overflow-hidden border border-cyan-200">
          <div className="px-6 py-4 flex items-center gap-2" style={{ background: 'linear-gradient(135deg, #ECFEFF, #EFF6FF)' }}>
            <Sparkles size={16} className="text-cyan-600" />
            <h2 className="font-bold text-slate-800" style={JK}>AI Recommendations — You Might Also Love</h2>
            <span className="ml-auto text-xs text-cyan-700 font-semibold px-2.5 py-1 rounded-full bg-cyan-100 border border-cyan-200" style={IN}>
              Personalised for James
            </span>
          </div>
          <div className="bg-white p-6 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {aiRecommendations.map(rec => (
              <div key={rec.name} className="group rounded-2xl overflow-hidden border border-slate-100 hover:shadow-md transition-all cursor-pointer">
                <div className="relative h-40 overflow-hidden">
                  <ImageWithFallback
                    src={rec.image}
                    alt={rec.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(15,23,42,0.5), transparent)' }} />
                  <div className="absolute bottom-3 left-3">
                    <p className="text-white font-bold text-sm" style={JK}>{rec.name}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin size={10} className="text-white/70" />
                      <p className="text-white/80 text-xs" style={IN}>{rec.location}</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-cyan-600 font-semibold mb-0.5" style={IN}>{rec.reason}</p>
                    <p className="text-sm font-bold text-slate-900" style={JK}>From {rec.price}/night</p>
                  </div>
                  <button
                    className="w-8 h-8 rounded-full flex items-center justify-center border border-slate-200 hover:border-blue-200 hover:bg-blue-50 transition-all"
                  >
                    <Heart size={14} className="text-slate-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
