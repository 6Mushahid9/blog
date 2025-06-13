import React from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  return (
    <header className="w-full px-4 md:px-8 py-4 border-b shadow-sm bg-background">
      <nav className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo / Name */}
        <Link href="/" className="text-xl md:text-2xl font-bold tracking-tight hover:underline underline-offset-4">
          Mushahid Khisal Ansari
        </Link>

        {/* Theme Toggle */}
        <ThemeToggle />
      </nav>
    </header>
  );
};

export default Navbar;
