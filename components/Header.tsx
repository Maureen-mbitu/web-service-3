"use client";
import Link from "next/link";
import { Search } from "lucide-react";
import Navigation from "./Navigation";
import { usePathname } from "next/navigation";

interface HeaderProps {
  theme?: "light" | "dark";
}

export const Header = ({ theme = "dark" }: HeaderProps) => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  
  // Choose logo based on page
  const logoSrc = isHomePage 
    ? "https://api.builder.io/api/v1/image/assets/TEMP/5376572c943bbbbf555a8e8d2b23c9146eee9067?width=335"
    : "/images/afric.png";
  
  const headerBg = theme === "light" ? "bg-white/95 backdrop-blur-sm border-b border-gray-200" : "bg-black/20 backdrop-blur-sm border-b border-white/10";
  
  return (
    <header className={`w-full z-50 ${headerBg}`}>
      <div className="w-full">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 flex items-center justify-between h-20 md:h-28">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center py-2">
            <Link href="/">
              <img
                src={logoSrc}
                alt="Biovision Africa Trust"
                className={`header-logo ${
                  isHomePage ? "home-logo" : "page-logo"
                }`}
              />
            </Link>
          </div>

          {/* Navigation */}
          <Navigation theme={theme} />

          {/* Right side - Search + Sign Up */}
          <div className="hidden md:flex items-center gap-4">
            {/* Search */}
            <button className={`w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer transition ${
              theme === "light" 
                ? "border-gray-300 hover:bg-gray-100 text-gray-600" 
                : "border-white/40 hover:bg-white/10 text-white"
            }`}>
              <Search className="w-5 h-5" />
            </button>
            
            {/* Sign Up Button */}
            <Link href="/auth_next_product_outlet" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition">
              Sign Up
            </Link>
            
            {/* Language Selector */}
            <div className={`flex items-center gap-1 cursor-pointer ${
              theme === "light" ? "text-gray-600" : "text-white"
            }`}>
              <span className="text-sm font-medium">EN</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
