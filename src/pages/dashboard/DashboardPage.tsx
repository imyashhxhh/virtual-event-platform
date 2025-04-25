import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  Mic, 
  BookOpen, 
  BarChart2, 
  Clock, 
  MessageSquare, 
  CheckCircle 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AdminDashboard from './AdminDashboard';
import SpeakerDashboard from './SpeakerDashboard';
import AttendeeDashboard from './AttendeeDashboard';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const DashboardPage = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [pageLoading, setPageLoading] = useState(true);
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/auth/login');
    } else if (!isLoading) {
      setPageLoading(false);
    }
  }, [isAuthenticated, isLoading, navigate]);
  
  if (isLoading || pageLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  
  // Show dashboard based on user role
  switch (user?.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'speaker':
      return <SpeakerDashboard />;
    case 'attendee':
      return <AttendeeDashboard />;
    default:
      return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
            <p className="mt-2 text-gray-600">You don't have permission to access this page.</p>
          </div>
        </div>
      );
  }
};

export default DashboardPage;