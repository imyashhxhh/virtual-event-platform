import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from '../../context/AuthContext';

const Layout = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  // Don't render navbar on session pages (live events)
  const isSessionPage = location.pathname.includes('/sessions/');
  
  return (
    <div className="flex min-h-screen flex-col">
      {!isSessionPage && <Navbar />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!isSessionPage && <Footer />}
    </div>
  );
};

export default Layout;