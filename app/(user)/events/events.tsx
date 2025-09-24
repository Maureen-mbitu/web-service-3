"use client";
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Filter, Search, Calendar, MapPin, Users, Clock } from 'lucide-react';
import { eventApi } from '../../../lib/api';
import { FALLBACK_EVENTS } from '../../../lib/constants';
import { Header } from '../../../components/Header';

export default function Events() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [showFeatured, setShowFeatured] = useState(searchParams.get('featured') === 'true');
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await eventApi.getAll({
          category: selectedCategory === 'All' ? undefined : selectedCategory,
          search: searchQuery || undefined,
          featured: showFeatured || undefined,
          page: currentPage,
          limit: 12
        });
        setEvents(response.events || response.data || []);
        setCategories(response.categories || ['All', 'Training', 'Workshop', 'Conference']);
      } catch (err) {
        setError('Failed to fetch events, using fallback data');
        console.error('Error fetching events:', err);
        // Use fallback events when API fails
        let fallbackEvents = [...FALLBACK_EVENTS];
        
        // Apply category filter to fallback data
        if (selectedCategory !== 'All') {
          fallbackEvents = fallbackEvents.filter(event => 
            event.category === selectedCategory
          );
        }
        
        // Apply search filter to fallback data
        if (searchQuery) {
          fallbackEvents = fallbackEvents.filter(event => 
            event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.description.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        
        // Apply featured filter to fallback data
        if (showFeatured) {
          fallbackEvents = fallbackEvents.filter(event => event.featured);
        }
        
        setEvents(fallbackEvents);
        setCategories(['All', 'Training', 'Workshop', 'Conference']);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [selectedCategory, searchQuery, showFeatured, currentPage]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory !== 'All') params.set('category', selectedCategory);
    if (searchQuery) params.set('search', searchQuery);
    if (showFeatured) params.set('featured', 'true');
    if (currentPage > 1) params.set('page', currentPage.toString());
    
    const newUrl = params.toString() ? `/events?${params.toString()}` : '/events';
    router.replace(newUrl, { shallow: true });
  }, [selectedCategory, searchQuery, showFeatured, currentPage, router]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleEventClick = (eventId) => {
    router.push(`/events/${eventId}`);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return {
      day: date.getDate().toString().padStart(2, '0'),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      year: date.getFullYear()
    };
  };

  const renderEventCard = (event) => {
    const dateInfo = formatDate(event.date);
    const isFullyBooked = event.currentAttendees >= event.maxAttendees;

    return (
      <div 
        key={event.id}
        className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
        onClick={() => handleEventClick(event.id)}
      >
        {/* Background Image */}
        <div className="h-80 bg-cover bg-center relative" 
             style={{backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 100%), url('${event.image}')`}}>
          
          {/* Date Badge */}
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-gray-800 text-center rounded-lg p-2 min-w-[50px] shadow-lg">
            <div className="text-lg font-bold">{dateInfo.day}</div>
            <div className="text-xs uppercase font-semibold">{dateInfo.month}</div>
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4 bg-green-600/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">
            {event.category}
          </div>

          {/* Featured Badge */}
          {event.featured && (
            <div className="absolute top-16 left-4 bg-yellow-500/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">
              Featured
            </div>
          )}

          {/* Fully Booked Badge */}
          {isFullyBooked && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-600/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">
              Fully Booked
            </div>
          )}

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-xl font-bold mb-3 leading-tight">{event.title}</h3>
            <p className="text-white/90 text-sm mb-4 leading-relaxed line-clamp-2">{event.description}</p>
            
            {/* Event Details */}
            <div className="space-y-2 mb-4 text-xs text-white/80">
              <div className="flex items-center gap-2">
                <Calendar size={14} />
                <span>{event.date} at {event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={14} />
                <span>{event.currentAttendees}/{event.maxAttendees} attendees</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">
                {event.price > 0 ? `KSh ${event.price.toLocaleString()}` : 'Free'}
              </div>
              <button 
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  isFullyBooked 
                    ? 'bg-gray-500 text-white cursor-not-allowed' 
                    : 'bg-white text-gray-800 hover:bg-gray-100'
                }`}
                disabled={isFullyBooked}
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle registration
                }}
              >
                {isFullyBooked ? 'Fully Booked' : 'Register Now'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Events & Trainings
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join workshops, conferences, and training sessions to learn about sustainable agriculture and connect with the farming community.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </form>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 items-center">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              {/* Featured Filter */}
              <button
                onClick={() => {
                  setShowFeatured(!showFeatured);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  showFeatured 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <Filter size={16} className="inline mr-2" />
                Featured Only
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="h-80 bg-gray-200 animate-pulse"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg inline-block">
              {error}
            </div>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-12">
            <Calendar size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No events found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Found <span className="font-semibold">{events.length}</span> event{events.length !== 1 ? 's' : ''}
                {selectedCategory !== 'All' && (
                  <span> in <span className="font-semibold">{selectedCategory}</span></span>
                )}
              </p>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {events.map(renderEventCard)}
            </div>

            {/* Load More / Pagination could go here */}
          </>
        )}
      </div>

      {/* CTA Section */}
      <section className="bg-green-600 py-16 px-4 md:px-8 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/veges.png')] opacity-20 bg-contain bg-repeat"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Don't Miss Our Upcoming Trainings
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join free webinars and in-person workshops to learn agroecology techniques from experts and farmers like you.
          </p>
          <button 
            onClick={() => setShowFeatured(true)}
            className="bg-white text-green-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-full text-sm transition-colors duration-300"
          >
            View Featured Events
          </button>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-[#2C2A29] py-16 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4 text-white">
            <div className="flex-shrink-0">
              <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-2">Stay Updated on Events</h3>
              <p className="text-gray-300 text-sm md:text-base">
                Get notified about upcoming workshops, webinars, and training opportunities.
              </p>
            </div>
          </div>
          <div className="flex w-full md:w-auto min-w-80">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 text-gray-900 bg-white rounded-l-full focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            />
            <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-r-full font-medium text-sm transition-colors duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}