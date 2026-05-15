import { useState } from 'react';
import { Search, MapPin, Calendar, Users, Plane, Car, Hotel, ChevronDown, Star, Wifi, Coffee, Dumbbell, Waves, Sparkles, ArrowRight, TrendingUp, Clock, Filter, SlidersHorizontal, ArrowLeftRight, Luggage, Tag, Zap, Shield } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const JK = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const IN = { fontFamily: "'Inter', sans-serif" };
const BLUE = '#1B4FD8';

// ─── Data ───────────────────────────────────────────────────────────────────

const hotelListings = [
  {
    id: 1,
    name: 'Four Seasons Resort Bali at Sayan',
    location: 'Ubud, Bali', country: 'Indonesia',
    stars: 5, rating: 9.5, reviews: 2840,
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=900&q=80&fit=crop',
    pricePerNight: 890, originalPrice: 1150,
    meal: 'Breakfast Included', badge: 'AI Top Pick',
    badgeColor: '#06B6D4', amenities: ['Pool', 'Spa', 'WiFi', 'Restaurant', 'Gym'],
    tag: 'Best for Couples', discount: 23,
  },
  {
    id: 2,
    name: 'Burj Al Arab Jumeirah',
    location: 'Jumeirah, Dubai', country: 'UAE',
    stars: 5, rating: 9.7, reviews: 4120,
    image: 'https://images.unsplash.com/photo-1766164185798-d6e7eb23a131?w=900&q=80&fit=crop',
    pricePerNight: 2100, originalPrice: null,
    meal: 'Half Board', badge: 'Iconic Luxury',
    badgeColor: '#D97706', amenities: ['Private Beach', 'Butler', 'Pool', 'Spa', 'Michelin'],
    tag: 'Top Luxury Pick', discount: null,
  },
  {
    id: 3,
    name: 'Katikies Hotel Santorini',
    location: 'Oia Caldera', country: 'Greece',
    stars: 5, rating: 9.6, reviews: 2100,
    image: 'https://images.unsplash.com/photo-1629470035936-3296c3bd8237?w=900&q=80&fit=crop',
    pricePerNight: 650, originalPrice: 830,
    meal: 'Breakfast Included', badge: 'Best View',
    badgeColor: '#7C3AED', amenities: ['Infinity Pool', 'Cave Suites', 'Spa', 'WiFi'],
    tag: 'Most Romantic', discount: 22,
  },
  {
    id: 4,
    name: 'Hôtel de Crillon, A Rosewood Hotel',
    location: 'Place de la Concorde', country: 'France',
    stars: 5, rating: 9.8, reviews: 2340,
    image: 'https://images.unsplash.com/photo-1677129667171-92abd8740fa3?w=900&q=80&fit=crop',
    pricePerNight: 1200, originalPrice: null,
    meal: 'Room Only', badge: 'Historic Palace',
    badgeColor: '#B45309', amenities: ['Michelin Dining', 'Spa', 'Bar', 'Concierge', 'WiFi'],
    tag: 'Editorial Pick', discount: null,
  },
  {
    id: 5,
    name: 'Anantara Veli Maldives Resort',
    location: 'South Malé Atoll', country: 'Maldives',
    stars: 5, rating: 9.4, reviews: 1840,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=900&q=80&fit=crop',
    pricePerNight: 850, originalPrice: 1100,
    meal: 'All Inclusive', badge: 'Great Breakfast',
    badgeColor: '#059669', amenities: ['Overwater Villa', 'Dive Centre', 'Pool', 'Spa', 'WiFi'],
    tag: 'Best for Families', discount: 23,
  },
  {
    id: 6,
    name: 'The Ritz London',
    location: 'Piccadilly', country: 'United Kingdom',
    stars: 5, rating: 9.4, reviews: 3210,
    image: 'https://images.unsplash.com/photo-1762417422532-7bdaaf7d457a?w=900&q=80&fit=crop',
    pricePerNight: 1450, originalPrice: null,
    meal: 'Breakfast Included', badge: 'Legendary',
    badgeColor: '#BE185D', amenities: ['Afternoon Tea', 'Fine Dining', 'Spa', 'WiFi', 'Concierge'],
    tag: 'London Icon', discount: null,
  },
];

const flightListings = [
  {
    id: 1,
    airline: 'Emirates', code: 'EK', logo: '🇦🇪',
    from: { code: 'DXB', city: 'Dubai', time: '08:30' },
    to: { code: 'LHR', city: 'London', time: '13:00' },
    duration: '7h 30m', stops: 0, price: 485,
    class: 'Economy', baggage: '30kg included',
    badge: 'Best Value', badgeColor: '#059669',
    returnPrice: 892,
  },
  {
    id: 2,
    airline: 'Qatar Airways', code: 'QR', logo: '🇶🇦',
    from: { code: 'DOH', city: 'Doha', time: '02:15' },
    to: { code: 'JFK', city: 'New York', time: '08:30' },
    duration: '14h 15m', stops: 0, price: 1200,
    class: 'Business', baggage: '40kg + carry-on',
    badge: 'Skytrax #1', badgeColor: '#7C3AED',
    returnPrice: 2350,
  },
  {
    id: 3,
    airline: 'Singapore Airlines', code: 'SQ', logo: '🇸🇬',
    from: { code: 'SIN', city: 'Singapore', time: '09:45' },
    to: { code: 'HND', city: 'Tokyo', time: '17:40' },
    duration: '6h 55m', stops: 0, price: 380,
    class: 'Economy+', baggage: '25kg checked',
    badge: 'Popular Route', badgeColor: '#D97706',
    returnPrice: 720,
  },
  {
    id: 4,
    airline: 'Turkish Airlines', code: 'TK', logo: '🇹🇷',
    from: { code: 'IST', city: 'Istanbul', time: '11:30' },
    to: { code: 'ORD', city: 'Chicago', time: '16:55' },
    duration: '12h 25m', stops: 1, price: 580,
    class: 'Economy', baggage: '23kg checked',
    badge: 'Good Deal', badgeColor: '#0891B2',
    returnPrice: 1100,
  },
];

const carListings = [
  {
    id: 1,
    brand: 'Mercedes-Benz', model: 'S-Class',
    image: 'https://images.unsplash.com/photo-1648413653877-ade5eefd2f1b?w=600&q=80&fit=crop',
    category: 'Luxury Sedan', seats: 4, luggage: 2,
    transmission: 'Automatic', fuel: 'Petrol', ac: true,
    company: 'Hertz Premium', companyRating: 9.1,
    pricePerDay: 280, badge: 'Most Popular',
    badgeColor: '#1B4FD8', features: ['GPS', 'Leather', 'Sunroof'],
  },
  {
    id: 2,
    brand: 'Range Rover', model: 'Sport HSE',
    image: 'https://images.unsplash.com/photo-1750670950981-f068553dc21e?w=600&q=80&fit=crop',
    category: 'Premium SUV', seats: 5, luggage: 4,
    transmission: 'Automatic', fuel: 'Hybrid', ac: true,
    company: 'Avis Preferred', companyRating: 8.8,
    pricePerDay: 220, badge: 'Great Choice',
    badgeColor: '#059669', features: ['Terrain Response', 'GPS', 'Panoramic Roof'],
  },
  {
    id: 3,
    brand: 'BMW', model: '7 Series',
    image: 'https://images.unsplash.com/photo-1648413653819-7c0fd93e8e6a?w=600&q=80&fit=crop',
    category: 'Executive Sedan', seats: 4, luggage: 2,
    transmission: 'Automatic', fuel: 'Petrol', ac: true,
    company: 'Europcar Elite', companyRating: 9.0,
    pricePerDay: 195, badge: 'Best Value',
    badgeColor: '#D97706', features: ['Chauffeur Mode', 'Massage Seats', 'GPS'],
  },
];

const trendingDestinations = [
  { name: 'Maldives', hotels: '340+ hotels', image: 'https://images.unsplash.com/photo-1622779536320-bb5f5b501a06?w=600&q=80&fit=crop', tag: 'Overwater Paradise' },
  { name: 'Santorini, Greece', hotels: '180+ hotels', image: 'https://images.unsplash.com/photo-1629470035936-3296c3bd8237?w=600&q=80&fit=crop', tag: 'Caldera Views' },
  { name: 'Dubai, UAE', hotels: '520+ hotels', image: 'https://images.unsplash.com/photo-1675407952384-bfa83db66ad7?w=600&q=80&fit=crop', tag: 'Urban Luxury' },
  { name: 'Istanbul, Turkey', hotels: '290+ hotels', image: 'https://images.unsplash.com/photo-1734771790664-2a39e8c12616?w=600&q=80&fit=crop', tag: 'Cultural Gem' },
  { name: 'Bali, Indonesia', hotels: '410+ hotels', image: 'https://images.unsplash.com/photo-1559628233-eb1b1a45564b?w=600&q=80&fit=crop', tag: 'Tropical Retreat' },
  { name: 'Paris, France', hotels: '680+ hotels', image: 'https://images.unsplash.com/photo-1536031696538-924fe11c7037?w=600&q=80&fit=crop', tag: 'City of Light' },
];

const aiSuggestions = [
  '5-star Istanbul from May 10–17 with half board',
  'Maldives overwater villa for 2 · June',
  'Luxury Paris hotel near Eiffel · weekend',
  'Best Bali resort under $300/night',
  'Dubai 5-star with private pool · July',
];

// ─── Sub-components ────────────────────────────────────────────────────────

type SearchTab = 'hotels' | 'flights' | 'cars';

function SearchField({ icon, label, value, placeholder, wide }: {
  icon: React.ReactNode; label: string; value?: string; placeholder: string; wide?: boolean;
}) {
  return (
    <div className={`flex flex-col ${wide ? 'flex-[1.5]' : 'flex-1'} min-w-0`}>
      <div className="flex items-center gap-1.5 mb-1">
        <span className="text-slate-500">{icon}</span>
        <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider" style={IN}>{label}</span>
      </div>
      <input
        type="text"
        defaultValue={value}
        placeholder={placeholder}
        className="w-full text-slate-800 placeholder-slate-400 text-sm bg-transparent border-none outline-none font-medium"
        style={IN}
      />
    </div>
  );
}

function SearchDivider() {
  return <div className="w-px bg-slate-200 self-stretch my-1 flex-shrink-0" />;
}

function HotelCard({ hotel, onClick }: { hotel: typeof hotelListings[0]; onClick: () => void }) {
  const amenityIcons: Record<string, React.ReactNode> = {
    'Pool': <Waves size={12} />, 'WiFi': <Wifi size={12} />,
    'Spa': <span className="text-xs">♨</span>, 'Gym': <Dumbbell size={12} />,
    'Restaurant': <Coffee size={12} />,
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer group"
    >
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="sm:w-56 lg:w-64 h-52 sm:h-auto relative overflow-hidden flex-shrink-0">
          <ImageWithFallback
            src={hotel.image}
            alt={hotel.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {hotel.discount && (
            <div className="absolute top-3 left-3 px-2 py-1 rounded-lg text-xs font-bold text-white bg-green-500">
              -{hotel.discount}%
            </div>
          )}
          <div className="absolute top-3 right-3">
            <div className="px-2 py-1 rounded-lg text-xs font-bold text-white" style={{ backgroundColor: hotel.badgeColor }}>
              {hotel.badge}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            {/* Stars + AI tag */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: hotel.stars }).map((_, i) => (
                  <Star key={i} size={11} fill="#F59E0B" className="text-amber-400" />
                ))}
              </div>
              <span className="flex items-center gap-1 text-xs text-cyan-700 font-semibold bg-cyan-50 px-2 py-0.5 rounded-full border border-cyan-200" style={IN}>
                <Sparkles size={10} className="text-cyan-500" />
                {hotel.tag}
              </span>
            </div>

            <h3 className="font-bold text-slate-900 text-base leading-tight mb-1 group-hover:text-blue-700 transition-colors" style={JK}>
              {hotel.name}
            </h3>
            <div className="flex items-center gap-1.5 mb-3">
              <MapPin size={12} className="text-slate-400 flex-shrink-0" />
              <span className="text-sm text-slate-500" style={IN}>{hotel.location}, {hotel.country}</span>
            </div>

            {/* Amenities */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {hotel.amenities.slice(0, 4).map(a => (
                <span key={a} className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs text-slate-600 bg-slate-100" style={IN}>
                  {amenityIcons[a] || null} {a}
                </span>
              ))}
              {hotel.meal && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs text-green-700 bg-green-50 border border-green-200" style={IN}>
                  <Coffee size={10} /> {hotel.meal}
                </span>
              )}
            </div>
          </div>

          {/* Price + CTA */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <div className="flex items-center gap-3">
              {/* Rating */}
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-1 rounded-lg text-xs font-bold text-white" style={{ backgroundColor: BLUE }}>
                  {hotel.rating}
                </span>
                <div>
                  <p className="text-xs font-semibold text-slate-700" style={JK}>Exceptional</p>
                  <p className="text-xs text-slate-400" style={IN}>{hotel.reviews.toLocaleString()} reviews</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              {hotel.originalPrice && (
                <p className="text-xs text-slate-400 line-through" style={IN}>${hotel.originalPrice.toLocaleString()}</p>
              )}
              <p className="text-lg font-bold text-slate-900" style={JK}>${hotel.pricePerNight.toLocaleString()}</p>
              <p className="text-xs text-slate-400" style={IN}>per night</p>
              <button
                className="mt-2 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all hover:opacity-90 active:scale-95"
                style={{ backgroundColor: BLUE, fontFamily: "'Inter', sans-serif" }}
              >
                View Rooms →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FlightCard({ flight }: { flight: typeof flightListings[0] }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer group p-5">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {/* Airline */}
        <div className="flex items-center gap-3 min-w-[140px]">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-lg flex-shrink-0">
            {flight.logo}
          </div>
          <div>
            <p className="font-bold text-slate-900 text-sm" style={JK}>{flight.airline}</p>
            <p className="text-xs text-slate-400" style={IN}>{flight.code} · {flight.class}</p>
          </div>
        </div>

        {/* Route */}
        <div className="flex items-center gap-3 flex-1 justify-center">
          <div className="text-center">
            <p className="text-lg font-bold text-slate-900" style={JK}>{flight.from.time}</p>
            <p className="text-sm font-semibold text-slate-600" style={IN}>{flight.from.code}</p>
            <p className="text-xs text-slate-400" style={IN}>{flight.from.city}</p>
          </div>
          <div className="flex-1 flex flex-col items-center gap-1 min-w-[80px]">
            <p className="text-xs text-slate-400 font-medium" style={IN}>{flight.duration}</p>
            <div className="relative w-full flex items-center">
              <div className="flex-1 h-px bg-slate-200" />
              <Plane size={13} className="text-slate-400 mx-1 flex-shrink-0" />
              <div className="flex-1 h-px bg-slate-200" />
            </div>
            <p className="text-xs text-slate-400" style={IN}>{flight.stops === 0 ? 'Nonstop' : `${flight.stops} stop`}</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-slate-900" style={JK}>{flight.to.time}</p>
            <p className="text-sm font-semibold text-slate-600" style={IN}>{flight.to.code}</p>
            <p className="text-xs text-slate-400" style={IN}>{flight.to.city}</p>
          </div>
        </div>

        {/* Baggage + badge */}
        <div className="hidden md:flex flex-col items-center gap-2">
          <span className="flex items-center gap-1 text-xs text-slate-500" style={IN}>
            <Luggage size={12} /> {flight.baggage}
          </span>
          <span className="px-2 py-0.5 rounded-full text-xs font-bold text-white" style={{ backgroundColor: flight.badgeColor }}>
            {flight.badge}
          </span>
        </div>

        {/* Price + CTA */}
        <div className="text-right min-w-[120px]">
          <p className="text-xs text-slate-400 mb-0.5" style={IN}>from</p>
          <p className="text-xl font-bold text-slate-900" style={JK}>${flight.price}</p>
          <p className="text-xs text-slate-400" style={IN}>Return: ${flight.returnPrice}</p>
          <button
            className="mt-2 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: BLUE, fontFamily: "'Inter', sans-serif" }}
          >
            Select →
          </button>
        </div>
      </div>
    </div>
  );
}

function CarCard({ car }: { car: typeof carListings[0] }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer group">
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-48 h-40 sm:h-auto relative overflow-hidden flex-shrink-0">
          <ImageWithFallback
            src={car.image}
            alt={car.model}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 px-2 py-1 rounded-lg text-xs font-bold text-white" style={{ backgroundColor: car.badgeColor }}>
            {car.badge}
          </div>
        </div>
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <p className="text-xs text-slate-400 mb-1" style={IN}>{car.category}</p>
            <h3 className="font-bold text-slate-900 text-base mb-1" style={JK}>{car.brand} {car.model}</h3>
            <p className="text-xs text-slate-500 mb-3" style={IN}>{car.company} · ⭐ {car.companyRating}</p>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {[
                { label: `${car.seats} seats`, icon: '👥' },
                { label: `${car.luggage} bags`, icon: '🧳' },
                { label: car.transmission, icon: '⚙️' },
                { label: car.fuel, icon: '⛽' },
              ].map(({ label, icon }) => (
                <span key={label} className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 px-2 py-1.5 rounded-lg" style={IN}>
                  <span>{icon}</span> {label}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-1">
              {car.features.map(f => (
                <span key={f} className="text-xs text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full" style={IN}>{f}</span>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-3">
            <div>
              <p className="text-lg font-bold text-slate-900" style={JK}>${car.pricePerDay}</p>
              <p className="text-xs text-slate-400" style={IN}>per day · all inclusive</p>
            </div>
            <button
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: BLUE, fontFamily: "'Inter', sans-serif" }}
            >
              Reserve →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function HotelFilters({ stars, setStars, maxPrice, setMaxPrice }: {
  stars: number[]; setStars: (s: number[]) => void;
  maxPrice: number; setMaxPrice: (p: number) => void;
}) {
  const meals = ['Any', 'Room Only', 'Breakfast', 'Half Board', 'All Inclusive'];
  const [activeMeal, setActiveMeal] = useState('Any');
  const [activeRating, setActiveRating] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Star rating */}
      <div>
        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-3" style={IN}>Star Rating</p>
        <div className="flex flex-wrap gap-2">
          {[2, 3, 4, 5].map(n => {
            const active = stars.includes(n);
            return (
              <button
                key={n}
                onClick={() => setStars(active ? stars.filter(s => s !== n) : [...stars, n])}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  active ? 'text-white border-transparent' : 'text-slate-600 border-slate-200 hover:border-slate-300 bg-white'
                }`}
                style={active ? { backgroundColor: BLUE } : {}}
              >
                {Array.from({ length: n }).map((_, i) => <Star key={i} size={9} fill={active ? '#fff' : '#94A3B8'} className={active ? 'text-white' : 'text-slate-400'} />)}
                {n}★
              </button>
            );
          })}
        </div>
      </div>

      {/* Budget */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold text-slate-600 uppercase tracking-widest" style={IN}>Budget / night</p>
          <p className="text-sm font-bold text-blue-700" style={JK}>Up to ${maxPrice.toLocaleString()}</p>
        </div>
        <input
          type="range" min={100} max={3000} step={50}
          value={maxPrice}
          onChange={e => setMaxPrice(Number(e.target.value))}
          className="w-full h-1.5 rounded-full accent-blue-600 cursor-pointer"
          style={{ accentColor: BLUE }}
        />
        <div className="flex justify-between mt-1">
          <span className="text-xs text-slate-400" style={IN}>$100</span>
          <span className="text-xs text-slate-400" style={IN}>$3,000+</span>
        </div>
      </div>

      {/* Meal plan */}
      <div>
        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-3" style={IN}>Meal Plan</p>
        <div className="flex flex-col gap-1.5">
          {meals.map(meal => (
            <button
              key={meal}
              onClick={() => setActiveMeal(meal)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-left ${
                activeMeal === meal ? 'text-white border-transparent' : 'text-slate-600 border-slate-200 hover:border-slate-300 bg-white'
              }`}
              style={activeMeal === meal ? { backgroundColor: BLUE } : {}}
            >
              {activeMeal === meal && <div className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />}
              {meal}
            </button>
          ))}
        </div>
      </div>

      {/* Guest rating */}
      <div>
        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-3" style={IN}>Guest Rating</p>
        <div className="grid grid-cols-2 gap-2">
          {['9+ Exceptional', '8+ Excellent', '7+ Good', 'Any'].map(r => {
            const score = r.split('+')[0];
            const active = activeRating === score;
            return (
              <button
                key={r}
                onClick={() => setActiveRating(active ? null : score)}
                className={`px-2 py-2 rounded-xl text-xs font-semibold border transition-all text-center ${
                  active ? 'text-white border-transparent' : 'text-slate-600 border-slate-200 hover:border-slate-300 bg-white'
                }`}
                style={active ? { backgroundColor: BLUE } : {}}
              >
                {r}
              </button>
            );
          })}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-3" style={IN}>Amenities</p>
        <div className="grid grid-cols-2 gap-2">
          {['Pool', 'Spa', 'WiFi', 'Restaurant', 'Gym', 'Beach Access', 'Butler', 'Breakfast'].map(a => {
            const [checked, setChecked] = useState(false);
            return (
              <button
                key={a}
                onClick={() => setChecked(!checked)}
                className={`px-2.5 py-2 rounded-xl text-xs font-semibold border transition-all text-left ${
                  checked ? 'text-white border-transparent' : 'text-slate-600 border-slate-200 hover:border-slate-300 bg-white'
                }`}
                style={checked ? { backgroundColor: BLUE } : {}}
              >
                {a}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function FlightFilters() {
  const airlines = ['Emirates', 'Qatar Airways', 'Singapore Airlines', 'Turkish Airlines'];
  const stops = ['Nonstop', '1 Stop', '2+ Stops'];
  const times = ['Early Morning', 'Morning', 'Afternoon', 'Evening'];
  const [activeStops, setActiveStops] = useState<string[]>([]);
  const [activeAirlines, setActiveAirlines] = useState<string[]>([]);
  const [maxFare, setMaxFare] = useState(1500);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold text-slate-600 uppercase tracking-widest" style={IN}>Max Price (one-way)</p>
          <p className="text-sm font-bold text-blue-700" style={JK}>${maxFare}</p>
        </div>
        <input type="range" min={100} max={3000} step={50} value={maxFare} onChange={e => setMaxFare(Number(e.target.value))} className="w-full h-1.5 rounded-full cursor-pointer" style={{ accentColor: BLUE }} />
      </div>
      <div>
        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-3" style={IN}>Stops</p>
        <div className="flex flex-wrap gap-2">
          {stops.map(s => {
            const a = activeStops.includes(s);
            return (
              <button key={s} onClick={() => setActiveStops(a ? activeStops.filter(x => x !== s) : [...activeStops, s])}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${a ? 'text-white border-transparent' : 'text-slate-600 border-slate-200 bg-white hover:border-slate-300'}`}
                style={a ? { backgroundColor: BLUE } : {}}>
                {s}
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-3" style={IN}>Airlines</p>
        <div className="flex flex-col gap-2">
          {airlines.map(a => {
            const active = activeAirlines.includes(a);
            return (
              <button key={a} onClick={() => setActiveAirlines(active ? activeAirlines.filter(x => x !== a) : [...activeAirlines, a])}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-left ${active ? 'text-white border-transparent' : 'text-slate-600 border-slate-200 bg-white hover:border-slate-300'}`}
                style={active ? { backgroundColor: BLUE } : {}}>
                {active && <div className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />}
                {a}
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-3" style={IN}>Departure Time</p>
        <div className="grid grid-cols-2 gap-2">
          {times.map(t => {
            const [a, setA] = useState(false);
            return (
              <button key={t} onClick={() => setA(!a)}
                className={`py-2 rounded-xl text-xs font-semibold border transition-all ${a ? 'text-white border-transparent' : 'text-slate-600 border-slate-200 bg-white hover:border-slate-300'}`}
                style={a ? { backgroundColor: BLUE } : {}}>
                {t}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function CarFilters() {
  const types = ['Economy', 'SUV', 'Luxury', 'Van', 'Convertible'];
  const trans = ['Automatic', 'Manual'];
  const [activeTypes, setActiveTypes] = useState<string[]>([]);
  const [activeTrans, setActiveTrans] = useState<string[]>([]);
  const [maxDay, setMaxDay] = useState(500);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold text-slate-600 uppercase tracking-widest" style={IN}>Max Price / day</p>
          <p className="text-sm font-bold text-blue-700" style={JK}>${maxDay}</p>
        </div>
        <input type="range" min={30} max={800} step={10} value={maxDay} onChange={e => setMaxDay(Number(e.target.value))} className="w-full h-1.5 rounded-full cursor-pointer" style={{ accentColor: BLUE }} />
      </div>
      <div>
        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-3" style={IN}>Vehicle Type</p>
        <div className="flex flex-wrap gap-2">
          {types.map(t => {
            const a = activeTypes.includes(t);
            return (
              <button key={t} onClick={() => setActiveTypes(a ? activeTypes.filter(x => x !== t) : [...activeTypes, t])}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${a ? 'text-white border-transparent' : 'text-slate-600 border-slate-200 bg-white hover:border-slate-300'}`}
                style={a ? { backgroundColor: BLUE } : {}}>
                {t}
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-3" style={IN}>Transmission</p>
        <div className="flex gap-2">
          {trans.map(t => {
            const a = activeTrans.includes(t);
            return (
              <button key={t} onClick={() => setActiveTrans(a ? activeTrans.filter(x => x !== t) : [...activeTrans, t])}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all ${a ? 'text-white border-transparent' : 'text-slate-600 border-slate-200 bg-white hover:border-slate-300'}`}
                style={a ? { backgroundColor: BLUE } : {}}>
                {t}
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-3" style={IN}>Rental Company</p>
        <div className="flex flex-col gap-2">
          {['Hertz', 'Avis', 'Europcar', 'Sixt', 'Enterprise'].map(c => {
            const [a, setA] = useState(false);
            return (
              <button key={c} onClick={() => setA(!a)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-left ${a ? 'text-white border-transparent' : 'text-slate-600 border-slate-200 bg-white hover:border-slate-300'}`}
                style={a ? { backgroundColor: BLUE } : {}}>
                {a && <div className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />}
                {c}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────

export function HomePage() {
  const { navigate } = useNavigation();
  const [activeTab, setActiveTab] = useState<SearchTab>('hotels');
  const [sortBy, setSortBy] = useState('recommended');
  const [filterStars, setFilterStars] = useState<number[]>([]);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [aiQuery, setAiQuery] = useState('');

  const tabs = [
    { id: 'hotels' as SearchTab, label: 'Hotels', icon: Hotel },
    { id: 'flights' as SearchTab, label: 'Flights', icon: Plane },
    { id: 'cars' as SearchTab, label: 'Car Rentals', icon: Car },
  ];

  const sortOptions = [
    { value: 'recommended', label: 'Recommended' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Guest Rating' },
  ];

  const filteredHotels = hotelListings.filter(h =>
    (filterStars.length === 0 || filterStars.includes(h.stars)) &&
    h.pricePerNight <= maxPrice
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>

      {/* ── Hero Section ─────────────────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{ minHeight: '72vh', paddingTop: 72 }}>
        {/* Background image */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=1800&q=85&fit=crop"
            alt="Luxury infinity pool"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,20,50,0.55) 0%, rgba(10,20,50,0.35) 50%, rgba(10,20,50,0.75) 100%)' }} />
        </div>

        {/* Hero content */}
        <div className="relative max-w-7xl mx-auto px-6 flex flex-col items-center justify-center" style={{ minHeight: 'calc(72vh - 72px)', paddingBottom: '3rem' }}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-5">
              <Sparkles size={13} className="text-cyan-400" />
              <span className="text-xs font-bold text-white/90 tracking-wide uppercase" style={IN}>
                AI-Powered Global Travel Search
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight" style={JK}>
              Find Your Perfect Stay,<br />
              <span style={{ color: '#67E8F9' }}>Anywhere in the World</span>
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto" style={IN}>
              Search 2M+ luxury hotels, flights, and car rentals across 180+ countries with AI-powered recommendations.
            </p>
          </div>

          {/* Search card */}
          <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Tab bar */}
            <div className="flex border-b border-slate-100 bg-slate-50">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold transition-all ${
                    activeTab === id
                      ? 'bg-white text-blue-700 border-b-2 border-blue-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                  style={IN}
                >
                  <Icon size={15} />
                  {label}
                </button>
              ))}
            </div>

            {/* Form area */}
            <div className="p-5">
              {activeTab === 'hotels' && (
                <>
                  {/* AI search */}
                  <div className="flex items-center gap-3 p-3 rounded-xl border border-cyan-200 bg-cyan-50 mb-4">
                    <Sparkles size={15} className="text-cyan-600 flex-shrink-0" />
                    <input
                      type="text"
                      value={aiQuery}
                      onChange={e => setAiQuery(e.target.value)}
                      placeholder="Try: &quot;5-star hotel in Istanbul from May 10–17 with half board&quot;"
                      className="flex-1 text-sm text-slate-700 placeholder-slate-400 bg-transparent border-none outline-none"
                      style={IN}
                    />
                    {aiQuery && <button onClick={() => setAiQuery('')} className="text-slate-400 hover:text-slate-600 text-xs" style={IN}>Clear</button>}
                  </div>
                  {/* Standard fields */}
                  <div className="flex items-center bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
                    <div className="flex items-center gap-4 flex-1 px-5 py-4 flex-wrap">
                      <SearchField icon={<MapPin size={15} />} label="Destination" placeholder="Where to?" wide />
                      <SearchDivider />
                      <SearchField icon={<Calendar size={15} />} label="Check-in" placeholder="May 23, 2026" />
                      <SearchDivider />
                      <SearchField icon={<Calendar size={15} />} label="Check-out" placeholder="May 30, 2026" />
                      <SearchDivider />
                      <SearchField icon={<Users size={15} />} label="Guests & Rooms" placeholder="2 guests · 1 room" />
                    </div>
                    <button
                      className="flex-shrink-0 flex items-center gap-2 px-6 py-4 text-white font-semibold text-sm transition-all hover:opacity-90 h-full"
                      style={{ backgroundColor: BLUE, fontFamily: "'Inter', sans-serif" }}
                    >
                      <Search size={16} />
                      Search
                    </button>
                  </div>
                </>
              )}

              {activeTab === 'flights' && (
                <div className="flex items-center bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
                  <div className="flex items-center gap-3 flex-1 px-5 py-4 flex-wrap">
                    <SearchField icon={<Plane size={15} />} label="From" placeholder="City or Airport" />
                    <button className="p-1.5 rounded-full border border-slate-200 hover:bg-slate-100 transition-all flex-shrink-0">
                      <ArrowLeftRight size={13} className="text-slate-500" />
                    </button>
                    <SearchField icon={<MapPin size={15} />} label="To" placeholder="City or Airport" />
                    <SearchDivider />
                    <SearchField icon={<Calendar size={15} />} label="Departure" placeholder="May 23" />
                    <SearchDivider />
                    <SearchField icon={<Calendar size={15} />} label="Return" placeholder="May 30" />
                    <SearchDivider />
                    <SearchField icon={<Users size={15} />} label="Passengers" placeholder="1 adult" />
                    <SearchDivider />
                    <SearchField icon={<ChevronDown size={15} />} label="Cabin" placeholder="Economy" />
                  </div>
                  <button className="flex-shrink-0 flex items-center gap-2 px-6 py-4 text-white font-semibold text-sm transition-all hover:opacity-90 h-full" style={{ backgroundColor: BLUE, fontFamily: "'Inter', sans-serif" }}>
                    <Search size={16} /> Search
                  </button>
                </div>
              )}

              {activeTab === 'cars' && (
                <div className="flex items-center bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
                  <div className="flex items-center gap-4 flex-1 px-5 py-4 flex-wrap">
                    <SearchField icon={<MapPin size={15} />} label="Pickup Location" placeholder="Airport or City" wide />
                    <SearchDivider />
                    <SearchField icon={<MapPin size={15} />} label="Return Location" placeholder="Same as pickup" />
                    <SearchDivider />
                    <SearchField icon={<Calendar size={15} />} label="Pickup Date" placeholder="May 23, 2026" />
                    <SearchDivider />
                    <SearchField icon={<Calendar size={15} />} label="Return Date" placeholder="May 30, 2026" />
                    <SearchDivider />
                    <SearchField icon={<Users size={15} />} label="Driver Age" placeholder="30+" />
                  </div>
                  <button className="flex-shrink-0 flex items-center gap-2 px-6 py-4 text-white font-semibold text-sm transition-all hover:opacity-90 h-full" style={{ backgroundColor: BLUE, fontFamily: "'Inter', sans-serif" }}>
                    <Search size={16} /> Search
                  </button>
                </div>
              )}

              {/* AI suggestion chips */}
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <span className="flex items-center gap-1 text-xs text-slate-400 font-medium flex-shrink-0" style={IN}>
                  <TrendingUp size={11} /> Trending:
                </span>
                {aiSuggestions.slice(0, 3).map(s => (
                  <button
                    key={s}
                    onClick={() => setAiQuery(s)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs text-slate-600 bg-slate-100 hover:bg-blue-100 hover:text-blue-700 transition-all border border-transparent hover:border-blue-200"
                    style={IN}
                  >
                    <Clock size={9} className="text-slate-400" />
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Trust Bar ────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {[
              { icon: Shield, text: 'Free cancellation on most rooms' },
              { icon: Tag, text: 'Best price guaranteed' },
              { icon: Zap, text: 'Instant confirmation' },
              { icon: Star, text: '2M+ verified reviews' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                <Icon size={14} style={{ color: BLUE }} />
                <span className="text-xs font-medium text-slate-600" style={IN}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Trending Destinations ─────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900" style={JK}>Trending Destinations</h2>
            <p className="text-slate-500 text-sm mt-1" style={IN}>Most searched destinations by Safawell travelers this week</p>
          </div>
          <button className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors" style={IN}>
            View all <ArrowRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {trendingDestinations.map(dest => (
            <div
              key={dest.name}
              onClick={() => navigate('hotel-detail')}
              className="relative rounded-2xl overflow-hidden cursor-pointer group aspect-[3/4]"
            >
              <ImageWithFallback
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,20,40,0.8) 0%, transparent 50%)' }} />
              <div className="absolute bottom-0 left-0 p-3">
                <p className="text-white font-bold text-sm leading-tight" style={JK}>{dest.name}</p>
                <p className="text-white/60 text-xs mt-0.5" style={IN}>{dest.hotels}</p>
                <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm" style={IN}>
                  {dest.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Listings Section ──────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        {/* Section header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900" style={JK}>
              {activeTab === 'hotels' && 'Featured Hotels'}
              {activeTab === 'flights' && 'Popular Flights'}
              {activeTab === 'cars' && 'Top Car Rentals'}
            </h2>
            <p className="text-slate-500 text-sm mt-1" style={IN}>
              {activeTab === 'hotels' && `${filteredHotels.length} properties matching your search`}
              {activeTab === 'flights' && `${flightListings.length} flights available`}
              {activeTab === 'cars' && `${carListings.length} vehicles available`}
            </p>
          </div>
          {/* Sort */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={15} className="text-slate-400" />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-400 cursor-pointer"
              style={IN}
            >
              {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        <div className="flex gap-7">
          {/* Filter sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sticky top-24">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Filter size={15} style={{ color: BLUE }} />
                  <span className="font-bold text-slate-900 text-sm" style={JK}>Filters</span>
                </div>
                <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors" style={IN}>Reset</button>
              </div>
              {activeTab === 'hotels' && <HotelFilters stars={filterStars} setStars={setFilterStars} maxPrice={maxPrice} setMaxPrice={setMaxPrice} />}
              {activeTab === 'flights' && <FlightFilters />}
              {activeTab === 'cars' && <CarFilters />}
            </div>
          </div>

          {/* Listings */}
          <div className="flex-1 space-y-5">
            {activeTab === 'hotels' && (
              <>
                {/* AI recommendation banner */}
                <div className="flex items-center gap-3 p-4 rounded-2xl border border-cyan-200" style={{ background: 'linear-gradient(135deg, #ECFEFF, #EFF6FF)' }}>
                  <div className="w-9 h-9 rounded-xl bg-cyan-100 flex items-center justify-center flex-shrink-0">
                    <Sparkles size={16} className="text-cyan-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-800" style={JK}>AI Smart Picks — Curated for You</p>
                    <p className="text-xs text-slate-500 mt-0.5" style={IN}>Based on top traveler preferences and availability for your dates</p>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {['Top Luxury Pick', 'Best for Couples', 'Most Popular'].map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded-full text-xs font-semibold text-cyan-700 bg-cyan-100 border border-cyan-200 hidden md:block" style={IN}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {filteredHotels.map(hotel => (
                  <HotelCard key={hotel.id} hotel={hotel} onClick={() => navigate('hotel-detail')} />
                ))}
              </>
            )}

            {activeTab === 'flights' && (
              <>
                <div className="flex items-center gap-3 p-4 rounded-2xl border border-cyan-200" style={{ background: 'linear-gradient(135deg, #ECFEFF, #EFF6FF)' }}>
                  <Sparkles size={15} className="text-cyan-600 flex-shrink-0" />
                  <p className="text-sm font-semibold text-slate-800" style={JK}>
                    <span style={IN} className="font-normal text-slate-500">Prices shown are per person, one-way, including taxes. </span>
                    Round-trip prices also shown.
                  </p>
                </div>
                {flightListings.map(flight => (
                  <FlightCard key={flight.id} flight={flight} />
                ))}
              </>
            )}

            {activeTab === 'cars' && carListings.map(car => (
              <CarCard key={car.id} car={car} />
            ))}

            {/* Load more */}
            <div className="text-center pt-4">
              <button
                className="px-8 py-3.5 rounded-2xl text-sm font-semibold border-2 border-blue-200 text-blue-700 hover:bg-blue-50 transition-all"
                style={IN}
              >
                Load More Results
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Promo Sections ───────────────────────────────────────────── */}
      <div className="border-t border-slate-200" style={{ backgroundColor: '#F1F5F9' }}>
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Luxury escapes */}
            <div className="relative rounded-3xl overflow-hidden h-64 cursor-pointer group" onClick={() => navigate('hotel-detail')}>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=800&q=80&fit=crop"
                alt="Luxury escapes"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(10,20,50,0.8), transparent)' }} />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-2" style={IN}>Safawell Curated</span>
                <h3 className="text-white text-2xl font-bold mb-2" style={JK}>Luxury Escapes</h3>
                <p className="text-white/70 text-sm mb-4" style={IN}>Handpicked 5-star properties at exclusive member rates</p>
                <button className="self-start flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-blue-700 text-sm font-bold hover:bg-blue-50 transition-all" style={IN}>
                  Explore Deals <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Flash sale */}
            <div className="relative rounded-3xl overflow-hidden h-64 cursor-pointer group" onClick={() => navigate('hotel-detail')}>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1622779536320-bb5f5b501a06?w=800&q=80&fit=crop"
                alt="Flash sale"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(10,20,50,0.8), transparent)' }} />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <span className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-2" style={IN}>Limited Time</span>
                <h3 className="text-white text-2xl font-bold mb-2" style={JK}>Maldives Flash Sale</h3>
                <p className="text-white/70 text-sm mb-4" style={IN}>Up to 35% off overwater villas · Valid until May 20</p>
                <button className="self-start flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold transition-all" style={{ backgroundColor: BLUE, fontFamily: "'Inter', sans-serif" }}>
                  Claim Offer <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Loyalty teaser */}
          <div className="mt-6 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6" style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1B4FD8 100%)' }}>
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center flex-shrink-0">
                <Star size={24} className="text-amber-400" fill="#FBBF24" />
              </div>
              <div>
                <p className="text-white text-xl font-bold" style={JK}>Safawell Rewards — Earn Points on Every Booking</p>
                <p className="text-white/60 text-sm mt-1" style={IN}>Join free and get 5,000 welcome points · Redeem for stays, upgrades, and more</p>
              </div>
            </div>
            <button
              onClick={() => navigate('signup')}
              className="flex-shrink-0 flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white text-blue-700 font-bold text-sm transition-all hover:bg-blue-50"
              style={IN}
            >
              Join Free <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
