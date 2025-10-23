import { Button } from "@/components/ui/button";
import { Download, Phone, Plus, Minus, ChevronLeft, ChevronRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getProductById, getAllProduct, getImageUrl } from "../api/api";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function ProductPage() {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);
  const [isCareOpen, setIsCareOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [moreProducts, setMoreProducts] = useState([]);
  const [moreProductsLoading, setMoreProductsLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/placeholder-image.jpg';
    if (imagePath.startsWith('http')) return imagePath;
    return `${import.meta.env.VITE_API_URL}/${imagePath}`;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await getProductById(id);
        setProduct(response.data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  // Fetch more products - enhanced randomization
  useEffect(() => {
    const fetchMoreProducts = async () => {
      try {
        setMoreProductsLoading(true);
        
        // First, get pagination info to know how many pages are available
        const initialResponse = await getAllProduct(1, 6);
        const totalPages = initialResponse.data.pagination.totalPages;
        
        // If there's only 1 page, just use that
        if (totalPages <= 1) {
          let availableProducts = initialResponse.data.products.filter(p => p._id !== id);
          // Simple shuffle for single page
          const shuffled = [...availableProducts].sort(() => 0.5 - Math.random());
          setMoreProducts(shuffled.slice(0, 6));
          return;
        }
        
        // For multiple pages, fetch from 2-3 random pages and combine
        const randomPages = [];
        const pagesToFetch = Math.min(3, totalPages - 1); // Fetch from up to 3 random pages
        
        for (let i = 0; i < pagesToFetch; i++) {
          const randomPage = Math.floor(Math.random() * totalPages) + 1;
          if (!randomPages.includes(randomPage)) {
            randomPages.push(randomPage);
          }
        }
        
        // Fetch products from random pages
        const fetchPromises = randomPages.map(page => getAllProduct(page, 12));
        const responses = await Promise.all(fetchPromises);
        
        // Combine all products
        let allProducts = [];
        responses.forEach(response => {
          allProducts = [...allProducts, ...response.data.products];
        });
        
        // Filter out current product and remove duplicates
        let availableProducts = allProducts
          .filter(p => p._id !== id)
          .filter((product, index, self) => 
            index === self.findIndex(p => p._id === product._id)
          );
        
        // Shuffle and take 6
        const shuffled = [...availableProducts].sort(() => 0.5 - Math.random());
        setMoreProducts(shuffled.slice(0, 6));
        
      } catch (err) {
        console.error("Error fetching more products:", err);
        // Fallback: fetch first page and randomize
        try {
          const fallbackResponse = await getAllProduct(1, 20);
          let availableProducts = fallbackResponse.data.products.filter(p => p._id !== id);
          const shuffled = [...availableProducts].sort(() => 0.5 - Math.random());
          setMoreProducts(shuffled.slice(0, 6));
        } catch (fallbackErr) {
          console.error("Fallback also failed:", fallbackErr);
        }
      } finally {
        setMoreProductsLoading(false);
      }
    };

    if (id) {
      fetchMoreProducts();
    }
  }, [id]);

  const productImages = product?.images && product.images.length > 0 
    ? product.images.map(img => getImageUrl(img)) 
    : ['/placeholder-image.jpg'];

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === productImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  const getStartingPrice = (priceArray) => {
    if (!priceArray || !Array.isArray(priceArray) || priceArray.length === 0) {
      return "N/A";
    }
    
    const lowestPrice = Math.min(...priceArray.map(tier => tier.price));
    return lowestPrice;
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found</div>;

  return (
    <div className="min-h-screen bg-[#ffffff]">
      {/* Header */}
      <Navbar />


        {/* Main Content */}
        <div className="flex flex-col lg:flex-row pt-16">
          {/* Left - Main Product Image - Top on mobile, left on desktop */}
          <div className="w-full lg:w-1/2 lg:h-[calc(100vh-4rem)] lg:sticky lg:top-16">
            <div className="relative w-full h-auto lg:h-full">
              <img 
                src={productImages[currentImageIndex] || "/placeholder-image.jpg"}
                alt={product.name} 
                className="w-full h-auto lg:h-full object-cover aspect-[4/5]"
              />
              
              {/* Image Arrows */}
              {productImages.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-all duration-200 shadow-lg"
                  >
                    <ChevronLeft className="h-5 w-5 lg:h-6 lg:w-6 text-gray-800" />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-all duration-200 shadow-lg"
                  >
                    <ChevronRight className="h-5 w-5 lg:h-6 lg:w-6 text-gray-800" />
                  </button>
                  
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {productImages.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail Slider */}
            {productImages.length > 1 && (
              <div className="flex gap-3 p-4 lg:p-0 lg:absolute lg:bottom-4 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:bg-white/90 lg:rounded-lg lg:px-4 lg:py-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`flex-shrink-0 w-12 h-12 lg:w-10 lg:h-10 rounded-lg border-2 overflow-hidden transition-all duration-200 ${
                      currentImageIndex === index 
                        ? 'border-[#007e7e] ring-2 ring-[#007e7e]' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="w-full lg:w-1/2">
            <div className="flex flex-col gap-6 lg:gap-8 p-4 lg:px-8 lg:py-12 xl:px-16">
              <h1 className="text-2xl lg:text-4xl font-bold text-[#2a2a2a]">{product.name}</h1>

              {/* Pricing Cards */}
              <div className="grid grid-cols-2 gap-3 lg:gap-4 lg:grid-cols-4">
                {product.price && product.price.map((priceTier, index) => (
                  <div key={index} className="flex flex-col items-center justify-center gap-1 lg:gap-1.5 rounded-lg lg:rounded-xl border border-gray-300 p-3 lg:p-3 bg-white hover:border-[#007e7e] hover:shadow-sm transition-all">
                    <span className="text-xs lg:text-sm font-normal text--[#000000] text-center leading-tight">
                      {priceTier.minQuantity}-{priceTier.maxQuantity} Pcs
                    </span>
                    <span className="text-base lg:text-lg font-bold  text-[#2a2a2a]">
                      $ {priceTier.price}
                    </span>
                  </div>
                ))}
              </div>

              {/* Dimension */}
              <div className="flex items-center gap-3 lg:gap-4">
                <span className="font-bold text-[#2a2a2a] text-sm lg:text-base">DIMENSION:</span>
                <span className="font-normal text-[#000000] text-sm lg:text-base">{product.dimention1} x {product.dimention2} (in cm)</span>
              </div>

              {/* Color */}
              <div className="flex flex-col gap-1 lg:gap-2">
                <div className="flex items-center gap-3 lg:gap-4">
                  <span className="font-bold text-[#2a2a2a] text-sm lg:text-base">COLOR:</span>
                  <span className="font-normal text-[#000000] text-sm lg:text-base">{product.color}</span>
                </div>
                <p className="text-xs italic font-medium text-gray-600">
                  *Browse colors from our palette.*
                </p>
              </div>
              
              {/* Download and Whatsapp Button */}
              <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
                {/* Download Button */}
                <Button
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-[#d6d3cd] py-4 lg:py-6 text-base lg:text-lg font-medium text-[#111] hover:bg-[#c8c4bc] tracking-wide transition-all duration-300"
                  onClick={() => {
                  // Temporary anchor element to trigger download
                    const link = document.createElement('a');
                    link.href = '/color-palette.pdf';
                    link.download = 'DeepPashmina-Color-Palette.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  Download our Palette
                  <Download className="h-4 w-4 lg:h-5 lg:w-5" />
                </Button>

                {/* Whatsapp Button */}
                <a
                  href="https://wa.me/9779851096721"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    className="flex-1 flex items-center justify-center gap-2 lg:gap-3 rounded-lg bg-[#8B7355] py-4 lg:py-6 text-base lg:text-lg font-medium text-white shadow-sm hover:bg-[#7a6345] tracking-wide transition-all duration-300"
                  >
                    Inquire via WhatsApp
                    <FaWhatsapp className="h-5 w-5 lg:h-6 lg:w-6" />
                  </Button>
                </a>
              </div>

              {/* Description & Material */}
              <Collapsible 
                open={isDescriptionOpen} 
                onOpenChange={setIsDescriptionOpen}
                className="border-t border-gray-200 pt-4 lg:pt-6"
              >
                <CollapsibleTrigger className="flex w-full items-center justify-between text-left hover:bg-gray-50/50 rounded-lg px-2 py-3 transition-colors duration-200">
                  <h2 className={`text-lg lg:text-xl transition-all duration-200 ${
                    isDescriptionOpen ? 'font-bold text-[#2a2a2a]' : 'font-normal text-[#000000]'
                  }`}>DESCRIPTION & MATERIAL</h2>
                  <div className="relative transition-all duration-300 ease-in-out">
                    <Plus 
                      className={`h-4 w-4 lg:h-5 lg:w-5 transition-all duration-300 ease-in-out ${
                        isDescriptionOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
                      }`} 
                    />
                    <Minus 
                      className={`absolute top-0 left-0 h-4 w-4 lg:h-5 lg:w-5 transition-all duration-300 ease-in-out ${
                        isDescriptionOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
                      }`} 
                    />
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent className="mt-2 lg:mt-4 transition-all duration-500 ease-in-out data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden">
                  <div className="space-y-3 lg:space-y-4 transition-all duration-500 ease-in-out pl-2 lg:pl-2">
                    <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-3 lg:gap-4 border-b border-gray-200 pb-3 lg:pb-4 transition-all duration-300 ease-in-out transform data-[state=open]:translate-y-0 data-[state=closed]:-translate-y-2">
                      <span className="font-bold text-[#2a2a2a] text-sm lg:text-base">Fiber Composition</span>
                      <span className="font-normal text-[#000000] text-sm lg:text-base">{product.fiberComposition}</span>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-3 lg:gap-4 border-b border-gray-200 pb-3 lg:pb-4 transition-all duration-300 ease-in-out transform data-[state=open]:translate-y-0 data-[state=closed]:-translate-y-2 delay-75">
                      <span className="font-bold text-[#2a2a2a] text-sm lg:text-base">Weave Type</span>
                      <span className="font-normal text-[#000000] text-sm lg:text-base">{product.weaveType}</span>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-3 lg:gap-4 border-b border-gray-200 pb-3 lg:pb-4 transition-all duration-300 ease-in-out transform data-[state=open]:translate-y-0 data-[state=closed]:-translate-y-2 delay-100">
                      <span className="font-bold text-[#2a2a2a] text-sm lg:text-base">Dimension</span>
                      <span className="font-normal text-[#000000] text-sm lg:text-base">{product.dimention1} x {product.dimention2} (in cm)</span>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-3 lg:gap-4 border-b border-gray-200 pb-3 lg:pb-4 transition-all duration-300 ease-in-out transform data-[state=open]:translate-y-0 data-[state=closed]:-translate-y-2 delay-150">
                      <span className="font-bold text-[#2a2a2a] text-sm lg:text-base">Design</span>
                      <span className="font-normal text-[#000000] text-sm lg:text-base">{product.design}</span>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-3 lg:gap-4 border-b border-gray-200 pb-3 lg:pb-4 transition-all duration-300 ease-in-out transform data-[state=open]:translate-y-0 data-[state=closed]:-translate-y-2 delay-200">
                      <span className="font-bold text-[#2a2a2a] text-sm lg:text-base">Fringe Style</span>
                      <span className="font-normal text-[#000000] text-sm lg:text-base">{product.fringeStyle}</span>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-3 lg:gap-4 border-b border-gray-200 pb-3 lg:pb-4 transition-all duration-300 ease-in-out transform data-[state=open]:translate-y-0 data-[state=closed]:-translate-y-2 delay-250">
                      <span className="font-bold text-[#2a2a2a] text-sm lg:text-base">Origin</span>
                      <span className="font-normal text-[#000000] text-sm lg:text-base">{product.origin}</span>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-3 lg:gap-4 border-b border-gray-200 pb-3 lg:pb-4 transition-all duration-300 ease-in-out transform data-[state=open]:translate-y-0 data-[state=closed]:-translate-y-2 delay-300">
                      <span className="font-bold text-[#2a2a2a] text-sm lg:text-base">Category</span>
                      <span className="font-normal text-[#000000] text-sm lg:text-base">{product.category}</span>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Care Instructions */}
              <Collapsible 
                open={isCareOpen} 
                onOpenChange={setIsCareOpen}
                className="border-t border-gray-200 pt-4 lg:pt-6"
              >
                <CollapsibleTrigger className="flex w-full items-center justify-between text-left hover:bg-gray-50/50 rounded-lg px-2 py-3 transition-colors duration-200">
                  <h2 className={`text-lg lg:text-xl transition-all duration-200 ${
                    isCareOpen ? 'font-bold text-[#2a2a2a]' : 'font-normal text-[#000000]'
                  }`}>CARE INSTRUCTIONS</h2>
                  <div className="relative transition-all duration-300 ease-in-out">
                    <Plus 
                      className={`h-4 w-4 lg:h-5 lg:w-5 transition-all duration-300 ease-in-out ${
                        isCareOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
                      }`} 
                    />
                    <Minus 
                      className={`absolute top-0 left-0 h-4 w-4 lg:h-5 lg:w-5 transition-all duration-300 ease-in-out ${
                        isCareOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
                      }`} 
                    />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 lg:mt-4 transition-all duration-500 ease-in-out data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden">
                  <div className="space-y-3 lg:space-y-4 transition-all duration-500 ease-in-out pl-2 lg:pl-2">
                    <div className="border-b border-gray-200 pb-3 lg:pb-4 transition-all duration-300 ease-in-out transform data-[state=open]:translate-y-0 data-[state=closed]:-translate-y-2">
                      <span className="font-bold text-[#2a2a2a] text-sm lg:text-base">{product.careInstruction}</span>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Payment & Delivery */}
              <Collapsible 
                open={isPaymentOpen} 
                onOpenChange={setIsPaymentOpen}
                className="border-t border-gray-200 pt-4 lg:pt-6"
              >
                <CollapsibleTrigger className="flex w-full items-center justify-between text-left hover:bg-gray-50/50 rounded-lg px-2 py-3 transition-colors duration-200">
                  <h2 className={`text-lg lg:text-xl transition-all duration-200 ${
                    isPaymentOpen ? 'font-bold text-[#2a2a2a]' : 'font-normal text-[#000000]'
                  }`}>PAYMENT & DELIVERY</h2>
                  <div className="relative transition-all duration-300 ease-in-out">
                    <Plus 
                      className={`h-4 w-4 lg:h-5 lg:w-5 transition-all duration-300 ease-in-out ${
                        isPaymentOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
                      }`} 
                    />
                    <Minus 
                      className={`absolute top-0 left-0 h-4 w-4 lg:h-5 lg:w-5 transition-all duration-300 ease-in-out ${
                        isPaymentOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
                      }`} 
                    />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 lg:mt-4 transition-all duration-500 ease-in-out data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden">
                  <div className="space-y-3 lg:space-y-4 transition-all duration-500 ease-in-out pl-2 lg:pl-2">
                    <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-3 lg:gap-4 border-b border-gray-200 pb-3 lg:pb-4 transition-all duration-300 ease-in-out transform data-[state=open]:translate-y-0 data-[state=closed]:-translate-y-2">
                      <span className="font-bold text-[#2a2a2a] text-sm lg:text-base">Payment Methods</span>
                      <span className="font-normal text-[#000000] text-sm lg:text-base">Bank Transfer, Credit Card, PayPal</span>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-3 lg:gap-4 border-b border-gray-200 pb-3 lg:pb-4 transition-all duration-300 ease-in-out transform data-[state=open]:translate-y-0 data-[state=closed]:-translate-y-2 delay-75">
                      <span className="font-bold text-[#2a2a2a] text-sm lg:text-base">Minimum Order</span>
                      <span className="font-normal text-[#000000] text-sm lg:text-base">{product.minOrderQuantity} pieces per color</span>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-3 lg:gap-4 border-b border-gray-200 pb-3 lg:pb-4 transition-all duration-300 ease-in-out transform data-[state=open]:translate-y-0 data-[state=closed]:-translate-y-2 delay-100">
                      <span className="font-bold text-[#2a2a2a] text-sm lg:text-base">Production Time</span>
                      <span className="font-normal text-[#000000] text-sm lg:text-base">15-20 business days</span>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-3 lg:gap-4 border-b border-gray-200 pb-3 lg:pb-4 transition-all duration-300 ease-in-out transform data-[state=open]:translate-y-0 data-[state=closed]:-translate-y-2 delay-150">
                      <span className="font-bold text-[#2a2a2a] text-sm lg:text-base">Shipping Time</span>
                      <span className="font-normal text-[#000000] text-sm lg:text-base">5-7 business days worldwide</span>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-3 lg:gap-4 border-b border-gray-200 pb-3 lg:pb-4 transition-all duration-300 ease-in-out transform data-[state=open]:translate-y-0 data-[state=closed]:-translate-y-2 delay-200">
                      <span className="font-bold text-[#2a2a2a] text-sm lg:text-base">Shipping Cost</span>
                      <span className="font-normal text-[#000000] text-sm lg:text-base">Free shipping on orders over $500</span>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-3 lg:gap-4 border-b border-gray-200 pb-3 lg:pb-4 transition-all duration-300 ease-in-out transform data-[state=open]:translate-y-0 data-[state=closed]:-translate-y-2 delay-250">
                      <span className="font-bold text-[#2a2a2a] text-sm lg:text-base">Customs & Duties</span>
                      <span className="font-normal text-[#000000] text-sm lg:text-base">Customer responsible for import duties</span>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-3 lg:gap-4 border-b border-gray-200 pb-3 lg:pb-4 transition-all duration-300 ease-in-out transform data-[state=open]:translate-y-0 data-[state=closed]:-translate-y-2 delay-300">
                      <span className="font-bold text-[#2a2a2a] text-sm lg:text-base">Return Policy</span>
                      <span className="font-normal text-[#000000] text-sm lg:text-base">14 days return for defective items</span>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </div>


{/* More Products Section */}
<div className="border-t border-gray-200 py-12">
  <div className="px-4 sm:px-6 lg:px-8">
    <h2 className="text-2xl lg:text-3xl font-light text-[#000000] mb-8 text-center">
      More Products You Might Like
    </h2>
    
    {moreProductsLoading ? (
      <div className="flex justify-center items-center py-12">
        <span className="text-[#5d5d5d] font-light tracking-wide">Loading more products...</span>
      </div>
    ) : (
      <div className="w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-5 lg:gap-6">
          {moreProducts.map((product) => (
            <div
              key={product._id}
              className="w-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer group transform hover:-translate-y-1"
              onClick={() => handleProductClick(product._id)}
            >
              {/* Image with strict 4:5 aspect ratio */}
              <div className="w-full aspect-[4/5] flex justify-center items-center overflow-hidden bg-[#f5f3f0]">
                {product.images && product.images.length > 0 && (
                  <img
                    src={getImageUrl(product.images[0])}
                    alt={product.name || "Classic Handwoven Pashmina"}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                )}
              </div>

              {/* Content - Updated layout */}
              <div className="p-2 sm:p-2.5 flex-1 flex flex-col gap-1">
                {/* Category and Price Row */}
                <div className="flex justify-between items-start mb-1">
                  <span className="inline-block text-[11px] sm:text-[12px] text-[#5d5d5d] font-medium uppercase tracking-wide">
                    {product.category || "Pashmina"}
                  </span>
                  <p className="text-[14px] sm:text-[15px] font-bold text-[#2a2a2a] whitespace-nowrap">
                    ${getStartingPrice(product.price)}
                  </p>
                </div>

                {/* Product Name */}
                <h2 className="text-[13px] sm:text-[14px] text-[#2a2a2a] font-medium leading-tight line-clamp-2 tracking-wide flex-1 mb-1">
                  {product.name || "Classic Handwoven Pashmina"}
                </h2>

                {/* Min Order */}
                <p className="text-[11px] sm:text-[12px] text-[#5d5d5d] font-medium mt-auto">
                  Min. order: {product.minOrderQuantity || 12}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

    {!moreProductsLoading && moreProducts.length === 0 && (
      <div className="text-center py-8">
        <p className="text-[#5d5d5d] text-lg font-light">
          No other products available at the moment.
        </p>
      </div>
    )}
  </div>
</div>


      {/* Footer */}
      <div>
        <Footer />
      </div>
    </div>
  );
}