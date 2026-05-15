import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LoginPage } from './components/auth/LoginPage';
import { SignupPage } from './components/auth/SignupPage';
import { ForgotPasswordPage } from './components/auth/ForgotPasswordPage';
import { HomePage } from './components/home/HomePage';
import { HotelDetailPage } from './components/home/HotelDetailPage';
import { CheckoutPage } from './components/home/CheckoutPage';
import { BookingConfirmationPage } from './components/home/BookingConfirmationPage';
import { RoomDetailPage } from './components/home/RoomDetailPage';
import { MyTripsPage } from './components/account/MyTripsPage';
import { BookingDetailsPage } from './components/account/BookingDetailsPage';
import { WishlistPage } from './components/account/WishlistPage';
import { ProfileSettingsPage } from './components/account/ProfileSettingsPage';

const authPages = ['login', 'signup', 'forgot-password'];

function AppContent() {
  const { currentPage } = useNavigation();

  const isAuthPage = authPages.includes(currentPage);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':                  return <HomePage />;
      case 'login':                 return <LoginPage />;
      case 'signup':                return <SignupPage />;
      case 'forgot-password':       return <ForgotPasswordPage />;
      case 'hotel-detail':          return <HotelDetailPage />;
      case 'room-detail':           return <RoomDetailPage />;
      case 'checkout':              return <CheckoutPage />;
      case 'booking-confirmation':  return <BookingConfirmationPage />;
      case 'my-trips':              return <MyTripsPage />;
      case 'booking-details':       return <BookingDetailsPage />;
      case 'wishlist':              return <WishlistPage />;
      case 'profile':               return <ProfileSettingsPage />;
      default:                      return <HomePage />;
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="min-h-screen flex flex-col bg-white">
      {!isAuthPage && <Navbar />}
      <main className="flex-1">
        {renderPage()}
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
}
