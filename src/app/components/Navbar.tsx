import { useState } from "react";
import {
  Globe,
  ChevronDown,
  Sparkles,
  Bell,
  LogOut,
  Heart,
  User,
  CreditCard,
  MapPin,
  Menu,
  X,
  Hotel,
  Plane,
  Car,
} from "lucide-react";
import {
  useNavigation,
  Page,
} from "../context/NavigationContext";
import logoImg from "../../imports/logo.png";

const JK = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
const IN = { fontFamily: "'Inter', sans-serif" };

const mainNavLinks = [
  { label: "HomePage", page: "home" as Page, icon: Hotel },
  // { label: "Flights", page: "home" as Page, icon: Plane },
  // { label: "Cars", page: "home" as Page, icon: Car },
  // { label: "Deals", page: "home" as Page, icon: null },
  // { label: "Destinations", page: "home" as Page, icon: null },
];

const accountNavLinks = [
  { label: "My Trips", page: "my-trips" as Page },
  { label: "Wishlist", page: "wishlist" as Page },
];

const userMenuItems = [
  {
    icon: User,
    label: "Profile Settings",
    page: "profile" as Page,
  },
  { icon: MapPin, label: "My Trips", page: "my-trips" as Page },
  {
    icon: Heart,
    label: "My Wishlist",
    page: "wishlist" as Page,
  },
  {
    icon: CreditCard,
    label: "Payment Methods",
    page: "profile" as Page,
  },
];

export function Navbar() {
  const { navigate, currentPage, isLoggedIn, logout } =
    useNavigation();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="flex items-center justify-between"
          style={{ height: 72 }}
        >
          {/* Logo */}
          <button
            onClick={() => navigate("home")}
            className="flex items-center gap-2 flex-shrink-0"
          >
            <img
              src={logoImg}
              alt="Safawell"
              className="h-9 w-auto object-contain"
            />
          </button>

          {/* Center nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {mainNavLinks.map(({ label, page }) => {
              const isActive =
                currentPage === page &&
                ["Hotels", "Flights", "Cars"].includes(label);
              return (
                <button
                  key={label}
                  onClick={() => navigate(page)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "text-blue-700 bg-blue-50"
                      : "text-slate-600 hover:text-blue-700 hover:bg-slate-50"
                  }`}
                  style={IN}
                >
                  {label}
                </button>
              );
            })}

            {isLoggedIn &&
              accountNavLinks.map(({ label, page }) => (
                <button
                  key={label}
                  onClick={() => navigate(page)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    currentPage === page
                      ? "text-blue-700 bg-blue-50"
                      : "text-slate-600 hover:text-blue-700 hover:bg-slate-50"
                  }`}
                  style={IN}
                >
                  {label}
                </button>
              ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* AI badge */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full border cursor-default bg-cyan-50 border-cyan-200">
              <Sparkles size={12} className="text-cyan-600" />
              <span className="text-xs font-semibold tracking-wide text-cyan-700" style={IN}>
                AI Search
              </span>
            </div>

            {/* Language */}
            <button
              className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-all text-sm text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              style={IN}
            >
              <Globe size={15} /> EN <ChevronDown size={12} />
            </button>

            {/* Currency */}
            <button
              className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-all text-sm font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              style={IN}
            >
              USD <ChevronDown size={12} />
            </button>

            {isLoggedIn ? (
              <div className="flex items-center gap-1.5">
                <button className="relative p-2 rounded-xl transition-all hover:bg-slate-50">
                  <Bell
                    size={18}
                    className="text-slate-500"
                  />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500" />
                </button>

                <div className="relative">
                  <button
                    onClick={() =>
                      setUserMenuOpen(!userMenuOpen)
                    }
                    className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border transition-all border-slate-200 hover:border-blue-200 hover:bg-blue-50/50"
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                      style={{
                        backgroundColor: "#1B4FD8",
                        fontFamily:
                          "'Plus Jakarta Sans', sans-serif",
                      }}
                    >
                      JD
                    </div>
                    <span
                      className="text-sm font-medium hidden lg:block text-slate-700"
                      style={IN}
                    >
                      James D.
                    </span>
                    <ChevronDown
                      size={13}
                      className="text-slate-400"
                    />
                  </button>

                  {userMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setUserMenuOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 overflow-hidden">
                        <div className="px-4 py-3 border-b border-slate-100">
                          <p
                            className="text-sm font-bold text-slate-900"
                            style={JK}
                          >
                            James Davidson
                          </p>
                          <p
                            className="text-xs text-slate-500 mt-0.5"
                            style={IN}
                          >
                            james@example.com
                          </p>
                          <div className="flex items-center gap-1.5 mt-2">
                            <span
                              className="px-2 py-0.5 rounded-full text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200"
                              style={IN}
                            >
                              Gold Member
                            </span>
                            <span
                              className="text-xs text-slate-400"
                              style={IN}
                            >
                              14,250 pts
                            </span>
                          </div>
                        </div>

                        {userMenuItems.map(
                          ({ icon: Icon, label, page }) => (
                            <button
                              key={label}
                              onClick={() => {
                                navigate(page);
                                setUserMenuOpen(false);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-700 transition-all"
                              style={IN}
                            >
                              <Icon
                                size={15}
                                className="text-slate-400"
                              />
                              {label}
                            </button>
                          ),
                        )}

                        <div className="border-t border-slate-100 mt-1 pt-1">
                          <button
                            onClick={() => {
                              logout();
                              setUserMenuOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-all"
                            style={IN}
                          >
                            <LogOut size={15} />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate("login")}
                  className="hidden sm:block px-4 py-2 text-sm font-medium rounded-xl transition-all text-slate-700 hover:text-blue-700 hover:bg-blue-50"
                  style={IN}
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate("signup")}
                  className="px-4 py-2 text-sm font-semibold rounded-xl transition-all hover:opacity-90 active:scale-95 text-white"
                  style={{ backgroundColor: "#1B4FD8", fontFamily: "'Inter', sans-serif" }}
                >
                  Sign Up Free
                </button>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-xl transition-all"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? (
                <X size={20} className="text-slate-600" />
              ) : (
                <Menu size={20} className="text-slate-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-slate-100 py-4 space-y-1 bg-white rounded-b-2xl shadow-lg px-2">
            {[
              ...mainNavLinks,
              ...(isLoggedIn ? accountNavLinks : []),
            ].map(({ label, page }) => (
              <button
                key={label}
                onClick={() => {
                  navigate(page);
                  setMobileOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition-all"
                style={IN}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}