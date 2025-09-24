"use client";

import { Construction, ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

interface ComingSoonProps {
  pageName: string;
  description?: string;
  expectedDate?: string;
}

export default function ComingSoon({ 
  pageName, 
  description = "We're working hard to bring you this feature.", 
  expectedDate 
}: ComingSoonProps) {
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-16">
        <div className="text-center">
          {/* Construction Icon */}
          <div className="mb-8">
            <Construction className="w-24 h-24 mx-auto text-green-600" />
          </div>
          
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {pageName} Coming Soon
          </h1>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {description}
          </p>
          
          {/* Expected Date */}
          {expectedDate && (
            <div className="bg-green-100 border border-green-200 rounded-lg p-4 mb-8 inline-block">
              <p className="text-green-800 font-medium">
                Expected Launch: {expectedDate}
              </p>
            </div>
          )}
          
          {/* Feature List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              What's Coming:
            </h3>
            <ul className="text-left space-y-2 text-gray-600">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Interactive user interface
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Real-time data integration
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Mobile-responsive design
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Advanced filtering and search
              </li>
            </ul>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <Home size={20} />
              Back to Home
            </Link>
            
            <Link 
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border border-green-600 text-green-600 hover:bg-green-50 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Get Updates
            </Link>
          </div>
          
          {/* Newsletter Signup */}
          <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Be the first to know when {pageName} launches!
            </h3>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Notify Me
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}