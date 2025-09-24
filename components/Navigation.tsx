"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationItem {
  name: string;
  href: string;
  description?: string;
}

interface NavigationProps {
  theme?: "light" | "dark";
}

const navigationItems: NavigationItem[] = [
  { name: "Home", href: "/", description: "Welcome to Biovision" },
  { name: "Mission", href: "/mission", description: "Our purpose and values" },
  { name: "Shop", href: "/shop", description: "Agricultural products" },
  { name: "Resources", href: "/resources", description: "Learning materials and guides" },
  { name: "Outlets", href: "/outlets", description: "Find us near you" },
  { name: "Surveys", href: "/surveys", description: "Share your experience" },
  { name: "Events", href: "/events", description: "Workshops and conferences" },
  { name: "Contact", href: "/contact", description: "Get in touch" },
];

export default function Navigation({ theme = "dark" }: NavigationProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center">
        {navigationItems.map((item, index) => (
          <div key={item.name} className="flex items-center">
            <Link
              href={item.href}
              className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive(item.href)
                  ? 'text-green-600'
                  : theme === 'light' 
                    ? 'text-gray-700 hover:text-green-600'
                    : 'text-white hover:text-green-300'
              }`}
            >
              {item.name}
              {isActive(item.href) && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600 rounded-full" />
              )}
            </Link>
            {index < navigationItems.length - 1 && (
              <span className={`mx-4 ${
                theme === 'light' ? 'text-gray-400' : 'text-gray-400'
              }`}>|</span>
            )}
          </div>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <button
        className={`lg:hidden flex items-center justify-center p-2 rounded-md transition ${
          theme === 'light'
            ? 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
            : 'text-white hover:text-green-300 hover:bg-white/10'
        }`}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle mobile menu"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t z-50">
          <div className="px-4 py-2 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex flex-col">
                  <span>{item.name}</span>
                  {item.description && (
                    <span className="text-xs text-gray-500 mt-1">{item.description}</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}