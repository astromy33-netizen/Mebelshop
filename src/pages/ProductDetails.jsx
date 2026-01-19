import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';
import { RatingStars } from '../components/RatingStars';
import { ProductCard } from '../components/ProductCard';

const PRODUCTS_API = 'https://6968854769178471522ab887.mockapi.io/productss';
const FAVORITES_KEY = 'favorites';

const readFavorites = () => {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
};

const writeFavorites = (items) => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
};

export const ProductDetails = () => {
  const { id } = useParams();
  const { i18n } = useTranslation();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [qty, setQty] = useState(1);
  const [mainIndex, setMainIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        setLoading(true);
        setError('');
        const [productRes, allRes] = await Promise.all([
          axios.get(`${PRODUCTS_API}/${id}`),
          axios.get(PRODUCTS_API),
        ]);

        if (!active) return;

        const item = productRes.data;
        if (!item || !item.id) {
          setError('not_found');
          setProduct(null);
        } else {
          setProduct(item);
          const favorites = readFavorites();
          setIsFavorite(favorites.includes(String(item.id)));
        }

        const allItems = Array.isArray(allRes.data) ? allRes.data : [];
        const relatedItems = allItems
          .filter((p) => p.id !== id && p.category === item.category)
          .slice(0, 4);
        setRelated(relatedItems);
        setMainIndex(0);
      } catch (err) {
        setError('load_failed');
      } finally {
        if (active) setLoading(false);
      }
    };

    load();

    return () => {
      active = false;
    };
  }, [id]);

  const title = useMemo(() => {
    if (!product) return '';
    const lang = i18n.language;
    const key = `title${lang.charAt(0).toUpperCase() + lang.slice(1)}`;
    return product[key] || product.titleKg || product.titleRu || product.titleEn || '';
  }, [product, i18n.language]);

  const description = useMemo(() => {
    if (!product) return '';
    const lang = i18n.language;
    const key = `description${lang.charAt(0).toUpperCase() + lang.slice(1)}`;
    return (
      product[key] ||
      product.descriptionKg ||
      product.descriptionRu ||
      product.descriptionEn ||
      ''
    );
  }, [product, i18n.language]);

  const images = useMemo(() => {
    if (!product?.cover) return [];
    return [product.cover, product.cover, product.cover, product.cover];
  }, [product]);

  const inStock = product?.stock === undefined ? true : Number(product.stock) > 0;

  const handleQty = (delta) => {
    setQty((prev) => {
      const next = prev + delta;
      return next < 1 ? 1 : next;
    });
  };

  const handleAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < qty; i += 1) {
      addToCart(product);
    }
    setToast('Добавлено в корзину');
    setTimeout(() => setToast(''), 1800);
  };

  const toggleFavorite = () => {
    if (!product?.id) return;
    const idStr = String(product.id);
    const favorites = readFavorites();
    const exists = favorites.includes(idStr);
    const next = exists ? favorites.filter((v) => v !== idStr) : [...favorites, idStr];
    writeFavorites(next);
    setIsFavorite(!exists);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="h-5 w-48 bg-gray-200 rounded mb-6 animate-pulse"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-4">
            <div className="h-96 bg-gray-200 rounded-2xl animate-pulse"></div>
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded-xl animate-pulse"></div>
              ))}
            </div>
          </div>
          <div className="h-96 bg-gray-200 rounded-2xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="max-w-md mx-auto rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-3">Товар не найден</h2>
          <p className="text-gray-600 mb-6">
            Попробуйте вернуться в каталог и выбрать другой товар.
          </p>
          <Link
            to="/catalog"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors"
          >
            Назад в каталог
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-slate-900">
      {toast && (
        <div className="fixed top-4 right-4 z-50 px-4 py-3 rounded-xl bg-slate-900 text-white shadow-lg">
          {toast}
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-slate-900">
            Главная
          </Link>
          <span className="mx-2">/</span>
          <Link to="/catalog" className="hover:text-slate-900">
            Каталог
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-700">{title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 overflow-hidden">
              {images[mainIndex] ? (
                <img
                  src={images[mainIndex]}
                  alt={title}
                  className="w-full h-[420px] object-cover"
                />
              ) : (
                <div className="w-full h-[420px] flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>
            <div className="grid grid-cols-3 gap-3 mt-4">
              {images.slice(0, 3).map((img, idx) => (
                <button
                  key={`${img}-${idx}`}
                  onClick={() => setMainIndex(idx)}
                  className={`rounded-xl border overflow-hidden bg-gray-50 ${
                    mainIndex === idx ? 'border-amber-400' : 'border-gray-200'
                  }`}
                >
                  <img src={img} alt={`${title}-${idx}`} className="h-24 w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-24 h-fit">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h1 className="text-2xl sm:text-3xl font-semibold mb-3 line-clamp-2">
                {title}
              </h1>
              <div className="flex items-center gap-3 text-gray-600 mb-4">
                <RatingStars rating={product.ratingAvg || 0} size="sm" />
                <span className="text-sm">
                  {Number(product.ratingAvg || 0).toFixed(1)}
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-amber-500 mb-4">
                ${Number(product.price || 0).toFixed(2)}
              </div>
              <div className="mb-6">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                    inStock
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-rose-100 text-rose-700'
                  }`}
                >
                  {inStock ? 'В наличии' : 'Нет в наличии'}
                </span>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={() => handleQty(-1)}
                  className="w-10 h-10 rounded-full border border-gray-200 text-slate-700 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="w-12 text-center font-semibold">{qty}</span>
                <button
                  onClick={() => handleQty(1)}
                  className="w-10 h-10 rounded-full border border-gray-200 text-slate-700 hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 text-slate-950 font-semibold shadow-[0_16px_30px_-18px_rgba(249,115,22,0.8)] hover:shadow-[0_18px_40px_-18px_rgba(244,63,94,0.65)] hover:-translate-y-0.5 transition-all"
                >
                  В корзину
                </button>
                <button
                  onClick={toggleFavorite}
                  className={`px-5 py-3 rounded-xl border border-gray-200 font-semibold flex items-center justify-center gap-2 transition-all ${
                    isFavorite ? 'text-rose-500 scale-[1.02]' : 'text-slate-700'
                  }`}
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5">
                    <path
                      d="M12 20.5l-1.45-1.32C6.4 15.36 4 13.28 4 10.5 4 8.5 5.5 7 7.5 7c1.54 0 3.04.99 3.57 2.36h1.87C13.46 7.99 14.96 7 16.5 7 18.5 7 20 8.5 20 10.5c0 2.78-2.4 4.86-6.55 8.68L12 20.5z"
                      fill={isFavorite ? '#EF4444' : 'none'}
                      stroke={isFavorite ? '#EF4444' : 'currentColor'}
                      strokeWidth="1.6"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {isFavorite ? 'В избранном' : 'В избранное'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Описание</h2>
            <p className="text-gray-700 leading-relaxed">
              {description || 'Описание товара будет добавлено позже.'}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Характеристики</h2>
            <div className="divide-y divide-gray-200 text-sm">
              <div className="py-3 flex justify-between">
                <span className="text-gray-500">Категория</span>
                <span className="font-semibold">{product.category || '-'}</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-gray-500">Материал</span>
                <span className="font-semibold">{product.material || '-'}</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-gray-500">Цвет</span>
                <span className="font-semibold">{product.color || '-'}</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-gray-500">Рейтинг</span>
                <span className="font-semibold">
                  {Number(product.ratingAvg || 0).toFixed(1)}
                </span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-gray-500">Наличие</span>
                <span className="font-semibold">{inStock ? 'В наличии' : 'Нет'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Похожие товары</h2>
            <Link to="/catalog" className="text-slate-900 font-semibold hover:text-slate-700">
              Смотреть все
            </Link>
          </div>
          {related.length === 0 ? (
            <div className="text-gray-500">Похожие товары не найдены.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
