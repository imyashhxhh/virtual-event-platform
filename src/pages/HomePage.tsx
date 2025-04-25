import { Link } from 'react-router-dom';
import { Calendar, Layers, Users, Video, MessageSquare, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/90 to-secondary/90 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Transform Your <span className="text-accent">Virtual Events</span> Into Unforgettable Experiences
              </h1>
              <p className="text-lg md:text-xl mb-8 opacity-90">
                Seamlessly host, manage, and participate in virtual events with our comprehensive platform that brings people together from anywhere in the world.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {isAuthenticated ? (
                  <>
                    <Link 
                      to="/events/create" 
                      className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-accent text-white rounded-full transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-transparent"
                    >
                      Host an Event
                    </Link>
                    <Link 
                      to="/events" 
                      className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-white/10 text-white border-2 border-white/20 rounded-full backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
                    >
                      Browse Events
                    </Link>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/auth/login" 
                      className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-accent text-white rounded-full transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-transparent"
                    >
                      Get Started
                    </Link>
                    <Link 
                      to="/events" 
                      className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-white/10 text-white border-2 border-white/20 rounded-full backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
                    >
                      Browse Events
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Virtual Conference" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                  <div className="bg-white/90 p-4 rounded-lg text-center max-w-xs">
                    <h3 className="font-bold text-primary text-xl">Tech Summit 2025</h3>
                    <p className="text-gray-700">Join 5,000+ attendees at our premier global technology conference</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">All-in-One Event Platform</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Everything you need to create, manage, and experience virtual events that feel just as engaging as in-person gatherings.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Video className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Live Streaming</h3>
              <p className="text-gray-600">
                High-quality, low-latency streaming for all your sessions with support for screen sharing and multiple camera angles.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Event Scheduling</h3>
              <p className="text-gray-600">
                Create detailed event schedules with multiple tracks, sessions, and automatic timezone conversion for global audiences.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Interactive Tools</h3>
              <p className="text-gray-600">
                Engage your audience with live polls, Q&A sessions, chat rooms, and networking opportunities.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">User Management</h3>
              <p className="text-gray-600">
                Comprehensive tools for managing speakers, attendees, and staff with role-based permissions.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Ticketing & Registration</h3>
              <p className="text-gray-600">
                Flexible ticketing options with secure payment processing and automated registration workflows.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Layers className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Analytics & Insights</h3>
              <p className="text-gray-600">
                Detailed analytics on attendance, engagement, and audience demographics to measure event success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Upcoming Featured Events</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover and participate in trending virtual events from around the world.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Event Card 1 */}
            <div className="card card-hover overflow-hidden">
              <div className="relative h-48">
                <img 
                  src="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Tech Conference" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                  Technology
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900">Global Tech Summit</h3>
                <p className="text-gray-600 mb-4">
                  Join industry leaders and innovators for three days of cutting-edge technology discussions and workshops.
                </p>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm text-gray-500">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    June 15-17, 2025
                  </div>
                  <div className="text-sm font-medium text-primary">
                    $99 - $299
                  </div>
                </div>
                <Link 
                  to="/events/1" 
                  className="btn btn-primary btn-md w-full"
                >
                  View Details
                </Link>
              </div>
            </div>
            
            {/* Event Card 2 */}
            <div className="card card-hover overflow-hidden">
              <div className="relative h-48">
                <img 
                  src="https://images.pexels.com/photos/7256420/pexels-photo-7256420.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Marketing Conference" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-secondary text-white px-3 py-1 rounded-full text-sm font-medium">
                  Marketing
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900">Digital Marketing Masterclass</h3>
                <p className="text-gray-600 mb-4">
                  Learn the latest digital marketing strategies from experts at leading global brands.
                </p>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm text-gray-500">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    July 8-9, 2025
                  </div>
                  <div className="text-sm font-medium text-primary">
                    $75 - $150
                  </div>
                </div>
                <Link 
                  to="/events/2" 
                  className="btn btn-primary btn-md w-full"
                >
                  View Details
                </Link>
              </div>
            </div>
            
            {/* Event Card 3 */}
            <div className="card card-hover overflow-hidden">
              <div className="relative h-48">
                <img 
                  src="https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Business Conference" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                  Business
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900">Entrepreneur Summit 2025</h3>
                <p className="text-gray-600 mb-4">
                  Connect with successful entrepreneurs and venture capitalists to take your business to the next level.
                </p>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm text-gray-500">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    August 22-24, 2025
                  </div>
                  <div className="text-sm font-medium text-primary">
                    $129 - $349
                  </div>
                </div>
                <Link 
                  to="/events/3" 
                  className="btn btn-primary btn-md w-full"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/events" className="btn btn-outline btn-lg">
              View All Events
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from event organizers and attendees who have experienced the power of our platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Testimonial Author" 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Michael Thompson</h4>
                  <p className="text-sm text-gray-600">Tech Conference Organizer</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "EventHub transformed our tech conference completely. We were able to reach a global audience and the interactive features kept everyone engaged throughout the event."
              </p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Testimonial Author" 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Sarah Johnson</h4>
                  <p className="text-sm text-gray-600">Marketing Director</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "The analytics provided by EventHub helped us understand our audience better than ever before. We saw a 40% increase in engagement compared to our previous virtual events."
              </p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Testimonial Author" 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">David Chen</h4>
                  <p className="text-sm text-gray-600">Attendee</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "I've attended dozens of virtual events, and those hosted on EventHub stand out for their seamless experience and interactive features. The Q&A and networking tools are game-changers."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gradient-to-r from-secondary/90 to-primary/90 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Host Your Next Virtual Event?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of successful event organizers who are creating unforgettable virtual experiences.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/events/create" 
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-white text-primary rounded-full transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
                >
                  Create Your Event
                </Link>
                <Link 
                  to="/events" 
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-transparent border-2 border-white text-white rounded-full transition-all duration-200 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
                >
                  Browse Events
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/auth/login" 
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-white text-primary rounded-full transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
                >
                  Get Started Free
                </Link>
                <Link 
                  to="/events" 
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-transparent border-2 border-white text-white rounded-full transition-all duration-200 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
                >
                  Browse Events
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;