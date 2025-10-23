import Navbar from "../Components/Navbar";
import ProductNav from "../Components/Product-component/productNav"; 
import ProductCardGrid from "../Components/Product-component/productCard"; 
import Footer from "../Components/Footer";
import React, { useState } from "react";

export default function ProductListingPage() {
  const [selectedFilters, setSelectedFilters] = useState([]);
  return (
    <div className="relative bg-white">
      <Navbar />

      {/* Spacer for Navbar */}
      <div className="h-[26px]"></div>

      {/* Product Navigation below Hero with 54px gap */}
      <div className="mt-[54px]">
        <ProductNav />
      </div>

      {/* Product Card Grid below ProductNav with 54px gap - Reduced side padding */}
      <div className="mt-[54px] px-4 sm:px-6 lg:px-8 mb-10">
        <ProductCardGrid 
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}