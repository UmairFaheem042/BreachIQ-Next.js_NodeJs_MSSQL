"use client";

import { useRouter, useSearchParams } from "next/navigation";

const Pagination = ({ currentPage, totalPages }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page) => {
    // Prevent API call if:
    // 1. There is only one page
    // 2. User clicks the same page number
    if (page === currentPage || totalPages === 1) return;

    const params = new URLSearchParams(searchParams);
    params.set("page", page);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="join mx-auto">
      {currentPage > 1 && (
        <button
          className="join-item btn"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
      )}

      <button
        className={`join-item btn ${
          currentPage === 1
            ? "bg-gray-800 text-white btn-disabled cursor-not-allowed"
            : ""
        }`}
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1 || totalPages === 1}
      >
        1
      </button>

      {currentPage > 2 && totalPages > 5 && (
        <button className="join-item btn btn-disabled">...</button>
      )}

      {currentPage > 1 && currentPage < totalPages && (
        <button
          className="join-item btn bg-gray-800 text-white btn-disabled cursor-not-allowed"
          onClick={() => handlePageChange(currentPage)}
          disabled
        >
          {currentPage}
        </button>
      )}

      {currentPage < totalPages - 1 && totalPages > 5 && (
        <button className="join-item btn btn-disabled">...</button>
      )}

      {totalPages > 1 && (
        <button
          className={`join-item btn ${
            currentPage === totalPages
              ? "bg-gray-800 text-white btn-disabled cursor-not-allowed"
              : ""
          }`}
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages || totalPages === 1}
        >
          {totalPages}
        </button>
      )}

      {currentPage < totalPages && (
        <button
          className="join-item btn"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
