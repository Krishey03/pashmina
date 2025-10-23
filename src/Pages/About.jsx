import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Shield, Users, Award, Globe, Clock } from "lucide-react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function AboutPage() {
  const stats = [
    { number: "50+", label: "Years of Heritage" },
    { number: "10,000+", label: "Happy Customers" },
    { number: "500+", label: "Artisans Employed" },
    { number: "25+", label: "Countries Served" },
  ];

  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Craftsmanship",
      description: "Preserving ancient weaving techniques passed down through generations of skilled artisans."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Quality",
      description: "Using only the finest cashmere and pashmina wool, ensuring unparalleled softness and durability."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Ethical Sourcing",
      description: "Supporting local communities and ensuring fair wages for all our artisans."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Sustainability",
      description: "Eco-friendly practices that honor both the craft and our planet."
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Raw Material Selection",
      description: "Hand-selecting the finest Changthangi goat wool from the high altitudes of the Himalayas."
    },
    {
      step: "02",
      description: "Traditional hand-spinning using the centuries-old technique to create the finest yarn."
    },
    {
      step: "03",
      title: "Natural Dyeing",
      description: "Using organic dyes from plants, minerals, and flowers to create vibrant, lasting colors."
    },
    {
      step: "04",
      title: "Hand Weaving",
      description: "Skilled artisans weave intricate patterns on traditional handlooms, a process that can take weeks."
    },
    {
      step: "05",
      title: "Finishing Touches",
      description: "Careful inspection, gentle washing, and hand-stitched finishing for perfection."
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b border-[#e8e6e1]">
        <Navbar />
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-br from-[#f5f3f0] to-[#e8e6e1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-light text-[#2a2a2a] mb-6 leading-tight">
                Weaving Stories of{" "}
                <span className="font-serif italic text-[#8B7355]">Timeless</span>{" "}
                Elegance
              </h1>
              <p className="text-lg lg:text-xl text-[#5d5d5d] mb-8 leading-relaxed">
                For over five decades, DeepPashmina has been the guardian of ancient 
                pashmina craftsmanship, bringing you the world's most exquisite cashmere 
                and pashmina creations straight from the heart of the Himalayas.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products">
                  <Button className="bg-[#8B7355] hover:bg-[#7a6345] text-white px-8 py-3 rounded-none font-light tracking-wide transition-all duration-300">
                    Explore Collection
                  </Button>
                </Link>
                <Button variant="outline" className="border-[#8B7355] text-[#8B7355] hover:bg-[#8B7355] hover:text-white px-8 py-3 rounded-none font-light tracking-wide transition-all duration-300">
                  Our Story
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-[#8B7355]/10 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1594736797933-d0d69c3bc2db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Pashmina Artisan at work"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#8B7355] rounded-2xl transform rotate-12 opacity-20"></div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#8B7355] rounded-full opacity-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-light text-[#8B7355] mb-2">
                  {stat.number}
                </div>
                <div className="text-sm lg:text-base text-[#5d5d5d] font-light">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 lg:py-24 bg-[#faf9f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                      alt="Pashmina weaving process"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-[4/3] rounded-lg overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                      alt="Cashmere wool"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="aspect-[3/4] rounded-lg overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                      alt="Artisan working on pashmina"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl lg:text-4xl font-light text-[#2a2a2a] mb-6">
                The DeepPashmina Legacy
              </h2>
              <div className="space-y-4 text-[#5d5d5d] leading-relaxed">
                <p>
                  Founded in the serene valleys of Kashmir, DeepPashmina began as a small 
                  family workshop dedicated to preserving the ancient art of pashmina weaving. 
                  What started as a passion project has blossomed into a global enterprise, 
                  yet we remain true to our roots.
                </p>
                <p>
                  Our name, "DeepPashmina," reflects our deep commitment to the craft and 
                  our profound respect for the artisans who make it possible. Each piece 
                  tells a story - of the hands that wove it, the traditions that shaped it, 
                  and the culture that inspired it.
                </p>
                <p>
                  Today, we bridge the gap between timeless tradition and contemporary 
                  elegance, offering pashmina creations that are both authentic to their 
                  heritage and relevant to modern lifestyles.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-4 text-sm text-[#8B7355]">
                <Clock className="h-5 w-5" />
                <span>Established 1972 • Three Generations of Excellence</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-light text-[#2a2a2a] mb-4">
              Our Values
            </h2>
            <p className="text-lg text-[#5d5d5d] max-w-2xl mx-auto">
              The principles that guide every thread we weave and every piece we create
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-6 bg-[#8B7355] rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-light text-[#2a2a2a] mb-4">
                  {value.title}
                </h3>
                <p className="text-[#5d5d5d] leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship Process */}
      <section className="py-16 lg:py-24 bg-[#faf9f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-light text-[#2a2a2a] mb-4">
              The Art of Pashmina
            </h2>
            <p className="text-lg text-[#5d5d5d] max-w-2xl mx-auto">
              Each piece undergoes a meticulous 5-step process that can take up to 4 weeks to complete
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 group">
                <div className="text-4xl font-light text-[#8B7355] mb-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                  {step.step}
                </div>
                <h3 className="text-xl font-light text-[#2a2a2a] mb-4">
                  {step.title}
                </h3>
                <p className="text-[#5d5d5d] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#8B7355] to-[#7a6345] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Award className="h-16 w-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl lg:text-4xl font-light mb-6">
            Experience the Difference
          </h2>
          <p className="text-lg lg:text-xl opacity-90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Feel the legacy in every thread. Our pashminas are more than accessories - 
            they're heirlooms in the making, carrying stories of craftsmanship that span generations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/products">
              <Button className="bg-white text-[#8B7355] hover:bg-gray-100 px-8 py-3 rounded-none font-light tracking-wide transition-all duration-300">
                Shop Collection
              </Button>
            </Link>
            <Button variant="outline" className="border-white text-[#8B7355] hover:bg-gray-100 hover:text-[#8B7355] px-8 py-3 rounded-none font-light tracking-wide transition-all duration-300">
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}