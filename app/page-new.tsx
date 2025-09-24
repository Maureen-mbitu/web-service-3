"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ChevronLeft, 
  ChevronRight, 
  Microscope, 
  Coins, 
  UserRound, 
  GraduationCap, 
  Map, 
  Smile, 
  Users 
} from 'lucide-react';
import { productApi, eventApi } from '../lib/api';

export default function Home() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const heroImages = [
    { src: "/images/farmer.png", alt: "Farmer" },
    { src: "/images/farm.png", alt: "Farm" },
    { src: "/images/carrot.png", alt: "Carrot" },
    { src: "/images/lettuce.png", alt: "Lettuce" },
    { src: "/images/okra.png", alt: "Okra" },
    { src: "/images/mangoes.png", alt: "Mangoes" }
  ];

  // Fetch featured data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsRes, eventsRes] = await Promise.all([
          productApi.getAll({ limit: 6 }),
          eventApi.getUpcoming()
        ]);
        setFeaturedProducts(productsRes.products);
        setUpcomingEvents(eventsRes.events);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Auto-scroll hero images
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const handleShopNow = () => {
    router.push('/shop');
  };

  const handleViewAllEvents = () => {
    router.push('/events');
  };

  const handleViewAllOutlets = () => {
    router.push('/outlets');
  };

  const handleLearnMore = () => {
    router.push('/mission');
  };

  return (
    <div className="w-full h-full">
      <div className="relative min-h-screen w-full overflow-x-hidden">
        {/* Hero Section */}
        <section className="pt-20 sm:pt-24 lg:pt-32 pb-16 w-full px-4 md:px-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
          {/* Background Video */}
          <video 
            className="absolute inset-0 w-full h-full object-cover -z-20" 
            autoPlay 
            muted 
            loop 
            playsInline
          >
            <source src="/videos/hero-background.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/30 -z-10"></div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 w-full max-w-7xl z-10">
            {/* Hero Text */}
            <div className="text-white max-w-xl text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 lg:mb-6 drop-shadow-lg">
                Empowering Africa <br/> Through Agroecology
              </h1>
              <p className="text-base lg:text-lg font-bold text-white/95 mb-3 lg:mb-4 drop-shadow-md">
                Explore certified organic products, verified AE/EOA outlets, and insights that promote sustainable food systems across Africa.
              </p>
              <p className="text-sm lg:text-base text-white/90 mb-6 lg:mb-8 drop-shadow-md">
                Every purchase supports 2.3M+ Farmers building sustainable food systems.
              </p>
              <div className="flex gap-4 flex-wrap">
                <button 
                  onClick={handleShopNow}
                  className="bg-green-700 hover:bg-green-800 text-white font-semibold px-4 lg:px-6 py-2 lg:py-3 rounded-full text-sm transition-colors shadow-lg"
                >
                  Explore Products
                </button>
                <button 
                  onClick={handleLearnMore}
                  className="bg-white/90 hover:bg-white text-green-800 font-semibold px-4 lg:px-6 py-2 lg:py-3 rounded-full text-sm transition-colors shadow-lg"
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* Hero Image Carousel */}
            <div className="w-full max-w-4xl relative">
              <div className="overflow-hidden mx-auto rounded-xl">
                <div 
                  className="flex gap-2 sm:gap-4 transition-all duration-700 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 33.333}%)` }}
                >
                  {heroImages.map((image, index) => (
                    <div key={index} className="w-1/3 flex-shrink-0">
                      <img 
                        src={image.src} 
                        alt={image.alt}
                        className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg shadow-lg" 
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel Controls */}
              <div className="flex items-center justify-center mt-4 gap-4">
                <button 
                  onClick={() => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
                  className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/40"
                  aria-label="Previous images"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="flex gap-2">
                  {heroImages.map((_, index) => (
                    <button 
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        currentSlide === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/70'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
                <button 
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % heroImages.length)}
                  className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/40"
                  aria-label="Next images"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-[#fdfbf6] py-20 px-4 md:px-8 lg:px-16 text-gray-900">
          <div className="bg-[#fdfbf6] max-w-7xl mx-auto flex flex-col gap-16">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
              <div className="max-w-xl">
                <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-black mb-6">
                  Transforming <span className="text-green-700">Agriculture</span><br/>
                  Across <span className="text-green-700">Africa</span>
                </h2>
                <p className="text-lg md:text-xl text-gray-700">
                  Every farmer trained, every hectare restored,<br className="hidden md:block"/>
                  <span className="text-green-700 font-semibold">every life improved.</span>
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 text-center">
                <div>
                  <Microscope className="mx-auto h-8 w-8 text-green-700 mb-2" />
                  <div className="text-green-700 text-3xl md:text-4xl font-extrabold">20+</div>
                  <div className="text-base text-gray-600 mt-2">years of advancing agroecology</div>
                </div>
                <div>
                  <Coins className="mx-auto h-8 w-8 text-green-700 mb-2" />
                  <div className="text-green-700 text-3xl md:text-4xl font-extrabold">$2.4M+</div>
                  <div className="text-base text-gray-600 mt-2">generated in sustainable income</div>
                </div>
                <div>
                  <UserRound className="mx-auto h-8 w-8 text-green-700 mb-2" />
                  <div className="text-green-700 text-3xl md:text-4xl font-extrabold">2.3M+</div>
                  <div className="text-base text-gray-600 mt-2">farmers supported in best practices</div>
                </div>
                <div>
                  <GraduationCap className="mx-auto h-8 w-8 text-green-700 mb-2" />
                  <div className="text-green-700 text-3xl md:text-4xl font-extrabold">50+</div>
                  <div className="text-base text-gray-600 mt-2">partnerships with leading universities</div>
                </div>
                <div>
                  <Map className="mx-auto h-8 w-8 text-green-700 mb-2" />
                  <div className="text-green-700 text-3xl md:text-4xl font-extrabold">180K+</div>
                  <div className="text-base text-gray-600 mt-2">hectares under sustainable practice</div>
                </div>
                <div>
                  <Smile className="mx-auto h-8 w-8 text-green-700 mb-2" />
                  <div className="text-green-700 text-3xl md:text-4xl font-extrabold">98%</div>
                  <div className="text-base text-gray-600 mt-2">customer satisfaction</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                <Users className="h-4 w-4 text-green-700" />
                <span>Join 4,000+ companies already growing</span>
              </div>
              <div className="flex flex-wrap justify-center gap-6 md:gap-10 items-center">
                <div className="flex items-center space-x-2">
                  <img src="/images/boltshift.png" alt="Boltshift" className="h-6 w-auto object-contain" />
                  <span className="text-sm text-gray-500">Boltshift</span>
                </div>
                <div className="flex items-center space-x-2">
                  <img src="/images/lightbox.png" alt="Lightbox" className="h-6 w-auto object-contain" />
                  <span className="text-sm text-gray-500">Lightbox</span>
                </div>
                <div className="flex items-center space-x-2">
                  <img src="/images/featherdev.png" alt="FeatherDev" className="h-6 w-auto object-contain" />
                  <span className="text-sm text-gray-500">FeatherDev</span>
                </div>
                <div className="flex items-center space-x-2">
                  <img src="/images/spherule.png" alt="Spherule" className="h-6 w-auto object-contain" />
                  <span className="text-sm text-gray-500">Spherule</span>
                </div>
                <div className="flex items-center space-x-2">
                  <img src="/images/globalbank.png" alt="GlobalBank" className="h-6 w-auto object-contain" />
                  <span className="text-sm text-gray-500">GlobalBank</span>
                </div>
                <div className="flex items-center space-x-2">
                  <img src="/images/nietzshe.png" alt="Nietzsche" className="h-6 w-auto object-contain" />
                  <span className="text-sm text-gray-500">Nietzsche</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Outlets Section */}
        <section className="relative bg-[#fdfbf6] py-24 px-4 md:px-8 lg:px-12">
          <div className="bg-[#fdfbf6] max-w-7xl mx-auto text-center relative z-10">
            <h2 className="text-[2.5rem] md:text-5xl font-bold text-gray-900 leading-snug mb-6">
              Find <span className="text-green-700">Agroecological</span><br/>
              <span className="text-green-700">Outlets</span> Near You
            </h2>
            <p className="text-gray-700 text-lg md:text-xl font-medium leading-relaxed max-w-4xl mx-auto mb-2">
              Explore a growing network of certified agroecological and organic product providers across Africa.
            </p>
            <p className="text-gray-700 text-lg md:text-xl font-medium leading-relaxed max-w-4xl mx-auto mb-2">
              Discover farms, markets, and retail outlets near your region — verified for sustainability, impact, and
            </p>
            <p className="text-green-700 text-lg md:text-xl font-semibold mt-1">authenticity.</p>
            
            <div className="mt-10 overflow-hidden rounded-2xl shadow-lg relative z-10">
              <img src="/images/outlet.png" alt="Map showing outlet locations" className="w-full h-auto object-cover" />
            </div>

            <div className="mt-8">
              <button 
                onClick={handleViewAllOutlets}
                className="bg-green-700 hover:bg-green-800 text-white font-semibold px-8 py-4 rounded-full text-sm transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                View All Outlets
              </button>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="bg-[#fdfbf6] py-20 px-4 md:px-8 lg:px-12">
          <div className="bg-[#fdfbf6] max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {loading ? (
                // Loading skeletons
                Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                    <div className="bg-gray-200 animate-pulse h-24"></div>
                    <div className="bg-[#fdfbf6] p-4 pt-1">
                      <div className="bg-gray-200 animate-pulse h-4 mb-2 rounded"></div>
                      <div className="bg-gray-200 animate-pulse h-5 mb-2 rounded"></div>
                      <div className="bg-gray-200 animate-pulse h-3 mb-3 rounded"></div>
                      <div className="bg-gray-200 animate-pulse h-8 rounded-full"></div>
                    </div>
                  </div>
                ))
              ) : (
                featuredProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer" 
                       onClick={() => router.push(`/shop?product=${product.id}`)}>
                    <div className="bg-white p-4 pb-2">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-21 object-contain"
                        onError={(e) => {
                          e.target.src = `/images/${product.name.toLowerCase().replace(/\s+/g, '-')}.png`;
                        }}
                      />
                    </div>
                    <div className="bg-[#fdfbf6] p-4 pt-1 text-left">
                      <p className="text-xs text-gray-400 mb-1">{product.category}</p>
                      <h3 className="font-semibold text-gray-800">{product.name}</h3>
                      <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-1">
                        <div className="flex items-center gap-1 text-yellow-500 text-xs">
                          {'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))} 
                          <span className="text-gray-400 text-xs">({product.reviews})</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-3 text-sm font-semibold">
                        <span className="text-green-600">${product.price}</span>
                        <button className="ml-auto bg-green-100 text-green-700 rounded-full px-3 py-1 text-xs hover:bg-green-600 hover:text-white transition">
                          {product.inStock ? 'Contact' : 'Out of Stock'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="bg-[#3d8640] text-white p-10 rounded-2xl relative overflow-hidden w-full">
              <div className="absolute inset-0 bg-[url('/images/veges.png')] opacity-90 bg-contain bg-repeat z-0 pointer-events-none"></div>
              <div className="relative z-10">
                <p className="text-sm font-medium mb-2 opacity-80 drop-shadow-lg">Featured Products</p>
                <h2 className="text-4xl font-bold leading-tight mb-6">
                  Explore <br/>Certified <br/>Agroecological <br/>Products
                </h2>
                <p className="text-base font-medium mb-4">
                  Sourced from trusted organic producers and <br/> outlets. Every purchase supports farming<br/>
                  communities and healthier ecosystems.
                </p>
                <p className="text-white text-sm font-semibold mb-6">Support a farmer today</p>
                <button 
                  onClick={handleShopNow}
                  className="bg-white text-green-800 font-semibold px-6 py-3 rounded-full text-sm hover:bg-gray-100 transition"
                >
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section className="bg-[#fdfbf6] py-20 px-4 md:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Upcoming Events &<br/>Trainings
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Learn directly from experts and experienced farmers through interactive sessions designed to deepen your knowledge of ecological organic agriculture.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {loading ? (
                // Loading skeletons for events
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="rounded-2xl overflow-hidden shadow-lg">
                    <div className="h-64 bg-gray-200 animate-pulse"></div>
                  </div>
                ))
              ) : upcomingEvents.length > 0 ? (
                upcomingEvents.slice(0, 3).map((event) => (
                  <div key={event.id} className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative cursor-pointer"
                       onClick={() => router.push(`/events/${event.id}`)}>
                    <div className="h-full bg-cover bg-center relative" 
                         style={{backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 100%), url('${event.image}')`}}>
                      <div className="absolute top-4 left-4 bg-white/90 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
                        {event.category}
                      </div>
                      <div className="p-6 pt-20">
                        <h3 className="text-xl font-bold text-white mb-4">{event.title}</h3>
                        <p className="text-white/90 text-sm mb-4 leading-relaxed">{event.description}</p>
                        <p className="text-white/70 text-xs mb-6">
                          {event.date} | {event.time} | {event.location}
                        </p>
                        <button className="w-full bg-white text-gray-800 font-semibold py-3 px-6 rounded-full hover:bg-gray-50 transition-colors duration-300">
                          Register Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500">No upcoming events at the moment.</p>
                </div>
              )}
            </div>
            
            <div className="text-center">
              <button 
                onClick={handleViewAllEvents}
                className="bg-green-700 hover:bg-green-800 text-white font-semibold px-8 py-4 rounded-full text-sm transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                View All Events
              </button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#fdfbf6] py-5 px-4 md:px-8 lg:px-12 mb-18">
          <div className="max-w-7xl mx-auto text-center relative z-10 px-6 py-8 rounded-2xl flex flex-col justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[#2E7D32] z-0"></div>
            <div className="absolute inset-0 bg-[url('/images/veges.png')] opacity-90 bg-contain bg-repeat z-0"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                Ready to shop for impact?
              </h2>
              <p className="text-base md:text-lg text-white/90 mb-6 max-w-2xl mx-auto">
                Explore our full range of certified organic solutions and see how every purchase drives change.
              </p>
              <button 
                onClick={handleShopNow}
                className="mx-auto bg-white text-green-700 hover:bg-gray-50 font-semibold px-6 py-2 rounded-full text-base transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Shop All Products
              </button>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="bg-[#2C2A29] py-16 px-4 md:px-8 lg:px-12 -mt-16">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
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
      </div>
    </div>
  );
}