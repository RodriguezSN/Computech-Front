import React from 'react';
import { useLoading } from '../../context/LoadingContext'; // Asegúrate de ajustar la ruta

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  const { setIsLoading } = useLoading();

  const next = () => {
    if (currentPage < totalPages) {
      setIsLoading(true);
      setCurrentPage(currentPage + 1);
      setIsLoading(false);
    }
  };

  const prev = () => {
    if (currentPage > 1) {
      setIsLoading(true);
      setCurrentPage(currentPage - 1);
      setIsLoading(false);
    }
  };

  const goToPage = (page) => {
    setIsLoading(true);
    setCurrentPage(page);
    setIsLoading(false);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`w-8 h-8 flex items-center justify-center text-center px-3 py-1 rounded-lg transition-colors ${
            i === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center gap-2 p-4">
      <button
        onClick={() => goToPage(1)}
        className={`px-4 py-2 rounded-lg transition-colors ${currentPage === 1 ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed' : 'bg-blue-500 dark:bg-blue-700 hover:bg-blue-600 dark:hover:bg-blue-600 text-white'
          }`}
        disabled={currentPage === 1}
      >
        <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m17 16-4-4 4-4m-6 8-4-4 4-4" />
        </svg>
      </button>
      <button
        onClick={prev}
        className={`px-4 py-2 rounded-lg transition-colors ${currentPage <= 1 ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed' : 'bg-blue-500 dark:bg-blue-700 hover:bg-blue-600 dark:hover:bg-blue-600 text-white'
          }`}
        disabled={currentPage <= 1}
      >
        <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14 8-4 4 4 4" />
        </svg>
      </button>
      <div className="flex gap-1">
        {renderPageNumbers()}
      </div>
      <button
        onClick={next}
        className={`px-4 py-2 rounded-lg transition-colors ${currentPage >= totalPages ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed' : 'bg-blue-500 dark:bg-blue-700 hover:bg-blue-600 dark:hover:bg-blue-600 text-white'
          }`}
        disabled={currentPage >= totalPages}
      >
        <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m10 16 4-4-4-4" />
        </svg>
      </button>
      <button
        onClick={() => goToPage(totalPages)}
        className={`px-4 py-2 rounded-lg transition-colors ${currentPage === totalPages ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed' : 'bg-blue-500 dark:bg-blue-700 hover:bg-blue-600 dark:hover:bg-blue-600 text-white'
          }`}
        disabled={currentPage === totalPages}
      >
        <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 16 4-4-4-4m6 8 4-4-4-4" />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
