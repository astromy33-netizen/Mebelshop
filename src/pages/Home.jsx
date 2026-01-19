import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as productsAPI from '../api/products';
import { ProductCard } from '../components/ProductCard';
import { SkeletonCard } from '../components/SkeletonCard';
import { getProductId } from '../utils/productId';

export const Home = ({ products } = {}) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
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
      heroTitle: 'Т®Р№ТЇТЈТЇР· ТЇС‡ТЇРЅ luxury РјРµР±РµР»СЊ',
      heroSubtitle:
        'РЎСѓР»СѓСѓР»СѓРє, С‹ТЈРіР°Р№Р»СѓСѓР»СѓРє Р¶Р°РЅР° РїСЂРµРјРёСѓРј РјР°С‚РµСЂРёР°Р»РґР°СЂ - СЃС‚РёР»РёТЈРёР·РіРµ С‹Р»Р°Р№С‹Рє РјРµР±РµР»СЊ С‚Р°РЅРґР°ТЈС‹Р·.',
      ctaPrimary: 'РљР°С‚Р°Р»РѕРіРіРѕ У©С‚ТЇТЇ',
      ctaSecondary: 'РўРѕРї С‚РѕРІР°СЂР»Р°СЂ',
      benefits: ['24 СЃР°Р°С‚ Р¶РµС‚РєРёСЂТЇТЇ', '1 Р¶С‹Р» РєРµРїРёР»РґРёРє', '14 РєТЇРЅ РєР°Р№С‚Р°СЂСѓСѓ'],
      categoriesTitle: 'РљР°С‚РµРіРѕСЂРёСЏР»Р°СЂ',
      categoriesDesc: 'Р­ТЈ С‚Р°Р»Р°Рї РєС‹Р»С‹РЅРіР°РЅ РјРµР±РµР»СЊ С‚РѕРїС‚РѕСЂСѓРЅР° С‚РµР· Р¶РµС‚ТЇТЇ.',
      viewAll: 'Р‘Р°Р°СЂС‹РЅ РєУ©СЂТЇТЇ',
      topTitle: 'РђРїС‚Р°РЅС‹РЅ С‚РѕРї С‚РѕРІР°СЂР»Р°СЂС‹',
      topDesc: 'РљР°СЂРґР°СЂР»Р°СЂС‹Р±С‹Р· СЌТЈ РєУ©Рї С‚Р°РЅРґР°РіР°РЅ РїРѕР·РёС†РёСЏР»Р°СЂ.',
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
      className="min-h-screen text-slate-100 font-sans"
      style={{
        '--lux-ink': '#05070f',
        '--lux-navy': '#0b1220',
        '--lux-mid': '#111c2b',
        '--lux-gold': '#f3c86a',
        '--lux-gold-strong': '#f6d58a',
      }}
    >
      <div
        className="min-h-screen"
        style={{
          background:
            'radial-gradient(1100px 520px at 20% -10%, rgba(86, 115, 160, 0.32), transparent 60%), radial-gradient(900px 520px at 85% 10%, rgba(25, 39, 64, 0.55), transparent 62%), linear-gradient(180deg, #05070f 0%, #0b1220 45%, #070b14 100%)',
        }}
      >
        <section className="relative overflow-hidden min-h-[82vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?q=80&w=2200&auto=format&fit=crop"
            alt="Luxury furniture"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/65"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#05070f]/95 via-[#0b1220]/70 to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(244,200,106,0.18),transparent_42%)]"></div>
        </div>

        <div className="relative z-10 w-full">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-24 lg:py-32">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.45em] text-[color:var(--lux-gold)] mb-5">
                MebelMart
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-6">
                {ui.heroTitle}
              </h1>
              <p className="text-lg sm:text-xl text-slate-200/90 max-w-2xl mb-8">
                {ui.heroSubtitle}
              </p>

              <form
                onSubmit={onSearch}
                className="flex flex-col sm:flex-row gap-3 bg-white/10 border border-white/10 backdrop-blur rounded-[18px] p-2 max-w-xl shadow-[0_18px_50px_-30px_rgba(8,12,20,0.8)]"
              >
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t('search.placeholder')}
                  className="flex-1 px-4 py-3 rounded-[14px] text-white bg-transparent outline-none placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-[14px] bg-[color:var(--lux-gold)] text-slate-900 font-semibold hover:bg-[color:var(--lux-gold-strong)] transition-colors"
                >
                  {t('search.button')}
                </button>
              </form>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/catalog"
                  className="px-6 py-3 rounded-full bg-[color:var(--lux-gold)] text-slate-900 font-semibold hover:bg-[color:var(--lux-gold-strong)] transition-colors"
                >
                  {ui.ctaPrimary}
                </Link>
                <a
                  href="#top"
                  className="px-6 py-3 rounded-full border border-white/40 text-white font-semibold hover:border-white/70 hover:bg-white/10 transition-colors"
                >
                  {ui.ctaSecondary}
                </a>
              </div>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {ui.benefits.map((item) => (
                  <div
                    key={item}
                    className="px-4 py-3 rounded-[16px] bg-white/10 text-white text-sm border border-white/15 backdrop-blur-sm"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
                {ui.categoriesTitle}
              </h2>
              <p className="text-slate-300 mt-3 max-w-2xl">
                {ui.categoriesDesc}
              </p>
            </div>
            <Link
              to="/catalog"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-white/10 text-white font-semibold border border-white/15 hover:bg-white/20 transition-colors"
            >
              {ui.viewAll}
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/catalog?category=${encodeURIComponent(category.id)}`}
                className="group relative overflow-hidden rounded-[20px] h-64 bg-slate-800/60 border border-white/10 shadow-[0_18px_45px_-30px_rgba(6,10,18,0.9)]"
              >
                <img
                  src={category.image}
                  alt={t(`category.${category.id}`)}
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070f]/80 via-[#0b1220]/20 to-transparent transition-opacity duration-300 group-hover:opacity-90"></div>
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-300"></div>
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
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
                {ui.topTitle}
              </h2>
              <p className="text-slate-300 mt-3 max-w-2xl">
                {ui.topDesc}
              </p>
            </div>
            <Link
              to="/catalog"
              className="inline-flex items-center justify-center px-5 py-3 rounded-full border border-white/15 text-white font-semibold hover:bg-white hover:text-slate-900 transition-colors"
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
      </div>
    </div>
  );
};

