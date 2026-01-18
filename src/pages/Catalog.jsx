import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as productsAPI from '../api/products';
import { ProductGrid } from '../components/ProductGrid';
import { FiltersPanel } from '../components/FiltersPanel';
import { SearchBar } from '../components/SearchBar';
import { Pagination } from '../components/Pagination';

export const Catalog = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    color: '',
    material: '',
    minPrice: '',
    maxPrice: '',
    minRating: '',
    sort: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [products, filters, searchQuery]);

  const loadProducts = async () => {
    try {
      const data = await productsAPI.getAll();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Поиск по названию
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((product) => {
        const title = (product[`title${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || product.titleKg || '').toLowerCase();
        const description = (product[`description${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || product.descriptionKg || '').toLowerCase();
        return title.includes(query) || description.includes(query);
      });
    }

    // Фильтр по категории
    if (filters.category) {
      filtered = filtered.filter((p) => p.category === filters.category);
    }

    // Фильтр по цвету
    if (filters.color) {
      filtered = filtered.filter((p) => 
        p.color && p.color.toLowerCase().includes(filters.color.toLowerCase())
      );
    }

    // Фильтр по материалу
    if (filters.material) {
      filtered = filtered.filter((p) => 
        p.material && p.material.toLowerCase().includes(filters.material.toLowerCase())
      );
    }

    // Фильтр по цене
    if (filters.minPrice) {
      const minPrice = parseFloat(filters.minPrice);
      filtered = filtered.filter((p) => p.price >= minPrice);
    }
    if (filters.maxPrice) {
      const maxPrice = parseFloat(filters.maxPrice);
      filtered = filtered.filter((p) => p.price <= maxPrice);
    }

    // Фильтр по рейтингу
    if (filters.minRating) {
      const minRating = parseFloat(filters.minRating);
      filtered = filtered.filter((p) => (p.ratingAvg || 0) >= minRating);
    }

    // Сортировка
    if (filters.sort === 'priceAsc') {
      filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (filters.sort === 'priceDesc') {
      filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (filters.sort === 'ratingDesc') {
      filtered.sort((a, b) => (b.ratingAvg || 0) - (a.ratingAvg || 0));
    } else if (filters.sort === 'nameAsc') {
      filtered.sort((a, b) => {
        const titleA = (a[`title${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || a.titleKg || '').toLowerCase();
        const titleB = (b[`title${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || b.titleKg || '').toLowerCase();
        return titleA.localeCompare(titleB);
      });
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 animate-fadeIn">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
          <span className="gradient-text">{t('nav.catalog')}</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">{t('catalog.discover')}</p>
      </div>
      <div className="mb-6 sm:mb-8 animate-slideIn">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="mb-6 sm:mb-8 animate-scaleIn" style={{animationDelay: '0.1s'}}>
        <FiltersPanel filters={filters} onFilterChange={handleFilterChange} products={products} />
      </div>
      
      {/* Показываем количество найденных товаров */}
      {!loading && (
        <div className="mb-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            {filteredProducts.length === 0 ? (
              <span>{t('filters.noResults')}</span>
            ) : (
              <span>
                {t('filters.found')} <strong className="text-blue-600 dark:text-blue-400">{filteredProducts.length}</strong> {t('filters.products')}
              </span>
            )}
          </p>
        </div>
      )}

      <ProductGrid products={paginatedProducts} loading={loading} />
      {totalPages > 1 && (
        <div className="mt-12 animate-fadeIn" style={{animationDelay: '0.2s'}}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

