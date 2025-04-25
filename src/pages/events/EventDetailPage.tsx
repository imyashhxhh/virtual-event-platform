import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Tag, 
  Video,
  Bookmark,
  Share2,
  MessageSquare,
  CheckCircle,
  ChevronRight,
  User
} from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

// Mock data
const mockEvents = [
  {
    id: '1',
    title: 'Tech Summit 2025',
    description: 'Global technology conference featuring industry leaders and innovators discussing the latest trends, breakthroughs, and future of technology. Join thousands of professionals for three days of learning, networking, and inspiration.',
    startDate: '2025-06-15T09:00:00Z',
    endDate: '2025-06-17T18:00:00Z',
    location: 'Virtual',
    imageUrl: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 99,
    vipPrice: 199,
    sessions: 45,
    attendees: 1250,
    organizer: {
      id: '1',
      name: 'TechCorp',
      logo: 'https://images.pexels.com/photos/15435767/pexels-photo-15435767/free-photo-of-a-letter-t-logo.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Leading technology events company specialized in creating immersive virtual experiences.'
    },
    tags: ['Technology', 'Innovation', 'AI', 'Web Development'],
    speakers: [
      {
        id: '1',
        name: 'Sarah Johnson',
        title: 'CTO, FutureTech',
        bio: 'Sarah is a leading expert in AI and machine learning with over 15 years of experience in the tech industry.',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        id: '2',
        name: 'Michael Thompson',
        title: 'Director of Engineering, CodeCorp',
        bio: 'Michael leads large-scale distributed systems development and is passionate about cloud architecture.',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        id: '3',
        name: 'David Chen',
        title: 'Product Lead, InnovateLabs',
        bio: 'David specializes in product strategy and has launched multiple successful software products.',
        avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }
    ],
    schedule: [
      {
        day: 'Day 1 - June 15, 2025',
        sessions: [
          {
            id: '101',
            title: 'Opening Keynote: The Future of Technology',
            time: '9:00 AM - 10:30 AM',
            speaker: 'Sarah Johnson',
            description: 'Join our opening keynote to explore the most exciting technological trends shaping our future.',
            location: 'Main Stage'
          },
          {
            id: '102',
            title: 'Web Development in 2025',
            time: '11:00 AM - 12:00 PM',
            speaker: 'Michael Thompson',
            description: 'Discover the latest web development techniques and tools that are transforming the industry.',
            location: 'Track 1'
          },
          {
            id: '103',
            title: 'AI-Driven Product Design',
            time: '1:00 PM - 2:00 PM',
            speaker: 'David Chen',
            description: 'Learn how artificial intelligence is revolutionizing product design and user experiences.',
            location: 'Track 2'
          }
        ]
      },
      {
        day: 'Day 2 - June 16, 2025',
        sessions: [
          {
            id: '201',
            title: 'Building Scalable Applications',
            time: '10:00 AM - 11:30 AM',
            speaker: 'Michael Thompson',
            description: 'Explore architectures and patterns for building applications that can scale to millions of users.',
            location: 'Track 1'
          },
          {
            id: '202',
            title: 'Machine Learning Workshop',
            time: '1:00 PM - 3:00 PM',
            speaker: 'Sarah Johnson',
            description: 'Hands-on workshop introducing practical machine learning techniques you can apply today.',
            location: 'Workshop Room A'
          }
        ]
      },
      {
        day: 'Day 3 - June 17, 2025',
        sessions: [
          {
            id: '301',
            title: 'Future of Cloud Computing',
            time: '9:30 AM - 10:30 AM',
            speaker: 'David Chen',
            description: 'Explore emerging trends in cloud computing and how they will shape the future of software deployment.',
            location: 'Track 2'
          },
          {
            id: '302',
            title: 'Closing Panel: Technology Ethics',
            time: '4:00 PM - 5:30 PM',
            speaker: 'All Speakers',
            description: 'Join our distinguished panel for a discussion on ethical considerations in technology development.',
            location: 'Main Stage'
          }
        ]
      }
    ]
  }
];

const EventDetailPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [ticketType, setTicketType] = useState('general');
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    // Simulate API call to fetch event details
    setIsLoading(true);
    setTimeout(() => {
      const foundEvent = mockEvents.find(e => e.id === eventId);
      setEvent(foundEvent || null);
      setIsLoading(false);
    }, 500);
  }, [eventId]);
  
  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  
  if (!event) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Event Not Found</h2>
          <p className="mt-2 text-gray-600">The event you're looking for doesn't exist or has been removed.</p>
          <div className="mt-6">
            <Link to="/events" className="btn btn-primary">
              Browse Events
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 pb-12">
      {/* Event Header */}
      <div 
        className="relative h-80 bg-cover bg-center"
        style={{ backgroundImage: `url(${event.imageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 h-full flex flex-col justify-end">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between text-white">
              <div>
                <div className="flex items-center text-sm font-medium mb-2">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>
                    {format(new Date(event.startDate), 'MMMM d')} - {format(new Date(event.endDate), 'MMMM d, yyyy')}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{event.title}</h1>
                <p className="text-white/80">Organized by {event.organizer.name}</p>
              </div>
              
              <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
                <button className="btn bg-white text-primary hover:bg-gray-100">
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </button>
                <button className="btn border border-white bg-transparent text-white hover:bg-white/10">
                  <Bookmark className="h-5 w-5 mr-2" />
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Event Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Event Navigation */}
        <div className="bg-white border-b border-gray-200 rounded-t-lg">
          <nav className="-mb-px flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`${
                activeTab === 'overview'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`${
                activeTab === 'schedule'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
            >
              Schedule
            </button>
            <button
              onClick={() => setActiveTab('speakers')}
              className={`${
                activeTab === 'speakers'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
            >
              Speakers
            </button>
          </nav>
        </div>
        
        <div className="bg-white shadow-sm rounded-b-lg">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h2>
                  <p className="text-gray-700 mb-6">
                    {event.description}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-2 rounded-md mr-3">
                        <Calendar className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">Date and Time</h3>
                        <p className="text-sm text-gray-600">
                          {format(new Date(event.startDate), 'MMMM d, yyyy')} - {format(new Date(event.endDate), 'MMMM d, yyyy')}
                        </p>
                        <p className="text-sm text-gray-600">
                          {format(new Date(event.startDate), 'h:mm a')} - {format(new Date(event.endDate), 'h:mm a')} (Your local time)
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-2 rounded-md mr-3">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">Location</h3>
                        <p className="text-sm text-gray-600">{event.location}</p>
                        <p className="text-sm text-gray-600">Access link will be provided after registration</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-2 rounded-md mr-3">
                        <Video className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">Sessions</h3>
                        <p className="text-sm text-gray-600">{event.sessions} sessions</p>
                        <p className="text-sm text-gray-600">Live and interactive with Q&A</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-2 rounded-md mr-3">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">Attendees</h3>
                        <p className="text-sm text-gray-600">{event.attendees.toLocaleString()} registered attendees</p>
                        <p className="text-sm text-gray-600">Connect with professionals worldwide</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Event Tags</h2>
                    <div className="flex flex-wrap gap-2">
                      {event.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                        >
                          <Tag className="h-4 w-4 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Organizer</h2>
                    <div className="flex items-start">
                      <div className="h-12 w-12 bg-gray-200 rounded-full overflow-hidden mr-4">
                        <img 
                          src={event.organizer.logo} 
                          alt={event.organizer.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{event.organizer.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {event.organizer.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Ticket Info and Registration */}
                <div>
                  <div className="bg-gray-50 rounded-lg p-6 sticky top-20">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Registration</h3>
                    
                    <div className="space-y-4 mb-6">
                      <div 
                        className={`border rounded-lg p-4 cursor-pointer ${
                          ticketType === 'general' 
                            ? 'border-primary bg-primary/5' 
                            : 'border-gray-200 hover:border-primary/50'
                        }`}
                        onClick={() => setTicketType('general')}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium text-gray-900">General Admission</h4>
                            <p className="text-sm text-gray-600 mt-1">
                              Access to all sessions and networking
                            </p>
                          </div>
                          <div className="text-lg font-bold text-gray-900">${event.price}</div>
                        </div>
                      </div>
                      
                      <div 
                        className={`border rounded-lg p-4 cursor-pointer ${
                          ticketType === 'vip' 
                            ? 'border-primary bg-primary/5' 
                            : 'border-gray-200 hover:border-primary/50'
                        }`}
                        onClick={() => setTicketType('vip')}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="flex items-center">
                              <h4 className="font-medium text-gray-900">VIP Access</h4>
                              <span className="ml-2 bg-secondary/20 text-secondary text-xs px-2 py-0.5 rounded-full">
                                POPULAR
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              Priority Q&A, exclusive content, and 1-on-1 networking
                            </p>
                          </div>
                          <div className="text-lg font-bold text-gray-900">${event.vipPrice}</div>
                        </div>
                      </div>
                    </div>
                    
                    {isAuthenticated ? (
                      <button className="btn btn-primary w-full mb-4">
                        Register Now
                      </button>
                    ) : (
                      <div>
                        <Link to="/auth/login?redirect=events/1" className="btn btn-primary w-full mb-3">
                          Sign in to Register
                        </Link>
                        <Link to="/auth/register?redirect=events/1" className="btn btn-outline w-full mb-4">
                          Create Account
                        </Link>
                      </div>
                    )}
                    
                    <div className="text-sm text-gray-600">
                      <div className="flex items-start mb-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Secure payment processing</span>
                      </div>
                      <div className="flex items-start mb-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Access link will be sent via email</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Full refund available up to 7 days before the event</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Schedule Tab */}
          {activeTab === 'schedule' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Schedule</h2>
              
              <div className="space-y-8">
                {event.schedule.map((day: any, index: number) => (
                  <div key={index}>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{day.day}</h3>
                    
                    <div className="space-y-4">
                      {day.sessions.map((session: any) => (
                        <div key={session.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-primary/30 transition-colors">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900">{session.title}</h4>
                              <div className="mt-1 flex flex-col sm:flex-row sm:items-center gap-x-4 text-sm text-gray-600">
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  {session.time}
                                </div>
                                <div className="flex items-center">
                                  <User className="h-4 w-4 mr-1" />
                                  {session.speaker}
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {session.location}
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-2 md:mt-0 flex">
                              <button className="text-primary hover:text-primary/80 flex items-center">
                                Add to My Schedule
                                <ChevronRight className="h-4 w-4 ml-1" />
                              </button>
                            </div>
                          </div>
                          
                          <p className="mt-2 text-sm text-gray-600">
                            {session.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Speakers Tab */}
          {activeTab === 'speakers' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Speakers</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {event.speakers.map((speaker: any) => (
                  <div key={speaker.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="flex items-start">
                        <div className="h-16 w-16 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                          <img 
                            src={speaker.avatar} 
                            alt={speaker.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900">{speaker.name}</h3>
                          <p className="text-sm font-medium text-primary">{speaker.title}</p>
                        </div>
                      </div>
                      
                      <p className="mt-4 text-sm text-gray-600">
                        {speaker.bio}
                      </p>
                      
                      <div className="mt-4 flex space-x-3">
                        <button className="btn btn-sm btn-outline">
                          View Sessions
                        </button>
                        <button className="btn btn-sm btn-outline">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Contact
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;