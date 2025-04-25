import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Search, 
  Filter, 
  ChevronDown,
  Tag,
  MapPin,
  Users
} from 'lucide-react';
import { format } from 'date-fns';

// Mock data
const mockEvents = [
  {
    id: '1',
    title: 'Tech Summit 2025',
    description: 'Global technology conference featuring industry leaders and innovators discussing the latest trends, breakthroughs, and future of technology.',
    startDate: '2025-06-15T09:00:00Z',
    endDate: '2025-06-17T18:00:00Z',
    location: 'Virtual',
    imageUrl: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 99,
    sessions: 45,
    attendees: 1250,
    organizer: 'TechCorp',
    tags: ['Technology', 'Innovation', 'AI', 'Web Development']
  },
  {
    id: '2',
    title: 'Digital Marketing Masterclass',
    description: 'Learn advanced digital marketing strategies from experts at leading global brands. Perfect for marketers looking to enhance their skills.',
    startDate: '2025-07-08T10:00:00Z',
    endDate: '2025-07-09T17:00:00Z',
    location: 'Virtual',
    imageUrl: 'https://images.pexels.com/photos/7256420/pexels-photo-7256420.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 75,
    sessions: 12,
    attendees: 780,
    organizer: 'Marketing Pros',
    tags: ['Marketing', 'Digital', 'SEO', 'Content Strategy']
  },
  {
    id: '3',
    title: 'Entrepreneur Summit 2025',
    description: 'Connect with successful entrepreneurs and venture capitalists to take your business to the next level. Get inspired and find funding opportunities.',
    startDate: '2025-08-22T09:00:00Z',
    endDate: '2025-08-24T17:00:00Z',
    location: 'Virtual',
    imageUrl: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 129,
    sessions: 30,
    attendees: 950,
    organizer: 'StartupConnect',
    tags: ['Business', 'Entrepreneurship', 'Startups', 'Venture Capital']
  },
  {
    id: '4',
    title: 'Design Systems Workshop',
    description: 'Comprehensive workshop on building robust design systems that scale. Learn from industry leaders about creating consistent user experiences.',
    startDate: '2025-09-10T09:00:00Z',
    endDate: '2025-09-10T17:00:00Z',
    location: 'Virtual',
    imageUrl: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 49,
    sessions: 8,
    attendees: 430,
    organizer: 'DesignHub',
    tags: ['Design', 'UX', 'UI', 'Creative']
  },
  {
    id: '5',
    title: 'AI & Machine Learning Conference',
    description: 'Explore the latest advancements in artificial intelligence and machine learning with researchers and industry professionals.',
    startDate: '2025-10-15T09:00:00Z',
    endDate: '2025-10-17T18:00:00Z',
    location: 'Virtual',
    imageUrl: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 149,
    sessions: 36,
    attendees: 1100,
    organizer: 'AI Research Institute',
    tags: ['AI', 'Machine Learning', 'Data Science', 'Research']
  },
  {
    id: '6',
    title: 'Global Health Summit',
    description: 'Join healthcare professionals, researchers, and policy makers to discuss global health challenges and innovations in healthcare delivery.',
    startDate: '2025-11-05T09:00:00Z',
    endDate: '2025-11-07T17:00:00Z',
    location: 'Virtual',
    imageUrl: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 85,
    sessions: 28,
    attendees: 920,
    organizer: 'Global Health Initiative',
    tags: ['Healthcare', 'Medicine', 'Public Health', 'Research']
  }
];

// All unique tags from the events
const allTags = [...new Set(mockEvents.flatMap(event => event.tags))];

const EventsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Filter events based on search term and selected tags
  const filteredEvents = mockEvents.filter(event => {
    // Filter by search term
    const matchesSearch = searchTerm === '' || 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by tags
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => event.tags.includes(tag));
    
    // Filter by price range
    const matchesPrice = event.price >= priceRange[0] && event.price <= priceRange[1];
    
    return matchesSearch && matchesTags && matchesPrice;
  });
  
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTags([]);
    setPriceRange([0, 200]);
  };
  
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 pb-12">
      {/* Events Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            Discover Upcoming Virtual Events
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-center opacity-90">
            Browse and register for upcoming virtual events from around the world. 
            Learn from industry experts and connect with like-minded professionals.
          </p>
          
          {/* Search bar */}
          <div className="mt-8 max-w-xl mx-auto">
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-white opacity-60" />
              </div>
              <input
                type="text"
                placeholder="Search events by title, description, or organizer..."
                className="form-input block w-full pl-10 py-3 bg-white/10 border-transparent rounded-md focus:border-white focus:bg-white/20 focus:ring-0 text-white placeholder-white/60"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Events Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters (Desktop) */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white shadow-sm rounded-lg p-6 sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Filters</h3>
                <button 
                  onClick={clearFilters}
                  className="text-sm text-primary hover:text-primary/80"
                >
                  Clear all
                </button>
              </div>
              
              {/* Tags filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Categories</h4>
                <div className="space-y-2">
                  {allTags.map(tag => (
                    <div key={tag} className="flex items-center">
                      <input
                        id={`tag-${tag}`}
                        type="checkbox"
                        className="h-4 w-4 text-primary border-gray-300 rounded"
                        checked={selectedTags.includes(tag)}
                        onChange={() => toggleTag(tag)}
                      />
                      <label htmlFor={`tag-${tag}`} className="ml-2 text-sm text-gray-700">
                        {tag}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price range filter */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Price Range</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between items-center">
                    <input
                      type="number"
                      min="0"
                      max={priceRange[1]}
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="input w-20 text-sm py-1"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="number"
                      min={priceRange[0]}
                      max="200"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="input w-20 text-sm py-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Events List */}
          <div className="flex-1">
            {/* Mobile Filters */}
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="w-full btn btn-outline flex items-center justify-between"
              >
                <div className="flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  <span>Filter Events</span>
                </div>
                <ChevronDown className={`h-5 w-5 transform ${isFilterOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isFilterOpen && (
                <div className="mt-4 bg-white shadow-sm rounded-lg p-4">
                  {/* Tags filter (Mobile) */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Categories</h4>
                    <div className="flex flex-wrap gap-2">
                      {allTags.map(tag => (
                        <button
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            selectedTags.includes(tag)
                              ? 'bg-primary text-white'
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Price range filter (Mobile) */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Price Range</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="200"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full"
                      />
                      <div className="flex justify-between items-center">
                        <input
                          type="number"
                          min="0"
                          max={priceRange[1]}
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                          className="input w-20 text-sm py-1"
                        />
                        <span className="text-gray-500">to</span>
                        <input
                          type="number"
                          min={priceRange[0]}
                          max="200"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                          className="input w-20 text-sm py-1"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <button 
                      onClick={clearFilters}
                      className="text-sm text-primary hover:text-primary/80"
                    >
                      Clear all filters
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {filteredEvents.length} {filteredEvents.length === 1 ? 'Event' : 'Events'} Found
              </h2>
              
              <div className="hidden md:block">
                <select className="input">
                  <option>Sort by Date (Ascending)</option>
                  <option>Sort by Date (Descending)</option>
                  <option>Sort by Price (Low to High)</option>
                  <option>Sort by Price (High to Low)</option>
                  <option>Sort by Popularity</option>
                </select>
              </div>
            </div>
            
            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredEvents.map(event => (
                  <div key={event.id} className="bg-white overflow-hidden shadow-sm rounded-lg hover:shadow-md transition-shadow">
                    <div className="h-48 relative">
                      <img 
                        src={event.imageUrl} 
                        alt={event.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                        <div className="p-4 text-white">
                          <div className="flex items-center text-xs font-medium mb-2">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>
                              {format(new Date(event.startDate), 'MMM d')} - {format(new Date(event.endDate), 'MMM d, yyyy')}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold">{event.title}</h3>
                          <p className="text-sm opacity-90">Organized by {event.organizer}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-600 line-clamp-2 h-10">
                        {event.description}
                      </p>
                      
                      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center mb-2 sm:mb-0">
                          <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                          <span className="text-sm text-gray-600">{event.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-gray-500 mr-1" />
                          <span className="text-sm text-gray-600">{event.attendees.toLocaleString()} attendees</span>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex flex-wrap gap-2">
                        {event.tags.slice(0, 3).map(tag => (
                          <span 
                            key={tag}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {tag}
                          </span>
                        ))}
                        {event.tags.length > 3 && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            +{event.tags.length - 3}
                          </span>
                        )}
                      </div>
                      
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-lg font-bold text-gray-900">
                          ${event.price}
                        </span>
                        <Link 
                          to={`/events/${event.id}`} 
                          className="btn btn-primary"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <Calendar className="h-12 w-12 mx-auto text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No events found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filters to find events.</p>
                <div className="mt-6">
                  <button 
                    onClick={clearFilters}
                    className="btn btn-primary"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;