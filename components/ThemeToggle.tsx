"use client";

import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50">
      <button
        onClick={toggleTheme}
        className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Toggle theme"
      >
        {theme === 'light' ? (
          <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        ) : (
          <Sun className="w-5 h-5 text-yellow-500" />
        )}
      </button>
    </div>
  );
}