import React, { useState, useEffect } from "react";
import { getAllProduct, getImageUrl, deleteProduct } from "../api/api";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye, Plus, Search, Filter } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import ProductDetailModal from "../Admin-Pages/Admin-Components/AdminProductDetail";
import { toast } from "sonner"; // Import sonner toast

function AdminProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

const fetchProducts = async () => {
  try {
    setLoading(true);
    const response = await getAllProduct();
    
    // Extract the products array from the response
    const productsArray = response.data.products || response.data || [];
    
    setProducts(productsArray);
    setError(null);
  } catch (err) {
    console.error("Error fetching products:", err);
    setError("Failed to load products");
    toast.error("Failed to load products");
  } finally {
    setLoading(false);
  }
};

const filteredProducts = (Array.isArray(products) ? products : [])
  .filter(product =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.color?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStartingPrice = (priceArray) => {
    if (!priceArray || !Array.isArray(priceArray) || priceArray.length === 0) {
      return "N/A";
    }
    return Math.min(...priceArray.map(tier => tier.price));
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  const handleEdit = (product) => {
    console.log("Edit product:", product);
    toast.info(`Editing ${product.name}`, {
      description: "Redirecting to edit page..."
    });
  };

  const handleDelete = async (product) => {
    if (!window.confirm(`Are you sure you want to delete "${product.name}"? This action cannot be undone.`)) {
      return;
    }

    // Show loading toast
    const toastId = toast.loading(`Deleting ${product.name}...`);

    try {
      setDeletingId(product._id);
      
      await deleteProduct(product._id);
      
      // Remove the product from the local state
      setProducts(prevProducts => 
        prevProducts.filter(p => p._id !== product._id)
      );

      // Update toast to success
      toast.success(`"${product.name}" deleted successfully`, {
        id: toastId,
        duration: 3000,
      });

      // Close modal if the deleted product was being viewed
      if (selectedProduct && selectedProduct._id === product._id) {
        handleCloseModal();
      }

    } catch (err) {
      console.error("Error deleting product:", err);
      
      // Update toast to error
      toast.error("Failed to delete product", {
        id: toastId,
        description: err.response?.data?.message || "Please try again",
        duration: 5000,
      });
    } finally {
      setDeletingId(null);
    }
  };

  const handleCloseModal = () => {
    setIsDetailOpen(false);
    setSelectedProduct(null);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-light">Loading products...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={fetchProducts} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-light text-gray-900">Products</h1>
            <p className="text-gray-600 font-light mt-2">
              Manage your product inventory and details
            </p>
          </div>
          <Button 
            className="bg-[#8B7355] hover:bg-[#7a6345] text-white"
            onClick={() => toast.info("Add product feature coming soon")}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>

        {/* Search and Filter Section */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search products by name, category, or color..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 font-light"
                />
              </div>
              <Button 
                variant="outline" 
                className="font-light"
                onClick={() => toast.info("Filter feature coming soon")}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-gray-400 mb-4">
                <Search className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-light text-gray-900 mb-2">
                {searchTerm ? "No products found" : "No products available"}
              </h3>
              <p className="text-gray-600 font-light mb-4">
                {searchTerm
                  ? "Try adjusting your search terms or filters"
                  : "Get started by adding your first product"}
              </p>
              {!searchTerm && (
                <Button 
                  className="bg-[#8B7355] hover:bg-[#7a6345] text-white"
                  onClick={() => toast.info("Add product feature coming soon")}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Product Table */}
        {filteredProducts.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="font-light text-xl">
                Products ({filteredProducts.length})
              </CardTitle>
              <CardDescription className="font-light">
                Manage your product inventory and details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-light">Product</TableHead>
                    <TableHead className="font-light">Category</TableHead>
                    <TableHead className="font-light">Price</TableHead>
                    <TableHead className="font-light">Min Order</TableHead>
                    <TableHead className="font-light">Status</TableHead>
                    <TableHead className="font-light text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product._id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={
                                product.images && product.images.length > 0
                                  ? getImageUrl(product.images[0])
                                  : "/placeholder-image.jpg"
                              }
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">
                              {product.name || "Unnamed Product"}
                            </p>
                            <p className="text-gray-500 text-xs font-light">
                              {product.color} • {product.dimention1}x{product.dimention2}cm
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-light">
                          {product.category || "Uncategorized"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="font-light">
                          <p className="text-gray-900">From ${getStartingPrice(product.price)}</p>
                          {product.price && product.price.length > 1 && (
                            <p className="text-gray-500 text-xs">
                              {product.price.length} price tiers
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-light text-gray-900">
                          {product.minOrderQuantity || 12} pcs
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 font-light">
                          Active
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 border-gray-300"
                            onClick={() => handleViewDetails(product)}
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 border-gray-300"
                            onClick={() => handleEdit(product)}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 border-red-300 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDelete(product)}
                            disabled={deletingId === product._id}
                          >
                            {deletingId === product._id ? (
                              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-red-600"></div>
                            ) : (
                              <Trash2 className="w-3 h-3" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Product Detail Modal */}
        <ProductDetailModal
          product={selectedProduct}
          isOpen={isDetailOpen}
          onClose={handleCloseModal}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default AdminProductList;