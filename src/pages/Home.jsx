import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as productsAPI from '../api/products';
import { ProductCard } from '../components/ProductCard';
import { SkeletonCard } from '../components/SkeletonCard';
import { getProductId } from '../utils/productId';

export const Home = ({ products } = {}) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const hasPropProducts = Array.isArray(products);

    if (hasPropProducts) {
      setTopProducts(products.slice(0, 8));
      setLoading(false);
      return () => {
        active = false;
      };
    }

    const loadProducts = async () => {
      try {
        const allProducts = await productsAPI.getAll();
        if (!active) return;
        setTopProducts(allProducts.slice(0, 8));
      } catch (error) {
        console.error('Error loading products:', error);
        if (active) setTopProducts([]);
      } finally {
        if (active) setLoading(false);
      }
    };

    loadProducts();

    return () => {
      active = false;
    };
  }, [products]);

  const featured = useMemo(() => {
    if (!Array.isArray(products)) return topProducts;
    return products.slice(0, 8);
  }, [products, topProducts]);

  const categories = [
    {
      id: 'sofa',
      title: 'Диван',
      image:
        'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?q=80&w=1400&auto=format&fit=crop',
    },
    {
      id: 'bed',
      title: 'Керебет',
      image:
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1400&auto=format&fit=crop',
    },
    {
      id: 'table',
      title: 'Стол',
      image:
        'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1400&auto=format&fit=crop',
    },
    {
      id: 'chair',
      title: 'Отургуч',
      image:
        'https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1400&auto=format&fit=crop',
    },
  ];

  const onSearch = (e) => {
    e.preventDefault();
    const value = query.trim();
    if (!value) return;
    navigate(`/catalog?search=${encodeURIComponent(value)}`);
  };

  return (
    <div className="bg-slate-50 text-slate-900 font-sans">
      <section className="relative overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=2000&auto=format&fit=crop"
            alt="Luxury furniture"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/55 to-slate-950/20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 w-full">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-20">
            <div className="max-w-3xl">
              <p className="text-amber-300 text-sm uppercase tracking-[0.25em] mb-4">
                MebelMart
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-6">
                Luxury мебель для дома
              </h1>
              <p className="text-lg sm:text-xl text-slate-200/90 max-w-2xl mb-8">
                Эстетика, комфорт и премиальные материалы — подберите мебель под
                ваш стиль и ритм жизни.
              </p>

              <form
                onSubmit={onSearch}
                className="flex flex-col sm:flex-row gap-3 bg-white/95 rounded-2xl p-2 max-w-xl shadow-[0_18px_40px_-30px_rgba(15,23,42,0.6)]"
              >
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Поиск по каталогу"
                  className="flex-1 px-4 py-3 rounded-xl text-slate-900 outline-none placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors"
                >
                  Найти
                </button>
              </form>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/catalog"
                  className="px-6 py-3 rounded-full bg-amber-400 text-slate-900 font-semibold hover:bg-amber-300 transition-colors"
                >
                  Перейти в каталог
                </Link>
                <a
                  href="#top"
                  className="px-6 py-3 rounded-full border border-white/40 text-white font-semibold hover:border-white/70 hover:bg-white/10 transition-colors"
                >
                  Топ товары
                </a>
              </div>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {['Доставка 24ч', 'Гарантия 1 год', 'Возврат 14 дней'].map(
                  (item) => (
                    <div
                      key={item}
                      className="px-4 py-3 rounded-xl bg-white/10 text-white text-sm border border-white/15 backdrop-blur-sm"
                    >
                      {item}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                Категории
              </h2>
              <p className="text-slate-600 mt-2">
                Быстрый доступ к самым востребованным группам мебели.
              </p>
            </div>
            <Link
              to="/catalog"
              className="text-slate-900 font-semibold hover:text-slate-700"
            >
              Смотреть все
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/catalog?category=${encodeURIComponent(category.id)}`}
                className="group relative overflow-hidden rounded-3xl h-64 bg-slate-200"
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/15 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="inline-flex items-center gap-2 text-white font-semibold text-lg">
                    {category.title}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="top" className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                Топ товары недели
              </h2>
              <p className="text-slate-600 mt-2">
                Самые популярные позиции, которые выбирают наши покупатели.
              </p>
            </div>
            <Link
              to="/catalog"
              className="inline-flex items-center justify-center px-5 py-3 rounded-full border border-slate-200 text-slate-900 font-semibold hover:bg-slate-900 hover:text-white transition-colors"
            >
              Смотреть все
            </Link>
          </div>

          {loading || featured.length === 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <SkeletonCard key={`skeleton-${index}`} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featured.map((product) => {
                const productId = getProductId(product);
                return (
                  <ProductCard
                    key={productId || product.id || product._id || product.sku}
                    product={product}
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
