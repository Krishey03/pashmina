import React, { useState, useEffect, useCallback, memo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAllProduct, getImageUrl, searchProducts, getProductsByCategory } from "../../api/api"; 
import Pagination from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

const ProductCard = memo(({ product, onClick }) => {
  const getStartingPrice = useCallback((priceArray) => {
    if (!priceArray || !Array.isArray(priceArray) || priceArray.length === 0) {
      return "N/A";
    }
    
    const prices = priceArray.map(tier => {
      if (typeof tier === 'object' && tier !== null && 'price' in tier) {
        return tier.price;
      }
      return tier;
    }).filter(price => !isNaN(price));
    
    if (prices.length === 0) return "N/A";
    
    return Math.min(...prices);
  }, []);

  const handleImageError = useCallback((e) => {
    e.target.src = "https://picsum.photos/400/500";
  }, []);

  return (
    <div
      className="w-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer group"
      onClick={() => onClick(product._id)}
    >
      <div className="w-full aspect-[4/5] flex justify-center items-center overflow-hidden bg-[#f5f3f0]">
        <img
          src={product.images && product.images.length > 0 
            ? getImageUrl(product.images[0]) 
            : "https://picsum.photos/400/500"}
          alt={product.name || "Classic Handwoven Pashmina"}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={handleImageError}
          loading="lazy" // Add lazy loading
        />
      </div>

      {/* Content */}
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
  );
});

ProductCard.displayName = 'ProductCard';

function ProductCardGrid() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
    hasNext: false,
    hasPrev: false
  });
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const searchQuery = searchParams.get('search');
  const filterParam = searchParams.get('filter');

  // Helper functions
  const getProductsFromResponse = useCallback((response) => {
    if (!response || !response.data) return [];
    
    if (Array.isArray(response.data)) {
      return response.data;
    } else if (response.data.products && Array.isArray(response.data.products)) {
      return response.data.products;
    } else if (Array.isArray(response.data.data)) {
      return response.data.data;
    }
    
    return [];
  }, []);

  const getPaginationFromResponse = useCallback((response) => {
    if (!response || !response.data) {
      return {
        currentPage: 1,
        totalPages: 1,
        totalProducts: 0,
        hasNext: false,
        hasPrev: false
      };
    }

    if (response.data.pagination) {
      return response.data.pagination;
    }
    
    const products = getProductsFromResponse(response);
    return {
      currentPage: 1,
      totalPages: 1,
      totalProducts: products.length,
      hasNext: false,
      hasPrev: false
    };
  }, [getProductsFromResponse]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      let response;
      
      if (searchQuery) {
        response = await searchProducts(searchQuery);
        let searchResults = getProductsFromResponse(response);
        
        if (filterParam) {
          const filters = filterParam.split(',');
          searchResults = searchResults.filter(product => 
            product && product.category && filters.includes(product.category)
          );
        }
        
        setProducts(searchResults);
        setFilteredProducts(searchResults);
        setPagination(getPaginationFromResponse(response));
        
      } else if (filterParam) {
        const filters = filterParam.split(',');
        let filtered = [];
        
        if (filters.length === 1) {
          response = await getProductsByCategory(filters[0]);
          filtered = getProductsFromResponse(response);
        } else {
          response = await getAllProduct(1, 100);
          const allProducts = getProductsFromResponse(response);
          filtered = allProducts.filter(product => 
            product && product.category && filters.includes(product.category)
          );
        }
        
        setProducts(filtered);
        setFilteredProducts(filtered);
        setPagination(getPaginationFromResponse(response));
        
      } else {
        response = await getAllProduct(currentPage, 18);
        const productsData = getProductsFromResponse(response);
        const paginationData = getPaginationFromResponse(response);
        
        setProducts(productsData);
        setFilteredProducts(productsData);
        setPagination(paginationData);
      }
      
      setError(null);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products");
      setProducts([]);
      setFilteredProducts([]);
      setPagination({
        currentPage: 1,
        totalPages: 1,
        totalProducts: 0,
        hasNext: false,
        hasPrev: false
      });
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchQuery, filterParam, getProductsFromResponse, getPaginationFromResponse]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleProductClick = useCallback((productId) => {
    navigate(`/products/${productId}`);
  }, [navigate]);

  useEffect(() => {
    if (!loading) {
      // Small delay to ensure DOM has updated
      const timer = setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
      
      return () => clearTimeout(timer);
    }
  }, [loading, currentPage]);


  const handlePageChange = useCallback((newPage) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', newPage.toString());
    navigate(`?${newSearchParams.toString()}`, { replace: true });
    
  }, [searchParams, navigate]);

  const clearAllFilters = useCallback(() => {
    navigate('/products');
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="text-[#5d5d5d] font-light tracking-wide">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="text-red-500 font-light tracking-wide">{error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Results Header */}
      {searchQuery && (
        <div className="text-center">
          <h2 className="text-xl font-light text-[#2a2a2a] mb-2">
            Search Results for "{searchQuery}"
          </h2>
          <p className="text-[#5d5d5d] text-sm font-light">
            Found {filteredProducts.length} products
          </p>
        </div>
      )}

      {/* Filter Results Header */}
      {filterParam && !searchQuery && (
        <div className="text-center">
          <h2 className="text-xl font-light text-[#2a2a2a] mb-2">
            Filtered Products
          </h2>
          <p className="text-[#5d5d5d] text-sm font-light">
            Showing {filteredProducts.length} products in selected categories
          </p>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-4">
        {filteredProducts.map((product) => (
          product && (
            <ProductCard
              key={product._id}
              product={product}
              onClick={handleProductClick}
            />
          )
        ))}
      </div>

      {/* Only show pagination when not in search or filter mode */}
      {!searchQuery && !filterParam && pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* Results Count */}
      <div className="text-center text-[#5d5d5d] text-sm font-light tracking-wide">
        {searchQuery ? (
          <>Showing {filteredProducts.length} search results</>
        ) : filterParam ? (
          <>Showing {filteredProducts.length} filtered products</>
        ) : (
          <>
            Showing {filteredProducts.length} of {pagination.totalProducts} products
            {pagination.totalPages > 1 && ` • Page ${pagination.currentPage} of ${pagination.totalPages}`}
          </>
        )}
      </div>

      {/* No Results Message */}
      {filteredProducts.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-[#5d5d5d] text-lg font-light">
            No products found matching your criteria.
          </p>
          <Button
            variant="outline"
            onClick={clearAllFilters}
            className="mt-4"
          >
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
}

export default memo(ProductCardGrid);