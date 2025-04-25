import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  MessageSquare, 
  CheckCircle, 
  ChevronRight, 
  Clock,
  Video
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { format } from 'date-fns';

// Mock data
const upcomingSessions = [
  {
    id: '1',
    title: 'The Future of Web Development',
    eventId: '1',
    eventTitle: 'Tech Summit 2025',
    date: '2025-06-15T14:00:00Z',
    duration: '45 minutes',
    attendees: 280,
    status: 'scheduled'
  },
  {
    id: '2',
    title: 'Building Scalable Applications',
    eventId: '1',
    eventTitle: 'Tech Summit 2025',
    date: '2025-06-16T10:00:00Z',
    duration: '60 minutes',
    attendees: 320,
    status: 'scheduled'
  },
  {
    id: '3',
    title: 'Advanced React Patterns',
    eventId: '2',
    eventTitle: 'Digital Marketing Masterclass',
    date: '2025-07-08T13:00:00Z',
    duration: '45 minutes',
    attendees: 150,
    status: 'draft'
  }
];

const pastSessions = [
  {
    id: '4',
    title: 'Introduction to TypeScript',
    eventId: '4',
    eventTitle: 'Design Systems Workshop',
    date: '2025-04-10T09:00:00Z',
    duration: '45 minutes',
    attendees: 215,
    rating: 4.8,
    recordingUrl: '#'
  }
];

const speakerStats = {
  totalSessions: 4,
  upcomingSessions: 3,
  totalAttendees: 965,
  averageRating: 4.8
};

const SpeakerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('upcoming');
  
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 pb-12">
      {/* Speaker Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Speaker Dashboard</h1>
              <p className="mt-1 text-sm text-gray-600">
                Welcome back, {user?.name}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link to="/events" className="btn btn-primary">
                Browse Events
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Speaker Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow-sm rounded-lg">
            <div className="p-6">
              <div className="flex items-center">
                <div className="bg-primary/10 rounded-md p-3">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500 truncate">
                    Total Sessions
                  </p>
                  <p className="mt-1 text-3xl font-semibold text-gray-900">
                    {speakerStats.totalSessions}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow-sm rounded-lg">
            <div className="p-6">
              <div className="flex items-center">
                <div className="bg-secondary/10 rounded-md p-3">
                  <Clock className="h-6 w-6 text-secondary" />
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500 truncate">
                    Upcoming Sessions
                  </p>
                  <p className="mt-1 text-3xl font-semibold text-gray-900">
                    {speakerStats.upcomingSessions}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow-sm rounded-lg">
            <div className="p-6">
              <div className="flex items-center">
                <div className="bg-accent/10 rounded-md p-3">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500 truncate">
                    Total Attendees
                  </p>
                  <p className="mt-1 text-3xl font-semibold text-gray-900">
                    {speakerStats.totalAttendees.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow-sm rounded-lg">
            <div className="p-6">
              <div className="flex items-center">
                <div className="bg-yellow-100 rounded-md p-3">
                  <svg className="h-6 w-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500 truncate">
                    Average Rating
                  </p>
                  <p className="mt-1 text-3xl font-semibold text-gray-900">
                    {speakerStats.averageRating} <span className="text-sm text-gray-500">/5</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sessions */}
        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`${
                  activeTab === 'upcoming'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm sm:text-base`}
              >
                Upcoming Sessions
              </button>
              <button
                onClick={() => setActiveTab('past')}
                className={`${
                  activeTab === 'past'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm sm:text-base`}
              >
                Past Sessions
              </button>
            </nav>
          </div>
          
          <div className="p-6">
            {activeTab === 'upcoming' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Your Upcoming Sessions</h2>
                
                {upcomingSessions.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingSessions.map(session => (
                      <div key={session.id} className="border border-gray-200 rounded-lg hover:border-primary/30 transition-colors">
                        <div className="p-4 sm:p-6">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">{session.title}</h3>
                              <p className="mt-1 text-sm text-gray-500">
                                <Link to={`/events/${session.eventId}`} className="text-primary hover:underline">
                                  {session.eventTitle}
                                </Link>
                              </p>
                            </div>
                            <div className="mt-2 sm:mt-0">
                              <span 
                                className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                  ${session.status === 'scheduled' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                                `}
                              >
                                {session.status === 'scheduled' ? 'Scheduled' : 'Draft'}
                              </span>
                            </div>
                          </div>
                          
                          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex items-center">
                              <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                              <span className="text-sm text-gray-600">
                                {format(new Date(session.date), 'MMMM d, yyyy')}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-5 w-5 text-gray-400 mr-2" />
                              <span className="text-sm text-gray-600">
                                {format(new Date(session.date), 'h:mm a')} ({session.duration})
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Users className="h-5 w-5 text-gray-400 mr-2" />
                              <span className="text-sm text-gray-600">
                                {session.attendees} Registered Attendees
                              </span>
                            </div>
                          </div>
                          
                          <div className="mt-6 flex flex-col sm:flex-row gap-3">
                            {session.status === 'scheduled' && (
                              <Link 
                                to={`/sessions/${session.id}`}
                                className="btn btn-primary"
                              >
                                <Video className="h-5 w-5 mr-2" />
                                Start Session
                              </Link>
                            )}
                            <Link 
                              to={`/sessions/${session.id}/edit`}
                              className="btn btn-outline"
                            >
                              Update Session
                            </Link>
                            <button className="btn btn-outline">
                              <MessageSquare className="h-5 w-5 mr-2" />
                              Message Attendees
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 mx-auto text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No upcoming sessions</h3>
                    <p className="mt-1 text-sm text-gray-500">You don't have any upcoming speaking engagements.</p>
                    <div className="mt-6">
                      <Link to="/events" className="btn btn-primary">
                        Browse Events
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'past' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Your Past Sessions</h2>
                
                {pastSessions.length > 0 ? (
                  <div className="space-y-4">
                    {pastSessions.map(session => (
                      <div key={session.id} className="border border-gray-200 rounded-lg">
                        <div className="p-4 sm:p-6">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">{session.title}</h3>
                              <p className="mt-1 text-sm text-gray-500">
                                <Link to={`/events/${session.eventId}`} className="text-primary hover:underline">
                                  {session.eventTitle}
                                </Link>
                              </p>
                            </div>
                            <div className="mt-2 sm:mt-0 flex items-center">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <svg 
                                    key={i} 
                                    className={`h-5 w-5 ${i < Math.floor(session.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                                    fill="currentColor" 
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                                <span className="ml-1 text-sm text-gray-600">{session.rating}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex items-center">
                              <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                              <span className="text-sm text-gray-600">
                                {format(new Date(session.date), 'MMMM d, yyyy')}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-5 w-5 text-gray-400 mr-2" />
                              <span className="text-sm text-gray-600">
                                {format(new Date(session.date), 'h:mm a')} ({session.duration})
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Users className="h-5 w-5 text-gray-400 mr-2" />
                              <span className="text-sm text-gray-600">
                                {session.attendees} Attendees
                              </span>
                            </div>
                          </div>
                          
                          <div className="mt-6 flex flex-col sm:flex-row gap-3">
                            <a 
                              href={session.recordingUrl}
                              className="btn btn-outline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Video className="h-5 w-5 mr-2" />
                              Watch Recording
                            </a>
                            <button className="btn btn-outline">
                              View Analytics
                            </button>
                            <button className="btn btn-outline">
                              <MessageSquare className="h-5 w-5 mr-2" />
                              View Q&A
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 mx-auto text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No past sessions</h3>
                    <p className="mt-1 text-sm text-gray-500">You haven't completed any speaking engagements yet.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeakerDashboard;