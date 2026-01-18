import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const SearchBar = ({ onSearch }) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');

  // Live search с задержкой
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 300); // Задержка 300ms для оптимизации

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('search.placeholder')}
          className="w-full px-4 sm:px-6 py-3 sm:py-4 pl-12 sm:pl-14 pr-4 sm:pr-32 rounded-xl sm:rounded-2xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 shadow-lg hover:shadow-xl"
        />
        <span className="absolute left-4 sm:left-5 top-1/2 transform -translate-y-1/2 text-xl sm:text-2xl">🔍</span>
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              onSearch('');
            }}
            className="hidden sm:block sm:absolute sm:right-24 sm:top-1/2 sm:-translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xl transition-all"
            title={t('search.clear')}
          >
            ✕
          </button>
        )}
        <button
          type="submit"
          className="mt-3 w-full sm:w-auto sm:mt-0 sm:absolute sm:right-2 sm:top-1/2 sm:-translate-y-1/2 px-5 sm:px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 sm:transform sm:hover:scale-105 sm:active:scale-95 transition-all duration-300 shadow-lg"
        >
          {t('search.button')}
        </button>
      </div>
    </form>
  );
};

