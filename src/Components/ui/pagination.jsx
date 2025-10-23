import { ChevronLeft, ChevronRight } from 'lucide-react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const maxVisiblePages = 5;
  
  const getPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const handlePageChange = (page) => {
    // Scroll to top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Call the original onPageChange function
    onPageChange(page);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center px-3 py-2 rounded-md border border-[#e8e6e1] text-sm font-light tracking-wide ${
          currentPage === 1
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-[#2a2a2a] hover:bg-[#f5f3f0] hover:border-[#2a2a2a] transition-colors'
        }`}
      >
        <ChevronLeft size={16} className="mr-1" />
        Previous
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`w-10 h-10 rounded-md border text-sm font-light tracking-wide transition-colors ${
            page === currentPage
              ? 'bg-[#2a2a2a] text-white border-[#2a2a2a]'
              : 'border-[#e8e6e1] text-[#2a2a2a] hover:bg-[#f5f3f0] hover:border-[#2a2a2a]'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center px-3 py-2 rounded-md border border-[#e8e6e1] text-sm font-light tracking-wide ${
          currentPage === totalPages
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-[#2a2a2a] hover:bg-[#f5f3f0] hover:border-[#2a2a2a] transition-colors'
        }`}
      >
        Next
        <ChevronRight size={16} className="ml-1" />
      </button>
    </div>
  );
}

export default Pagination;