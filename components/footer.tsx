import React from 'react'

const Footer = () => {
  return (
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">B</span>
                </div>
                <h4 className="text-xl font-bold">Biovision</h4>
              </div>
              <p className="text-gray-400 mb-4">
                Growing Africa's Future Through Sustainable Agriculture
              </p>
              <p className="text-gray-400 text-sm">
                We partner with farmers, governments, and businesses to create lasting change in agriculture, enabling people to scale up agroecological practices and innovations.
              </p>
              <div className="flex space-x-4 mt-4">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">f</span>
                </div>
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">t</span>
                </div>
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">in</span>
                </div>
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">ig</span>
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Explore</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/our-mission" className="hover:text-white">Our Mission</a></li>
                <li><a href="/blog" className="hover:text-white">Blog</a></li>
                <li><a href="/impact" className="hover:text-white">Impact</a></li>
                <li><a href="/faq" className="hover:text-white">FAQ</a></li>
                <li><a href="/press-media" className="hover:text-white">Press & Media</a></li>
                <li><a href="/careers" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Contact</h5>
              <div className="text-gray-400 space-y-2">
                <p>info@biovisionafrica.com</p>
                <p>‪+41 44 341 97 17‬</p>
                <p>Biovision Africa Trust</p>
                <p>P.O. Box 30772 GPO, Nairobi</p>
                <p>Kenya</p>
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Join the Movement</h5>
              <p className="text-gray-400 mb-4">
                Get access to AEGON insights, stories, impact and resources that empower African farmers.
              </p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address"
                  className="flex-1 px-4 py-2 rounded-l-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <button className="bg-green-600 text-white px-6 py-2 rounded-r-full hover:bg-green-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Biovision Africa Trust. All rights reserved.</p>
          </div>
        </div>
      </footer>
  )
}

export default Footer;