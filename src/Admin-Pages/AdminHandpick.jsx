// components/AdminHandpickedManager.jsx
import { useState, useEffect } from 'react';
import { getAllProductsWithHandpickedStatus, toggleHandpicked, setHandpickedProducts, getImageUrl } from '../api/api';
import { Check, X, Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminHandpickedManager() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(new Set());

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getAllProductsWithHandpickedStatus();
      setProducts(response.data);
      
      // Initialize selected products
      const handpickedIds = response.data
        .filter(product => product.isHandpicked)
        .map(product => product._id);
      setSelectedProducts(new Set(handpickedIds));
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleProductSelection = (productId) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(productId)) {
      newSelected.delete(productId);
    } else {
      newSelected.add(productId);
    }
    setSelectedProducts(newSelected);
  };

  const saveHandpickedProducts = async () => {
    if (selectedProducts.size > 8) {
      alert('Maximum 8 products can be selected for handpicked section');
      return;
    }

    setSaving(true);
    try {
      await setHandpickedProducts(Array.from(selectedProducts));
      alert('Handpicked products updated successfully!');
      fetchProducts(); // Refresh the list
    } catch (error) {
      console.error('Error saving handpicked products:', error);
      alert('Error saving handpicked products');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading products...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-light">Manage Handpicked Products</h2>
        <Button 
          onClick={saveHandpickedProducts} 
          disabled={saving || selectedProducts.size > 8}
          className="bg-[#8B7355] hover:bg-[#7a6345]"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          Save Selection ({selectedProducts.size}/8)
        </Button>
      </div>

      {selectedProducts.size > 8 && (
        <div className="bg-red-50 border border-red-200 rounded p-3 mb-4">
          <p className="text-red-700 text-sm">
            Maximum 8 products can be selected for handpicked section
          </p>
        </div>
      )}

      <div className="grid gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
              selectedProducts.has(product._id) ? 'bg-blue-50 border-blue-200' : ''
            }`}
            onClick={() => toggleProductSelection(product._id)}
          >
            <div className="flex items-center space-x-4">
              <img
                src={product.images && product.images.length > 0 
                  ? getImageUrl(product.images[0]) 
                  : "https://picsum.photos/100"}
                alt={product.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.category}</p>
                <p className="text-sm text-gray-500">
                  Created: {new Date(product.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {selectedProducts.has(product._id) ? (
                <Check className="w-5 h-5 text-green-600" />
              ) : (
                <X className="w-5 h-5 text-gray-400" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}