import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as productsAPI from '../api/products';
import * as reviewsAPI from '../api/reviews';
import * as usersAPI from '../api/users';
import { ProductCard } from '../components/ProductCard';
import { SkeletonCard } from '../components/SkeletonCard';
import { RatingStars } from '../components/RatingStars';
import { getProductId } from '../utils/productId';

export const Home = ({ products } = {}) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState('');
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

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

  useEffect(() => {
    let active = true;

    const loadReviews = async () => {
      try {
        setLoadingReviews(true);
        const [reviewsData, usersData] = await Promise.all([
          reviewsAPI.getAll(),
          usersAPI.getAll(),
        ]);
        if (!active) return;

        const usersMap = new Map(
          (Array.isArray(usersData) ? usersData : []).map((user) => [String(user.id), user])
        );
        const sorted = (Array.isArray(reviewsData) ? reviewsData : [])
          .slice()
          .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
          .slice(0, 4)
          .map((review) => ({
            ...review,
            user: usersMap.get(String(review.userId)),
          }));

        setReviews(sorted);
      } catch (error) {
        console.error('Error loading reviews:', error);
        if (active) setReviews([]);
      } finally {
        if (active) setLoadingReviews(false);
      }
    };

    loadReviews();

    return () => {
      active = false;
    };
  }, []);

  const featured = useMemo(() => {
    if (!Array.isArray(products)) return topProducts;
    return products.slice(0, 8);
  }, [products, topProducts]);

  const categories = [
    {
      id: 'sofa',
      image:
        'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?q=80&w=1400&auto=format&fit=crop',
    },
    {
      id: 'bed',
      image:
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1400&auto=format&fit=crop',
    },
    {
      id: 'table',
      image:
        'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1400&auto=format&fit=crop',
    },
    {
      id: 'chair',
      image:
        'https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1400&auto=format&fit=crop',
    },
  ];

  const localized = {
    ru: {
      heroTitle: 'Luxury мебель для дома',
      heroSubtitle:
        'Эстетика, комфорт и премиальные материалы — подберите мебель под ваш стиль и ритм жизни.',
      ctaPrimary: 'Перейти в каталог',
      ctaSecondary: 'Топ товары',
      benefits: ['Доставка 24ч', 'Гарантия 1 год', 'Возврат 14 дней'],
      categoriesTitle: 'Категории',
      categoriesDesc: 'Быстрый доступ к популярным группам мебели для любого интерьера.',
      viewAll: 'Смотреть все',
      topTitle: 'Топ товары недели',
      topDesc: 'Самые популярные позиции, которые выбирают наши клиенты.',
    },
    en: {
      heroTitle: 'Luxury furniture for your home',
      heroSubtitle:
        'Aesthetics, comfort, and premium materials - choose furniture that fits your style.',
      ctaPrimary: 'Go to catalog',
      ctaSecondary: 'Top products',
      benefits: ['24h delivery', '1 year warranty', '14-day return'],
      categoriesTitle: 'Categories',
      categoriesDesc: 'Quick access to the most popular furniture groups.',
      viewAll: 'View all',
      topTitle: 'Top products of the week',
      topDesc: 'The most popular picks chosen by our customers.',
    },
    kg: {
      heroTitle: 'Luxury үй үчүн эмерек',
      heroSubtitle:
        'Эстетика, ыңгайлуулук жана премиум материалдар — стилиңизге жана жашоо ритмиңизге ылайык эмерек тандаңыз.',
      ctaPrimary: 'Каталогго өтүү',
      ctaSecondary: 'Топ товарлар',
      benefits: ['24 саатта жеткирүү', '1 жыл кепилдик', '14 күн кайтарып берүү'],
      categoriesTitle: 'Категориялар',
      categoriesDesc: 'Интерьерге ылайык популярдуу эмерек топторуна тез жетүү.',
      viewAll: 'Баарын көрүү',
      topTitle: 'Жуманын топ товарлары',
      topDesc: 'Кардарлар эң көп тандаган популярдуу позициялар.',
    },
  };

  const ui = localized[i18n.language] || localized.ru;

  const onSearch = (e) => {
    e.preventDefault();
    const value = query.trim();
    if (!value) return;
    navigate(`/catalog?search=${encodeURIComponent(value)}`);
  };

  return (
    <div
      className="min-h-screen font-sans bg-slate-50 text-slate-900 dark:text-slate-100"
      style={{
        '--lux-ink': '#05070f',
        '--lux-navy': '#0b1220',
        '--lux-mid': '#111c2b',
        '--lux-gold': '#f3c86a',
        '--lux-gold-strong': '#f6d58a',
      }}
    >
      <div className="min-h-screen home-shell">
        <section className="relative overflow-hidden min-h-[82vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?q=80&w=2200&auto=format&fit=crop"
            alt="Luxury furniture"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-white/45 dark:bg-slate-950/65"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/50 to-transparent dark:from-[#05070f]/95 dark:via-[#0b1220]/70"></div>
          <div className="absolute inset-0 hidden dark:block bg-[radial-gradient(circle_at_20%_20%,rgba(244,200,106,0.18),transparent_42%)]"></div>
        </div>

        <div className="relative z-10 w-full">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-24 lg:py-32">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.45em] text-amber-500 dark:text-[color:var(--lux-gold)] mb-5">
                MebelMart
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 dark:text-white mb-6">
                {ui.heroTitle}
              </h1>
              <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-200/90 max-w-2xl mb-8">
                {ui.heroSubtitle}
              </p>

              <form
                onSubmit={onSearch}
                className="flex flex-col sm:flex-row gap-3 bg-white/90 dark:bg-white/10 border border-slate-200 dark:border-white/10 backdrop-blur rounded-[18px] p-2 max-w-xl shadow-[0_18px_50px_-30px_rgba(8,12,20,0.2)] dark:shadow-[0_18px_50px_-30px_rgba(8,12,20,0.8)]"
              >
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t('search.placeholder')}
                  className="flex-1 px-4 py-3 rounded-[14px] text-slate-900 dark:text-white bg-transparent outline-none placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-[14px] bg-amber-400 text-slate-900 font-semibold hover:bg-amber-300 dark:bg-[color:var(--lux-gold)] dark:hover:bg-[color:var(--lux-gold-strong)] transition-colors"
                >
                  {t('search.button')}
                </button>
              </form>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/catalog"
                  className="px-6 py-3 rounded-full bg-amber-400 text-slate-900 font-semibold hover:bg-amber-300 dark:bg-[color:var(--lux-gold)] dark:hover:bg-[color:var(--lux-gold-strong)] transition-colors"
                >
                  {ui.ctaPrimary}
                </Link>
                <a
                  href="#top"
                  className="px-6 py-3 rounded-full border border-slate-300 text-slate-700 font-semibold hover:border-slate-400 hover:bg-slate-200/60 dark:border-white/40 dark:text-white dark:hover:border-white/70 dark:hover:bg-white/10 transition-colors"
                >
                  {ui.ctaSecondary}
                </a>
              </div>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {ui.benefits.map((item) => (
                  <div
                    key={item}
                    className="px-4 py-3 rounded-[16px] bg-white/70 text-slate-700 text-sm border border-slate-200 backdrop-blur-sm dark:bg-white/10 dark:text-white dark:border-white/15"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10">
          <div className="rounded-[20px] border border-slate-200 bg-white p-6 sm:p-8 shadow-[0_20px_55px_-35px_rgba(6,10,18,0.2)] dark:border-white/10 dark:bg-[#0c121d] dark:shadow-[0_20px_55px_-35px_rgba(6,10,18,0.9)]">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] items-center">
              <div className="max-w-3xl">
                <p className="text-xs uppercase tracking-[0.35em] text-amber-500 dark:text-[color:var(--lux-gold)] mb-4">
                  О компании
                </p>
                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white mb-4">
                  MebelMart - мебель для стильной и комфортной жизни
                </h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Мы подбираем современные коллекции для дома и офиса, уделяя внимание
                  качеству материалов, эргономике и актуальному дизайну. Наша цель -
                  сделать покупку мебели простой, прозрачной и вдохновляющей.
                </p>
                <p className="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                  Мы работаем напрямую с проверенными производителями, регулярно обновляем
                  ассортимент и помогаем подобрать решения под ваш бюджет, стиль и сроки.
                  Каждая позиция проходит контроль качества, а команда поддержки всегда на
                  связи, чтобы помочь на каждом этапе заказа.
                </p>
              </div>
              <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100 shadow-[0_18px_45px_-30px_rgba(6,10,18,0.45)] dark:border-white/10 dark:bg-slate-900/30">
                <div className="aspect-[4/3] w-full">
                  <img
                    src="https://images.unsplash.com/photo-1502005097973-6a7082348e28?q=80&w=1400&auto=format&fit=crop"
                    alt="Интерьер с мебелью MebelMart"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">
                {ui.categoriesTitle}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mt-3 max-w-2xl">
                {ui.categoriesDesc}
              </p>
            </div>
            <Link
              to="/catalog"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-slate-900 text-white font-semibold border border-slate-900 hover:bg-slate-800 dark:bg-white/10 dark:text-white dark:border-white/15 dark:hover:bg-white/20 transition-colors"
            >
              {ui.viewAll}
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/catalog?category=${encodeURIComponent(category.id)}`}
                className="group relative overflow-hidden rounded-[20px] h-64 bg-white border border-slate-200 shadow-[0_18px_45px_-30px_rgba(6,10,18,0.2)] dark:bg-slate-800/60 dark:border-white/10 dark:shadow-[0_18px_45px_-30px_rgba(6,10,18,0.9)]"
              >
                <img
                  src={category.image}
                  alt={t(`category.${category.id}`)}
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent transition-opacity duration-300 group-hover:opacity-90 dark:from-[#05070f]/80 dark:via-[#0b1220]/20"></div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="inline-flex items-center gap-2 text-white font-semibold text-lg">
                    {t(`category.${category.id}`)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="top" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">
                {ui.topTitle}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mt-3 max-w-2xl">
                {ui.topDesc}
              </p>
            </div>
            <Link
              to="/catalog"
              className="inline-flex items-center justify-center px-5 py-3 rounded-full border border-slate-300 text-slate-900 font-semibold hover:bg-slate-900 hover:text-white dark:border-white/15 dark:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-colors"
            >
              {ui.viewAll}
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

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">
                {t('home.customerReviews')}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mt-3 max-w-2xl">
                {t('home.customerReviewsDesc')}
              </p>
            </div>
          </div>

          {loadingReviews ? (
            <div className="text-slate-500 dark:text-slate-400">{t('review.loading')}</div>
          ) : reviews.length === 0 ? (
            <div className="text-slate-500 dark:text-slate-400">{t('empty.noReviews')}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {reviews.map((review) => {
                const userName =
                  review.user?.fullName || review.user?.email || t('common.anonymous');
                const initials = userName
                  .split(' ')
                  .filter(Boolean)
                  .slice(0, 2)
                  .map((part) => part[0]?.toUpperCase())
                  .join('');

                return (
                  <div
                    key={review.id}
                    className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-[0_20px_55px_-35px_rgba(6,10,18,0.2)] dark:border-white/10 dark:bg-[#0c121d] dark:shadow-[0_20px_55px_-35px_rgba(6,10,18,0.9)]"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      {review.user?.avatar ? (
                        <img
                          src={review.user.avatar}
                          alt={userName}
                          className="h-11 w-11 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-11 w-11 rounded-full bg-slate-200 text-slate-700 dark:bg-white/10 dark:text-slate-200 flex items-center justify-center text-sm font-semibold">
                          {initials || 'U'}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{userName}</p>
                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                          <RatingStars rating={review.rating || 0} size="sm" />
                          <span className="text-xs">{Number(review.rating || 0).toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {review.text}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
      </div>
    </div>
  );
};
