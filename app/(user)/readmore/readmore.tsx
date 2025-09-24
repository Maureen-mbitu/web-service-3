"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { BookOpen, DollarSign, GraduationCap, Heart, Leaf, MessageCircle, Smile, Sprout, ThumbsUp, Users } from "lucide-react";

export default function StoryPage() {
    // const [activeTab, setActiveTab] = useState<"stories" | "news" | "learning">("stories");
    const [activeTab, setActiveTab] = useState<"stories" | "news" | "learning">("stories");
    const [newComment, setNewComment] = useState("");


    const pathname = usePathname();
    const [searchQuery, setSearchQuery] = useState("");
       const navigationItems = [
        { name: "Home", href: "/" },
        { name: "Our Mission", href: "/mission" },
        { name: "Shop", href: "/shop" },
        { name: "Resources", href: "/resources" },
        { name: "Outlets", href: "/outlets" },
        { name: "Surveys", href: "/surveys" },
        { name: "Events", href: "/events" },
        { name: "Contact Us", href: "/contact" },
        
      ];
       const comments = [
        {
            id: 1,
            author: "Ralph Edwards",
            date: "Aug 18, 2021",
            text: "In magna porttitor Aucibus mauris massa sit lorem sed scelerisque. Pharetra pharetra vel massa lorem auctor nulla nec ulla potitor faucibus porta ut quam aliquet fermentum nibh"
        },
        {
            id: 2,
            author: "Ralph Edwards", 
            date: "Aug 18, 2021",
            text: "In magna porttitor Aucibus mauris massa sit lorem sed scelerisque. Pharetra pharetra vel massa lorem auctor nulla nec ulla potitor faucibus porta ut quam aliquet fermentum nibh"
        },
        {
            id: 3,
            author: "Ralph Edwards",
            date: "Aug 18, 2021", 
            text: "In magna porttitor Aucibus mauris massa sit lorem sed scelerisque. Pharetra pharetra vel massa lorem auctor nulla nec ulla potitor faucibus porta ut quam aliquet fermentum nibh"
        },
        {
            id: 4,
            author: "Ralph Edwards",
            date: "Aug 18, 2021",
            text: "In magna porttitor Aucibus mauris massa sit lorem sed scelerisque. Pharetra pharetra vel massa lorem auctor nulla nec ulla potitor faucibus porta ut quam aliquet fermentum nibh"
        }
    ];

    const popularPosts = [
        {
            category: "CONSUMER GUIDE",
            date: "3 May 2024",
            title: "How to Start Your Organic Kitchen Garden (Even in a Small Space)",
            image: "/images/garden-1.png"
        },
        {
            category: "NEWS",
            date: "3 May 2024", 
            title: "Biovision's July Training Recap: 200 Farmers Empowered in Meru",
            image: "/images/farmers2.png"
        },
        {
            category: "AGROECOLOGY",
            date: "3 May 2024",
            title: "Why Supporting Agroecological Markets Matters", 
            image: "/images/market.png"
        },
        {
            category: "NEWS",
            date: "3 May 2024",
            title: "Biovision's July Training Recap: 200 Farmers Empowered in Meru",
            image: "/images/farmers2.png"
        }
    ];
    return (
    
        <div className="bg-[#fdfbf6]">
            {/* Main Content */}
            <main className="pt-28 sm:pt-32 pb-20">
                <div className="max-w-4xl mx-auto px-4 md:px-6">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">SUCCESS STORY</span>
                        <span>•</span>
                        <span>18 March 2021</span>
                    </div>

                    {/* Article Header */}
                    <header className="mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            From Farm to Market: How Mary's Organic Journey Doubled Her Income
                        </h1>
                        
                       {/* Background Image Container */}
  <div className="ml-1 relative h-[320px] md:h-[380px] w-[85%] md:w-[90%] rounded-2xl overflow-hidden">
    <img 
      src="/images/woman.png" 
      alt="Mary working on her organic farm" 
      className="w-full h-full object-cover" 
    />
  </div>

                        <p className="text-lg text-gray-600 leading-relaxed">
                            Mary Njonge, a smallholder farmer from Nyambene County never imagined that growing vegetables without chemicals could change her family's future. But in just two years, her switch to agroecological farming has doubled her income, improved her soil quality, and opened doors she'd never envisaged.
                        </p>
                    </header>

                    {/* Article Content */}
                    <article className="prose prose-lg max-w-none">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">From Struggle to Opportunity</h2>
                        <p className="text-gray-700 mb-6">
                            Before learning about AE/EOA practices, Mary struggled to make a profit from her cabbages and spinach. Pests were frequent, costs of chemical inputs were rising, and markets were uncertain.
                        </p>

                        <blockquote className="border-l-4 border-green-500 pl-6 my-8 italic text-lg text-gray-700">
                            "I was working hard, but the returns didn't match. Every season felt like a gamble," she says.
                            <footer className="text-sm text-gray-500 mt-2">— Mary Njonge</footer>
                        </blockquote>

                        <p className="text-gray-700 mb-6">
                            Her turning point came during a Biovision Africa Trust training session on soil health and composting.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Learning to Grow Differently</h2>
                        <p className="text-gray-700 mb-6">
                            Mary started small: composting kitchen waste, using natural pest repellents like neem, and practicing crop rotation. The results were immediate — healthier vegetables, fewer losses in the field, and reduced costs.
                        </p>

                        <p className="text-gray-700 mb-6">
                            She joined a local agroecological group, got certified by her county's organic committee, and began supplying produce to a new EOA-certified outlet in Mbokomu.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Doubling Her Income — And Confidence</h2>
                        <p className="text-gray-700 mb-6">
                            By embracing locally smart and accessible farmer market, Mary's monthly income grew from KES 8,000 to over KES 16,000.
                        </p>

                        <p className="text-gray-700 mb-6">
                            She's also become a mentor in her area, helping 15 neighboring women start their organic kitchen gardens.
                        </p>

                        <blockquote className="border-l-4 border-green-500 pl-6 my-8 italic text-lg text-gray-700">
                            "Now, I can pay school fees on time, save a little, and teach others what I've learned."
                            <footer className="text-sm text-gray-500 mt-2">— Mary Njonge</footer>
                        </blockquote>

                        <p className="text-gray-700 mb-6">
                            She's also become a mentor in her area, helping 15 neighboring women start their organic kitchen gardens.
                        </p>

                        {/* Second Image */}
                        <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden my-8">
                            <img 
                                src="/images/organic-vegetables.png" 
                                alt="Fresh organic vegetables from Mary's farm"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">The Bigger Picture</h2>
                        <p className="text-gray-700 mb-6">
                            Mary's journey is just one example of how agroecology transforms lives — especially for women in rural areas. With access to training, better markets, and policy support, small farmers like her can lead the way in creating healthier, more resilient food systems.
                        </p>

                        <p className="text-gray-700 mb-6">
                            We're so excited by the potential of grassroots AE and the opportunities it will unlock — from helping people explore themselves creatively, to helping decisionalized trend new types of opportunities, to transforming how businesses and governments engage their customers and constituents. We invest for more to come in the years and months ahead.
                        </p>
                    </article>

                    {/* Comments Section */}
                    <section className="mt-16 pt-8 border-t border-gray-200">
                        <h3 className="text-2xl font-bold text-gray-900 mb-8">Comments</h3>
                        
                        {/* Add Comment Form */}
                        <div className="flex gap-4 mb-8">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <Users className="w-5 h-5 text-green-600" />
                            </div>
                            <div className="flex-1">
                                <textarea
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Add a comment"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                                    rows={3}
                                />
                                <button className="mt-3 bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg font-medium transition">
                                    Post
                                </button>
                            </div>
                        </div>

                        {/* Comments List */}
                        <div className="space-y-6">
                            {comments.map((comment) => (
                                <div key={comment.id} className="flex gap-4">
                                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-red-600 font-medium text-sm">R</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <h4 className="font-semibold text-gray-900">{comment.author}</h4>
                                            <span className="text-sm text-gray-500">{comment.date}</span>
                                        </div>
                                        <p className="text-gray-700 mb-3">{comment.text}</p>
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <button className="flex items-center gap-1 hover:text-green-600">
                                                <ThumbsUp className="w-4 h-4" />
                                                <span>5</span>
                                            </button>
                                            <button className="flex items-center gap-1 hover:text-green-600">
                                                <MessageCircle className="w-4 h-4" />
                                                <span>3</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="text-center mt-8">
                            <button className="bg-green-100 hover:bg-green-200 text-green-700 px-6 py-2 rounded-lg font-medium transition">
                                See 16 more comments
                            </button>
                        </div>
                    </section>

                    {/* Popular Posts Section */}
                    <section className="mt-16 pt-8 border-t border-gray-200">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-bold text-gray-900">Popular Posts</h3>
                            <button className="text-green-700 hover:text-green-800 font-medium">View All</button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {popularPosts.map((post, index) => (
                                <article key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                                    <div className="h-40 bg-gray-200">
                                        <img 
                                            src={post.image} 
                                            alt={post.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded">
                                                {post.category}
                                            </span>
                                            <span className="text-xs text-gray-500">{post.date}</span>
                                        </div>
                                        <h4 className="font-semibold text-gray-900 text-sm leading-tight">
                                            {post.title}
                                        </h4>
                                        <button className="text-green-700 hover:text-green-800 text-sm font-medium mt-2">
                                            Read More...
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
     




{/* Call-to-Action Section */}
<section className="mb-20 ml-50 max-w-4xl bg-green-600 rounded-xlml-60 max-w-3xl mt-[-6] px-6 py-6 rounded-xl">
  <div className="mb-4 max-w-4xl mx-auto text-center">
    <h2 className="mb-4 text-3xl md:text-4xl font-bold text-white mb-6">
      Your Story Could Inspire Thousands
    </h2>
    <p className="mb-6 text-lg md:text-xl text-green-100 mb-8 max-w-2xl mx-auto">
      Have you started your agroecology journey? Share your experience 
      and become part of a growing movement across Africa.
    </p>
    <button className="mt-[-2] bg-white hover:bg-gray-100 text-green-600 px-8 py-4 rounded-lg font-semibold text-lg transition duration-300 shadow-lg hover:shadow-xl">
      Share Your Story
    </button>
  </div>
</section>
   
{/* Newsletter Section */}
      <section className="bg-[#2C2A29] py-16 px-4 md:px-8 lg:px-12 -mt-16">
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
<footer className="bg-[#24231D] py-8 px-4 md:px-8 lg:px-12">
    <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-6">
            
            {/* ✅ Left Section - Logo and Description */}
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

  {/* ✅ Social Media Icons */}
  <div className="flex items-center gap-4 mt-1">
     {/* Twitter */}
    <div className="flex w-10 h-10 justify-center items-center rounded-full bg-[#2e7d32]">
      <svg fill="#FDFBF6" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.27 4.27 0 0 0 1.88-2.35c-.84.5-1.77.84-2.76 1.03a4.26 4.26 0 0 0-7.26 3.88 12.1 12.1 0 0 1-8.78-4.45 4.25 4.25 0 0 0 1.32 5.67A4.22 4.22 0 0 1 2.8 9v.05a4.26 4.26 0 0 0 3.42 4.18 4.3 4.3 0 0 1-1.93.07 4.26 4.26 0 0 0 3.98 2.96A8.54 8.54 0 0 1 2 18.58 12.07 12.07 0 0 0 8.29 20c7.55 0 11.68-6.26 11.68-11.68l-.01-.53A8.27 8.27 0 0 0 22.46 6z"/>
      </svg>
    </div>

    {/* Facebook */}
     {/* Facebook */}
    <div className="flex w-10 h-10 justify-center items-center rounded-full bg-[#2e7d32]">
      <svg fill="#FDFBF6" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H7.9v-2.89h2.54V9.41c0-2.51 1.5-3.89 3.8-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.77l-.44 2.89h-2.33v6.99C18.34 21.12 22 16.99 22 12z"/>
      </svg>
    </div>

    {/* Pinterest */}
    <div className="flex w-10 h-10 justify-center items-center rounded-full bg-[#2e7d32]">
      <svg fill="#FDFBF6" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.04c-5.51 0-9.96 4.45-9.96 9.96 0 4.14 2.57 7.67 6.2 9.13-.08-.78-.15-1.97.03-2.82.17-.79 1.1-5.04 1.1-5.04s-.28-.57-.28-1.41c0-1.32.77-2.3 1.73-2.3.81 0 1.2.61 1.2 1.34 0 .82-.52 2.05-.79 3.19-.23.97.48 1.76 1.42 1.76 1.71 0 3.03-1.8 3.03-4.39 0-2.3-1.65-3.91-4.01-3.91-2.73 0-4.34 2.05-4.34 4.18 0 .83.32 1.72.72 2.2a.29.29 0 0 1 .07.28c-.07.31-.23.97-.26 1.1-.04.17-.14.21-.31.13-1.17-.54-1.9-2.22-1.9-3.57 0-2.91 2.12-5.58 6.12-5.58 3.21 0 5.71 2.29 5.71 5.36 0 3.18-2 5.74-4.77 5.74-1.1 0-2.14-.57-2.5-1.23l-.68 2.61c-.25.97-.94 2.2-1.41 2.94 1.06.33 2.18.51 3.34.51 5.51 0 9.96-4.45 9.96-9.96S17.51 2.04 12 2.04z"/>
      </svg>
    </div>

    {/* Instagram */}
    <div className="flex w-10 h-10 justify-center items-center rounded-full bg-[#2e7d32]">
      <svg fill="#FDFBF6" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.75 2C5.13 2 3 4.13 3 6.75v10.5C3 19.87 5.13 22 7.75 22h8.5C18.87 22 21 19.87 21 17.25V6.75C21 4.13 18.87 2 16.25 2h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm6.25.5a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>
      </svg>
    </div>

  </div>
</div>

{/* ✅ Middle Section - Explore Links */}
<div className="w-full lg:w-[187.25px] flex flex-col items-start gap-2 mt-18 ml-16">
  <h3 className="text-[#FDFBF6] font-semibold text-lg ml-5 leading-tight">
    Explore
  </h3>
  
  {/* Green underline with dot */}
  <div className="flex ml-5 items-center gap-1 mt-1 mb-4">
    <div className="w-[35px] h-[2px] bg-[#2e7d32] rounded-sm" />
    <div className="w-[5px] h-[5px] bg-[#2e7d32] rounded-full" />
  </div>
  
  {/* Links */}
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

            {/* ✅ Right Section - Contact Information */}
<div className="ml-9 w-full lg:w-[345px] flex flex-col gap-3 mt-18">
  <h3 className="text-[#FDFBF6] font-semibold text-lg ml-5 leading-tight">
    Contact
  </h3>

  {/* Green underline with dot */}
  <div className="flex ml-5 items-center gap-1 mt-1 mb-4">
    <div className="w-[35px] h-[2px] bg-[#2e7d32] rounded-sm" />
    <div className="w-[5px] h-[5px] bg-[#2e7d32] rounded-full" />
  </div>

  <div className="ml-5 flex flex-col gap-2 text-[#fdfbf6] text-sm leading-[22px] font-normal font-sans">

    {/* Phone */}
    <div className="flex items-start gap-2">
      <svg className="w-4 h-4 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="#FDFBF6">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
      </svg>
      <span>+254 (0) 20 632 4806</span>
    </div>

    {/* Email */}
    <div className="flex items-start gap-2">
      <svg className="w-4 h-4 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="#FDFBF6">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
      <span>info@biovisionafricatrust.org</span>
    </div>

    {/* Address */}
    <div className="flex items-start gap-2">
      <svg className="w-4 h-4 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="#FDFBF6">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
      <span>Duduville Campus, Kasarani Nairobi, Kenya</span>
    </div>

    {/* P.O. Box */}
    <div className="flex items-start gap-2">
      <svg className="w-4 h-4 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="#FDFBF6">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
      <span>P.O. Box 12345, Nairobi, Kenya</span>
    </div>

    {/* Hours */}
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
        {/* Updated Bottom Section - Full Width */}
{/* Bottom Section - Full Width Outside Container */}
        <div className="w-full bg-[#2C2A29] border-t border-gray-700 pt-6 pb-6 ">
            <div className="max-w-9xl mx-auto px-4 md:px-8 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className=" ml-3 text-yellow-500 text-xs font-medium">
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