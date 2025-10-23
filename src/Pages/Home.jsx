import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getImageUrl, getLatestProducts, getHandpickedProducts, getAllProductsForHomepage } from "../api/api";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function HomePage() {
  const [recentStartIndex, setRecentStartIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  const [handpickedProducts, setHandpickedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Refs to track loaded images
  const loadedImagesRef = useRef(new Set());
  const carouselRef = useRef(null);

  // Calculate recentlyAdded here so it's available in useEffect
  const recentlyAdded = Array.isArray(latestProducts) && latestProducts.length > 0 
    ? latestProducts 
    : (Array.isArray(products) ? products.slice(0, 5) : []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const productsResponse = await getAllProductsForHomepage();
        setProducts(Array.isArray(productsResponse?.data) ? productsResponse.data : []);
        
        const latestResponse = await getLatestProducts();
        setLatestProducts(Array.isArray(latestResponse?.data) ? latestResponse.data : []);
        
        try {
          const handpickedResponse = await getHandpickedProducts();
          setHandpickedProducts(Array.isArray(handpickedResponse?.data) ? handpickedResponse.data : []);
        } catch (handpickedError) {
          if (handpickedError.response?.status === 404) {
            console.log('No handpicked products found');
            setHandpickedProducts([]);
          } else {
            throw handpickedError;
          }
        }
        
        setError(null);
      } catch (err) {
        console.error("Error fetching products:", err);
        console.error("Error details:", err.response?.data || err.message);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Preload all handpicked product images when data is loaded
  useEffect(() => {
    if (handpickedProducts.length > 0) {
      preloadImages(handpickedProducts);
    }
  }, [handpickedProducts]);

  // Preload all recent product images when data is loaded
  useEffect(() => {
    if (recentlyAdded.length > 0) {
      preloadImages(recentlyAdded);
    }
  }, [recentlyAdded]);

  // Slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleCards, setVisibleCards] = useState(6);

  // Update visible cards based on screen size
  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth >= 1280) { // xl and above
        setVisibleCards(6);
      } else if (window.innerWidth >= 1024) { // lg
        setVisibleCards(4);
      } else if (window.innerWidth >= 768) { // md (including iPad Mini)
        setVisibleCards(3);
      } else {
        setVisibleCards(2); // mobile - always show 2 cards in single row
      }
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  // Calculate max slides based on product count and visible cards
  const maxSlides = Math.max(0, handpickedProducts.length - visibleCards);

  // Navigation handlers - with loop behavior
  const handleNextSlide = () => {
    if (currentSlide >= handpickedProducts.length - visibleCards) {
      setCurrentSlide(0); // Loop back to start
    } else {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(handpickedProducts.length - visibleCards); // Loop to end
    } else {
      setCurrentSlide(prev => prev - 1);
    }
  };

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, maxSlides]);

  const getStartingPrice = (priceArray) => {
    if (!priceArray || !Array.isArray(priceArray) || priceArray.length === 0) {
      return "N/A";
    }
    
    const lowestPrice = Math.min(...priceArray.map(tier => tier.price));
    return lowestPrice;
  };

  // Preload images for smoother transitions
  const preloadImages = (products) => {
    if (!Array.isArray(products)) return;
    
    products.forEach(product => {
      if (product && product.images && product.images.length > 0) {
        const imgUrl = getImageUrl(product.images[0]);
        if (!loadedImagesRef.current.has(imgUrl)) {
          const img = new Image();
          img.src = imgUrl;
          img.onload = () => {
            loadedImagesRef.current.add(imgUrl);
          };
        }
      }
    });
  };

  const nextRecent = async () => {
    if (!Array.isArray(recentlyAdded) || recentlyAdded.length === 0 || isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Preload next set of images
    const nextIndex = (recentStartIndex + 1) % recentlyAdded.length;
    const nextProducts = getVisibleProducts(recentlyAdded, nextIndex, 6);
    preloadImages(nextProducts);
    
    setTimeout(() => {
      setRecentStartIndex(nextIndex);
      setIsTransitioning(false);
    }, 150);
  };

  const prevRecent = async () => {
    if (!Array.isArray(recentlyAdded) || recentlyAdded.length === 0 || isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Preload previous set of images
    const prevIndex = (recentStartIndex - 1 + recentlyAdded.length) % recentlyAdded.length;
    const prevProducts = getVisibleProducts(recentlyAdded, prevIndex, 6);
    preloadImages(prevProducts);
    
    setTimeout(() => {
      setRecentStartIndex(prevIndex);
      setIsTransitioning(false);
    }, 150);
  };

  const getVisibleProducts = (products, startIndex, count = 6) => {
    if (!Array.isArray(products) || products.length === 0) return [];
    
    const visibleProducts = [];
    for (let i = 0; i < count; i++) {
      const index = (startIndex + i) % products.length;
      visibleProducts.push(products[index]);
    }
    return visibleProducts;
  };

  // Memoized ProductCard component to prevent unnecessary re-renders
  const ProductCard = ({ product, index, isVisible = true }) => {
    if (!product) return null;
    
    const [imageLoaded, setImageLoaded] = useState(false);
    const imageUrl = product.images && product.images.length > 0 
      ? getImageUrl(product.images[0]) 
      : "https://picsum.photos/400/500";

    const isPreloaded = loadedImagesRef.current.has(imageUrl);

    useEffect(() => {
      if (isPreloaded) {
        setImageLoaded(true);
      }
    }, [isPreloaded]);

    return (
      <div
        className="w-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer group transform hover:-translate-y-1"
        onClick={() => window.location.href = `/products/${product._id}`}
        style={{
          animationDelay: `${index * 50}ms`,
        }}
      >
        <div className="w-full aspect-[4/5] flex justify-center items-center overflow-hidden bg-[#f5f3f0] dark:bg-gray-700 relative">
          <img
            src={imageUrl}
            alt={product.name || "Classic Handwoven Pashmina"}
            className={`w-full h-full object-cover transition-all duration-500 ease-out ${
              imageLoaded || isPreloaded 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105'
            } group-hover:scale-105`}
            onLoad={() => setImageLoaded(true)}
            loading="eager" // Changed from lazy to eager for carousel images
            decoding="async"
            key={`${product._id}-image`} // Stable key for image
          />
          
          {!imageLoaded && !isPreloaded && (
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-600 animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-gray-300 dark:border-gray-500 border-t-gray-500 dark:border-t-gray-400 rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        {/* Updated Content Section - Price on right side */}
        <div className="p-2 sm:p-2.5 flex-1 flex flex-col gap-1">
          {/* Category and Price Row */}
          <div className="flex justify-between items-start mb-1">
            {/* Category */}
            <span className="inline-block text-[11px] sm:text-[12px] text-[#5d5d5d] dark:text-gray-400 font-medium uppercase tracking-wide transition-colors duration-300">
              {product.category || "Pashmina"}
            </span>
            
            {/* Price */}
            <p className="text-[14px] sm:text-[15px] font-bold text-[#2a2a2a] dark:text-white transition-colors duration-300 whitespace-nowrap">
              ${getStartingPrice(product.price)}
            </p>
          </div>

          {/* Product Name */}
          <h2 className="text-[13px] sm:text-[14px] text-[#2a2a2a] dark:text-white font-medium leading-tight line-clamp-2 tracking-wide flex-1 mb-1 transition-colors duration-300">
            {product.name || "Classic Handwoven Pashmina"}
          </h2>

          {/* Min Order */}
          <p className="text-[11px] sm:text-[12px] text-[#5d5d5d] dark:text-gray-400 font-medium transition-colors duration-300 mt-auto">
            Min. order: {product.minOrderQuantity || 12}
          </p>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center">
        <span className="text-[#5d5d5d] font-light tracking-wide">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center">
        <span className="text-red-500 font-light tracking-wide">{error}</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b border-[#e8e6e1]">
        <Navbar />
      </nav>

      {/* Hero Section - Full Screen */}
      <section className="h-screen relative bg-[#f5f3f0]">
        <div className="h-full w-full flex items-center justify-center">
          <div className="text-center px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#2a2a2a] mb-6 tracking-tight">
              Timeless Elegance
            </h1>
            <p className="text-lg sm:text-xl text-[#5d5d5d] mb-8 max-w-2xl mx-auto font-light">
              Discover our collection of premium pashminas and cashmere, where heritage craftsmanship meets modern sophistication.
            </p>
            <Link to="/products">
              <Button className="bg-[#8B7355] hover:bg-[#7a6345] text-white px-8 py-3 rounded-none font-light tracking-wide transition-all duration-300">
                Explore Collection
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border border-[#8B7355] rounded-full flex justify-center">
            <div className="w-px h-3 bg-[#8B7355] mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Recently Added Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-light text-[#2a2a2a] mb-4">Recently Added</h2>
            <p className="text-[#5d5d5d] font-light max-w-2xl mx-auto">Our latest additions to the collection</p>
          </div>

          {/* Desktop View - Consistent Grid */}
          <div className="hidden md:block">
            <div className="grid grid-cols-3 lg:grid-cols-6 gap-6">
              {Array.isArray(recentlyAdded) && recentlyAdded.map((product, index) => (
                <ProductCard key={`recent-${product?._id || index}`} product={product} index={index} />
              ))}
              {(!Array.isArray(recentlyAdded) || recentlyAdded.length === 0) && (
                <div className="col-span-full text-center py-12">
                  <p className="text-[#5d5d5d] font-light">No recently added products available.</p>
                </div>
              )}
            </div>
          </div>

          {/* Mobile View - 2 per row on small mobile, 3 per row on iPad Mini */}
          <div className="md:hidden relative" ref={carouselRef}>
            <div 
              className={`grid grid-cols-2 sm:grid-cols-3 gap-3 px-2 transition-opacity duration-300 ${
                isTransitioning ? 'opacity-50' : 'opacity-100'
              }`}
            >
              {getVisibleProducts(recentlyAdded, recentStartIndex, 6).map((product, index) => (
                <div 
                  key={`recent-mobile-${product?._id || index}-${recentStartIndex}`}
                  className="fade-in-animation"
                >
                  <ProductCard product={product} index={index} />
                </div>
              ))}
              {(!Array.isArray(recentlyAdded) || recentlyAdded.length === 0) && (
                <div className="col-span-2 sm:col-span-3 text-center py-12">
                  <p className="text-[#5d5d5d] font-light">No recently added products available.</p>
                </div>
              )}
            </div>
            
            {/* Navigation Arrows - Only show if there are more than 6 products */}
            {Array.isArray(recentlyAdded) && recentlyAdded.length > 6 && (
              <>
                <button 
                  onClick={prevRecent}
                  disabled={isTransitioning}
                  className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white border border-gray-200 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 -ml-3 ${
                    isTransitioning ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4 text-gray-600" />
                </button>
                <button 
                  onClick={nextRecent}
                  disabled={isTransitioning}
                  className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white border border-gray-200 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 -mr-3 ${
                    isTransitioning ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                  }`}
                >
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Handpicked for You Section */}
      <section className="py-16 bg-[#faf9f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-light text-[#2a2a2a] mb-4">Handpicked for You</h2>
            <p className="text-[#5d5d5d] font-light max-w-2xl mx-auto">Curated selections based on your preferences</p>
          </div>

          {/* Show message if no handpicked products */}
          {!Array.isArray(handpickedProducts) || handpickedProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#5d5d5d] font-light">No handpicked products available at the moment.</p>
              <Link to="/products">
                <Button className="mt-4 bg-[#8B7355] hover:bg-[#7a6345] text-white px-6 py-2 rounded-none font-light tracking-wide transition-all duration-300 hover:scale-105">
                  Browse All Products
                </Button>
              </Link>
            </div>
          ) : (
            <>
              {/* Desktop View - Slider */}
              <div className="hidden md:block relative">
                {/* Left Arrow Button */}
                <button
                  onClick={handlePrevSlide}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white border border-gray-200 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 -ml-4"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>

                {/* Slider Container */}
                <div className="overflow-hidden">
                  <div 
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ 
                      transform: `translateX(-${currentSlide * (100 / visibleCards)}%)`
                    }}
                  >
                    {handpickedProducts.map((product, index) => (
                      <div 
                        key={`handpicked-${product?._id || index}`} 
                        className="flex-shrink-0 px-2"
                        style={{ 
                          width: `${100 / visibleCards}%`
                        }}
                      >
                        <ProductCard product={product} index={index} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Arrow Button */}
                <button
                  onClick={handleNextSlide}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white border border-gray-200 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 -mr-4"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Mobile View - Single Row Slider */}
              <div className="md:hidden relative">
                {/* Left Arrow Button */}
                <button
                  onClick={handlePrevSlide}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white border border-gray-200 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 -ml-3"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-600" />
                </button>

                {/* Slider Container */}
                <div className="overflow-hidden">
                  <div 
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ 
                      transform: `translateX(-${currentSlide * 50}%)`
                    }}
                  >
                    {handpickedProducts.map((product, index) => (
                      <div 
                        key={`handpicked-mobile-${product?._id || index}`} 
                        className="flex-shrink-0 px-1.5"
                        style={{ 
                          width: '50%'
                        }}
                      >
                        <ProductCard product={product} index={index} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Arrow Button */}
                <button
                  onClick={handleNextSlide}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white border border-gray-200 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 -mr-3"
                >
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Minimal Footer */}
      <Footer />
    </div>
  );
}