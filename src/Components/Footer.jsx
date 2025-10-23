import React from "react";
import { Link } from "react-router-dom";
import { ChevronUp, Mail, Phone, MapPin } from "lucide-react";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  return(
    <footer className="bg-[#2a2a2a] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Section - Wider on desktop */}
          <div className="md:col-span-2 lg:col-span-2 mt-10">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-[#8B7355] rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">DP</span>
              </div>
              <span className="text-xl font-light tracking-wider">DeepPashmina</span>
            </div>
            <p className="text-[#b0b0b0] text-sm leading-relaxed mb-6 max-w-md">
              Crafting timeless pashmina elegance with heritage techniques and sustainable practices. 
              Each piece tells a story of tradition, quality, and unparalleled craftsmanship.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-[#b0b0b0] hover:text-[#8B7355] transition-colors duration-300 transform hover:scale-110"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="text-[#b0b0b0] hover:text-[#8B7355] transition-colors duration-300 transform hover:scale-110"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.22 14.785 3.73 13.634 3.73 12.337s.49-2.448 1.396-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.906.875 1.396 2.026 1.396 3.323s-.49 2.448-1.396 3.323c-.875.807-2.026 1.297-3.323 1.297z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="text-[#b0b0b0] hover:text-[#8B7355] transition-colors duration-300 transform hover:scale-110"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="text-[#b0b0b0] hover:text-[#8B7355] transition-colors duration-300 transform hover:scale-110"
                aria-label="Pinterest"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.22 14.785 3.73 13.634 3.73 12.337s.49-2.448 1.396-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.906.875 1.396 2.026 1.396 3.323s-.49 2.448-1.396 3.323c-.875.807-2.026 1.297-3.323 1.297z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-white border-b border-[#8B7355] pb-2 inline-block">Explore</h3>
            <ul className="space-y-3 mt-4">
              <li>
                <Link 
                  to="/" 
                  className="text-[#b0b0b0] hover:text-white transition-colors duration-300 text-sm font-light block py-2 hover:translate-x-1 transform transition-transform"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/products" 
                  className="text-[#b0b0b0] hover:text-white transition-colors duration-300 text-sm font-light block py-2 hover:translate-x-1 transform transition-transform"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-[#b0b0b0] hover:text-white transition-colors duration-300 text-sm font-light block py-2 hover:translate-x-1 transform transition-transform"
                >
                  Contact us
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-[#b0b0b0] hover:text-white transition-colors duration-300 text-sm font-light block py-2 hover:translate-x-1 transform transition-transform"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-white border-b border-[#8B7355] pb-2 inline-block">Get In Touch</h3>
            <div className="space-y-4 mt-4">
              <div className="flex items-start space-x-3 group">
                <Mail className="w-4 h-4 text-[#8B7355] mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-[#b0b0b0] text-sm font-light group-hover:text-white transition-colors">
                  dimmibhattarai@gmail.com
                </span>
              </div>

              <div className="flex items-start space-x-3 group">
                <Mail className="w-4 h-4 text-[#8B7355] mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-[#b0b0b0] text-sm font-light group-hover:text-white transition-colors">
                  dimmi_bhattarai@yahoo.com
                </span>
              </div>

              <div className="flex items-start space-x-3 group">
                <Phone className="w-4 h-4 text-[#8B7355] mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-[#b0b0b0] text-sm font-light group-hover:text-white transition-colors">
                  +977 9851096721
                </span>
              </div>
              <div className="flex items-start space-x-3 group">
                <MapPin className="w-4 h-4 text-[#8B7355] mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-[#b0b0b0] text-sm font-light group-hover:text-white transition-colors">
                  Kathmandu, Nepal
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#3a3a3a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-[#b0b0b0] text-sm font-light">
                &copy; {currentYear} DeepPashmina. All rights reserved. Crafted with care in Nepal.
              </p>
            </div>
            
            <div className="flex items-center space-x-6">
              <Link 
                to="/policy" 
                className="text-[#b0b0b0] hover:text-white transition-colors duration-300 text-xs font-light"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-[#b0b0b0] hover:text-white transition-colors duration-300 text-xs font-light"
              >
                Terms of Service
              </Link>
              <button
                onClick={scrollToTop}
                className="flex items-center space-x-1 text-[#b0b0b0] hover:text-white transition-colors duration-300 text-xs font-light group"
                aria-label="Scroll to top"
              >
                <span>Back to Top</span>
                <ChevronUp className="w-4 h-4 group-hover:transform group-hover:-translate-y-0.5 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;