"use client";
import Link from "next/link";
import { Search } from "lucide-react";
import Navigation from "./Navigation";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-20 md:h-24">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/5376572c943bbbbf555a8e8d2b23c9146eee9067?width=335"
              alt="Biovision Africa Trust"
              className="h-10 md:h-12 lg:h-14 object-contain"
            />
          </Link>
        </div>

        {/* Navigation */}
        <Navigation />

        {/* Right side - Search + Sign Up */}
        <div className="hidden md:flex items-center gap-4">
          {/* Search */}
          <button className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center cursor-pointer hover:bg-white/10 transition">
            <Search className="w-5 h-5 text-white" />
          </button>
          
          {/* Sign Up Button */}
          <Link href="/auth_next_product_outlet" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition">
            Sign Up
          </Link>
          
          {/* Language Selector */}
          <div className="flex items-center gap-1 text-white cursor-pointer">
            <span className="text-sm font-medium">EN</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
};