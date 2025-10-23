import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Search, X, Clock } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getSearchSuggestions } from "../../api/api";

export default function ProductNav() {
  const productTypes = ["Shawl", "Scarf", "Stole", "Mufler", "Blanket", "Sweater"];
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchRef = useRef(null);
  const isSelectingSuggestion = useRef(false);
  const inputRef = useRef(null);

  // Memoize selectedFilters to prevent unnecessary re-renders
  const selectedFilters = useMemo(() => {
    const filterParam = searchParams.get("filter");
    return filterParam ? filterParam.split(",") : [];
  }, [searchParams]);

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  // Update search query when URL params change
  useEffect(() => {
    const searchParam = searchParams.get("search");
    if (searchParam) {
      setSearchQuery(searchParam);
    } else {
      setSearchQuery("");
    }
  }, [searchParams]);

  // Save search to recent searches
  const saveToRecentSearches = useCallback((query) => {
    if (!query.trim()) return;
    
    const updatedSearches = [
      query,
      ...recentSearches.filter(search => search !== query)
    ].slice(0, 5);
    
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  }, [recentSearches]);

  // Fetch search suggestions with better performance
  useEffect(() => {
    if (isSelectingSuggestion.current) {
      isSelectingSuggestion.current = false;
      return;
    }

    const fetchSuggestions = async () => {
      if (searchQuery.trim().length > 1) {
        try {
          const response = await getSearchSuggestions(searchQuery);
          setSuggestions(response.data);
          // Only show if input is still focused and has content
          if (inputRef.current === document.activeElement) {
            setShowSuggestions(true);
          }
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
        if (searchQuery.trim().length === 0) {
          setShowSuggestions(false);
        }
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close suggestions on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (showSuggestions) {
        setShowSuggestions(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showSuggestions]);

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      navigate("/products");
      return;
    }
    
    setIsSearching(true);
    saveToRecentSearches(searchQuery);
    
    try {
      const newSearchParams = new URLSearchParams();
      newSearchParams.set("search", searchQuery);
      if (selectedFilters.length > 0) {
        newSearchParams.set("filter", selectedFilters.join(","));
      }
      setSearchParams(newSearchParams);
      setShowSuggestions(false);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  }, [searchQuery, selectedFilters, navigate, setSearchParams, saveToRecentSearches]);

  const handleInputChange = useCallback((e) => {
    setSearchQuery(e.target.value);
    if (!e.target.value.trim()) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete("search");
      setSearchParams(newSearchParams);
    }
  }, [searchParams, setSearchParams]);

  const handleSuggestionClick = useCallback((suggestion) => {
    isSelectingSuggestion.current = true;
    
    setSearchQuery(suggestion.name);
    saveToRecentSearches(suggestion.name);
    
    const newSearchParams = new URLSearchParams();
    newSearchParams.set("search", suggestion.name);
    if (selectedFilters.length > 0) {
      newSearchParams.set("filter", selectedFilters.join(","));
    }
    setSearchParams(newSearchParams);
    setShowSuggestions(false);
    
    // Blur input to close keyboard on mobile and improve performance
    if (inputRef.current) {
      inputRef.current.blur();
    }
  }, [selectedFilters, setSearchParams, saveToRecentSearches]);

  const handleRecentSearchClick = useCallback((search) => {
    isSelectingSuggestion.current = true;
    
    setSearchQuery(search);
    saveToRecentSearches(search);
    
    const newSearchParams = new URLSearchParams();
    newSearchParams.set("search", search);
    if (selectedFilters.length > 0) {
      newSearchParams.set("filter", selectedFilters.join(","));
    }
    setSearchParams(newSearchParams);
    setShowSuggestions(false);
    
    if (inputRef.current) {
      inputRef.current.blur();
    }
  }, [selectedFilters, setSearchParams, saveToRecentSearches]);

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  }, []);

  const handleInputFocus = useCallback(() => {
    if (!isSelectingSuggestion.current) {
      setShowSuggestions(searchQuery.trim().length > 0 || recentSearches.length > 0);
    }
  }, [searchQuery, recentSearches]);

  const filterChange = useCallback((type, checked) => {
    const currentFilters = selectedFilters;
    let newFilters = checked
      ? [...currentFilters, type]
      : currentFilters.filter((f) => f !== type);

    const newSearchParams = new URLSearchParams(searchParams);
    if (newFilters.length > 0) {
      newSearchParams.set("filter", newFilters.join(","));
    } else {
      newSearchParams.delete("filter");
    }
    newSearchParams.set("page", "1");
    setSearchParams(newSearchParams);
  }, [selectedFilters, searchParams, setSearchParams]);

  const removeFilter = useCallback((filterToRemove) => {
    const currentFilters = selectedFilters;
    const newFilters = currentFilters.filter((f) => f !== filterToRemove);

    const newSearchParams = new URLSearchParams(searchParams);
    if (newFilters.length > 0) {
      newSearchParams.set("filter", newFilters.join(","));
    } else {
      newSearchParams.delete("filter");
    }
    newSearchParams.set("page", "1");
    setSearchParams(newSearchParams);
  }, [selectedFilters, searchParams, setSearchParams]);

  return (
    <div className="w-full">
      {/* Main Navigation Row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full mb-4 px-4 sm:px-6 md:px-10 lg:px-[68px] gap-3 md:gap-0 pt-2">
        
        {/* Breadcrumb */}
        <div className="flex items-center text-[14px] sm:text-[16px] font-medium whitespace-nowrap">
          <a href="/" className="hover:underline">Home</a>
          <span className="mx-2">{">"}</span>
          <a href="/products" className="hover:underline">Products</a>
        </div>

        {/* Search Bar with Suggestions */}
        <div className="relative w-full sm:w-[350px] md:w-[400px]" ref={searchRef}>
          <form onSubmit={handleSearch} className="relative">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search products..."
              className="w-full h-[40px] text-[14px] sm:text-[16px] pr-10 px-4"
              value={searchQuery}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              disabled={isSearching}
            />
            <button
              type="submit"
              disabled={isSearching}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
            >
              {isSearching ? (
                <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
              ) : (
                <Search size={18} />
              )}
            </button>
          </form>

          {/* Search Suggestions Dropdown - Fixed positioning for better performance */}
          {showSuggestions && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-xl z-50 mt-1 max-h-80 overflow-y-auto transform transition-all duration-200 ease-out">
              {/* Recent Searches */}
              {recentSearches.length > 0 && suggestions.length === 0 && searchQuery.trim().length === 0 && (
                <div className="p-2">
                  <div className="flex items-center justify-between px-2 py-1">
                    <span className="text-xs font-medium text-gray-500">Recent Searches</span>
                    <button
                      onClick={clearRecentSearches}
                      className="text-xs text-blue-500 hover:text-blue-700"
                    >
                      Clear all
                    </button>
                  </div>
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleRecentSearchClick(search)}
                      className="flex items-center gap-2 w-full p-2 text-left hover:bg-gray-50 rounded-md transition-colors duration-150"
                    >
                      <Clock size={16} className="text-gray-400 flex-shrink-0" />
                      <span className="text-sm truncate">{search}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Product Suggestions */}
              {suggestions.length > 0 && (
                <div className="p-2">
                  <div className="px-2 py-1">
                    <span className="text-xs font-medium text-gray-500">Products</span>
                  </div>
                  {suggestions.map((product) => (
                    <button
                      key={product._id}
                      onClick={() => handleSuggestionClick(product)}
                      className="flex items-center gap-3 w-full p-2 text-left hover:bg-gray-50 rounded-md transition-colors duration-150"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{product.name}</div>
                        <div className="text-xs text-gray-500 capitalize truncate">{product.category}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* No Results Message */}
              {searchQuery.trim().length > 1 && suggestions.length === 0 && (
                <div className="p-4 text-center text-sm text-gray-500">
                  No products found for "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>

        {/* Filter Button */}
        <div className="flex justify-end">
          <Popover>
            <PopoverTrigger asChild>
              <Button className="flex items-center justify-center w-[90px] h-[40px] text-[14px] sm:text-[16px] gap-2 relative">
                <SlidersHorizontal size={18} />
                Filter
                {selectedFilters.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                    {selectedFilters.length}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] sm:w-[220px] p-3" align="end">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-semibold">Filter by Category</h3>
              </div>
              <div className="flex flex-col space-y-2">
                {productTypes.map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-2 cursor-pointer p-1 rounded-lg hover:bg-gray-50 transition-colors duration-150"
                  >
                    <Checkbox
                      checked={selectedFilters.includes(type)}
                      onCheckedChange={(checked) => filterChange(type, checked)}
                    />
                    <span className="text-[14px] sm:text-[15px] flex-1">{type}</span>
                  </label>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Active Filters */}
      {selectedFilters.length > 0 && (
        <div className="w-full bg-white border-t border-gray-200 px-4 sm:px-6 md:px-10 lg:px-[68px] py-2">
          <div className="flex flex-wrap items-center gap-1">
            <span className="text-xs text-gray-600 mr-1">Active filters:</span>
            {selectedFilters.map((filter) => (
              <div
                key={filter}
                className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs transition-colors duration-150"
              >
                {filter}
                <button
                  onClick={() => removeFilter(filter)}
                  className="hover:text-blue-600 ml-0.5 transition-colors duration-150"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}