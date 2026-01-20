import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as productsAPI from '../api/products';
import { ProductCard } from '../components/ProductCard';
import { SkeletonList } from '../components/SkeletonList';
import { EmptyState } from '../components/EmptyState';

const FAVORITES_KEY = 'favorites';

const readFavorites = () => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((item) => {
        if (item == null) return null;
        if (typeof item === 'string' || typeof item === 'number') return String(item);
        if (typeof item === 'object') {
          const id = item.id ?? item.productId ?? item._id;
          return id != null ? String(id) : null;
        }
        return null;
      })
      .filter(Boolean);
  } catch (error) {
    console.error('Error reading favorites:', error);
    return [];
  }
};

export const Favorites = () => {
  const { t } = useTranslation();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = async () => {
    const ids = readFavorites();
    if (ids.length === 0) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const products = await Promise.all(
        ids.map((id) => productsAPI.getById(id).catch(() => null))
      );
      setFavorites(products.filter(Boolean));
    } catch (error) {
      console.error('Error loading favorites:', error);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    loadFavorites();

    const sync = () => loadFavorites();
    window.addEventListener('storage', sync);
    window.addEventListener('favorites-updated', sync);
    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener('favorites-updated', sync);
    };
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          {t('favorites.title')}
        </h1>
        {!loading && (
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {t('filters.found')} {favorites.length} {t('filters.products')}
          </span>
        )}
      </div>

      {loading ? (
        <SkeletonList count={3} />
      ) : favorites.length === 0 ? (
        <EmptyState message={t('favorites.empty')} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-7 items-stretch">
          {favorites.map((product, index) => (
            <ProductCard
              key={product.id || product.productId || product._id || index}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
};
