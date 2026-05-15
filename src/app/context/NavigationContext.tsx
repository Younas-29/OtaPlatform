import { createContext, useContext, useState, ReactNode } from 'react';

export type Page =
  | 'home'
  | 'login'
  | 'signup'
  | 'forgot-password'
  | 'hotel-detail'
  | 'room-detail'
  | 'checkout'
  | 'booking-confirmation'
  | 'my-trips'
  | 'booking-details'
  | 'wishlist'
  | 'profile';

interface NavigationContextType {
  currentPage: Page;
  navigate: (page: Page) => void;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const NavigationContext = createContext<NavigationContextType>({
  currentPage: 'home',
  navigate: () => {},
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

const accountPages: Page[] = ['my-trips', 'booking-details', 'wishlist', 'profile'];

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [loggedIn, setLoggedIn] = useState(false);

  const isLoggedIn = loggedIn || accountPages.includes(currentPage);

  const navigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const login = () => {
    setLoggedIn(true);
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const logout = () => {
    setLoggedIn(false);
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <NavigationContext.Provider value={{ currentPage, navigate, isLoggedIn, login, logout }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  return useContext(NavigationContext);
}
