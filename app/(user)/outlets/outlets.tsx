"use client";

import { useState, useEffect } from "react";
import { Search, MapPin, Clock, Phone, Mail, Star, Filter, Grid, Map as MapIcon } from "lucide-react";
import { Header } from "../../../components/Header";
import { FALLBACK_OUTLETS } from "../../../lib/constants";

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

export default function Outlets() {
  const [outlets, setOutlets] = useState<Outlet[]>([]);
  const [filteredOutlets, setFilteredOutlets] = useState<Outlet[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState("All");
  const [viewMode, setViewMode] = useState<'list' | 'map'>('map');
  
  const serviceOptions = ['All', 'Products', 'Consultation', 'Training', 'Delivery', 'Support', 'Research'];

  useEffect(() => {
    const fetchOutlets = async () => {
      try {
        setLoading(true);
        setOutlets(FALLBACK_OUTLETS);
        setFilteredOutlets(FALLBACK_OUTLETS);
      } finally {
        setLoading(false);
      }
    };
    fetchOutlets();
  }, []);

  useEffect(() => {
    let filtered = outlets;
    if (searchQuery.trim()) {
      filtered = filtered.filter(outlet => 
        outlet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        outlet.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        outlet.manager.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
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
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />);
    }
    const remainingStars = 5 - fullStars;
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
        />
        <div className="absolute top-4 right-4">
          <div className="bg-white rounded-full px-3 py-1 flex items-center gap-1 shadow-md">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold">{outlet.rating}</span>
            <span className="text-xs text-gray-500">({outlet.reviews})</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">{outlet.name}</h3>
        <div className="space-y-3 mb-4">
          <div className="flex items-start gap-2">
            <MapPin size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
            <span className="text-gray-800 text-sm font-medium">{outlet.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-green-600" />
            <span className="text-gray-800 text-sm font-medium">{outlet.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-green-600" />
            <span className="text-gray-800 text-sm font-medium">{outlet.email}</span>
          </div>
          <div className="flex items-start gap-2">
            <Clock size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
            <span className="text-gray-800 text-sm font-medium">{outlet.hours}</span>
          </div>
        </div>
        
        <div className="mb-4">
          <span className="text-sm text-gray-700 font-semibold mb-2 block">Services:</span>
          <div className="flex flex-wrap gap-2">
            {outlet.services.map((service, index) => (
              <span key={index} className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                {service}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="text-sm text-gray-800">
            <span className="font-semibold">Manager:</span> <span className="font-medium">{outlet.manager}</span>
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
      <div className="min-h-screen bg-[#fdfbf6]">
        <Header />
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="text-center mb-8">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded mb-4 mx-auto max-w-2xl"></div>
              <div className="h-6 bg-gray-200 rounded mx-auto max-w-4xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfbf6]">
      <Header />
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

          <div className="mb-6">
            <p className="text-gray-600">
              Showing <span className="font-semibold">{filteredOutlets.length}</span> of {outlets.length} outlets
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
      </div>

      {/* Newsletter Section */}
      <section className="bg-[#2C2A29] py-16 px-4 md:px-8 lg:px-12 w-full">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4 text-white">
            <div className="flex-shrink-0">
              <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-2">Join the Movement</h3>
              <p className="text-gray-300 text-sm md:text-base">
                Get updates on AE/EOA events, stories, outlets, and resources that empower African farmers.
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

      {/* Footer Section */}
      <footer className="bg-[#24231D] py-8 px-4 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-6">
            <div className="w-full lg:w-[421px] flex flex-col items-start gap-3">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/a516e3e257957bba69588e0c195041412cec5913?width=494" 
                alt="Biovision Africa Trust" 
                className="w-[220px] h-auto object-contain"
              />
              <h3 className="text-[#fdfbf6] text-lg font-bold leading-6">
                Growing Africa's Future Through <br/>Sustainable Agriculture
              </h3>
              <p className="text-[#fdfbf6] text-sm font-normal leading-[22px]">
                We partner with farmers across Africa to build sustainable food systems through agroecology, creating premium products that support rural communities.
              </p>
              <div className="flex items-center gap-4 mt-1">
                <div className="flex w-10 h-10 justify-center items-center rounded-full bg-[#2e7d32]">
                  <svg fill="#FDFBF6" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.27 4.27 0 0 0 1.88-2.35c-.84.5-1.77.84-2.76 1.03a4.26 4.26 0 0 0-7.26 3.88 12.1 12.1 0 0 1-8.78-4.45 4.25 4.25 0 0 0 1.32 5.67A4.22 4.22 0 0 1 2.8 9v.05a4.26 4.26 0 0 0 3.42 4.18 4.3 4.3 0 0 1-1.93.07 4.26 4.26 0 0 0 3.98 2.96A8.54 8.54 0 0 1 2 18.58 12.07 12.07 0 0 0 8.29 20c7.55 0 11.68-6.26 11.68-11.68l-.01-.53A8.27 8.27 0 0 0 22.46 6z"/>
                  </svg>
                </div>
                <div className="flex w-10 h-10 justify-center items-center rounded-full bg-[#2e7d32]">
                  <svg fill="#FDFBF6" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H7.9v-2.89h2.54V9.41c0-2.51 1.5-3.89 3.8-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.77l-.44 2.89h-2.33v6.99C18.34 21.12 22 16.99 22 12z"/>
                  </svg>
                </div>
                <div className="flex w-10 h-10 justify-center items-center rounded-full bg-[#2e7d32]">
                  <svg fill="#FDFBF6" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.04c-5.51 0-9.96 4.45-9.96 9.96 0 4.14 2.57 7.67 6.2 9.13-.08-.78-.15-1.97.03-2.82.17-.79 1.1-5.04 1.1-5.04s-.28-.57-.28-1.41c0-1.32.77-2.3 1.73-2.3.81 0 1.2.61 1.2 1.34 0 .82-.52 2.05-.79 3.19-.23.97.48 1.76 1.42 1.76 1.71 0 3.03-1.8 3.03-4.39 0-2.3-1.65-3.91-4.01-3.91-2.73 0-4.34 2.05-4.34 4.18 0 .83.32 1.72.72 2.2a.29.29 0 0 1 .07.28c-.07.31-.23.97-.26 1.1-.04.17-.14.21-.31.13-1.17-.54-1.9-2.22-1.9-3.57 0-2.91 2.12-5.58 6.12-5.58 3.21 0 5.71 2.29 5.71 5.36 0 3.18-2 5.74-4.77 5.74-1.1 0-2.14-.57-2.5-1.23l-.68 2.61c-.25.97-.94 2.2-1.41 2.94 1.06.33 2.18.51 3.34.51 5.51 0 9.96-4.45 9.96-9.96S17.51 2.04 12 2.04z"/>
                  </svg>
                </div>
                <div className="flex w-10 h-10 justify-center items-center rounded-full bg-[#2e7d32]">
                  <svg fill="#FDFBF6" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.75 2C5.13 2 3 4.13 3 6.75v10.5C3 19.87 5.13 22 7.75 22h8.5C18.87 22 21 19.87 21 17.25V6.75C21 4.13 18.87 2 16.25 2h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm6.25.5a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-[187.25px] flex flex-col items-start gap-2 mt-18 ml-16">
              <h3 className="text-[#FDFBF6] font-semibold text-lg ml-5 leading-tight">Explore</h3>
              <div className="flex ml-5 items-center gap-1 mt-1 mb-4">
                <div className="w-[35px] h-[2px] bg-[#2e7d32] rounded-sm" />
                <div className="w-[5px] h-[5px] bg-[#2e7d32] rounded-full" />
              </div>
              <div className="ml-4 flex flex-col items-start gap-2 w-full">
                {[
                  { text: "Our Mission", icon: "🚀" },
                  { text: "Sustainability Reports", icon: "🚀" },
                  { text: "Become a Partner", icon: "🚀" },
                  { text: "Press & Media", icon: "🚀" },
                  { text: "Careers", icon: "🚀" },
                  { text: "FAQs", icon: "🚀" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-[#FDFBF6] text-sm leading-[22px]">
                    <span className="text-[#FDFBF6] filter brightness-0 invert">{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="ml-9 w-full lg:w-[345px] flex flex-col gap-3 mt-18">
              <h3 className="text-[#FDFBF6] font-semibold text-lg ml-5 leading-tight">Contact</h3>
              <div className="flex ml-5 items-center gap-1 mt-1 mb-4">
                <div className="w-[35px] h-[2px] bg-[#2e7d32] rounded-sm" />
                <div className="w-[5px] h-[5px] bg-[#2e7d32] rounded-full" />
              </div>
              <div className="ml-5 flex flex-col gap-2 text-[#fdfbf6] text-sm leading-[22px] font-normal font-sans">
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="#FDFBF6">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  <span>+254 (0) 20 632 4806</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="#FDFBF6">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <span>info@biovisionafricatrust.org</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="#FDFBF6">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <span>Duduville Campus, Kasarani Nairobi, Kenya</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="#FDFBF6">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <span>P.O. Box 12345, Nairobi, Kenya</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="#FDFBF6">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <div>
                    <div>Monday - Friday: 8:00 AM - 5:00 PM EAT</div>
                    <div>Saturday: 9:00 AM - 1:00 PM EAT</div>
                    <div>Sunday: Closed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom Section */}
      <div className="w-full bg-[#2C2A29] border-t border-gray-700 pt-6 pb-6">
        <div className="max-w-9xl mx-auto px-4 md:px-8 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="ml-3 text-yellow-500 text-xs font-medium">
            © 2025 BioVision Africa Trust. All Rights Reserved.
          </p>
          <div className="mr-9 flex gap-3 text-xs">
            <a href="#" className="text-yellow-500 hover:text-white transition-colors duration-300">Terms of Use</a>
            <span className="text-gray-600">|</span>
            <a href="#" className="text-yellow-500 hover:text-white transition-colors duration-300">Privacy Policy</a>
            <span className="text-gray-600">|</span>
            <a href="#" className="text-yellow-500 hover:text-white transition-colors duration-300">Cookie Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
}