import { useState } from 'react';
import { MapPin, Calendar, Users, Download, Printer, Phone, Mail, ChevronLeft, CheckCircle, Sparkles, ArrowRight, Plane, Star, Edit, XCircle, Clock, Shield, AlertCircle, MessageCircle } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const JK = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const IN = { fontFamily: "'Inter', sans-serif" };

const HOTEL_IMG = 'https://images.unsplash.com/photo-1743356174397-d6da6f014f8f?w=1200&q=80&fit=crop';
const ROOM_IMG = 'https://images.unsplash.com/photo-1776761603930-e4509e386fbf?w=800&q=80&fit=crop';

const timelineSteps = [
  { label: 'Booking Confirmed', date: 'May 10, 2026 · 14:32', done: true },
  { label: 'Payment Received', date: 'May 10, 2026 · 14:33', done: true },
  { label: 'Check-in Ready', date: 'May 23, 2026', done: false },
  { label: 'Stay Complete', date: 'May 30, 2026', done: false },
];

const paymentBreakdown = [
  { label: 'Room rate (7 nights × $1,100)', value: '$7,700' },
  { label: 'Taxes & resort fees', value: '$875' },
  { label: 'Breakfast included', value: 'Complimentary' },
  { label: 'Member discount (Gold)', value: '−$350' },
  { label: 'Loyalty points used (2,500 pts)', value: '−$25' },
];

export function BookingDetailsPage() {
  const { navigate } = useNavigation();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'traveler', label: 'Traveler Details' },
    { id: 'payment', label: 'Payment' },
    { id: 'policies', label: 'Policies' },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8FAFC', paddingTop: 72 }}>
      {/* Top bar */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm" style={IN}>
            <button
              onClick={() => navigate('my-trips')}
              className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              <ChevronLeft size={15} />
              My Trips
            </button>
            <span className="text-slate-300">/</span>
            <span className="text-slate-600">Booking Details</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 border border-green-200">
              <CheckCircle size={12} className="text-green-600" />
              <span className="text-xs font-semibold text-green-700" style={IN}>Confirmed</span>
            </div>
            <span className="text-sm text-slate-500" style={IN}>Booking #SFW-20482</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Main content */}
          <div className="flex-1 min-w-0 space-y-6">

            {/* Hotel card */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="relative h-56 overflow-hidden">
                <ImageWithFallback
                  src={HOTEL_IMG}
                  alt="The St. Regis Maldives"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(15,23,42,0.7) 0%, transparent 60%)' }} />
                <div className="absolute bottom-0 left-0 p-6">
                  <div className="flex items-center gap-1 mb-1">
                    {[1,2,3,4,5].map(i => <Star key={i} size={11} fill="#F59E0B" className="text-amber-400" />)}
                  </div>
                  <h2 className="text-white text-xl font-bold" style={JK}>
                    The St. Regis Maldives Vommuli Resort
                  </h2>
                  <div className="flex items-center gap-1.5 mt-1">
                    <MapPin size={12} className="text-white/70" />
                    <span className="text-white/80 text-sm" style={IN}>Dhaalu Atoll, Maldives</span>
                  </div>
                </div>
              </div>

              {/* Quick info bar */}
              <div className="px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-5 border-b border-slate-100">
                {[
                  { icon: Calendar, label: 'Check-in', value: 'May 23, 2026', sub: 'From 3:00 PM' },
                  { icon: Calendar, label: 'Check-out', value: 'May 30, 2026', sub: 'Until 12:00 PM' },
                  { icon: Clock, label: 'Duration', value: '7 nights', sub: 'Half Board' },
                  { icon: Users, label: 'Guests', value: '2 Adults', sub: '1 Overwater Villa' },
                ].map(({ icon: Icon, label, value, sub }) => (
                  <div key={label}>
                    <div className="flex items-center gap-1.5 mb-1">
                      <Icon size={13} className="text-slate-400" />
                      <span className="text-xs text-slate-400 font-medium" style={IN}>{label}</span>
                    </div>
                    <p className="text-slate-900 font-bold text-sm" style={JK}>{value}</p>
                    <p className="text-slate-500 text-xs" style={IN}>{sub}</p>
                  </div>
                ))}
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1 px-6 pt-4 border-b border-slate-100">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2.5 text-sm font-semibold transition-all border-b-2 -mb-px ${
                      activeTab === tab.id
                        ? 'border-blue-600 text-blue-700'
                        : 'border-transparent text-slate-500 hover:text-slate-700'
                    }`}
                    style={IN}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    {/* Booking timeline */}
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm mb-4" style={JK}>Booking Timeline</h3>
                      <div className="relative pl-6">
                        <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-slate-200" />
                        <div className="space-y-5">
                          {timelineSteps.map((step, i) => (
                            <div key={i} className="flex items-start gap-3 relative">
                              <div className={`absolute -left-6 w-3.5 h-3.5 rounded-full border-2 mt-0.5 ${step.done ? 'bg-green-500 border-green-500' : 'bg-white border-slate-300'}`} />
                              <div>
                                <p className={`text-sm font-semibold ${step.done ? 'text-slate-800' : 'text-slate-400'}`} style={JK}>{step.label}</p>
                                <p className="text-xs text-slate-400 mt-0.5" style={IN}>{step.date}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Room */}
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm mb-4" style={JK}>Your Room</h3>
                      <div className="flex gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50">
                        <ImageWithFallback
                          src={ROOM_IMG}
                          alt="Overwater Villa"
                          className="w-24 h-20 rounded-xl object-cover flex-shrink-0"
                        />
                        <div className="flex-1">
                          <p className="font-bold text-slate-900 text-sm" style={JK}>Overwater Grand Villa</p>
                          <p className="text-slate-500 text-xs mt-1" style={IN}>45m² · Private pool · Ocean views · King bed</p>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {['WiFi', 'Pool', 'Butler', 'Breakfast', 'Minibar'].map(tag => (
                              <span key={tag} className="px-2 py-0.5 rounded-full text-xs bg-white border border-slate-200 text-slate-600" style={IN}>{tag}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'traveler' && (
                  <div className="space-y-5">
                    <div className="p-4 rounded-xl border border-slate-100 bg-slate-50">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-slate-800 text-sm" style={JK}>Primary Guest</h4>
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 font-semibold" style={IN}>Lead</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { label: 'Full Name', value: 'James Davidson' },
                          { label: 'Nationality', value: 'United States' },
                          { label: 'Passport No.', value: '••••• 4821' },
                          { label: 'Date of Birth', value: 'Mar 14, 1985' },
                          { label: 'Email', value: 'james@example.com' },
                          { label: 'Mobile', value: '+1 (555) 012-3456' },
                        ].map(({ label, value }) => (
                          <div key={label}>
                            <p className="text-xs text-slate-400" style={IN}>{label}</p>
                            <p className="text-sm font-semibold text-slate-800 mt-0.5" style={JK}>{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-100 bg-slate-50">
                      <h4 className="font-bold text-slate-800 text-sm mb-3" style={JK}>Guest 2</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { label: 'Full Name', value: 'Sarah Davidson' },
                          { label: 'Nationality', value: 'United States' },
                        ].map(({ label, value }) => (
                          <div key={label}>
                            <p className="text-xs text-slate-400" style={IN}>{label}</p>
                            <p className="text-sm font-semibold text-slate-800 mt-0.5" style={JK}>{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-amber-100 bg-amber-50">
                      <h4 className="font-bold text-amber-800 text-sm mb-2" style={JK}>Special Requests</h4>
                      <p className="text-sm text-amber-700" style={IN}>Late check-in (arriving ~10 PM). Honeymoon celebration — please arrange surprise room decoration.</p>
                    </div>
                  </div>
                )}

                {activeTab === 'payment' && (
                  <div className="space-y-4">
                    <div className="rounded-xl border border-slate-100 overflow-hidden">
                      <div className="bg-slate-50 px-4 py-3 border-b border-slate-100">
                        <h4 className="font-bold text-slate-800 text-sm" style={JK}>Payment Breakdown</h4>
                      </div>
                      <div className="divide-y divide-slate-100">
                        {paymentBreakdown.map(({ label, value }) => (
                          <div key={label} className="flex items-center justify-between px-4 py-3">
                            <span className="text-sm text-slate-600" style={IN}>{label}</span>
                            <span className={`text-sm font-semibold ${value.startsWith('−') ? 'text-green-600' : 'text-slate-900'}`} style={JK}>{value}</span>
                          </div>
                        ))}
                        <div className="flex items-center justify-between px-4 py-4 bg-slate-50">
                          <span className="font-bold text-slate-900" style={JK}>Total Charged</span>
                          <span className="font-bold text-slate-900 text-base" style={JK}>$8,200</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50 border border-blue-100">
                      <div className="w-9 h-9 rounded-xl bg-white border border-blue-200 flex items-center justify-center flex-shrink-0">
                        <Shield size={16} style={{ color: '#1B4FD8' }} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-blue-800" style={JK}>Paid via Mastercard ending 4821</p>
                        <p className="text-xs text-blue-600 mt-0.5" style={IN}>Payment processed on May 10, 2026 · Fully secured</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'policies' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl border border-green-100 bg-green-50">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle size={14} className="text-green-600" />
                        <h4 className="font-bold text-green-800 text-sm" style={JK}>Free Cancellation</h4>
                      </div>
                      <p className="text-sm text-green-700" style={IN}>
                        Cancel for free before <strong>May 19, 2026 at 00:00 GMT</strong>. After this date, the first 2 nights will be charged.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl border border-slate-100 bg-slate-50">
                      <h4 className="font-bold text-slate-800 text-sm mb-2" style={JK}>Check-in / Check-out</h4>
                      <p className="text-sm text-slate-600" style={IN}>Check-in from 3:00 PM · Check-out by 12:00 PM · Early check-in subject to availability.</p>
                    </div>
                    <div className="p-4 rounded-xl border border-slate-100 bg-slate-50">
                      <h4 className="font-bold text-slate-800 text-sm mb-2" style={JK}>Hotel Policies</h4>
                      <ul className="space-y-1.5">
                        {['Adults only property (18+)', 'No smoking in rooms', 'Pets not permitted', 'Dress code at restaurants'].map(p => (
                          <li key={p} className="flex items-center gap-2 text-sm text-slate-600" style={IN}>
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* AI travel suggestions */}
            <div className="rounded-2xl p-5 border border-cyan-200" style={{ background: 'linear-gradient(135deg, #ECFEFF, #EFF6FF)' }}>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={14} className="text-cyan-600" />
                <span className="text-xs font-bold text-cyan-700 uppercase tracking-wide" style={IN}>AI Travel Tips — Maldives</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { tip: 'Best snorkeling spots near Vommuli', tag: 'Activities' },
                  { tip: 'Private seaplane dining experience', tag: 'Dining' },
                  { tip: 'Sunset dolphin cruise nearby', tag: 'Experiences' },
                ].map(({ tip, tag }) => (
                  <div key={tip} className="bg-white/60 rounded-xl p-3 border border-white/80">
                    <span className="text-xs font-bold text-cyan-600" style={IN}>{tag}</span>
                    <p className="text-sm font-semibold text-slate-800 mt-1" style={JK}>{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-72 space-y-5 flex-shrink-0">
            {/* Quick actions */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h3 className="font-bold text-slate-900 text-sm mb-4" style={JK}>Booking Actions</h3>
              <div className="space-y-2.5">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 hover:border-blue-200 hover:bg-blue-50 transition-all" style={IN}>
                  <Download size={15} style={{ color: '#1B4FD8' }} />
                  <span className="text-sm font-semibold text-slate-700" style={JK}>Download Invoice</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 hover:border-blue-200 hover:bg-blue-50 transition-all" style={IN}>
                  <Printer size={15} style={{ color: '#1B4FD8' }} />
                  <span className="text-sm font-semibold text-slate-700" style={JK}>Download Voucher</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all" style={IN}>
                  <Edit size={15} className="text-slate-500" />
                  <span className="text-sm font-semibold text-slate-700" style={JK}>Modify Booking</span>
                </button>
                <button
                  onClick={() => setShowCancelModal(true)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-red-100 hover:border-red-200 hover:bg-red-50 transition-all"
                >
                  <XCircle size={15} className="text-red-500" />
                  <span className="text-sm font-semibold text-red-500" style={JK}>Cancel Booking</span>
                </button>
              </div>
            </div>

            {/* Hotel contact */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h3 className="font-bold text-slate-900 text-sm mb-4" style={JK}>Hotel Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Phone size={13} style={{ color: '#1B4FD8' }} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400" style={IN}>Front Desk</p>
                    <p className="text-sm font-semibold text-slate-800" style={JK}>+960 676 6833</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Mail size={13} style={{ color: '#1B4FD8' }} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400" style={IN}>Reservations Email</p>
                    <p className="text-sm font-semibold text-slate-800" style={JK}>reservations@stregis.mv</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Airport transfer upsell */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-3">
                <Plane size={14} style={{ color: '#1B4FD8' }} />
                <h3 className="font-bold text-slate-900 text-sm" style={JK}>Airport Transfer</h3>
              </div>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed" style={IN}>
                Add a seamless seaplane or speedboat transfer from Velana International Airport to the resort.
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50">
                  <div>
                    <p className="text-xs font-semibold text-slate-700" style={JK}>Seaplane Transfer</p>
                    <p className="text-xs text-slate-400" style={IN}>30 mins · Scenic</p>
                  </div>
                  <span className="text-sm font-bold text-slate-900" style={JK}>$850</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50">
                  <div>
                    <p className="text-xs font-semibold text-slate-700" style={JK}>Speedboat Transfer</p>
                    <p className="text-xs text-slate-400" style={IN}>2 hrs · Budget option</p>
                  </div>
                  <span className="text-sm font-bold text-slate-900" style={JK}>$180</span>
                </div>
              </div>
              <button
                className="mt-3 w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold transition-all hover:opacity-90 text-white"
                style={{ backgroundColor: '#1B4FD8', fontFamily: "'Inter', sans-serif" }}
              >
                Add Transfer <ArrowRight size={12} />
              </button>
            </div>

            {/* Support */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-3">
                <MessageCircle size={14} className="text-slate-500" />
                <h3 className="font-bold text-slate-900 text-sm" style={JK}>Need Help?</h3>
              </div>
              <p className="text-xs text-slate-500 mb-3" style={IN}>Our travel specialists are available 24/7 for any booking queries.</p>
              <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-blue-700 border border-blue-200 hover:bg-blue-50 transition-all" style={IN}>
                <MessageCircle size={12} />
                Chat with Support
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6" style={{ backgroundColor: 'rgba(15,23,42,0.6)' }}>
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
            <div className="flex justify-center mb-5">
              <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center">
                <AlertCircle size={26} className="text-red-500" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-slate-900 text-center mb-2" style={JK}>Cancel this booking?</h3>
            <p className="text-slate-500 text-sm text-center mb-2" style={IN}>
              The St. Regis Maldives · May 23–30, 2026
            </p>
            <div className="p-4 rounded-xl bg-green-50 border border-green-200 mb-6">
              <p className="text-sm text-green-700 font-semibold text-center" style={JK}>
                Free cancellation available until May 19, 2026
              </p>
              <p className="text-xs text-green-600 text-center mt-1" style={IN}>Full refund of $8,200 will be processed within 5–7 business days.</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all"
                style={IN}
              >
                Keep Booking
              </button>
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 py-3 rounded-xl text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition-all"
                style={IN}
              >
                Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
