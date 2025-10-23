import React from "react";
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import WhatsappQR from "../Images/whatsappQR.svg"

const ContactSection = () => {
  return (
    <>
      <Navbar />

      {/* Added mt-16 to push content below fixed navbar + extra padding for breathing room */}
      <section className="flex flex-col items-center justify-center pt-24 pb-16 md:pt-32 md:pb-24 lg:py-32 bg-white px-4 sm:px-6 lg:px-8 mt-2">
        {/* Heading with better responsive sizing */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-12 md:mb-16 lg:mb-20 text-center leading-tight">
          Get in <span className="text-[#c6ad7c]">Touch</span> With <span className="text-[#2f4f2f]">Us</span>
        </h2>

        {/* Main container with improved responsive layout */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center bg-gray-50 shadow-lg p-6 sm:p-8 md:p-10 rounded-xl gap-8 lg:gap-12 w-full max-w-4xl mx-auto">
          
          {/* Left side: Contact Details */}
          <div className="flex-1 w-full lg:w-auto space-y-6">
            <h3 className="font-bold text-lg sm:text-xl md:text-2xl underline text-gray-800">Contact Details</h3>

            {/* Social Links with improved grid responsiveness */}
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 text-gray-800 text-sm sm:text-base">
              <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <FaInstagram className="text-xl sm:text-2xl text-pink-600" /> 
                <span>Instagram</span>
              </div>
              <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <FaFacebookF className="text-xl sm:text-2xl text-blue-600" /> 
                <span>Facebook</span>
              </div>
              <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <SiTiktok className="text-xl sm:text-2xl text-black" /> 
                <span>TikTok</span>
              </div>
              <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <FaLinkedinIn className="text-xl sm:text-2xl text-blue-700" /> 
                <span>LinkedIn</span>
              </div>
              <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors xs:col-span-2">
                <FaWhatsapp className="text-xl sm:text-2xl text-green-600" /> 
                <span>WhatsApp</span>
              </div>
            </div>

            {/* Contact Info with better spacing */}
            <div className="flex flex-col gap-3 sm:gap-4 mt-4 sm:mt-6 text-gray-800 text-sm sm:text-base">
              <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <span className="text-lg sm:text-xl">📞</span> 
                <span>+977-9851096721</span>
              </div>
              <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <span className="text-lg sm:text-xl">📍</span> 
                <span>Kathmandu, Nepal</span>
              </div>
              <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <span className="text-lg sm:text-xl">✉️</span> 
                <span>dimmibhattarai@gmail.com</span>
              </div>

              <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <span className="text-lg sm:text-xl">✉️</span> 
                <span>dimmi_bhattarai@yahoo.com</span>
              </div>
            </div>
          </div>

          {/* Right side: QR Code with better centering */}
          <div className="flex flex-col items-center justify-center border-t lg:border-t-0 lg:border-l border-gray-200 pt-8 lg:pt-0 lg:pl-12 lg:pr-0 w-full lg:w-auto">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <img
                src={WhatsappQR}
                alt="WhatsApp QR Code"
                className="w-40 h-40 sm:w-48 sm:h-48 md:w-52 md:h-52 object-contain"
              />
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mb-3 mt-4 text-center max-w-[200px] sm:max-w-none">
              *Scan to connect with us on WhatsApp.*
            </p>
            <a
              href="https://wa.me/+9779851096721"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-green-600 hover:text-green-700 hover:underline text-sm sm:text-base font-medium transition-colors px-4 py-2 rounded-lg hover:bg-green-50"
            >
              <FaWhatsapp className="text-xl sm:text-2xl" /> 
              Message us on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ContactSection;