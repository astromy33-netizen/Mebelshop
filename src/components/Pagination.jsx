import { useTranslation } from 'react-i18next';

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const { t } = useTranslation();
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center gap-3 mt-6 flex-wrap">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-6 py-2.5 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-md hover:shadow-lg"
      >
        ← {t('pagination.previous')}
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-5 py-2.5 rounded-xl font-semibold transform hover:scale-110 active:scale-95 transition-all duration-300 ${
            currentPage === page
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-110'
              : 'bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-500 dark:hover:border-blue-400 shadow-md hover:shadow-lg'
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-6 py-2.5 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-md hover:shadow-lg"
      >
        {t('pagination.next')} →
      </button>
    </div>
  );
};
