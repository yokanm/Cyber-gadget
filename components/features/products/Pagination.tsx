import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  // Generate visible pages with ellipsis (…)
  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    const delta = 2; // how many pages to show around current page

    // Always show first page
    if (currentPage > 3) pages.push(1, "…");
    else for (let i = 1; i < currentPage; i++) pages.push(i);

    // Pages around current
    for (let i = Math.max(1, currentPage - delta); i <= Math.min(totalPages, currentPage + delta); i++) {
      pages.push(i);
    }

    // Always show last page
    if (currentPage < totalPages - 2) pages.push("…", totalPages);
    else for (let i = currentPage + 1; i <= totalPages; i++) pages.push(i);

    return Array.from(new Set(pages)); // remove duplicates
  };

  const visiblePages = generatePageNumbers();

  return (
    <div className="flex flex-wrap justify-center items-center mt-10 gap-3">
      {/* Prev button */}
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`px-4 py-2 border rounded-md text-sm font-medium transition ${
          currentPage === 1
            ? "border-gray-300 text-gray-400 cursor-not-allowed"
            : "hover:bg-gray-100 border-gray-300"
        }`}
      >
        Prev
      </button>

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {visiblePages.map((page, i) =>
          page === "…" ? (
            <span key={`ellipsis-${i}`} className="px-2 text-gray-400 select-none">
              …
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(Number(page))}
              className={`px-3 py-1 rounded-md border text-sm font-medium transition ${
                currentPage === page
                  ? "bg-black text-white border-black"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>

      {/* Page info
      <p className="text-sm font-medium text-gray-600 mx-2">
        Page <span className="text-black">{currentPage}</span> of{" "}
        <span className="text-black">{totalPages}</span>
      </p> */}

      {/* Next button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 border rounded-md text-sm font-medium transition ${
          currentPage === totalPages
            ? "border-gray-300 text-gray-400 cursor-not-allowed"
            : "hover:bg-gray-100 border-gray-300"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
