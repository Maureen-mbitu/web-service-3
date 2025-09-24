"use client";

import { useState, useEffect } from "react";
import { Search, MapPin, Clock, Phone, Mail, Star, Filter, Grid, Map as MapIcon } from "lucide-react";

// Define types for TypeScript
interface Outlet {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  hours: string;
  services: string[];
  manager: string;
  image: string;
  rating: number;
  reviews: number;
}

export default function OutletsNew() {
  const [outlets, setOutlets] = useState<Outlet[]>([]);
  const [filteredOutlets, setFilteredOutlets] = useState<Outlet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState("All");
  const [viewMode, setViewMode] = useState<'list' | 'map'>('map');
  
  // Service filter options
  const serviceOptions = ['All', 'Products', 'Consultation', 'Training', 'Delivery', 'Support', 'Research'];

  useEffect(() => {
    const fetchOutlets = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/outlets');
        if (!response.ok) {
          throw new Error('Failed to fetch outlets');
        }
        const data = await response.json();
        setOutlets(data.outlets);
        setFilteredOutlets(data.outlets);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch outlets');
        console.error('Error fetching outlets:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOutlets();
  }, []);

  useEffect(() => {
    let filtered = outlets;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(outlet => 
        outlet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        outlet.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        outlet.manager.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by service
    if (selectedService !== 'All') {
      filtered = filtered.filter(outlet => 
        outlet.services.includes(selectedService)
      );
    }

    setFilteredOutlets(filtered);
  }, [outlets, searchQuery, selectedService]);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" size={16} className="fill-yellow-200 text-yellow-400" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={16} className="text-gray-300" />);
    }

    return stars;
  };

  const OutletCard = ({ outlet }: { outlet: Outlet }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48">
        <img
          src={outlet.image}
          alt={outlet.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            e.currentTarget.nextElementSibling.style.display = 'flex';
          }}
        />
        <div 
          className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 items-center justify-center text-green-700 text-4xl font-bold rounded-t-xl" 
          style={{display: 'none'}}
        >
          {outlet.name.charAt(0)}
        </div>
        <div className="absolute top-4 right-4">
          <div className="bg-white rounded-full px-3 py-1 flex items-center gap-1 shadow-md">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold">{outlet.rating}</span>
            <span className="text-xs text-gray-500">({outlet.reviews})</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{outlet.name}</h3>
        <div className="space-y-3 mb-4">
          <div className="flex items-start gap-2">
            <MapPin size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
            <span className="text-gray-600 text-sm">{outlet.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-green-600" />
            <span className="text-gray-600 text-sm">{outlet.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-green-600" />
            <span className="text-gray-600 text-sm">{outlet.email}</span>
          </div>
          <div className="flex items-start gap-2">
            <Clock size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
            <span className="text-gray-600 text-sm">{outlet.hours}</span>
          </div>
        </div>
        
        <div className="mb-4">
          <span className="text-sm text-gray-500 mb-2 block">Services:</span>
          <div className="flex flex-wrap gap-2">
            {outlet.services.map((service, index) => (
              <span key={index} className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                {service}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Manager:</span> {outlet.manager}
          </div>
          <div className="flex items-center gap-1">
            {renderStars(outlet.rating)}
          </div>
        </div>
        
        <div className="flex gap-2 mt-4">
          <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
            Contact
          </button>
          <button className="flex-1 border border-green-600 text-green-600 hover:bg-green-50 py-2 px-4 rounded-lg text-sm font-medium transition-colors">
            Directions
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="text-center mb-8">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded mb-4 mx-auto max-w-2xl"></div>
              <div className="h-6 bg-gray-200 rounded mx-auto max-w-4xl"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="text-center py-12">
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Outlets</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Explore Certified Outlets <br className="hidden sm:block" />
              Across Africa
            </h1>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Discover a growing network of agroecological and ecological organic agriculture 
              producers, retailers, and marketplaces. All listings are verified to meet 
              sustainable farming principles.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-8">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search outlets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
              >
                {serviceOptions.map(service => (
                  <option key={service} value={service}>{service} Services</option>
                ))}
              </select>
              
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    viewMode === 'list'
                      ? 'bg-white text-green-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Grid size={16} />
                  List View
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    viewMode === 'map'
                      ? 'bg-white text-green-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <MapIcon size={16} />
                  Map View
                </button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing <span className="font-semibold">{filteredOutlets.length}</span> of {outlets.length} outlets
              {searchQuery && (
                <span> for "<span className="font-semibold">{searchQuery}</span>"</span>
              )}
              {selectedService !== 'All' && (
                <span> with <span className="font-semibold">{selectedService}</span> services</span>
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {viewMode === 'list' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredOutlets.map((outlet) => (
              <OutletCard key={outlet.id} outlet={outlet} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-2/3">
              <div className="h-[600px] w-full rounded-xl overflow-hidden shadow-lg border">
                <iframe
                  title="Kenya Outlets Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.635984352418!2d36.8219467!3d-1.2920659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d83281d997%3A0x4a6b8dd22bd62df0!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2ske!4v1698492348234!5m2!1sen!2ske"
                  className="w-full h-full"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
            
            <div className="lg:w-1/3">
              <div className="bg-white rounded-xl shadow-lg p-6 max-h-[600px] overflow-y-auto">
                <h3 className="text-lg font-semibold mb-4">All Locations</h3>
                <div className="space-y-4">
                  {filteredOutlets.map((outlet) => (
                    <div key={outlet.id} className="border border-gray-100 rounded-lg p-4 hover:border-green-300 cursor-pointer transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900">{outlet.name}</h4>
                        <div className="flex items-center gap-1">
                          <Star size={14} className="fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{outlet.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{outlet.address}</p>
                      <p className="text-sm text-gray-500 mb-2">{outlet.phone}</p>
                      <div className="flex flex-wrap gap-1">
                        {outlet.services.slice(0, 2).map((service, index) => (
                          <span key={index} className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                            {service}
                          </span>
                        ))}
                        {outlet.services.length > 2 && (
                          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                            +{outlet.services.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {filteredOutlets.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No outlets found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or clearing the filters.
            </p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedService('All');
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Call to Action Section */}
      <section className="bg-green-600 py-16 px-4 md:px-8 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/veges.png')] opacity-20 bg-contain bg-repeat"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Your Story Could Inspire Thousands
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Have you started your agroecology journey? Share your experience and become part
            of a growing movement across Africa.
          </p>
          <button className="bg-white text-green-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-full text-sm transition-colors duration-300">
            Share your Story
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
              <h3 className="text-xl md:text-2xl font-bold mb-2">Stay Connected</h3>
              <p className="text-gray-300 text-sm md:text-base">
                Get updates on new outlets and agroecological opportunities near you.
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