import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const getHandpickedProducts = async () => {
  return axios.get(`${API_BASE_URL}/api/products/handpicked`);
};

export const toggleHandpicked = async (productId) => {
  return axios.patch(`${API_BASE_URL}/api/products/${productId}/toggle-handpicked`);
};

export const setHandpickedProducts = async (productIds) => {
  return axios.post(`${API_BASE_URL}/api/products/set-handpicked`, {
    productIds
  });
};

export const getAllProductsWithHandpickedStatus = async () => {
  return axios.get(`${API_BASE_URL}/api/admin/products`);
};



export const createProduct = async (productData) => {
  return axios.post(`${API_BASE_URL}/api/products`, productData);
};

export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith('http')) return imagePath;
  
  // Remove any leading slashes or 'uploads/' from the path
  const cleanPath = imagePath.replace(/^\/?uploads\//, '');
  
  return `${API_BASE_URL}/uploads/${cleanPath}`;
};

export const getAllProduct = async (page = 1, limit = 18) => {
  return axios.get(`${API_BASE_URL}/api/products`, {
    params: { page, limit }
  });
}

export const searchProducts = async (query) => {
  return axios.get(`${API_BASE_URL}/api/products/search`, {
    params: { q: query }
  });
};

export const getProductsByCategoryQuery = async (category) => {
  return axios.get(`${API_BASE_URL}/api/products/filter`, {
    params: { category }
  });
};

export const getProductsByCategory = async (category) => {
  return axios.get(`${API_BASE_URL}/api/products/category/${category}`);
};

export const getProductById = (id) => {
  return axios.get(`${API_BASE_URL}/api/products/${id}`);
};

export const getAllProductsForHomepage = async () => {
  return axios.get(`${API_BASE_URL}/api/products/all`);
};

export const getLatestProducts = async () => {
  return axios.get(`${API_BASE_URL}/api/products/latest`);
};

export const getSearchSuggestions = async (query) => {
  return axios.get(`${API_BASE_URL}/api/products/search-suggestions`, {
    params: { q: query }
  });
};

export const deleteProduct = async (productId) => {
  return axios.delete(`${API_BASE_URL}/api/products/${productId}`);
};