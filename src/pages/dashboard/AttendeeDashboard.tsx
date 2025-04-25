import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Star, 
  Bookmark, 
  Bell, 
  Clock, 
  Video,
  Users,
  MessageSquare,
  Search,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { format } from 'date-fns';

// Mock data
const upcomingEvents = [
  {
    id: '1',
    title: 'Tech Summit 2025',
    description: 'Global technology conference featuring industry leaders',
    startDate: '2025-06-15T09:00:00Z',
    endDate: '2025-06-17T18:00:00Z',
    imageUrl: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    sessions: 45,
    savedSessions: 3,
  },
  {
    id: '2',
    title: 'Digital Marketing Masterclass',
    description: 'Learn advanced digital marketing strategies',
    startDate: '2025-07-08T10:00:00Z',
    endDate: '2025-07-09T17:00:00Z',
    imageUrl: 'https://images.pexels.com/photos/7256420/pexels-photo-7256420.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    sessions: 12,
    savedSessions: 2,
  }
];

const upcomingSessions = [
  {
    id: '1',
    title: 'The Future of Web Development',
    eventId: '1',
    eventTitle: 'Tech Summit 2025',
    date: '2025-06-15T14:00:00Z',
    duration: '45 minutes',
    speaker: {
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    saved: true,
    reminder: true
  },
  {
    id: '2',
    title: 'Building Scalable Applications',
    eventId: '1',
    eventTitle: 'Tech Summit 2025',
    date: '2025-06-16T10:00:00Z',
    duration: '60 minutes',
    speaker: {
      name: 'Michael Thompson',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    saved: true,
    reminder: false
  },
  {
    id: '3',
    title: 'Advanced React Patterns',
    eventId: '2',
    eventTitle: 'Digital Marketing Masterclass',
    date: '2025-07-08T13:00:00Z',
    duration: '45 minutes',
    speaker: {
      name: 'David Chen',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    saved: true,
    reminder: true
  }
];

const attendeeStats = {
  registeredEvents: 2,
  savedSessions: 5,
  completedSessions: 1,
  eventCalendars: 2
};

const AttendeeDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('events');
  
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 pb-12">
      {/* Attendee Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Events Dashboard</h1>
              <p className="mt-1 text-sm text-gray-600">
                Welcome back, {user?.name}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link to="/events" className="btn btn-primary">
                Browse More Events
              </Link>
            </div>
          </div>
          
          {/* Attendee Navigation */}
          <div className="mt-6 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('events')}
                className={`${
                  activeTab === 'events'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <Calendar className="h-5 w-5 mr-2" />
                My Events
              </button>
              <button
                onClick={() => setActiveTab('saved')}
                className={`${
                  activeTab === 'saved'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <Bookmark className="h-5 w-5 mr-2" />
                Saved Sessions
              </button>
              <button
                onClick={() => setActiveTab('schedule')}
                className={`${
                  activeTab === 'schedule'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <Clock className="h-5 w-5 mr-2" />
                My Schedule
              </button>
            </nav>
          </div>
        </div>
      </div>
      
      {/* Attendee Content */}
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
                    Registered Events
                  </p>
                  <p className="mt-1 text-3xl font-semibold text-gray-900">
                    {attendeeStats.registeredEvents}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow-sm rounded-lg">
            <div className="p-6">
              <div className="flex items-center">
                <div className="bg-secondary/10 rounded-md p-3">
                  <Bookmark className="h-6 w-6 text-secondary" />
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500 truncate">
                    Saved Sessions
                  </p>
                  <p className="mt-1 text-3xl font-semibold text-gray-900">
                    {attendeeStats.savedSessions}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow-sm rounded-lg">
            <div className="p-6">
              <div className="flex items-center">
                <div className="bg-accent/10 rounded-md p-3">
                  <CheckCircle className="h-6 w-6 text-accent" />
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500 truncate">
                    Completed Sessions
                  </p>
                  <p className="mt-1 text-3xl font-semibold text-gray-900">
                    {attendeeStats.completedSessions}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow-sm rounded-lg">
            <div className="p-6">
              <div className="flex items-center">
                <div className="bg-yellow-100 rounded-md p-3">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500 truncate">
                    Event Calendars
                  </p>
                  <p className="mt-1 text-3xl font-semibold text-gray-900">
                    {attendeeStats.eventCalendars}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {activeTab === 'events' && (
          <div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">My Registered Events</h2>
              
              <div className="mt-4 md:mt-0">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search your events..."
                    className="input pl-10"
                  />
                </div>
              </div>
            </div>
            
            {upcomingEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="bg-white overflow-hidden shadow-sm rounded-lg hover:shadow-md transition-shadow">
                    <div className="h-48 relative">
                      <img 
                        src={event.imageUrl} 
                        alt={event.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                        <div className="p-4 text-white">
                          <h3 className="text-xl font-bold">{event.title}</h3>
                          <p className="text-sm opacity-90">
                            {format(new Date(event.startDate), 'MMM d')} - {format(new Date(event.endDate), 'MMM d, yyyy')}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                        {event.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-3 mb-4">
                        <div className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium text-gray-800 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {format(new Date(event.startDate), 'MMM d')} - {format(new Date(event.endDate), 'MMM d')}
                        </div>
                        <div className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium text-gray-800 flex items-center">
                          <Video className="h-3 w-3 mr-1" />
                          {event.sessions} Sessions
                        </div>
                        <div className="bg-primary/10 px-3 py-1 rounded-full text-xs font-medium text-primary flex items-center">
                          <Bookmark className="h-3 w-3 mr-1" />
                          {event.savedSessions} Saved
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <Link 
                          to={`/events/${event.id}`} 
                          className="btn btn-primary btn-sm"
                        >
                          View Event
                        </Link>
                        <Link 
                          to={`/events/${event.id}/schedule`} 
                          className="btn btn-outline btn-sm"
                        >
                          My Schedule
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <Calendar className="h-12 w-12 mx-auto text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No registered events</h3>
                <p className="mt-1 text-sm text-gray-500">You haven't registered for any events yet.</p>
                <div className="mt-6">
                  <Link to="/events" className="btn btn-primary">
                    Browse Events
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'saved' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">My Saved Sessions</h2>
            
            {upcomingSessions.length > 0 ? (
              <div className="space-y-4">
                {upcomingSessions.map(session => (
                  <div key={session.id} className="bg-white overflow-hidden shadow-sm rounded-lg hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{session.title}</h3>
                          <p className="mt-1 text-sm text-gray-500">
                            <Link to={`/events/${session.eventId}`} className="text-primary hover:underline">
                              {session.eventTitle}
                            </Link>
                          </p>
                        </div>
                        <div className="mt-2 sm:mt-0 flex space-x-2">
                          <button 
                            className={`p-2 rounded-full ${session.saved ? 'text-primary bg-primary/10' : 'text-gray-400 hover:text-primary hover:bg-primary/10'}`}
                            title={session.saved ? 'Unsave session' : 'Save session'}
                          >
                            <Bookmark className="h-5 w-5" />
                          </button>
                          <button 
                            className={`p-2 rounded-full ${session.reminder ? 'text-yellow-500 bg-yellow-100' : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-100'}`}
                            title={session.reminder ? 'Remove reminder' : 'Set reminder'}
                          >
                            <Bell className="h-5 w-5" />
                          </button>
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
                          <div className="h-5 w-5 rounded-full bg-gray-200 mr-2 overflow-hidden flex-shrink-0">
                            <img 
                              src={session.speaker.avatar} 
                              alt={session.speaker.name} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <span className="text-sm text-gray-600">
                            {session.speaker.name}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex flex-col sm:flex-row gap-3">
                        <Link 
                          to={`/sessions/${session.id}`}
                          className="btn btn-primary"
                        >
                          <Video className="h-5 w-5 mr-2" />
                          Join Session
                        </Link>
                        <button className="btn btn-outline">
                          Add to Calendar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <Bookmark className="h-12 w-12 mx-auto text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No saved sessions</h3>
                <p className="mt-1 text-sm text-gray-500">You haven't saved any sessions yet.</p>
                <div className="mt-6">
                  <Link to="/events" className="btn btn-primary">
                    Browse Events
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'schedule' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">My Schedule</h2>
            
            <div className="bg-white overflow-hidden shadow-sm rounded-lg">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-gray-900">June 15, 2025</h3>
                  <div className="flex space-x-2">
                    <button className="btn btn-outline btn-sm">
                      Previous Day
                    </button>
                    <button className="btn btn-outline btn-sm">
                      Next Day
                    </button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {/* Timeline item */}
                  <div className="flex">
                    <div className="w-24 flex-shrink-0 text-sm text-gray-500 pt-2">
                      9:00 AM
                    </div>
                    <div className="flex-1 pl-4 border-l border-gray-200">
                      <div className="bg-gray-50 rounded-lg p-4 mb-8">
                        <h4 className="font-medium text-gray-900">Opening Keynote</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Tech Summit 2025: Main Hall
                        </p>
                        <div className="flex items-center mt-2 text-sm text-gray-600">
                          <Users className="h-4 w-4 mr-1" />
                          <span>All attendees</span>
                        </div>
                        <div className="mt-4">
                          <Link 
                            to="/sessions/opening"
                            className="btn btn-primary btn-sm"
                          >
                            Join Session
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Timeline item */}
                  <div className="flex">
                    <div className="w-24 flex-shrink-0 text-sm text-gray-500 pt-2">
                      11:00 AM
                    </div>
                    <div className="flex-1 pl-4 border-l border-gray-200">
                      <div className="bg-primary/5 border-l-4 border-primary rounded-lg p-4 mb-8">
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-900">Break & Networking</h4>
                          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                            30 minutes
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Timeline item */}
                  <div className="flex">
                    <div className="w-24 flex-shrink-0 text-sm text-gray-500 pt-2">
                      2:00 PM
                    </div>
                    <div className="flex-1 pl-4 border-l border-gray-200">
                      <div className="bg-gray-50 rounded-lg p-4 mb-8">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">The Future of Web Development</h4>
                            <p className="text-sm text-gray-600 mt-1">
                              Tech Summit 2025: Room 2A
                            </p>
                            <div className="flex items-center mt-2 text-sm text-gray-600">
                              <div className="flex items-center">
                                <div className="h-5 w-5 rounded-full mr-1 overflow-hidden">
                                  <img 
                                    src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                                    alt="Speaker" 
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <span>Sarah Johnson</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex">
                            <button className="p-2 text-primary bg-primary/10 rounded-full">
                              <Bookmark className="h-5 w-5" />
                            </button>
                            <button className="p-2 text-yellow-500 bg-yellow-100 rounded-full ml-2">
                              <Bell className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-3">
                          <Link 
                            to="/sessions/1"
                            className="btn btn-primary btn-sm"
                          >
                            <Video className="h-4 w-4 mr-2" />
                            Join Session
                          </Link>
                          <button className="btn btn-outline btn-sm">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Ask a Question
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendeeDashboard;