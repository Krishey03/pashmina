import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, X, Copy } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ProductDetailModal = ({ 
  product, 
  isOpen, 
  onClose, 
  onEdit, 
  onDelete 
}) => {
  if (!isOpen || !product) return null;

  const handleCopyId = (productId) => {
    navigator.clipboard.writeText(productId);
    alert("Product ID copied to clipboard!");
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/placeholder-image.jpg';
    if (imagePath.startsWith('http')) return imagePath;
    return `http://localhost:5000/${imagePath}`;
  };

  // Close modal when clicking on backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl w-full max-w-7xl h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h2 className="text-3xl font-normal text-gray-900 mb-3">
                {product.name}
              </h2>
              <div className="flex items-center gap-2 text-gray-600 text-base">
                Product ID: {product._id}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0 hover:bg-gray-100"
                  onClick={() => handleCopyId(product._id)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-9 w-9 p-0 flex-shrink-0 hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-10 p-8">
            {/* Product Images - Left Column */}
            <div className="xl:col-span-2">
              <h3 className="font-medium text-lg mb-6 text-gray-900 uppercase tracking-wide">Product Images</h3>
              <div className="space-y-6">
                {product.images && product.images.length > 0 ? (
                  product.images.map((image, index) => (
                    <div key={index} className="aspect-[4/5] bg-gray-100 rounded-xl overflow-hidden shadow-md">
                      <img
                        src={getImageUrl(image)}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))
                ) : (
                  <div className="aspect-[4/5] bg-gray-100 rounded-xl flex items-center justify-center shadow-md">
                    <p className="text-gray-400 text-base">No images available</p>
                  </div>
                )}
              </div>
            </div>

            {/* Product Details - Right Column */}
            <div className="xl:col-span-3">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Basic Information */}
                <div className="space-y-6">
                  <h3 className="font-medium text-lg text-gray-900 uppercase tracking-wide">Basic Information</h3>
                  <CardSection>
                    <InfoRow label="Category" value={product.category} />
                    <InfoRow label="Color" value={product.color} />
                    <InfoRow label="Dimensions" value={`${product.dimention1} x ${product.dimention2} cm`} />
                    <InfoRow label="Minimum Order" value={`${product.minOrderQuantity || 12} pieces`} />
                    <InfoRow label="Origin" value={product.origin} />
                  </CardSection>
                </div>

                {/* Specifications */}
                <div className="space-y-6">
                  <h3 className="font-medium text-lg text-gray-900 uppercase tracking-wide">Specifications</h3>
                  <CardSection>
                    <InfoRow label="Fiber Composition" value={product.fiberComposition} />
                    <InfoRow label="Weave Type" value={product.weaveType} />
                    <InfoRow label="Design" value={product.design} />
                    <InfoRow label="Fringe Style" value={product.fringeStyle} />
                    <InfoRow label="Status" value={<Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-sm">Active</Badge>} />
                  </CardSection>
                </div>

                {/* Price Tiers - Full Width */}
                <div className="lg:col-span-2 space-y-6">
                  <h3 className="font-medium text-lg text-gray-900 uppercase tracking-wide">Price Tiers</h3>
                  <CardSection>
                    {product.price && Array.isArray(product.price) ? (
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {product.price.map((tier, index) => (
                          <div key={index} className="text-center p-6 bg-white rounded-xl border border-gray-200 shadow-md">
                            <p className="font-normal text-gray-600 text-base mb-2">Quantity Range</p>
                            <p className="font-semibold text-gray-900 text-lg">
                              {tier.minQuantity} - {tier.maxQuantity} pcs
                            </p>
                            <p className="text-2xl font-normal text-[#8B7355] mt-3">${tier.price}</p>
                            <p className="text-sm text-gray-500 mt-2">per piece</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400 text-base text-center py-6">No price tiers available</p>
                    )}
                  </CardSection>
                </div>

                {/* Care Instructions - Full Width */}
                <div className="lg:col-span-2 space-y-6">
                  <h3 className="font-medium text-lg text-gray-900 uppercase tracking-wide">Care Instructions</h3>
                  <CardSection>
                    <p className="text-gray-700 leading-relaxed text-base">
                      {product.careInstruction || "No care instructions provided for this product."}
                    </p>
                  </CardSection>
                </div>

                {/* Additional Notes - Full Width */}
                <div className="lg:col-span-2 space-y-6">
                  <h3 className="font-medium text-lg text-gray-900 uppercase tracking-wide">Additional Information</h3>
                  <CardSection>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
                      <InfoRow label="Created Date" value={new Date().toLocaleDateString()} />
                      <InfoRow label="Last Updated" value={new Date().toLocaleDateString()} />
                      <InfoRow label="Total Images" value={`${product.images?.length || 0} images`} />
                      <InfoRow label="Price Tiers" value={`${product.price?.length || 0} tiers`} />
                    </div>
                  </CardSection>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-8 border-t mt-10">
                <Button
                  variant="outline"
                  onClick={() => onDelete(product)}
                  className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 font-normal px-6 py-2 h-auto"
                >
                  <Trash2 className="w-5 h-5 mr-2" />
                  Delete Product
                </Button>
                <Button
                  onClick={() => onEdit(product)}
                  className="bg-[#8B7355] hover:bg-[#7a6345] text-white font-normal px-6 py-2 h-auto"
                >
                  <Edit className="w-5 h-5 mr-2" />
                  Edit Product
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Card Section Component
const CardSection = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl border border-gray-200 p-6 space-y-4 shadow-md ${className}`}>
    {children}
  </div>
);

// Reusable Info Row Component
const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-start py-2">
    <span className="font-medium text-gray-600 text-base">{label}</span>
    <span className="text-gray-900 text-right text-base max-w-[70%] leading-relaxed">
      {value || "N/A"}
    </span>
  </div>
);

export default ProductDetailModal;