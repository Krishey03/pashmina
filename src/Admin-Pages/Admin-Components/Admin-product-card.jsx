import React, { useState, useEffect } from "react";
import { getAllProduct, getImageUrl } from "../../api/api"; 
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

function ProductCardGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await getAllProduct();
        setProducts(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-5 gap-x-6 gap-y-16">
      {products.map((product) => (
          <div
            key={product._id}
            className="w-[256px] h-[357px] bg-white rounded-lg shadow-lg hover:[box-shadow:0_10px_25px_rgba(0,0,0,0.5)] transition-shadow duration-300 overflow-hidden flex flex-col"
          >

          <div className="w-[256px] h-[276px] flex justify-center items-center overflow-hidden">
            <img
              src={getImageUrl(product.image) || "https://picsum.photos/256/276"}
              alt={product.name || "Classic Handwoven Pashmina"}
              className="w-[256px] h-[276px] object-cover"
            />
          </div>

          <div className="p-2 flex-1 flex flex-col justify-between">
            <h2 className="text-[16px] font-normal font-[Manrope] text-gray-800 leading-tight mb-1 truncate">
              {product.name || "Classic Handwoven Pashmina"}
            </h2>

            <div className="flex justify-between items-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center cursor-pointer">
                    <div className="w-5 h-5 rounded-full bg-pink-600 border-2 border-white"></div>
                    <div className="w-5 h-5 rounded-full bg-cyan-400 border-2 border-white -ml-[11px]"></div>
                    <div className="w-5 h-5 rounded-full bg-teal-500 border-2 border-white -ml-[11px]"></div>
                    <div className="w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center text-white text-xs border-2 border-white -ml-[11px]">
                      <span className="font-bold">+</span>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  Colors Available
                </TooltipContent>
              </Tooltip>

              <p className="text-[18px] font-bold font-[Manrope] text-gray-900">
                ${product.priceMin || 32} - ${product.priceMax || 45}
              </p>
            </div>

            <p className="text-gray-600 text-[10px] mt-1">
              Min order: {product.minOrder || 12}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductCardGrid;
