import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Dynamic nav links (easy to add or remove)
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Contact", path: "/contact" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 h-16">
      <header className="border-b border-gray-200 bg-white h-full">
        {/* Use full width with consistent padding */}
        <div className="w-full flex items-center justify-between px-4 sm:px-6 lg:px-12 h-full">
          {/* Logo */}
          <Link to="/" className="flex items-baseline gap-0">
            <span className="text-xl font-bold text-[#000000]">Deep</span>
            <span className="text-xl font-bold text-[#007e7e]">Pashmina</span>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`transition hover:text-[#007e7e] ${
                  location.pathname === link.path
                    ? "text-[#007e7e] font-semibold"
                    : "text-gray-700"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Order Button (Desktop) */}
          <div className="hidden md:flex">
            <Button
              className="gap-2 rounded-lg bg-gradient-to-br bg-[#2a2a2a] text-white hover:from-[#115e59] hover:via-[#0f766e] hover:to-[#115e59] transition-all duration-300 shadow-lg hover:shadow-xl border-0 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-2">
                <FaWhatsapp className="h-4 w-4" />
                Order with us
              </span>
              <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </Button>
          </div>

          {/* Hamburger Icon (Mobile) */}
          <button
            className="md:hidden p-2 transition-transform duration-300"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <X size={24} className="transition-transform duration-300" />
            ) : (
              <Menu size={24} className="transition-transform duration-300" />
            )}
          </button>
        </div>

        {/* Mobile Menu with smooth transitions */}
        <div className={`
          md:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-4
          transition-all duration-300 ease-in-out overflow-hidden
          ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
        `}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block transition-all duration-300 hover:text-[#007e7e] transform ${
                location.pathname === link.path
                  ? "text-[#007e7e] font-semibold"
                  : "text-gray-700"
              } ${isOpen ? "translate-y-0" : "-translate-y-2"}`}
              style={{ transitionDelay: isOpen ? `${navLinks.indexOf(link) * 50}ms` : "0ms" }}
            >
              {link.name}
            </Link>
          ))}
          <Button
            className={`w-full gap-2 rounded-lg bg-gradient-to-br from-[#2a2a2a] text-white transition-all duration-300 shadow-lg hover:shadow-xl border-0 relative overflow-hidden group transform ${
              isOpen ? "translate-y-0" : "-translate-y-2"
            }`}
            style={{ transitionDelay: isOpen ? `${navLinks.length * 50}ms` : "0ms" }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <FaWhatsapp className="h-4 w-4" />
              Order with us
            </span>
            <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </Button>
        </div>
      </header>
    </nav>
  );
}