import React from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle'; // Assuming this is already sleek

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-700 dark:bg-gray-900/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo / Name */}
        <Link href="/" className="text-xl font-bold text-gray-900 transition-colors duration-200 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400">
          Mushahid Khisal Ansari
        </Link>

        {/* Theme Toggle */}
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Navbar;