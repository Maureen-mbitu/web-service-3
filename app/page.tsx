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
  Users,
  Star,
  MapPin
} from 'lucide-react';
import { productApi, eventApi } from '../lib/api';
import { FALLBACK_PRODUCTS, FALLBACK_EVENTS } from '../lib/constants';

export default function Home() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [outlets, setOutlets] = useState<Outlet[]>([]);
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
        const [productsRes, eventsRes, outletsRes] = await Promise.all([
          productApi.getAll({ limit: 6 }).catch(() => ({ products: FALLBACK_PRODUCTS.slice(0, 6) })),
          eventApi.getUpcoming().catch(() => ({ events: FALLBACK_EVENTS.slice(0, 3) })),
          outletApi.getAll({ limit: 4 }).catch(() => ({ outlets: FALLBACK_OUTLETS.slice(0, 4) }))
        ]);
        setFeaturedProducts(productsRes.products || FALLBACK_PRODUCTS.slice(0, 6));
        setUpcomingEvents(eventsRes.events || FALLBACK_EVENTS.slice(0, 3));
        setOutlets(outletsRes.outlets || FALLBACK_OUTLETS.slice(0, 4));
      } catch (error) {
        console.error('Error fetching data:', error);
        // Use fallback data if everything fails
        setFeaturedProducts(FALLBACK_PRODUCTS.slice(0, 6));
        setUpcomingEvents(FALLBACK_EVENTS.slice(0, 3));
        setOutlets(FALLBACK_OUTLETS.slice(0, 4));
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

  const handleStartJourney = () => {
    router.push('/resources');
  };

  const handleReadOtherStories = () => {
    router.push('/resources');
  };

  const handleSubmitYours = () => {
    router.push('/auth_next_product_outlet');
  };

  return (
    <div className="w-full min-h-screen">
      <div className="relative min-h-screen w-full overflow-x-hidden">
        <section className="pt-8 sm:pt-12 lg:pt-16 pb-16 w-full flex flex-col items-center justify-center text-center relative overflow-hidden">
          {/* Video Background */}
          <video 
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay 
            muted 
            loop 
            playsInline
          >
            <source src="/videos/hero-background.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50"></div>  {/* try /40, /50, /60 */}

          <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 w-full px-4 md:px-6 lg:px-8 z-10">
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
              <div className="overflow-hidden mx-auto rounded-xl relative">
                <div 
                  className="flex gap-2 sm:gap-4 transition-all duration-700 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 33.333}%)` }}
                >
                  {heroImages.map((image, index) => (
                    <div key={index} className="w-1/3 flex-shrink-0">
                      <img 
                        src={image.src} 
                        alt={image.alt}
                        className="w-full h-96 object-cover rounded-lg shadow-lg" 
                      />
                    </div>
                  ))}
                </div>
                
                {/* Single Right Arrow Navigation */}
                <button 
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % heroImages.length)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/40"
                  aria-label="Next images"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-[#fdfbf6] pt-20 pb-10 w-full text-gray-900">
          <div className="max-w-[1440px] mx-auto px-4 md:px-6 flex flex-col gap-16">
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
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
                <div className="text-left">
                  <Microscope className="h-8 w-8 text-green-700 mb-2" />
                  <div className="text-green-700 text-3xl md:text-4xl font-extrabold">20+</div>
                  <div className="text-base text-gray-600 mt-2">years of advancing agroecology</div>
                </div>
                <div className="text-left">
                  <Coins className="h-8 w-8 text-green-700 mb-2" />
                  <div className="text-green-700 text-3xl md:text-4xl font-extrabold">$2.4M+</div>
                  <div className="text-base text-gray-600 mt-2">generated in sustainable income</div>
                </div>
                <div className="text-left">
                  <UserRound className="h-8 w-8 text-green-700 mb-2" />
                  <div className="text-green-700 text-3xl md:text-4xl font-extrabold">2.3M+</div>
                  <div className="text-base text-gray-600 mt-2">farmers supported in best practices</div>
                </div>
                <div className="text-left">
                  <GraduationCap className="h-8 w-8 text-green-700 mb-2" />
                  <div className="text-green-700 text-3xl md:text-4xl font-extrabold">50+</div>
                  <div className="text-base text-gray-600 mt-2">partnerships with leading universities</div>
                </div>
                <div className="text-left">
                  <Map className="h-8 w-8 text-green-700 mb-2" />
                  <div className="text-green-700 text-3xl md:text-4xl font-extrabold">180K+</div>
                  <div className="text-base text-gray-600 mt-2">hectares under sustainable practice</div>
                </div>
                <div className="text-left">
                  <Smile className="h-8 w-8 text-green-700 mb-2" />
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
              <div className="flex flex-wrap justify-between gap-6 md:gap-10 items-center w-full max-w-5xl">
                <div className="flex items-center space-x-2">
                  <img src="/images/boltshift.png" alt="Boltshift" className="h-8 w-auto object-contain" />
                  <span className="text-sm text-gray-500">Boltshift</span>
                </div>
                <div className="flex items-center space-x-2">
                  <img src="/images/lightbox.png" alt="Lightbox" className="h-8 w-auto object-contain" />
                  <span className="text-sm text-gray-500">Lightbox</span>
                </div>
                <div className="flex items-center space-x-2">
                  <img src="/images/featherdev.png" alt="FeatherDev" className="h-8 w-auto object-contain" />
                  <span className="text-sm text-gray-500">FeatherDev</span>
                </div>
                <div className="flex items-center space-x-2">
                  <img src="/images/spherule.png" alt="Spherule" className="h-8 w-auto object-contain" />
                  <span className="text-sm text-gray-500">Spherule</span>
                </div>
                <div className="flex items-center space-x-2">
                  <img src="/images/globalbank.png" alt="GlobalBank" className="h-8 w-auto object-contain" />
                  <span className="text-sm text-gray-500">GlobalBank</span>
                </div>
                <div className="flex items-center space-x-2">
                  <img src="/images/nietzshe.png" alt="Nietzsche" className="h-8 w-auto object-contain" />
                  <span className="text-sm text-gray-500">Nietzsche</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* outlet */}

        <section className="bg-[#fdfbf6] pt-10 pb-24 w-full">
          <div className="max-w-[1440px] mx-auto px-4 md:px-6 text-center relative z-10">
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
            
            <div className="mt-10 relative h-[800px]">
              <div className="w-full auto rounded-2xl shadow-lg overflow-hidden">
                <iframe
                  title="Kenya Outlets Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.635984352418!2d36.8219467!3d-1.2920659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d83281d997%3A0x4a6b8dd22bd62df0!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2ske!4v1698492348234!5m2!1sen!2ske"
                  alt="Map showing outlet locations"
                  className="w-full h-full"
                  allowFullScreen
                  loading="lazy"
                />
              </div>

              {/* <div className="bg-red-500 p-4 absolute top-4 right-4 backdrop-blur-sm"></div> */}

              <div className="absolute top-4 right-4 w-fit bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-left">Featured Outlets</h3>
                <div className="space-y-4 overflow-y-auto flex-grow max-h-[420px]">
                  {outlets.map((outlet) => (
                    <div key={outlet.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                      <img 
                        src={outlet.image} 
                        alt={outlet.name} 
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="text-left">
                        <h4 className="font-semibold text-gray-800">{outlet.name}</h4>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <MapPin size={12} />
                          {outlet.address}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star size={14} className="text-yellow-500 fill-current" />
                          <span className="text-sm font-medium text-gray-700">{outlet.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
        <section className="bg-[#fdfbf6] py-20 w-full">
          <div className="max-w-[1440px] mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
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
                    <div className="bg-white p-4 pt-1 text-left border-t border-gray-100">
                      <p className="text-xs text-green-600 font-medium mb-1 uppercase tracking-wide">{product.category}</p>
                      <h3 className="font-bold text-gray-900 text-base mb-2">{product.name}</h3>
                      <div className="flex items-center justify-center gap-2 text-xs text-gray-600 mt-1">
                        <div className="flex items-center gap-1 text-yellow-500 text-xs">
                          {'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))} 
                          <span className="text-gray-600 text-xs font-medium">({product.reviews})</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-3 text-sm font-semibold">
                        <span className="text-green-700 font-bold text-base">${product.price}</span>
                        <button className="ml-auto bg-green-600 text-white rounded-full px-3 py-1 text-xs hover:bg-green-700 transition font-medium">
                          {product.inStock ? 'Contact' : 'Out of Stock'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="bg-[#3d8640] text-white p-10 rounded-2xl relative overflow-hidden w-full flex flex-col justify-center">
              <div className="absolute inset-0 bg-[url('/images/veges.png')] opacity-10 bg-cover z-0 pointer-events-none"></div>
              <div className="relative z-10 text-center lg:text-left">
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
{/* ✅ How It Works Section */}
<section className="bg-[#fdfcf7] pt-20 pb-10 relative overflow-hidden w-full">
  {/* Decorative background elements */}
  <div className="absolute top-10 left-10 w-32 h-32 bg-green-200/30 rounded-full blur-3xl" />
  <div className="absolute bottom-10 right-10 w-40 h-40 bg-green-300/20 rounded-full blur-3xl" />
  <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-green-100/40 rounded-full blur-2xl" />
  
  <div className="max-w-[1440px] mx-auto px-4 md:px-6 text-center relative z-10">
    {/* Section Header */}
    <div className="mb-16">
      <p className="text-sm font-medium text-green-700 mb-2 uppercase tracking-wide">How It Works</p>
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
        Engage With Biovision's
      </h2>
      <h2 className="text-4xl md:text-5xl font-bold text-green-700 leading-tight mb-6">
        Impact Model
      </h2>
      <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
        Our proven approach to agroecological transformation
      </p>
    </div>

    {/* Steps Container */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 items-start">
      
      {/* Step 1: Discover */}
      <div className="flex flex-col items-center text-center group">
        <div className="relative mb-6">
          {/* Connecting line for larger screens */}
          <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-green-200 transform -translate-y-1/2 z-0" />
          
          {/* Main circle with two rings */}
          <div className="relative z-10 group-hover:scale-105 transition-transform duration-300">
            {/* Small decorative circles positioned on the outer ring */}
            <div className="absolute left-0 top-1/2 w-3 h-3 bg-green-700 rounded-full transform -translate-y-1/2 -translate-x-1/2 z-30" />
            <div className="absolute right-0 top-1/2 w-3 h-3 bg-green-700 rounded-full transform -translate-y-1/2 translate-x-1/2 z-30" />
            
            {/* Outer thinner ring */}
            <div className="w-28 h-28 border-2 border-green-700 rounded-full flex items-center justify-center relative z-20">
              {/* Inner thicker ring */}
              <div className="w-24 h-24 border-8 border-green-700 rounded-full bg-white flex items-center justify-center">
                <div className="text-center">
                  <p className="text-xs font-medium text-gray-600 mb-1">Step 1</p>
                  <p className="text-lg font-bold text-gray-900">Discover</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 max-w-48 leading-relaxed">
          Browse certified outlets, products, and learning resources
        </p>
      </div>

      {/* Step 2: Engage */}
      <div className="flex flex-col items-center text-center group">
        <div className="relative mb-6">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-green-200 transform -translate-y-1/2 z-0" />
          
          <div className="relative z-10 group-hover:scale-105 transition-transform duration-300">
            {/* Small decorative circles positioned on the outer ring */}
            <div className="absolute left-0 top-1/2 w-3 h-3 bg-green-700 rounded-full transform -translate-y-1/2 -translate-x-1/2 z-30" />
            <div className="absolute right-0 top-1/2 w-3 h-3 bg-green-700 rounded-full transform -translate-y-1/2 translate-x-1/2 z-30" />
            
            {/* Outer thinner ring */}
            <div className="w-28 h-28 border-2 border-green-700 rounded-full flex items-center justify-center relative z-20">
              {/* Inner thicker ring */}
              <div className="w-24 h-24 border-8 border-green-700 rounded-full bg-white flex items-center justify-center">
                <div className="text-center">
                  <p className="text-xs font-medium text-gray-600 mb-1">Step 2</p>
                  <p className="text-lg font-bold text-gray-900">Engage</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 max-w-48 leading-relaxed">
          Connect with farmers, participate in programs, and access training
        </p>
      </div>

      {/* Step 3: Support */}
      <div className="flex flex-col items-center text-center group">
        <div className="relative mb-6">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-green-200 transform -translate-y-1/2 z-0" />
          
          <div className="relative z-10 group-hover:scale-105 transition-transform duration-300">
            {/* Small decorative circles positioned on the outer ring */}
            <div className="absolute left-0 top-1/2 w-3 h-3 bg-green-700 rounded-full transform -translate-y-1/2 -translate-x-1/2 z-30" />
            <div className="absolute right-0 top-1/2 w-3 h-3 bg-green-700 rounded-full transform -translate-y-1/2 translate-x-1/2 z-30" />
            
            {/* Outer thinner ring */}
            <div className="w-28 h-28 border-2 border-green-700 rounded-full flex items-center justify-center relative z-20">
              {/* Inner thicker ring */}
              <div className="w-24 h-24 border-8 border-green-700 rounded-full bg-white flex items-center justify-center">
                <div className="text-center">
                  <p className="text-xs font-medium text-gray-600 mb-1">Step 3</p>
                  <p className="text-lg font-bold text-gray-900">Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 max-w-48 leading-relaxed">
          Purchase products, fund initiatives, and advocate for change
        </p>
      </div>

      {/* Step 4: Grow */}
      <div className="flex flex-col items-center text-center group">
        <div className="relative mb-6">
          <div className="relative z-10 group-hover:scale-105 transition-transform duration-300">
            {/* Small decorative circles positioned on the outer ring */}
            <div className="absolute left-0 top-1/2 w-3 h-3 bg-green-700 rounded-full transform -translate-y-1/2 -translate-x-1/2 z-30" />
            <div className="absolute right-0 top-1/2 w-3 h-3 bg-green-700 rounded-full transform -translate-y-1/2 translate-x-1/2 z-30" />
            
            {/* Outer thinner ring */}
            <div className="w-28 h-28 border-2 border-green-700 rounded-full flex items-center justify-center relative z-20">
              {/* Inner thicker ring */}
              <div className="w-24 h-24 border-8 border-green-700 rounded-full bg-white flex items-center justify-center">
                <div className="text-center">
                  <p className="text-xs font-medium text-gray-600 mb-1">Step 4</p>
                  <p className="text-lg font-bold text-gray-900">Grow</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 max-w-48 leading-relaxed">
          See measurable impact in communities and sustainable ecosystems
        </p>
      </div>
    </div>
  </div>
</section>
{/* ✅ Stories & Insights From the Field Section */}
<section className="bg-[#f8f9fa] py-20 w-full">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-6 ml-9">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Stories &<br />
                Insights <span className="text-green-700">From<br />
                the Field</span>
              </h2>
            </div>
            
            <p className="text-gray-700 text-lg leading-relaxed">
              Hear directly from farmers, producers, and consumers<br />
              transforming lives through agroecology.
            </p>
            
            <p className="text-gray-600 text-base leading-relaxed">
              Explore success stories, expert advice, and the latest<br />
              updates from our growing network.
            </p>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={handleReadOtherStories}
                className="bg-green-700 hover:bg-green-800 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300"
              >
                Read Other Stories
              </button>
              <button 
                onClick={handleSubmitYours}
                className="border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white font-semibold px-8 py-3 rounded-full transition-all duration-300"
              >
                Submit Yours
              </button>
            </div>
          </div>
          
          {/* Right Content - Three Column Image Layout */}
          <div className="flex gap-3 h-96 -ml-9">
            
            {/* Main Story Card with Background Image */}
            <div 
              className="flex-1 rounded-2xl p-6 text-white relative overflow-hidden bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(135deg, rgba(185, 28, 28, 0.8) 0%, rgba(21, 128, 61, 0.8) 100%), url('https://images.unsplash.com/photo-1594736797933-d0701ba2fe65?w=800&q=80')`,
                backgroundColor: 'rgba(46, 125, 50, 0.1)'
              }}
            >
              {/* Profile Image */}
              <div className="mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&crop=face&q=80"
                  alt="Wanjiku, Farmer" 
                  className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
                />
              </div>
              
              {/* Story Content */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold leading-tight">
                  How Organic<br />
                  Practices Helped<br />
                  Me Triple My Yield
                </h3>
                
                <p className="text-sm text-white/90 leading-relaxed">
                  "When I started using compost<br />
                  and rotating my crops, I noticed<br />
                  a real difference. Today, I sell at<br />
                  three organic markets."
                </p>
                
                <p className="text-xs text-white/70">
                  By Wanjiku, Farmer | Muranga, Kenya
                </p>
                
                <button className="bg-white/20 hover:bg-white/30 text-white text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2">
                  Read the Story
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Second Column - Light colored image */}
            <div className="w-24 md:w-28">
              <img 
                src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80"
                alt="Light colored background" 
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            
            {/* Third Column - Green plants */}
            <div className="w-24 md:w-28">
              <img 
                src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&q=80"
                alt="Green plants in field" 
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            
          </div>
        </div>
      </div>
    </section>

        {/* Events Section */}
        <section className="bg-[#fdfbf6] py-20 w-full">
          <div className="max-w-[1440px] mx-auto px-4 md:px-6">
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
                       onClick={() => router.push('/events')}>
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
              <a 
                href="/events"
                className="bg-green-700 hover:bg-green-800 text-white font-semibold px-8 py-4 rounded-full text-sm transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl inline-block"
              >
                View All Events
              </a>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#fdfbf6] py-5 mb-18 w-full">
          <div className="max-w-[1440px] mx-auto px-4 md:px-6 text-center relative z-10 rounded-2xl flex flex-col justify-center overflow-hidden py-8">
            <div className="absolute inset-0 bg-[#2E7D32] z-0"></div>
            <div className="absolute inset-0 bg-[url('/images/veges.png')] opacity-90 bg-contain bg-repeat z-0"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                Ready to shop for impact?
              </h2>
              <p className="text-base md:text-lg text-white/90 mb-6 max-w-2xl mx-auto">
                Explore our full range of certified organic solutions and see how every purchase drives change.
              </p>
              <a 
                href="/shop"
                className="mx-auto bg-white text-green-700 hover:bg-gray-50 font-semibold px-6 py-2 rounded-full text-base transition-all duration-300 hover:scale-105 shadow-lg inline-block"
              >
                Shop All Products
              </a>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="bg-[#2C2A29] py-16 -mt-16 w-full">
          <div className="max-w-[1440px] mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-8">
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
        <footer className="bg-[#24231D] py-8 w-full">
          <div className="max-w-[1440px] mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-6">
              
              {/* Left Section - Logo and Description */}
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
                  We partner with farmers across Africa to build sustainable<br/> food
                  systems through agroecology, creating premium <br/>
                  products that
                  support rural communities.
                </p>

                {/* Social Media Icons */}
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

              {/* Middle Section - Explore Links */}
              <div className="w-full lg:w-[187.25px] flex flex-col items-start gap-2 mt-18 ml-16">
                <h3 className="text-[#FDFBF6] font-semibold text-lg ml-5 leading-tight">
                  Explore
                </h3>
                
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

              {/* Right Section - Contact Information */}
              <div className="ml-9 w-full lg:w-[345px] flex flex-col gap-3 mt-18">
                <h3 className="text-[#FDFBF6] font-semibold text-lg ml-5 leading-tight">
                  Contact
                </h3>

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
          <div className="max-w-[1440px] mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
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
    </div>
  );
}
