import { useState } from 'react';
import { User, CreditCard, Bell, Shield, Globe, Users, Star, ChevronRight, Camera, Plus, Trash2, Eye, EyeOff, Check, Smartphone } from 'lucide-react';

const JK = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const IN = { fontFamily: "'Inter', sans-serif" };

type Section = 'personal' | 'travelers' | 'preferences' | 'payment' | 'loyalty' | 'notifications' | 'security';

const sidebarItems: { id: Section; icon: typeof User; label: string; badge?: string }[] = [
  { id: 'personal', icon: User, label: 'Personal Information' },
  { id: 'travelers', icon: Users, label: 'Saved Travelers' },
  { id: 'preferences', icon: Globe, label: 'Language & Currency' },
  { id: 'payment', icon: CreditCard, label: 'Payment Methods' },
  { id: 'loyalty', icon: Star, label: 'Loyalty & Rewards', badge: 'Gold' },
  { id: 'notifications', icon: Bell, label: 'Notifications' },
  { id: 'security', icon: Shield, label: 'Security' },
];

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-all ${checked ? '' : 'bg-slate-200'}`}
      style={checked ? { backgroundColor: '#1B4FD8' } : {}}
    >
      <span
        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all ${checked ? 'left-[22px]' : 'left-0.5'}`}
      />
    </button>
  );
}

function FormField({ label, type = 'text', value, onChange, placeholder }: {
  label: string; type?: string; value: string; onChange?: (v: string) => void; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1.5" style={JK}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
        style={IN}
      />
    </div>
  );
}

function SectionCard({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100">
        <h2 className="font-bold text-slate-900" style={JK}>{title}</h2>
        {desc && <p className="text-sm text-slate-500 mt-0.5" style={IN}>{desc}</p>}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function PersonalSection() {
  const [form, setForm] = useState({
    firstName: 'James', lastName: 'Davidson', email: 'james.davidson@example.com',
    phone: '+1 (555) 012-3456', dob: '1985-03-14', nationality: 'United States',
    passportNo: 'US4821XXXX', bio: '',
  });
  const set = (k: keyof typeof form) => (v: string) => setForm(p => ({ ...p, [k]: v }));

  return (
    <div className="space-y-6">
      <SectionCard title="Profile Photo" desc="Upload a photo to personalise your Safawell account.">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-2xl font-bold" style={{ backgroundColor: '#1B4FD8', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              JD
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center hover:bg-slate-50 transition-all">
              <Camera size={13} className="text-slate-600" />
            </button>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800" style={JK}>James Davidson</p>
            <p className="text-xs text-slate-500 mt-0.5" style={IN}>Gold Member · Joined March 2024</p>
            <button className="mt-2 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors" style={IN}>
              Upload new photo
            </button>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Personal Details" desc="Keep your information accurate for seamless check-ins.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <FormField label="First Name" value={form.firstName} onChange={set('firstName')} />
          <FormField label="Last Name" value={form.lastName} onChange={set('lastName')} />
          <FormField label="Email Address" type="email" value={form.email} onChange={set('email')} />
          <FormField label="Phone Number" value={form.phone} onChange={set('phone')} />
          <FormField label="Date of Birth" type="date" value={form.dob} onChange={set('dob')} />
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5" style={JK}>Nationality</label>
            <select
              value={form.nationality}
              onChange={e => set('nationality')(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all appearance-none"
              style={IN}
            >
              <option>United States</option>
              <option>United Kingdom</option>
              <option>France</option>
              <option>Germany</option>
              <option>UAE</option>
            </select>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-4">
          <h3 className="text-sm font-bold text-slate-800 mb-3" style={JK}>Travel Document</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Passport Number" value={form.passportNo} onChange={set('passportNo')} />
            <FormField label="Expiry Date" type="date" value="2030-03-14" />
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: '#1B4FD8', fontFamily: "'Inter', sans-serif" }}
          >
            <Check size={15} />
            Save Changes
          </button>
        </div>
      </SectionCard>
    </div>
  );
}

function TravelersSection() {
  const travelers = [
    { name: 'Sarah Davidson', relation: 'Spouse', passport: '••••4922', nationality: 'United States' },
    { name: 'Emma Davidson', relation: 'Child (16)', passport: '••••2841', nationality: 'United States' },
  ];
  return (
    <SectionCard title="Saved Travelers" desc="Add frequent co-travelers for faster bookings.">
      <div className="space-y-3 mb-5">
        {travelers.map(t => (
          <div key={t.name} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50 hover:border-slate-200 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-700" style={JK}>
                {t.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800" style={JK}>{t.name}</p>
                <p className="text-xs text-slate-500 mt-0.5" style={IN}>{t.relation} · {t.nationality} · Passport {t.passport}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition-all">
                <User size={13} className="text-slate-500" />
              </button>
              <button className="w-8 h-8 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition-all">
                <Trash2 size={13} className="text-slate-400 hover:text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        className="flex items-center gap-2 w-full py-3 rounded-xl border-2 border-dashed border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all text-sm font-semibold text-slate-500 hover:text-blue-700 justify-center"
        style={IN}
      >
        <Plus size={15} />
        Add Traveler
      </button>
    </SectionCard>
  );
}

function PreferencesSection() {
  return (
    <SectionCard title="Language & Currency" desc="Customise your Safawell experience.">
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2" style={JK}>Display Language</label>
          <select className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:border-blue-400 transition-all appearance-none" style={IN}>
            {['English (US)', 'Français', 'Deutsch', 'العربية', 'Español', '日本語'].map(l => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2" style={JK}>Currency</label>
          <select className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:border-blue-400 transition-all appearance-none" style={IN}>
            {['USD — US Dollar', 'EUR — Euro', 'GBP — British Pound', 'AED — UAE Dirham', 'JPY — Japanese Yen'].map(c => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2" style={JK}>Travel Preferences</label>
          <div className="grid grid-cols-2 gap-2">
            {['Overwater Villas', 'City Hotels', 'Beach Resorts', 'Mountain Retreats', 'Cultural Stays', 'Wellness & Spa'].map(pref => (
              <label key={pref} className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 hover:border-blue-200 hover:bg-blue-50 cursor-pointer transition-all">
                <input type="checkbox" defaultChecked={['Overwater Villas', 'Wellness & Spa'].includes(pref)} className="w-4 h-4 rounded accent-blue-600" />
                <span className="text-sm text-slate-700" style={IN}>{pref}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex justify-end">
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90" style={{ backgroundColor: '#1B4FD8', fontFamily: "'Inter', sans-serif" }}>
            <Check size={15} /> Save Preferences
          </button>
        </div>
      </div>
    </SectionCard>
  );
}

function PaymentSection() {
  const cards = [
    { brand: 'Mastercard', last4: '4821', expiry: '09/28', default: true },
    { brand: 'Visa', last4: '2934', expiry: '03/27', default: false },
  ];
  return (
    <SectionCard title="Payment Methods" desc="Manage your saved cards and billing information.">
      <div className="space-y-3 mb-5">
        {cards.map(card => (
          <div key={card.last4} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                <CreditCard size={14} className="text-slate-500" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-slate-800" style={JK}>{card.brand} •••• {card.last4}</p>
                  {card.default && (
                    <span className="px-1.5 py-0.5 rounded-full text-xs font-bold text-white" style={{ backgroundColor: '#1B4FD8', fontFamily: "'Inter', sans-serif" }}>
                      Default
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-0.5" style={IN}>Expires {card.expiry}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!card.default && (
                <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors" style={IN}>Set default</button>
              )}
              <button className="w-8 h-8 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition-all">
                <Trash2 size={13} className="text-slate-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className="flex items-center gap-2 w-full py-3 rounded-xl border-2 border-dashed border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all text-sm font-semibold text-slate-500 hover:text-blue-700 justify-center" style={IN}>
        <Plus size={15} />
        Add Payment Method
      </button>
    </SectionCard>
  );
}

function LoyaltySection() {
  const perks = [
    { label: 'Room Upgrades', value: 'Complimentary when available', active: true },
    { label: 'Late Check-out', value: 'Until 4:00 PM', active: true },
    { label: 'Early Check-in', value: 'From 12:00 PM', active: true },
    { label: 'Bonus Points', value: '15x on Safawell properties', active: true },
    { label: 'Lounge Access', value: 'Available at Platinum', active: false },
  ];
  return (
    <SectionCard title="Loyalty & Rewards" desc="Your Gold membership status and benefits.">
      {/* Status card */}
      <div className="rounded-2xl p-5 mb-6" style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1B4FD8 100%)' }}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-white/60 text-xs uppercase tracking-widest mb-1" style={IN}>Membership Status</p>
            <h3 className="text-white text-2xl font-bold" style={JK}>Gold Member</h3>
            <p className="text-white/70 text-sm mt-1" style={IN}>James Davidson</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center">
            <Star size={22} className="text-amber-400" fill="#FBBF24" />
          </div>
        </div>
        <div className="mt-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/60 text-xs" style={IN}>Progress to Platinum</span>
            <span className="text-white font-bold text-sm" style={JK}>14,250 / 20,000 pts</span>
          </div>
          <div className="w-full h-2 rounded-full bg-white/20">
            <div className="h-full rounded-full bg-amber-400" style={{ width: '71%' }} />
          </div>
          <p className="text-white/50 text-xs mt-1.5" style={IN}>5,750 points needed for Platinum status</p>
        </div>
      </div>

      {/* Points summary */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: 'Available Points', value: '14,250' },
          { label: 'Points Earned (2026)', value: '8,100' },
          { label: 'Points Value', value: '$142.50' },
        ].map(({ label, value }) => (
          <div key={label} className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center">
            <p className="text-lg font-bold text-slate-900" style={JK}>{value}</p>
            <p className="text-xs text-slate-500 mt-0.5" style={IN}>{label}</p>
          </div>
        ))}
      </div>

      {/* Perks list */}
      <div>
        <h3 className="font-bold text-slate-800 text-sm mb-3" style={JK}>Your Gold Benefits</h3>
        <div className="space-y-2.5">
          {perks.map(({ label, value, active }) => (
            <div key={label} className={`flex items-center justify-between p-3 rounded-xl ${active ? 'bg-slate-50' : 'bg-slate-50 opacity-50'}`}>
              <div className="flex items-center gap-2.5">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${active ? 'bg-green-100' : 'bg-slate-200'}`}>
                  <Check size={11} className={active ? 'text-green-600' : 'text-slate-400'} />
                </div>
                <p className="text-sm font-semibold text-slate-800" style={JK}>{label}</p>
              </div>
              <p className="text-xs text-slate-500" style={IN}>{value}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

function NotificationsSection() {
  const [prefs, setPrefs] = useState({
    bookingConfirmations: true,
    tripReminders: true,
    priceDrop: true,
    exclusiveDeals: false,
    loyaltyUpdates: true,
    newsletter: false,
    smsAlerts: true,
    pushNotifications: true,
  });
  const toggle = (k: keyof typeof prefs) => setPrefs(p => ({ ...p, [k]: !p[k] }));

  const notifGroups = [
    {
      title: 'Booking & Travel',
      items: [
        { key: 'bookingConfirmations', label: 'Booking Confirmations', desc: 'Instant confirmation after booking' },
        { key: 'tripReminders', label: 'Trip Reminders', desc: '3 days before check-in' },
      ],
    },
    {
      title: 'Deals & Offers',
      items: [
        { key: 'priceDrop', label: 'Price Drop Alerts', desc: 'When wishlist hotels drop in price' },
        { key: 'exclusiveDeals', label: 'Member Exclusive Deals', desc: 'Flash sales for Gold members' },
        { key: 'newsletter', label: 'Weekly Newsletter', desc: 'Travel inspiration & hotel spotlights' },
      ],
    },
    {
      title: 'Account & Loyalty',
      items: [
        { key: 'loyaltyUpdates', label: 'Loyalty Point Updates', desc: 'When you earn or redeem points' },
        { key: 'smsAlerts', label: 'SMS Alerts', desc: 'Critical booking updates via SMS' },
        { key: 'pushNotifications', label: 'Push Notifications', desc: 'App notifications on your device' },
      ],
    },
  ];

  return (
    <SectionCard title="Notification Preferences" desc="Control what communications you receive from Safawell.">
      <div className="space-y-6">
        {notifGroups.map(group => (
          <div key={group.title}>
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3" style={IN}>{group.title}</h3>
            <div className="space-y-2">
              {group.items.map(({ key, label, desc }) => (
                <div key={key} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div>
                    <p className="text-sm font-semibold text-slate-800" style={JK}>{label}</p>
                    <p className="text-xs text-slate-500 mt-0.5" style={IN}>{desc}</p>
                  </div>
                  <Toggle checked={prefs[key as keyof typeof prefs]} onChange={() => toggle(key as keyof typeof prefs)} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function SecuritySection() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [twoFA, setTwoFA] = useState(true);

  return (
    <div className="space-y-5">
      <SectionCard title="Change Password" desc="Use a strong, unique password to protect your account.">
        <div className="space-y-4">
          {[
            { label: 'Current Password', show: showCurrent, toggle: () => setShowCurrent(!showCurrent) },
            { label: 'New Password', show: showNew, toggle: () => setShowNew(!showNew) },
            { label: 'Confirm New Password', show: showNew, toggle: () => setShowNew(!showNew) },
          ].map(({ label, show, toggle }) => (
            <div key={label}>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5" style={JK}>{label}</label>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  className="w-full px-4 pr-11 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                  style={IN}
                />
                <button type="button" onClick={toggle} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                  {show ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-end">
            <button className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90" style={{ backgroundColor: '#1B4FD8', fontFamily: "'Inter', sans-serif" }}>
              <Check size={15} /> Update Password
            </button>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Two-Factor Authentication" desc="Add an extra layer of security to your account.">
        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
              <Smartphone size={16} style={{ color: '#1B4FD8' }} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800" style={JK}>Authenticator App</p>
              <p className="text-xs text-slate-500 mt-0.5" style={IN}>Google Authenticator · Connected</p>
            </div>
          </div>
          <Toggle checked={twoFA} onChange={setTwoFA} />
        </div>
        {twoFA && (
          <div className="p-3 rounded-xl bg-green-50 border border-green-200 flex items-center gap-2">
            <Check size={14} className="text-green-600" />
            <p className="text-xs font-semibold text-green-700" style={IN}>Two-factor authentication is enabled</p>
          </div>
        )}
      </SectionCard>

      <SectionCard title="Active Sessions" desc="Manage where you're logged in.">
        <div className="space-y-3">
          {[
            { device: 'MacBook Pro 14"', location: 'New York, US', time: 'Active now', current: true },
            { device: 'iPhone 15 Pro', location: 'New York, US', time: '2 hours ago', current: false },
            { device: 'Chrome on Windows', location: 'Dubai, UAE', time: 'Yesterday', current: false },
          ].map(s => (
            <div key={s.device} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50">
              <div className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${s.current ? 'bg-green-400' : 'bg-slate-300'}`} />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-slate-800" style={JK}>{s.device}</p>
                    {s.current && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-semibold" style={IN}>This device</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5" style={IN}>{s.location} · {s.time}</p>
                </div>
              </div>
              {!s.current && (
                <button className="text-xs font-semibold text-red-500 hover:text-red-600 transition-colors" style={IN}>
                  Revoke
                </button>
              )}
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

const sectionComponents: Record<Section, React.ComponentType> = {
  personal: PersonalSection,
  travelers: TravelersSection,
  preferences: PreferencesSection,
  payment: PaymentSection,
  loyalty: LoyaltySection,
  notifications: NotificationsSection,
  security: SecuritySection,
};

export function ProfileSettingsPage() {
  const [activeSection, setActiveSection] = useState<Section>('personal');
  const ActiveComponent = sectionComponents[activeSection];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8FAFC', paddingTop: 72 }}>
      {/* Page header */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-7">
          <h1 className="text-2xl font-bold text-slate-900" style={JK}>Account Settings</h1>
          <p className="text-slate-500 text-sm mt-1" style={IN}>
            Manage your profile, preferences, and security settings.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar nav */}
          <div className="w-full lg:w-60 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden sticky top-24">
              <div className="p-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: '#1B4FD8', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    JD
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate" style={JK}>James Davidson</p>
                    <p className="text-xs text-amber-600 font-semibold" style={IN}>Gold Member</p>
                  </div>
                </div>
              </div>
              <nav className="p-2">
                {sidebarItems.map(({ id, icon: Icon, label, badge }) => (
                  <button
                    key={id}
                    onClick={() => setActiveSection(id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all mb-0.5 ${
                      activeSection === id
                        ? 'text-white'
                        : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                    }`}
                    style={activeSection === id ? { backgroundColor: '#1B4FD8', fontFamily: "'Inter', sans-serif" } : { fontFamily: "'Inter', sans-serif" }}
                  >
                    <Icon size={15} className={activeSection === id ? 'text-white' : 'text-slate-400'} />
                    <span className="text-sm font-semibold flex-1 text-left">{label}</span>
                    {badge ? (
                      <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${activeSection === id ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-700'}`}>
                        {badge}
                      </span>
                    ) : (
                      <ChevronRight size={13} className={activeSection === id ? 'text-white/60' : 'text-slate-300'} />
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <ActiveComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
