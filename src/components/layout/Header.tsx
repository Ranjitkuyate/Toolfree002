import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaSearch, FaBars, FaTimes, FaUser } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <Link href="/" className="flex items-center">
            <div className="relative w-40 h-10">
              <Image 
                src="/images/logo.svg" 
                alt="ToolsFree Online Logo" 
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="navbar-menu">
          <Link href="/" className="navbar-link-active">
            Home
          </Link>
          <Link href="/tools/text/text-to-speech" className="navbar-link">
            Text to Speech
          </Link>
          <Link href="/tools/image/image-compressor" className="navbar-link">
            Image Compressor
          </Link>
          <Link href="/tools/video/all-in-one-downloader" className="navbar-link">
            All-in-One Downloader
          </Link>
          <Link href="/tools/video/video-editor" className="navbar-link">
            Video Editor
          </Link>
          <Link href="/about" className="navbar-link">
            About
          </Link>
          <Link href="/contact" className="navbar-link">
            Contact
          </Link>
        </nav>

        {/* Desktop Search & User */}
        <div className="hidden md:flex items-center space-x-4">
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            aria-label="Search"
          >
            <FaSearch className="text-gray-600" />
          </button>
          <Link href="/login" className="btn-outline">
            <FaUser className="mr-2" /> Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <FaTimes className="text-gray-600 w-6 h-6" />
            ) : (
              <FaBars className="text-gray-600 w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Search Bar (Expanded) */}
      {isSearchOpen && (
        <div className="bg-white py-3 px-4 shadow-md animate-slide-up">
          <div className="container-custom">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for tools..."
                className="input pr-10"
                autoFocus
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <FaSearch className="text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu (Expanded) */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md animate-slide-up">
          <nav className="container-custom py-4 flex flex-col space-y-3">
            <Link 
              href="/" 
              className="navbar-link-active py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/tools/text/text-to-speech" 
              className="navbar-link py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Text to Speech
            </Link>
            <Link 
              href="/tools/image/image-compressor" 
              className="navbar-link py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Image Compressor
            </Link>
            <Link 
              href="/tools/video/all-in-one-downloader" 
              className="navbar-link py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              All-in-One Downloader
            </Link>
            <Link 
              href="/tools/video/video-editor" 
              className="navbar-link py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Video Editor
            </Link>
            <Link 
              href="/about" 
              className="navbar-link py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="navbar-link py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-2 border-t border-gray-100">
              <Link 
                href="/login" 
                className="btn-primary w-full justify-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaUser className="mr-2" /> Login
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
