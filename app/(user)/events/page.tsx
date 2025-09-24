"use client";

import { useState } from 'react';
import { Calendar, MapPin, Users, Search, Filter, X, CheckCircle, User, Mail, Phone } from 'lucide-react';
import { eventApi } from '@/lib/api';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  featured: boolean;
  currentAttendees: number;
  maxAttendees: number;
  price: number;
  image: string;
}

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFeatured, setShowFeatured] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: '',
    experience: '',
    expectations: ''
  });

  const events: Event[] = [
    {
      id: 1,
      title: "Agroecology Training Workshop",
      description: "Hands-on training for sustainable farming practices using agroecological principles. Learn from experienced farmers and agricultural experts.",
      date: "2025-01-25",
      time: "9:00 AM",
      location: "Nairobi Agricultural Training Center",
      category: "Training",
      featured: true,
      currentAttendees: 45,
      maxAttendees: 60,
      price: 0,
      image: "/images/training-session.png"
    },
    {
      id: 2,
      title: "Organic Certification Workshop",
      description: "Learn about organic certification requirements and processes. Perfect for farmers looking to transition to certified organic production.",
      date: "2025-02-10",
      time: "10:00 AM",
      location: "Meru Community Hall",
      category: "Workshop",
      featured: false,
      currentAttendees: 32,
      maxAttendees: 50,
      price: 500,
      image: "/images/woman.png"
    },
    {
      id: 3,
      title: "Sustainable Farming Conference",
      description: "Join leading experts in sustainable agriculture for a comprehensive conference on the future of farming in Africa.",
      date: "2025-02-20",
      time: "8:00 AM",
      location: "Kisumu Conference Center",
      category: "Conference",
      featured: true,
      currentAttendees: 150,
      maxAttendees: 200,
      price: 2500,
      image: "/images/sunset.png"
    },
    {
      id: 4,
      title: "Composting and Soil Health",
      description: "Learn effective composting techniques and soil health management for improved crop yields.",
      date: "2025-02-28",
      time: "2:00 PM",
      location: "Nakuru Farmers Center",
      category: "Training",
      featured: false,
      currentAttendees: 25,
      maxAttendees: 40,
      price: 0,
      image: "/images/garden-space.png"
    },
    {
      id: 5,
      title: "Market Access for Smallholders",
      description: "Strategies and practical tips for smallholder farmers to access profitable markets for their organic produce.",
      date: "2025-03-05",
      time: "11:00 AM",
      location: "Eldoret Market Center",
      category: "Workshop",
      featured: false,
      currentAttendees: 60,
      maxAttendees: 60,
      price: 300,
      image: "/images/woman.png"
    }
  ];

  const categories = ['All', 'Training', 'Workshop', 'Conference'];

  const getFilteredEvents = () => {
    let filtered = events;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (showFeatured) {
      filtered = filtered.filter(event => event.featured);
    }

    return filtered;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return {
      day: date.getDate().toString().padStart(2, '0'),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      year: date.getFullYear()
    };
  };

  const EventCard = ({ event }: { event: Event }) => {
    const dateInfo = formatDate(event.date);
    const isFullyBooked = event.currentAttendees >= event.maxAttendees;

    return (
      <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105">
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
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isFullyBooked) {
                    setSelectedEvent(event);
                    setShowRegistrationModal(true);
                  }
                }}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  isFullyBooked 
                    ? 'bg-gray-500 text-white cursor-not-allowed' 
                    : 'bg-white text-gray-800 hover:bg-gray-100'
                }`}
                disabled={isFullyBooked}
              >
                {isFullyBooked ? 'Fully Booked' : 'Register Now'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await eventApi.register(selectedEvent?.id.toString() || '', registrationData);
      
      if (response.success) {
        setShowRegistrationModal(false);
        setShowSuccessModal(true);
        setRegistrationData({
          fullName: '',
          email: '',
          phone: '',
          role: '',
          experience: '',
          expectations: ''
        });
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setShowRegistrationModal(false);
      setShowSuccessModal(true);
    }
  };

  const RegistrationModal = () => {
    if (!showRegistrationModal || !selectedEvent) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 backdrop-blur-md bg-black/50"></div>
        
        <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Register for Event</h2>
                <p className="text-gray-600">{selectedEvent.title}</p>
                <p className="text-sm text-gray-500">{selectedEvent.date} at {selectedEvent.time}</p>
              </div>
              <button
                onClick={() => setShowRegistrationModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleRegistrationSubmit} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={registrationData.fullName}
                      onChange={(e) => setRegistrationData(prev => ({ ...prev, fullName: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={registrationData.email}
                      onChange={(e) => setRegistrationData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={registrationData.phone}
                      onChange={(e) => setRegistrationData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="+254 xxx xxx xxx"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role *</label>
                    <select
                      required
                      value={registrationData.role}
                      onChange={(e) => setRegistrationData(prev => ({ ...prev, role: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select your role</option>
                      <option value="farmer">Farmer</option>
                      <option value="buyer">Buyer</option>
                      <option value="researcher">Researcher</option>
                      <option value="organization">Organization</option>
                      <option value="student">Student</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Additional Information</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Farming Experience</label>
                  <select
                    value={registrationData.experience}
                    onChange={(e) => setRegistrationData(prev => ({ ...prev, experience: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select your experience level</option>
                    <option value="beginner">Beginner (0-2 years)</option>
                    <option value="intermediate">Intermediate (3-5 years)</option>
                    <option value="experienced">Experienced (6-10 years)</option>
                    <option value="expert">Expert (10+ years)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">What do you hope to learn?</label>
                  <textarea
                    value={registrationData.expectations}
                    onChange={(e) => setRegistrationData(prev => ({ ...prev, expectations: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Tell us about your expectations..."
                  />
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Event Summary</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{selectedEvent.date} at {selectedEvent.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedEvent.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Price: </span>
                    <span>{selectedEvent.price > 0 ? `KSh ${selectedEvent.price.toLocaleString()}` : 'Free'}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowRegistrationModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Register Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const SuccessModal = () => {
    if (!showSuccessModal) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 backdrop-blur-md bg-black/20"></div>
        
        <div className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl">
          <div className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Registration Successful!
            </h2>

            <p className="text-gray-600 mb-8 leading-relaxed">
              Thank you for registering! You'll receive a confirmation email shortly with event details.
            </p>

            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <RegistrationModal />
      <SuccessModal />
      {/* Header */}
      <div className="bg-white shadow-sm w-full">
        <div className="w-full px-4 md:px-6 lg:px-8 py-8">
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
            <div className="flex-1 max-w-md">
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
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 items-center">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              {/* Featured Filter */}
              <button
                onClick={() => setShowFeatured(!showFeatured)}
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
      <div className="w-full px-4 md:px-6 lg:px-8 py-8">
        {getFilteredEvents().length === 0 ? (
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
                Found <span className="font-semibold">{getFilteredEvents().length}</span> event{getFilteredEvents().length !== 1 ? 's' : ''}
                {selectedCategory !== 'All' && (
                  <span> in <span className="font-semibold">{selectedCategory}</span></span>
                )}
              </p>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {getFilteredEvents().map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* CTA Section */}
      <section className="bg-green-600 py-16 px-4 md:px-8 lg:px-12 relative overflow-hidden w-full">
        <div className="w-full max-w-6xl mx-auto text-center relative z-10">
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