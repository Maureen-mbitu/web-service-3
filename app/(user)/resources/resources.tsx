"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { BookOpen, ChevronDown, ChevronUp, DollarSign, Download, GraduationCap, Heart, Leaf, Play, Smile, Sprout, Users } from "lucide-react";

export default function Resources() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState('resources');


    // Main tab state for News, Stories, Learning
    const [activeMainTab, setActiveMainTab] = useState<"news" | "stories" | "learning">("stories");
    
    // Sub-tab states for Learning section
    const [activeTab, setActiveTab] = useState<"publications" | "videos" | "newsletters" | "infographics" | "faqs">("publications");
    const [activeFAQTab, setActiveFAQTab] = useState<"general" | "features" | "learning">("general");
    const [expandedFAQ, setExpandedFAQ] = useState<number | null>(0);

    const pathname = usePathname();
    const [searchQuery, setSearchQuery] = useState("");
    
    const navigationItems = [
        { name: "Home", href: "/" },
        { name: "Mission", href: "/mission" },
        { name: "Shop", href: "/shop" },
        { name: "Resources", href: "/resources" },
        { name: "Outlets", href: "/outlets" },
        { name: "Surveys", href: "/surveys" },
        { name: "Events", href: "/events" },
        { name: "Contacts", href: "/contact" },
    ];

    // Sample data for resources (Learning section)
    const resourceData = {
        publications: [
            {
                id: 1,
                title: "Beginner's Guide To Agroecology",
                description: "Learn the 10 core principles of AECOA farming, with diagrams and field tips.",
                image: "/images/woman.png",
                type: "download",
                fileTypes: ["PDF", "DOC"]
            },
            {
                id: 2,
                title: "Organic Compost At Home",
                description: "Step-by-step video tutorial filmed with Bioevision farming officers.",
                image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop&crop=face",
                type: "play",
                fileTypes: ["MP4"]
            },
            {
                id: 3,
                title: "Certification Checklist For Smallholder Farmers",
                description: "A downloadable checklist to prepare for required AECOA certification.",
                image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop&crop=face",
                type: "download",
                fileTypes: ["PDF"]
            },
            {
                id: 4,
                title: "Water Management Techniques",
                description: "Learn efficient water conservation methods for sustainable farming practices.",
                image: "/images/woman.png",
                type: "download",
                fileTypes: ["PDF", "DOC"]
            }
        ]
    };

    const faqs = {
        general: [
            {
                question: "What is agroecology and how is it different from organic farming?",
                answer: "Agroecology is a holistic approach to farming that applies ecological principles to agricultural systems. Unlike organic farming which focuses primarily on avoiding synthetic inputs, agroecology encompasses social, economic, and environmental dimensions of sustainable food systems."
            },
            {
                question: "How do I join a certified AE/EOA group in my region?",
                answer: "Contact your local agricultural extension office or visit our outlets page to find certified groups near you. You can also reach out to us directly for guidance on finding local partnerships."
            },
            {
                question: "Can I get support or training for AECOA?",
                answer: "Yes, we offer comprehensive training programs and ongoing support through our network of field officers and partner organizations. Check our learning resources and events page for upcoming opportunities."
            },
            {
                question: "Do I need land to start agroecological practices?",
                answer: "Not necessarily. You can start with container gardening, community gardens, or partner with local farmers to learn and practice agroecological methods."
            },
            {
                question: "What crops grow best with AE techniques?",
                answer: "Most crops thrive with agroecological practices. Indigenous and locally adapted varieties often perform best, including leafy greens, legumes, and traditional grains."
            }
        ],
        features: [
            {
                question: "What features are available in our learning platform?",
                answer: "Our platform includes video tutorials, downloadable guides, interactive workshops, and direct access to farming experts."
            },
            {
                question: "How do I access premium content?",
                answer: "Premium content is available to registered members and certified farmer groups. Sign up for free access to basic resources."
            }
        ],
        learning: [
            {
                question: "How long does it take to complete the certification?",
                answer: "The basic certification process typically takes 3-6 months, depending on your pace and the complexity of your farming operation."
            },
            {
                question: "Are there online learning options available?",
                answer: "Yes, we offer both online and in-person learning opportunities to accommodate different learning preferences and schedules."
            }
        ]
    };
    
    const toggleFAQ = (index: number) => {
        setExpandedFAQ(expandedFAQ === index ? null : index);
    };

    const ResourceCard = ({ resource }: { resource: any }) => (
        <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="relative">
                <img 
                    src={resource.image} 
                    alt={resource.title}
                    className="w-full h-48 object-cover"
                />
                {resource.type === "play" && (
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                            <Play className="w-6 h-6 text-gray-800 ml-1" />
                        </div>
                    </div>
                )}
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{resource.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
                
                <div className="flex items-center justify-between">
                    <button className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center gap-1">
                        {resource.type === "download" ? (
                            <>
                                <Download className="w-4 h-4" />
                                Download
                            </>
                        ) : (
                            <>
                                <Play className="w-4 h-4" />
                                Play
                            </>
                        )}
                    </button>
                    
                    <div className="flex gap-1">
                        {resource.fileTypes.map((type: string, index: number) => (
                            <span 
                                key={index}
                                className={`w-6 h-6 rounded text-xs font-bold flex items-center justify-center text-white ${
                                    type === 'PDF' ? 'bg-red-500' : 
                                    type === 'DOC' ? 'bg-blue-500' : 
                                    type === 'MP4' ? 'bg-purple-500' : 'bg-gray-500'
                                }`}
                            >
                                {type === 'PDF' ? 'P' : type === 'DOC' ? 'D' : type === 'MP4' ? 'M' : type[0]}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    // Stories Section Content
    const StoriesContent = () => (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                        Real Stories from Our<br />Community
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
                        Hear from farmers, students, and advocates transforming lives through agroecology.<br />
                        These stories reflect passion, progress, and the power of sustainable farming.
                    </p>
                    
                    {/* Featured Story with Background Image */}
                    <div className="relative mx-auto max-w-6xl">
                        {/* Background Image Container */}
                        <div className="ml-15 relative h-[320px] md:h-[380px] w-[85%] md:w-[90%] rounded-2xl overflow-hidden">
                            <img 
                                src="/images/woman.png" 
                                alt="Mary working on her organic farm" 
                                className="w-full h-full object-cover" 
                            />
                        </div>
                        
                        {/* Success Story Card */}
                        <div className="mt-39 absolute top-1/2 -right-4 md:-right-8 transform -translate-y-1/2 w-[500px] md:w-[600px] lg:w-[750px] z-10 mr-10">
                            <div className="bg-[#FAF9F7] rounded-xl shadow-lg p-5 md:p-6 text-left">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs text-green-600 font-semibold tracking-wide uppercase">SUCCESS STORY</span>
                                    <span className="text-xs text-gray-400">4 July 2025</span>
                                </div>
                                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 leading-snug">
                                    From Farm to Market: How Mary's Organic Journey Doubled Her Income
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    Mary Njoroge, a smallholder farmer from Nyandarua County, never imagined that growing vegetables without 
                                    chemicals could change her family's future. But in just two years, her switch to agroecological farming has doubled 
                                    her income, improved her soil quality, and opened new doors she didn't know existed.
                                </p>
                                <Link href="/readmore">
  <button className="bg-green-600 hover:bg-green-700 text-white text-sm px-5 py-2.5 rounded-lg font-medium transition duration-200">
    Read More
  </button>
</Link>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-24 md:mt-32"></div>
                </div>
            </section>

            {/* Recent Posts Section */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">Our Recent Posts</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                                <img 
                                    src="/images/woman.png" 
                                    alt="Story image"
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <div className="text-xs text-green-600 font-semibold mb-2">SUCCESS STORY</div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                                        How Mary's Organic Journey Doubled Her Income
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4">
                                        Mary Nzirorigo, a farmer from Nyarutarama, shares her transition to AECOA practices and how it transformed her income and lifestyle for her vegetables.
                                    </p>
                                    <Link href="/readmore">
                                        <button className="text-green-600 hover:text-green-700 font-semibold text-sm">
                                            Read More...
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Popular Posts Section */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">Popular Posts</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                                <img 
                                    src="/images/sunset.png" 
                                    alt="Popular story"
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <div className="text-xs text-green-600 font-semibold mb-2">VISIT</div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                                        Inside Kenya's First AE-Certified Market in Kisumu
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4">
                                        The Kisumu Agroecology Market has been certified and AFECA payment required for all buyers. Learn more about selling sustainably and how it's being received.
                                    </p>
                                    <Link href="/readmore">
                                        <button className="text-green-600 hover:text-green-700 font-semibold text-sm">
                                            Read More...
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Second Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={`second-${i}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                                <img 
                                    src="/images/garden-space.png" 
                                    alt="Garden story"
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <div className="text-xs text-green-600 font-semibold mb-2">CONSUMER GUIDE</div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                                        How to Start Your Organic Garden (Even in a Small Space)
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4">
                                        Agroecology is about communities and making the most of small resources. A beginner guide offering step-by-step tips to learn using AECOA principles.
                                    </p>
                                    <Link href="/readmore">
                                        <button className="text-green-600 hover:text-green-700 font-semibold text-sm">
                                            Read More...
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );

    // News Section Content
    const NewsContent = () => (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                        Latest News & <br/>Announcements
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
                        Stay updated with the latest happenings across the AE/EOA movement. From new<br />
                        market launches to training recaps, we bring you the stories shaping Africa's <br/>ecological future
                    </p>
                    
                    {/* Featured Story with Background Image */}
                    <div className="relative mx-auto max-w-6xl">
                        <div className="ml-15 relative h-[320px] md:h-[380px] w-[85%] md:w-[90%] rounded-2xl overflow-hidden">
                            <img 
                                src="/images/woman.png" 
                                alt="Featured news story" 
                                className="w-full h-full object-cover" 
                            />
                        </div>
                        
                        <div className="absolute top-1/2 -right-4 md:-right-8 transform -translate-y-1/2 w-[500px] md:w-[600px] lg:w-[750px] z-10 mr-10">
                            <div className="mt-79 bg-[#FAF9F7] rounded-xl shadow-lg p-5 md:p-6 text-left">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs text-green-600 font-semibold tracking-wide uppercase">BREAKING NEWS</span>
                                    <span className="text-xs text-gray-400">4 July 2025</span>
                                </div>
                                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 leading-snug">
                                    Biovision Africa Trust Launches New Certification Program
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    A groundbreaking new certification program designed to empower smallholder farmers across East Africa 
                                    with comprehensive agroecological training and market access opportunities has been officially launched.
                                </p>
                                <button className="bg-green-600 hover:bg-green-700 text-white text-sm px-5 py-2.5 rounded-lg font-medium transition duration-200">
                                    Read More
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-24 md:mt-32"></div>
                </div>
            </section>

            {/* Recent News Section */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">Recent News</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                                <img 
                                    src="/images/training-session.png" 
                                    alt="News story"
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <div className="text-xs text-green-600 font-semibold mb-2">NEWS</div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                                        Biovision's July Training Recap: 250 Farmers Empowered in Meru
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4">
                                        Event recap following the week-long workshops, including partnerships we built during July field training workshops organized by Biovision Africa Trust.
                                    </p>
                                    <Link href="/readmore">
                                        <button className="text-green-600 hover:text-green-700 font-semibold text-sm">
                                            Read More...
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Additional News Section */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">More News</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={`more-${i}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                                <img 
                                    src="/images/sunset.png" 
                                    alt="News story"
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <div className="text-xs text-green-600 font-semibold mb-2">ANNOUNCEMENT</div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                                        New Partnership with East African Universities
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4">
                                        Biovision Africa Trust announces strategic partnerships with leading universities to advance agroecological research and education across the region.
                                    </p>
                                    <Link href="/readmore">
                                        <button className="text-green-600 hover:text-green-700 font-semibold text-sm">
                                            Read More...
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );

    // Learning Section Content
    const LearningContent = () => (
        <div className="bg-gray-50">
            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 py-12">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Practical Tools for Learning<br />& Growing
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                        Access downloadable guides, videos, and FAQs to help you apply agroecology 
                        principles on your farm, garden, or community project. Whether you're starting out or 
                        scaling up — these tools are here to support you.
                    </p>

                    {/* Resource Type Tabs */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {[
                            { key: "publications", label: "All", icon: BookOpen },
                            { key: "videos", label: "Publications", icon: BookOpen },
                            { key: "newsletters", label: "Videos", icon: Play },
                            { key: "infographics", label: "Newsletters", icon: Leaf },
                            { key: "faqs", label: "Infographics", icon: Heart },
                            { key: "faqs", label: "FAQs", icon: GraduationCap }
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key as any)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${
                                    activeTab === tab.key || (tab.label === "All" && activeTab === "publications")
                                        ? 'bg-green-600 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                <tab.icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Recently Added Section */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Recently Added</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {resourceData.publications.map((resource) => (
                            <ResourceCard key={resource.id} resource={resource} />
                        ))}
                    </div>
                </section>

                {/* Top Picks Section */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Top Picks</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {resourceData.publications.map((resource) => (
                            <ResourceCard key={`top-${resource.id}`} resource={resource} />
                        ))}
                    </div>
                </section>

                {/* Additional Row */}
                <section className="mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {resourceData.publications.map((resource) => (
                            <ResourceCard key={`additional-${resource.id}`} resource={resource} />
                        ))}
                    </div>
                </section>

                {/* FAQs Section */}
                <section className="bg-white rounded-2xl p-8 mb-16">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">FAQs</h2>
                    
                    {/* FAQ Tabs */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {[
                            { key: "general", label: "General" },
                            { key: "features", label: "Features" },
                            { key: "learning", label: "Learning" }
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveFAQTab(tab.key as any)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                                    activeFAQTab === tab.key
                                        ? 'bg-green-600 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* FAQ Items */}
                    <div className="max-w-3xl mx-auto">
                        {faqs[activeFAQTab].map((faq, index) => (
                            <div key={index} className="bg-gray-50 rounded-lg mb-4 overflow-hidden shadow-sm">
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-200"
                                >
                                    <span className="font-medium text-gray-900">{faq.question}</span>
                                    {expandedFAQ === index ? (
                                        <ChevronUp className="w-5 h-5 text-gray-500" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-gray-500" />
                                    )}
                                </button>
                                {expandedFAQ === index && (
                                    <div className="px-6 pb-4">
                                        <p className="text-gray-600">{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );

    return (
        <div className="relative min-h-screen w-full overflow-x-hidden">
            <div className="fixed inset-0 bg-black/1" />
      

            <div className="min-h-screen bg-black/2">
                {/* Navigation Tabs */}
                <nav className="pt-24  px-4 py-4 relative z-10">
                    <div className="max-w-6xl mx-auto flex justify-center">
                        <div className="flex items-center bg-white border border-gray-200 rounded-full p-1 shadow-sm">
                            <button 
                                onClick={() => setActiveMainTab("news")}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ml-1 ${
                                    activeMainTab === "news" 
                                        ? "bg-green-600 text-white hover:bg-green-700" 
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                            >
                                News
                            </button>
                            <button 
                                onClick={() => setActiveMainTab("stories")}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ml-1 ${
                                    activeMainTab === "stories" 
                                        ? "bg-green-600 text-white hover:bg-green-700" 
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                            >
                                Stories
                            </button>
                            <button 
                                onClick={() => setActiveMainTab("learning")}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ml-1 ${
                                    activeMainTab === "learning" 
                                        ? "bg-green-600 text-white hover:bg-green-700" 
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                            >
                                Learning
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Main Content Area */}
                <main className="relative z-10">
                    {activeMainTab === "stories" && <StoriesContent />}
                    {activeMainTab === "news" && <NewsContent />}
                    {activeMainTab === "learning" && <LearningContent />}
                </main>

                {/* Call-to-Action Section */}
                <section className="mb-19 py-16 px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-green-600 px-8 py-12 text-center rounded-xl">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                Your Story Could Inspire Thousands
                            </h2>
                            <p className="text-lg md:text-xl text-green-100 mb-8 max-w-2xl mx-auto">
                                Have you started your agroecology journey? Share your experience 
                                and become part of a growing movement across Africa.
                            </p>
                            <button className="bg-white hover:bg-gray-100 text-green-600 px-8 py-4 rounded-lg font-semibold text-lg transition duration-300 shadow-lg hover:shadow-xl">
                                Share Your Story
                            </button>
                        </div>
                    </div>
                </section>
            
                  
{/* Newsletter Section */}
      <section className="bg-[#2c2a29] py-16 px-4 md:px-8 lg:px-12 -mt-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Left side - Newsletter info */}
          <div className="flex items-center gap-4 text-white">
            <div className="flex-shrink-0">
              {/* Email icon */}
              <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-2">
                Join the Movement
              </h3>
              <p className="text-gray-300 text-sm md:text-base">
                Get updates on AE/EOA events, stories, outlets, and resources that empower African farmers.
              </p>
            </div>
          </div>

          {/* Right side - Email signup form */}
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

      
      {/* ✅ Footer Section */}
<footer className="bg-[#24231d] py-6 sm:py-8 px-4 md:px-8 lg:px-12">
    <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6">
            
            {/* ✅ Left Section - Logo and Description */}
<div className="w-full lg:w-[421px] flex flex-col items-start gap-3">
  <img 
    src="https://api.builder.io/api/v1/image/assets/TEMP/a516e3e257957bba69588e0c195041412cec5913?width=494" 
    alt="Biovision Africa Trust" 
    className="w-[180px] sm:w-[220px] h-auto object-contain"
  />

  <h3 className="text-[#fdfbf6] text-base sm:text-lg font-bold leading-6">
    Growing Africa's Future Through <br/>Sustainable Agriculture
  </h3>

  <p className="text-[#fdfbf6] text-xs sm:text-sm font-normal leading-[22px]">
    We partner with farmers across Africa to build sustainable food
    systems through agroecology, creating premium 
    products that
    support rural communities.
  </p>

  {/* ✅ Social Media Icons */}
  <div className="flex items-center gap-3 sm:gap-4 mt-1">
     {/* Twitter */}
    <div className="flex w-8 h-8 sm:w-10 sm:h-10 justify-center items-center rounded-full bg-[#2e7d32]">
      <svg fill="#FDFBF6" height="16" width="16" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.27 4.27 0 0 0 1.88-2.35c-.84.5-1.77.84-2.76 1.03a4.26 4.26 0 0 0-7.26 3.88 12.1 12.1 0 0 1-8.78-4.45 4.25 4.25 0 0 0 1.32 5.67A4.22 4.22 0 0 1 2.8 9v.05a4.26 4.26 0 0 0 3.42 4.18 4.3 4.3 0 0 1-1.93.07 4.26 4.26 0 0 0 3.98 2.96A8.54 8.54 0 0 1 2 18.58 12.07 12.07 0 0 0 8.29 20c7.55 0 11.68-6.26 11.68-11.68l-.01-.53A8.27 8.27 0 0 0 22.46 6z"/>
      </svg>
    </div>

    {/* Facebook */}
    <div className="flex w-8 h-8 sm:w-10 sm:h-10 justify-center items-center rounded-full bg-[#2e7d32]">
      <svg fill="#FDFBF6" height="16" width="16" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H7.9v-2.89h2.54V9.41c0-2.51 1.5-3.89 3.8-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.77l-.44 2.89h-2.33v6.99C18.34 21.12 22 16.99 22 12z"/>
      </svg>
    </div>

    {/* Pinterest */}
    <div className="flex w-8 h-8 sm:w-10 sm:h-10 justify-center items-center rounded-full bg-[#2e7d32]">
      <svg fill="#FDFBF6" height="16" width="16" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.04c-5.51 0-9.96 4.45-9.96 9.96 0 4.14 2.57 7.67 6.2 9.13-.08-.78-.15-1.97.03-2.82.17-.79 1.1-5.04 1.1-5.04s-.28-.57-.28-1.41c0-1.32.77-2.3 1.73-2.3.81 0 1.2.61 1.2 1.34 0 .82-.52 2.05-.79 3.19-.23.97.48 1.76 1.42 1.76 1.71 0 3.03-1.8 3.03-4.39 0-2.3-1.65-3.91-4.01-3.91-2.73 0-4.34 2.05-4.34 4.18 0 .83.32 1.72.72 2.2a.29.29 0 0 1 .07.28c-.07.31-.23.97-.26 1.1-.04.17-.14.21-.31.13-1.17-.54-1.9-2.22-1.9-3.57 0-2.91 2.12-5.58 6.12-5.58 3.21 0 5.71 2.29 5.71 5.36 0 3.18-2 5.74-4.77 5.74-1.1 0-2.14-.57-2.5-1.23l-.68 2.61c-.25.97-.94 2.2-1.41 2.94 1.06.33 2.18.51 3.34.51 5.51 0 9.96-4.45 9.96-9.96S17.51 2.04 12 2.04z"/>
      </svg>
    </div>

    {/* Instagram */}
    <div className="flex w-8 h-8 sm:w-10 sm:h-10 justify-center items-center rounded-full bg-[#2e7d32]">
      <svg fill="#FDFBF6" height="16" width="16" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.75 2C5.13 2 3 4.13 3 6.75v10.5C3 19.87 5.13 22 7.75 22h8.5C18.87 22 21 19.87 21 17.25V6.75C21 4.13 18.87 2 16.25 2h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm6.25.5a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>
      </svg>
    </div>

  </div>
</div>

{/* ✅ Middle Section - Explore Links */}
<div className="w-full lg:w-[187.25px] flex flex-col items-start gap-2 lg:mt-18 lg:ml-16">
  <h3 className="text-[#FDFBF6] font-semibold text-base sm:text-lg ml-0 lg:ml-5 leading-tight">
    Explore
  </h3>
  
  {/* Green underline with dot */}
  <div className="flex ml-0 lg:ml-5 items-center gap-1 mt-1 mb-3 sm:mb-4">
    <div className="w-[35px] h-[2px] bg-[#2e7d32] rounded-sm" />
    <div className="w-[5px] h-[5px] bg-[#2e7d32] rounded-full" />
  </div>
  
  {/* Links */}
  <div className="ml-0 lg:ml-4 flex flex-col items-start gap-2 w-full">
    {[
      { text: "Our Mission", icon: "🚀" },
      { text: "Sustainability Reports", icon: "🚀" },
      { text: "Become a Partner", icon: "🚀" },
      { text: "Press & Media", icon: "🚀" },
      { text: "Careers", icon: "🚀" },
      { text: "FAQs", icon: "🚀" }
    ].map((item, index) => (
      <div key={index} className="flex items-center gap-2 text-[#FDFBF6] text-xs sm:text-sm leading-[22px]">
        <span className="text-[#FDFBF6] filter brightness-0 invert">{item.icon}</span>
        <span>{item.text}</span>
      </div>
    ))}
  </div>
</div>

            {/* ✅ Right Section - Contact Information */}
<div className="lg:ml-9 w-full lg:w-[345px] flex flex-col gap-3 lg:mt-18">
  <h3 className="text-[#FDFBF6] font-semibold text-base sm:text-lg ml-0 lg:ml-5 leading-tight">
    Contact
  </h3>

  {/* Green underline with dot */}
  <div className="flex ml-0 lg:ml-5 items-center gap-1 mt-1 mb-3 sm:mb-4">
    <div className="w-[35px] h-[2px] bg-[#2e7d32] rounded-sm" />
    <div className="w-[5px] h-[5px] bg-[#2e7d32] rounded-full" />
  </div>

  <div className="ml-0 lg:ml-5 flex flex-col gap-2 text-[#fdfbf6] text-xs sm:text-sm leading-[22px] font-normal font-sans">

    {/* Phone */}
    <div className="flex items-start gap-2">
      <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="#FDFBF6">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
      </svg>
      <span>+254 (0) 20 632 4806</span>
    </div>

    {/* Email */}
    <div className="flex items-start gap-2">
      <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="#FDFBF6">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
      <span className="break-all">info@biovisionafricatrust.org</span>
    </div>

    {/* Address */}
    <div className="flex items-start gap-2">
      <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="#FDFBF6">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
      <span>Duduville Campus, Kasarani Nairobi, Kenya</span>
    </div>

    {/* P.O. Box */}
    <div className="flex items-start gap-2">
      <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="#FDFBF6">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
      <span>P.O. Box 12345, Nairobi, Kenya</span>
    </div>

    {/* Hours */}
    <div className="flex items-start gap-2">
      <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="#FDFBF6">
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
        {/* Updated Bottom Section - Full Width */}
{/* Bottom Section - Full Width Outside Container */}
        <div className="w-full bg-[#2c2a29] border-t border-gray-700 pt-4 sm:pt-6 pb-4 sm:pb-6">
            <div className="max-w-9xl mx-auto px-4 md:px-8 lg:px-12 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
                <p className="ml-0 sm:ml-3 text-yellow-500 text-xs font-medium text-center sm:text-left">
                    © 2025 BioVision Africa Trust. All Rights Reserved.
                </p>
                <div className="mr-0 sm:mr-9 flex gap-2 sm:gap-3 text-xs">
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

