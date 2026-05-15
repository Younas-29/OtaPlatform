import { useState } from 'react';
import { ChevronLeft, User, Mail, Phone, Globe, Lock, CreditCard, Shield, Check, Sparkles, ChevronDown, Plus, Tag, ArrowRight } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const JK = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const IN = { fontFamily: "'Inter', sans-serif" };
const BLUE = '#1B4FD8';

const steps = [
  { id: 1, label: 'Traveler Details' },
  { id: 2, label: 'Payment' },
  { id: 3, label: 'Confirmation' },
];

function FormField({ label, type = 'text', placeholder, required, half }: {
  label: string; type?: string; placeholder: string; required?: boolean; half?: boolean;
}) {
  return (
    <div className={half ? '' : 'col-span-2'}>
      <label className="block text-sm font-semibold text-slate-700 mb-1.5" style={JK}>
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
        style={IN}
      />
    </div>
  );
}

export function CheckoutPage() {
  const { navigate } = useNavigation();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'apple'>('card');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [savedTraveler, setSavedTraveler] = useState(false);

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
    else navigate('booking-confirmation');
  };

  const pricing = {
    roomRate: 6230,
    taxes: 750,
    memberDiscount: -350,
    promoDiscount: promoApplied ? -500 : 0,
    total: 6230 + 750 - 350 + (promoApplied ? -500 : 0),
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8FAFC', paddingTop: 72 }}>
      {/* Top bar */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => step > 1 ? setStep(step - 1) : navigate('hotel-detail')}
              className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
              style={IN}
            >
              <ChevronLeft size={16} />
              {step > 1 ? 'Back' : 'Back to hotel'}
            </button>
            <div className="flex-1 flex items-center justify-center gap-2">
              {steps.map((s, i) => (
                <div key={s.id} className="flex items-center gap-2">
                  <div className={`flex items-center gap-2 ${step >= s.id ? 'text-blue-700' : 'text-slate-400'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      step > s.id ? 'bg-green-500 text-white' : step === s.id ? 'text-white' : 'bg-slate-200 text-slate-400'
                    }`} style={step === s.id ? { backgroundColor: BLUE } : {}}>
                      {step > s.id ? <Check size={11} /> : s.id}
                    </div>
                    <span className="text-xs font-semibold hidden sm:block" style={IN}>{s.label}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`w-12 h-px ${step > s.id ? 'bg-green-400' : 'bg-slate-200'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Main form */}
          <div className="flex-1 space-y-6">

            {step === 1 && (
              <>
                {/* Saved traveler option */}
                {!savedTraveler && (
                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center">
                        <User size={15} style={{ color: BLUE }} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-blue-800" style={JK}>Use saved traveler profile</p>
                        <p className="text-xs text-blue-600" style={IN}>James Davidson · Passport US4821</p>
                      </div>
                    </div>
                    <button onClick={() => setSavedTraveler(true)} className="text-xs font-bold text-blue-700 hover:text-blue-800 transition-colors" style={IN}>
                      Apply →
                    </button>
                  </div>
                )}

                {/* Lead guest */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                  <h2 className="font-bold text-slate-900 mb-5" style={JK}>Lead Guest Details</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="First Name" placeholder={savedTraveler ? 'James' : 'Enter first name'} required half />
                    <FormField label="Last Name" placeholder={savedTraveler ? 'Davidson' : 'Enter last name'} required half />
                    <div className="col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5" style={JK}>Email Address <span className="text-red-400">*</span></label>
                      <div className="relative">
                        <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="email" placeholder={savedTraveler ? 'james@example.com' : 'your@email.com'} className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all" style={IN} />
                      </div>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5" style={JK}>Phone Number <span className="text-red-400">*</span></label>
                      <div className="relative">
                        <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="tel" placeholder={savedTraveler ? '+1 (555) 012-3456' : '+1 (555) 000-0000'} className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all" style={IN} />
                      </div>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5" style={JK}>Nationality</label>
                      <div className="relative">
                        <Globe size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <select className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:border-blue-400 transition-all appearance-none cursor-pointer" style={IN}>
                          <option>United States</option>
                          <option>United Kingdom</option>
                          <option>France</option>
                          <option>Germany</option>
                          <option>UAE</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Guest 2 */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="font-bold text-slate-900" style={JK}>Additional Guests</h2>
                    <button className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors" style={IN}>
                      <Plus size={14} /> Add Guest
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="First Name" placeholder="Guest first name" half />
                    <FormField label="Last Name" placeholder="Guest last name" half />
                  </div>
                </div>

                {/* Passport */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                  <h2 className="font-bold text-slate-900 mb-5" style={JK}>Travel Document</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="Passport Number" placeholder={savedTraveler ? 'US4821XXXX' : 'Enter passport number'} half />
                    <FormField label="Expiry Date" type="date" placeholder="2030-03-14" half />
                    <div className="col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5" style={JK}>Country of Issue</label>
                      <select className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:border-blue-400 transition-all appearance-none" style={IN}>
                        <option>United States</option>
                        <option>United Kingdom</option>
                        <option>France</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Special requests */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                  <h2 className="font-bold text-slate-900 mb-1" style={JK}>Special Requests</h2>
                  <p className="text-xs text-slate-500 mb-4" style={IN}>Requests are subject to availability and not guaranteed</p>
                  <textarea
                    rows={3}
                    placeholder="e.g. Late check-in, high floor, honeymoon celebration, dietary requirements..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                    style={IN}
                  />
                </div>

                {/* Add-ons */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                  <h2 className="font-bold text-slate-900 mb-4" style={JK}>Enhance Your Stay</h2>
                  <div className="space-y-3">
                    {[
                      { label: 'Airport Transfer (Seaplane)', desc: 'Ngurah Rai → Resort · 30 min scenic flight', price: '$850/person' },
                      { label: 'Private Sunset Cruise', desc: 'Champagne & canapes · 2 hours', price: '$450/couple' },
                      { label: 'Spa Welcome Package', desc: '60-min massage + herbal foot ritual', price: '$280/person' },
                    ].map(addon => (
                      <div key={addon.label} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50 hover:border-blue-200 hover:bg-blue-50 transition-all cursor-pointer">
                        <div>
                          <p className="text-sm font-bold text-slate-800" style={JK}>{addon.label}</p>
                          <p className="text-xs text-slate-500 mt-0.5" style={IN}>{addon.desc}</p>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span className="text-sm font-bold text-slate-900" style={JK}>{addon.price}</span>
                          <button className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center hover:border-blue-400 hover:bg-blue-50 transition-all">
                            <Plus size={13} className="text-slate-400" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                {/* Payment method */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                  <h2 className="font-bold text-slate-900 mb-5" style={JK}>Payment Method</h2>
                  <div className="space-y-3 mb-6">
                    {[
                      { id: 'card', label: 'Credit / Debit Card', icon: CreditCard },
                      { id: 'paypal', label: 'PayPal', icon: Globe },
                      { id: 'apple', label: 'Apple Pay', icon: Shield },
                    ].map(({ id, label, icon: Icon }) => (
                      <button
                        key={id}
                        onClick={() => setPaymentMethod(id as any)}
                        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 transition-all ${
                          paymentMethod === id ? 'border-blue-400 bg-blue-50' : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${paymentMethod === id ? 'bg-blue-100' : 'bg-slate-100'}`}>
                          <Icon size={15} style={{ color: paymentMethod === id ? BLUE : '#94A3B8' }} />
                        </div>
                        <span className={`text-sm font-semibold ${paymentMethod === id ? 'text-blue-700' : 'text-slate-700'}`} style={IN}>{label}</span>
                        {paymentMethod === id && <Check size={14} style={{ color: BLUE }} className="ml-auto" />}
                      </button>
                    ))}
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5" style={JK}>Card Number</label>
                        <div className="relative">
                          <CreditCard size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input type="text" placeholder="1234 5678 9012 3456" className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all" style={IN} />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1.5" style={JK}>Expiry</label>
                          <input type="text" placeholder="MM / YY" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all" style={IN} />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1.5" style={JK}>CVV</label>
                          <div className="relative">
                            <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input type="password" placeholder="•••" className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all" style={IN} />
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5" style={JK}>Name on Card</label>
                        <input type="text" placeholder="JAMES DAVIDSON" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all uppercase" style={IN} />
                      </div>
                    </div>
                  )}

                  {/* Security */}
                  <div className="flex items-center gap-3 mt-5 pt-5 border-t border-slate-100">
                    <Shield size={15} className="text-slate-400 flex-shrink-0" />
                    <p className="text-xs text-slate-500 leading-relaxed" style={IN}>
                      Your payment is secured by 256-bit SSL encryption. Safawell never stores your card details.
                    </p>
                  </div>
                </div>

                {/* Loyalty points */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="font-bold text-slate-900" style={JK}>Safawell Rewards Points</h2>
                    <span className="text-sm font-bold text-amber-600" style={JK}>14,250 pts available</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-4" style={IN}>Use your points to reduce the total. 1,000 pts = $10 discount.</p>
                  <div className="flex items-center gap-3">
                    <input
                      type="range" min={0} max={14250} step={500}
                      className="flex-1 h-1.5 rounded-full cursor-pointer"
                      style={{ accentColor: BLUE }}
                      defaultValue={0}
                    />
                    <span className="text-sm font-bold text-slate-700 w-16 text-right" style={JK}>0 pts</span>
                  </div>
                </div>

                {/* Promo code */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                  <h2 className="font-bold text-slate-900 mb-4" style={JK}>Promo Code</h2>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={promoCode}
                        onChange={e => setPromoCode(e.target.value)}
                        placeholder="Enter promo code"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                        style={IN}
                      />
                    </div>
                    <button
                      onClick={() => { if (promoCode === 'LUXURY500') setPromoApplied(true); }}
                      className="px-5 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                      style={{ backgroundColor: BLUE, fontFamily: "'Inter', sans-serif" }}
                    >
                      Apply
                    </button>
                  </div>
                  {promoApplied && (
                    <div className="mt-3 flex items-center gap-2 text-green-600 text-sm font-semibold" style={IN}>
                      <Check size={14} /> Code applied — $500 off your booking
                    </div>
                  )}
                  <p className="text-xs text-slate-400 mt-2" style={IN}>Try: LUXURY500</p>
                </div>

                {/* Cancellation */}
                <div className="bg-green-50 rounded-2xl border border-green-200 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Check size={15} className="text-green-600" />
                    <h3 className="font-bold text-green-800 text-sm" style={JK}>Free Cancellation Until May 19, 2026</h3>
                  </div>
                  <p className="text-xs text-green-700" style={IN}>
                    Cancel anytime before May 19, 2026 at 00:00 GMT for a full refund. After this date, the first 2 nights are charged.
                  </p>
                </div>
              </>
            )}

            {/* CTA */}
            <button
              onClick={handleNext}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-white font-bold text-sm transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ backgroundColor: BLUE, fontFamily: "'Inter', sans-serif" }}
            >
              {step === 1 ? 'Continue to Payment' : 'Complete Booking'}
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Sidebar: Booking summary */}
          <div className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm sticky top-24 overflow-hidden">
              {/* Hotel image */}
              <div className="relative h-36 overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=80&fit=crop"
                  alt="Four Seasons Bali"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }} />
                <div className="absolute bottom-3 left-3">
                  <p className="text-white font-bold text-sm" style={JK}>Four Seasons Bali at Sayan</p>
                  <p className="text-white/70 text-xs" style={IN}>Ubud, Indonesia · 5★</p>
                </div>
              </div>

              <div className="p-5">
                {/* Stay details */}
                <div className="space-y-2.5 mb-5 pb-5 border-b border-slate-100">
                  {[
                    { label: 'Check-in', value: 'May 23, 2026' },
                    { label: 'Check-out', value: 'May 30, 2026' },
                    { label: 'Duration', value: '7 nights' },
                    { label: 'Guests', value: '2 adults' },
                    { label: 'Room', value: 'Overwater Grand Villa' },
                    { label: 'Meal', value: 'Breakfast Included' },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between text-sm">
                      <span className="text-slate-500" style={IN}>{label}</span>
                      <span className="font-semibold text-slate-800 text-right" style={JK}>{value}</span>
                    </div>
                  ))}
                </div>

                {/* Price breakdown */}
                <div className="space-y-2 mb-5">
                  <div className="flex justify-between text-xs" style={IN}>
                    <span className="text-slate-500">Room (7 nights)</span>
                    <span className="font-semibold text-slate-700">${pricing.roomRate.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs" style={IN}>
                    <span className="text-slate-500">Taxes & fees</span>
                    <span className="font-semibold text-slate-700">${pricing.taxes.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-green-600 font-semibold" style={IN}>
                    <span>Gold member discount</span>
                    <span>${pricing.memberDiscount.toLocaleString()}</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-xs text-green-600 font-semibold" style={IN}>
                      <span>Promo: LUXURY500</span>
                      <span>-$500</span>
                    </div>
                  )}
                  <div className="border-t border-slate-200 pt-3 flex justify-between">
                    <span className="font-bold text-slate-900 text-sm" style={JK}>Total</span>
                    <span className="font-bold text-slate-900" style={JK}>${pricing.total.toLocaleString()}</span>
                  </div>
                </div>

                {/* AI insight */}
                <div className="p-3 rounded-xl border border-cyan-200 bg-cyan-50">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Sparkles size={11} className="text-cyan-600" />
                    <span className="text-xs font-bold text-cyan-700" style={IN}>AI Tip</span>
                  </div>
                  <p className="text-xs text-cyan-700 leading-relaxed" style={IN}>
                    Book now — only 3 Overwater Grand Villas left for your dates. Prices tend to rise 14 days before arrival.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
