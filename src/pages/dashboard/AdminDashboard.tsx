import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  BarChart2, 
  Settings, 
  Plus, 
  Edit, 
  Trash2,

  ChevronDown,
  Search
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { format } from 'date-fns';

// Mock data
const mockEvents = [
  {
    id: '1',
    title: 'Tech Summit 2025',
    description: 'Global technology conference featuring industry leaders',
    startDate: '2025-06-15T09:00:00Z',
    endDate: '2025-06-17T18:00:00Z',
    attendees: 1250,
    sessions: 45,
    status: 'upcoming',
  },
  {
    id: '2',
    title: 'Digital Marketing Masterclass',
    description: 'Learn advanced digital marketing strategies',
    startDate: '2025-07-08T10:00:00Z',
    endDate: '2025-07-09T17:00:00Z',
    attendees: 780,
    sessions: 12,
    status: 'upcoming',
  },
  {
    id: '3',
    title: 'Entrepreneur Summit 2025',
    description: 'Connect with successful entrepreneurs and VCs',
    startDate: '2025-08-22T09:00:00Z',
    endDate: '2025-08-24T17:00:00Z',
    attendees: 950,
    sessions: 30,
    status: 'draft',
  },
  {
    id: '4',
    title: 'Design Systems Workshop',
    description: 'Comprehensive workshop on building design systems',
    startDate: '2025-04-10T09:00:00Z',
    endDate: '2025-04-10T17:00:00Z',
    attendees: 430,
    sessions: 8,
    status: 'completed',
  }
];

// Mock analytics data
const analyticsData = {
  totalEvents: 12,
  activeUsers: 4328,
  totalRevenue: 58750,
  upcomingEvents: 3
};

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('events');
  const [filter, setFilter] = useState('all');
  
  const filteredEvents = filter === 'all' 
    ? mockEvents 
    : mockEvents.filter(event => event.status === filter);
  
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 pb-12">
      {/* Admin Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="mt-1 text-sm text-gray-600">
                Welcome back, {user?.name}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link to="/events/new" className="btn btn-primary">
                <Plus className="h-5 w-5 mr-2" />
                Create New Event
              </Link>
            </div>
          </div>
          
          {/* Admin Navigation */}
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
                Events
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`${
                  activeTab === 'users'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <Users className="h-5 w-5 mr-2" />
                Users
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`${
                  activeTab === 'analytics'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <BarChart2 className="h-5 w-5 mr-2" />
                Analytics
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`${
                  activeTab === 'settings'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <Settings className="h-5 w-5 mr-2" />
                Settings
              </button>
            </nav>
          </div>
        </div>
      </div>
      
      {/* Admin Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'events' && (
          <div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Manage Events</h2>
              
              <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search events..."
                    className="input pl-10"
                  />
                </div>
                
                {/* Filter */}
                <div className="relative inline-block text-left">
                  <div>
                    <button
                      type="button"
                      className="btn btn-outline flex items-center"
                      aria-expanded="true"
                      aria-haspopup="true"
                    >
                      {filter === 'all' && 'All Events'}
                      {filter === 'upcoming' && 'Upcoming Events'}
                      {filter === 'draft' && 'Draft Events'}
                      {filter === 'completed' && 'Completed Events'}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    <div className="py-1">
                      <button
                        onClick={() => setFilter('all')}
                        className={`${
                          filter === 'all' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } block w-full text-left px-4 py-2 text-sm hover:bg-gray-100`}
                      >
                        All Events
                      </button>
                      <button
                        onClick={() => setFilter('upcoming')}
                        className={`${
                          filter === 'upcoming' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } block w-full text-left px-4 py-2 text-sm hover:bg-gray-100`}
                      >
                        Upcoming Events
                      </button>
                      <button
                        onClick={() => setFilter('draft')}
                        className={`${
                          filter === 'draft' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } block w-full text-left px-4 py-2 text-sm hover:bg-gray-100`}
                      >
                        Draft Events
                      </button>
                      <button
                        onClick={() => setFilter('completed')}
                        className={`${
                          filter === 'completed' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } block w-full text-left px-4 py-2 text-sm hover:bg-gray-100`}
                      >
                        Completed Events
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Events Table */}
            <div className="bg-white overflow-hidden shadow-sm rounded-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Event
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Attendees
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sessions
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredEvents.map(event => (
                      <tr key={event.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-primary/10 rounded-md flex items-center justify-center">
                              <Calendar className="h-6 w-6 text-primary" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                <Link to={`/events/${event.id}`} className="hover:text-primary">
                                  {event.title}
                                </Link>
                              </div>
                              <div className="text-sm text-gray-500 truncate max-w-xs">
                                {event.description}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {format(new Date(event.startDate), 'MMM d, yyyy')}
                          </div>
                          <div className="text-sm text-gray-500">
                            {format(new Date(event.startDate), 'MMM d')} - {format(new Date(event.endDate), 'MMM d, yyyy')}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {event.attendees.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {event.sessions}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span 
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${event.status === 'upcoming' ? 'bg-green-100 text-green-800' : 
                                event.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-gray-100 text-gray-800'}
                            `}
                          >
                            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <Link 
                              to={`/events/${event.id}/edit`} 
                              className="text-primary hover:text-primary/80"
                              title="Edit"
                            >
                              <Edit className="h-5 w-5" />
                            </Link>
                            <button
                              className="text-red-600 hover:text-red-800"
                              title="Delete"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredEvents.length === 0 && (
                <div className="py-8 text-center text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-lg font-medium">No events found</p>
                  <p className="mt-1">Try changing your search or filter criteria</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'analytics' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Platform Analytics</h2>
            
            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="bg-primary/10 rounded-md p-3">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <div className="ml-5">
                      <p className="text-sm font-medium text-gray-500 truncate">
                        Total Events
                      </p>
                      <p className="mt-1 text-3xl font-semibold text-gray-900">
                        {analyticsData.totalEvents}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="bg-secondary/10 rounded-md p-3">
                      <Users className="h-6 w-6 text-secondary" />
                    </div>
                    <div className="ml-5">
                      <p className="text-sm font-medium text-gray-500 truncate">
                        Active Users
                      </p>
                      <p className="mt-1 text-3xl font-semibold text-gray-900">
                        {analyticsData.activeUsers.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="bg-green-100 rounded-md p-3">
                      <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-5">
                      <p className="text-sm font-medium text-gray-500 truncate">
                        Total Revenue
                      </p>
                      <p className="mt-1 text-3xl font-semibold text-gray-900">
                        ${analyticsData.totalRevenue.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="bg-yellow-100 rounded-md p-3">
                      <Calendar className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div className="ml-5">
                      <p className="text-sm font-medium text-gray-500 truncate">
                        Upcoming Events
                      </p>
                      <p className="mt-1 text-3xl font-semibold text-gray-900">
                        {analyticsData.upcomingEvents}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Analytics Charts Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">User Engagement</h3>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Engagement chart will be displayed here</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Overview</h3>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Revenue chart will be displayed here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'users' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">User Management</h2>
            <div className="bg-white overflow-hidden shadow-sm rounded-lg">
              <div className="p-6">
                <p className="text-gray-500">User management interface will be displayed here</p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Platform Settings</h2>
            <div className="bg-white overflow-hidden shadow-sm rounded-lg">
              <div className="p-6">
                <p className="text-gray-500">Settings interface will be displayed here</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;