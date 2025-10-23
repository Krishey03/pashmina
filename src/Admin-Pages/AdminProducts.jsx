import React, { useEffect, useState } from "react";
import { addProductFormControls } from "../Components";
import { createProduct } from "../api/api";
import AdminProductList from "./AdminProductList";

export default function AdminPage() {
  const [formData, setFormData] = useState({});
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [priceTiers, setPriceTiers] = useState([
    { minQuantity: "", maxQuantity: "", price: "" }
  ]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const defaults = {};
    addProductFormControls.forEach((field) => {
      defaults[field.name] = "";
    });
    setFormData(defaults);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (e.target.type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle image uploads
  const handleImageUpload = (e) => {
    const newImages = Array.from(e.target.files);
    setImages(prev => [...prev, ...newImages]);
  };

  // Remove image
  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  // Handle price tier changes
  const handlePriceTierChange = (index, field, value) => {
    const updatedTiers = [...priceTiers];
    updatedTiers[index][field] = value;
    setPriceTiers(updatedTiers);
  };

  // Add new price tier
  const addPriceTier = () => {
    setPriceTiers([...priceTiers, { minQuantity: "", maxQuantity: "", price: "" }]);
  };

  // Remove price tier
  const removePriceTier = (index) => {
    if (priceTiers.length > 1) {
      const updatedTiers = priceTiers.filter((_, i) => i !== index);
      setPriceTiers(updatedTiers);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate price tiers
      const validTiers = priceTiers.filter(tier => 
        tier.minQuantity && tier.maxQuantity && tier.price
      );
      
      if (validTiers.length === 0) {
        alert("Please add at least one valid price tier");
        return;
      }

      // Validate images
      if (images.length === 0) {
        alert("Please add at least one image");
        return;
      }

      const data = new FormData();
      
      // Add all form data
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      // Add price tiers as JSON string
      data.append('price', JSON.stringify(validTiers));

      // Add all images
      images.forEach((image, index) => {
        data.append('images', image);
      });

      await createProduct(data);
      alert("Product added successfully!");
      setIsCardOpen(false);
      // Reset form
      setPriceTiers([{ minQuantity: "", maxQuantity: "", price: "" }]);
      setImages([]);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product: " + error.message);
    }
  };

  return (
    <div className="p-6">
      {/* Upload Button */}
      <div className="flex justify-end items-center mb-6">
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          onClick={() => setIsCardOpen(true)}
        >
          Upload Product
        </button>
      </div>

      {/* Upload Product Card */}
      {isCardOpen && (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6 border max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Upload New Product</h2>
            <button
              className="text-gray-500 hover:text-gray-800 transition-colors"
              onClick={() => setIsCardOpen(false)}
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Images Section */}
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold">Product Images</h3>
                <div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm cursor-pointer hover:bg-blue-600 transition-colors"
                  >
                    Add Images
                  </label>
                </div>
              </div>
              
              {/* Display selected images */}
              <div className="grid grid-cols-3 gap-4 mt-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                    <p className="text-xs text-center mt-1 truncate">
                      {image.name}
                    </p>
                  </div>
                ))}
              </div>
              
              {images.length === 0 && (
                <p className="text-gray-500 text-sm text-center py-4">
                  No images selected. Click "Add Images" to upload product images.
                </p>
              )}
            </div>

            {/* Price Tiers Section */}
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold">Price Tiers</h3>
                <button
                  type="button"
                  onClick={addPriceTier}
                  className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition-colors"
                >
                  Add Tier
                </button>
              </div>
              
              {priceTiers.map((tier, index) => (
                <div key={index} className="flex gap-2 mb-3 items-end">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">Min Quantity</label>
                    <input
                      type="number"
                      value={tier.minQuantity}
                      onChange={(e) => handlePriceTierChange(index, 'minQuantity', e.target.value)}
                      className="border p-2 w-full rounded"
                      placeholder="e.g., 10"
                      min="1"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">Max Quantity</label>
                    <input
                      type="number"
                      value={tier.maxQuantity}
                      onChange={(e) => handlePriceTierChange(index, 'maxQuantity', e.target.value)}
                      className="border p-2 w-full rounded"
                      placeholder="e.g., 15"
                      min="1"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">Price (USD)</label>
                    <input
                      type="number"
                      value={tier.price}
                      onChange={(e) => handlePriceTierChange(index, 'price', e.target.value)}
                      className="border p-2 w-full rounded"
                      placeholder="e.g., 15"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  {priceTiers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePriceTier(index)}
                      className="bg-red-500 text-white px-3 py-2 rounded text-sm hover:bg-red-600 transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Other form fields */}
            {addProductFormControls
              .filter(field => field.name !== 'image')
              .map((field, index) => (
              <div key={index}>
                <label className="block mb-1 font-medium">{field.label}</label>

                {field.componentType === "input" && (
                  <input
                    className="border p-2 w-full rounded"
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    onChange={handleChange}
                    {...(field.type !== "file" ? { value: formData[field.name] || "" } : {})}
                  />
                )}

                {field.componentType === "textarea" && (
                  <textarea
                    className="border p-2 w-full rounded"
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                  />
                )}

                {field.componentType === "select" && (
                  <select
                    className="border p-2 w-full rounded"
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                  >
                    {field.options.map((option, idx) => (
                      <option key={idx} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            ))}

            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
                onClick={() => setIsCardOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Product List */}
      <AdminProductList />
    </div>
  );
}