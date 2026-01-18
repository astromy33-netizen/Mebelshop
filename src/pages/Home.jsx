import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import * as productsAPI from '../api/products';
import * as reviewsAPI from '../api/reviews';
import * as usersAPI from '../api/users';
import { SkeletonList } from '../components/SkeletonList';
import { RatingStars } from '../components/RatingStars';
import { FavoriteButton } from '../components/FavoriteButton';
import { getProductId } from '../utils/productId';

export const Home = () => {
  const { t, i18n } = useTranslation();
  const { currentLanguage } = useLanguage();
  const { addToCart } = useCart();
  const lang = currentLanguage;
  const [popularProducts, setPopularProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await Promise.all([loadPopularProducts(), loadReviews()]);
  };

  const loadPopularProducts = async () => {
    try {
      const allProducts = await productsAPI.getAll();
      
      //    (  = )
      const sorted = allProducts.sort((a, b) => {
        const ratingA = a.ratingAvg || 0;
        const ratingB = b.ratingAvg || 0;
        
        if (ratingA !== ratingB) {
          return ratingB - ratingA;
        }
        
        const dateA = new Date(a.createdAt || 0);
        const dateB = new Date(b.createdAt || 0);
        return dateB - dateA;
      });
      
      setPopularProducts(sorted.slice(0, 6));
    } catch (error) {
      console.error('Error loading popular products:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadReviews = async () => {
    try {
      const allReviews = await reviewsAPI.getAll();
      //   3    
      const sortedReviews = allReviews
        .sort((a, b) => {
          const ratingA = a.rating || 0;
          const ratingB = b.rating || 0;
          if (ratingA !== ratingB) return ratingB - ratingA;
          const dateA = new Date(a.createdAt || 0);
          const dateB = new Date(b.createdAt || 0);
          return dateB - dateA;
        })
        .slice(0, 3);

      const reviewsWithUsers = await Promise.all(
        sortedReviews.map(async (review) => {
          try {
            const reviewUser = await usersAPI.getById(review.userId);
            return { 
              ...review, 
              userName: reviewUser.fullName || reviewUser.email || t('common.anonymous'),
              userInitial: (reviewUser.fullName || reviewUser.email || 'A').charAt(0).toUpperCase()
            };
          } catch {
            return { 
              ...review, 
              userName: t('common.anonymous'),
              userInitial: 'A'
            };
          }
        })
      );

      setReviews(reviewsWithUsers);
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setReviewsLoading(false);
    }
  };

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const translateCategory = (category) => {
    return t(`category.${category}`);
  };

    const categories = [
    { id: 'sofa', icon: 'S', name: 'sofa' },
    { id: 'bed', icon: 'B', name: 'bed' },
    { id: 'table', icon: 'T', name: 'table' },
    { id: 'chair', icon: 'C', name: 'chair' },
  ];

    const whyChooseUs = [
    {
      icon: 'Q',
      title: t('home.whyChooseUs.quality.title'),
      description: t('home.whyChooseUs.quality.desc'),
    },
    {
      icon: 'D',
      title: t('home.whyChooseUs.delivery.title'),
      description: t('home.whyChooseUs.delivery.desc'),
    },
    {
      icon: 'S',
      title: t('home.whyChooseUs.service.title'),
      description: t('home.whyChooseUs.service.desc'),
    },
    {
      icon: 'C',
      title: t('home.whyChooseUs.custom.title'),
      description: t('home.whyChooseUs.custom.desc'),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-24 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),_transparent_55%)]"></div>
        <div className="absolute -top-12 -right-20 h-80 w-80 rounded-full bg-amber-400/30 blur-3xl animate-glow-pulse"></div>
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-rose-500/25 blur-3xl animate-glow-pulse"></div>
        <div className="absolute inset-0 opacity-20 bg-grid"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight mb-6">
            <span className="gradient-text">MebelMart</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300/90 mb-10 max-w-2xl mx-auto">
            {t('home.subtitle')}
          </p>
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 px-10 py-3 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 text-slate-950 font-semibold shadow-[0_20px_45px_-20px_rgba(249,115,22,0.8)] hover:-translate-y-0.5 hover:shadow-[0_24px_55px_-24px_rgba(244,63,94,0.8)] transition-all duration-300"
          >
            {t('nav.catalog')} ->
          </Link>
        </div>
      </div>

      {/* Categories Section */}
      <div className="relative py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(251,191,36,0.08),_transparent_60%)]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
              {t('home.categories')}
            </h2>
            <p className="text-slate-300/80 max-w-xl mx-auto">
              {t('home.categoriesDesc')}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/catalog?category=${category.id}`}
                className="group surface rounded-3xl overflow-hidden hover:-translate-y-2 hover:shadow-[0_30px_70px_-40px_rgba(15,23,42,0.9)] transition-all duration-300"
              >
                <div className="aspect-square relative">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(248,250,252,0.08),_transparent_60%)]"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-amber-400/20 via-orange-500/20 to-rose-500/20 border border-white/10 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-slate-950/80 backdrop-blur p-4 text-center">
                    <h3 className="text-white font-semibold tracking-tight">
                      {translateCategory(category.name)}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Products Section */}
      <div className="relative py-20">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top,_rgba(244,63,94,0.08),_transparent_55%)]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-2">
                {t('home.popularProducts')}
              </h2>
              <p className="text-slate-300/80 max-w-xl">
                {t('home.popularProductsDesc')}
              </p>
            </div>
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 text-amber-300 hover:text-amber-200 font-semibold transition-colors"
            >
              {t('home.viewAllProducts')} ->
            </Link>
          </div>

          {loading ? (
            <SkeletonList count={4} />
          ) : popularProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularProducts.map((product) => {
                const productId = getProductId(product);
                return (
                  <div key={productId || product.id} className="group relative overflow-hidden rounded-[22px] bg-white border border-gray-200 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1">
                    <div className="relative h-64 overflow-hidden bg-gray-50">
                      {product.cover ? (
                        <img
                          src={product.cover}
                          alt={product[`title${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || product.titleKg}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">
                          IMG
                        </div>
                      )}
                      <div className="absolute top-3 right-3">
                        <FavoriteButton productId={productId} variant="light" />
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="mb-2">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span
                                key={i}
                                className={`text-sm ${
                                  i < Math.floor(product.ratingAvg || 0)
                                    ? 'text-amber-300'
                                    : 'text-slate-700'
                                }`}
                              >
                                *
                              </span>
                            ))}
                          </div>
                          <span className="text-slate-400 text-sm">
                            {product.ratingAvg?.toFixed(1) || '0.0'}
                          </span>
                        </div>
                      </div>
                      {productId ? (
                        <Link to={`/product/${productId}`}>
                          <h3 className="text-gray-900 font-semibold mb-3 hover:text-blue-600 transition-colors">
                            {product[`title${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || product.titleKg}
                          </h3>
                        </Link>
                      ) : (
                        <h3 className="text-gray-900 font-semibold mb-3 hover:text-blue-600 transition-colors">
                          {product[`title${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || product.titleKg}
                        </h3>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-amber-500 font-semibold text-xl">
                          ${product.price?.toFixed(2) || '0.00'}
                        </span>
                        <span className="text-sm text-gray-500">
                          {(product.ratingAvg || 0).toFixed(1)}
                        </span>
                      </div>
                      <button
                        onClick={(e) => handleAddToCart(product, e)}
                        className="mt-4 w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
                      >
                        {t('product.addToCart')}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-400">{t('empty.noProducts')}</p>
            </div>
          )}
        </div>
      </div>

      {/* Why Choose Us Section */}}
      <div className="relative py-20">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.08),_transparent_60%)]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
              {t('home.whyChooseUs.title')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="surface rounded-3xl p-6 text-center hover:-translate-y-2 hover:shadow-[0_24px_55px_-35px_rgba(15,23,42,0.9)] transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400/20 via-orange-500/20 to-rose-500/20 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">
                  {item.icon}
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-300/80 text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="relative py-20">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top,_rgba(248,250,252,0.08),_transparent_60%)]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
              {t('home.customerReviews')}
            </h2>
            <p className="text-slate-300/80 max-w-xl mx-auto">
              {t('home.customerReviewsDesc')}
            </p>
          </div>
          {reviewsLoading ? (
            <div className="text-center text-slate-400">{t('review.loading')}</div>
          ) : reviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.map((review, index) => (
                <div
                  key={review.id ?? `${review.userId}-${review.createdAt ?? index}`}
                  className="surface-strong rounded-3xl p-6 hover:-translate-y-2 hover:shadow-[0_24px_55px_-35px_rgba(15,23,42,0.9)] transition-all duration-300"
                >
                  <div className="mb-4">
                    <RatingStars rating={review.rating} size="sm" />
                  </div>
                  <p className="text-slate-200 mb-4 italic">
                    "{review.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-rose-500 rounded-full flex items-center justify-center text-slate-950 font-semibold">
                      {review.userInitial}
                    </div>
                    <div>
                      <p className="text-white font-semibold">{review.userName}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-slate-400">
              {t('empty.noReviews')}
            </div>
          )}
        </div>
      </div>

      {/* CTA Banner */}
      <div className="relative overflow-hidden py-20">
        <div className="absolute inset-0 gradient-bg"></div>
        <div className="absolute inset-0 opacity-20 bg-grid"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
            {t('home.cta.title')}
          </h2>
          <p className="text-white/90 mb-8 text-lg">
            {t('home.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-3 bg-white/95 text-slate-950 rounded-full font-semibold hover:bg-white transition-all border border-white/50 shadow-[0_12px_25px_-15px_rgba(15,23,42,0.6)]"
            >
              {t('home.cta.contact')} ->
            </Link>
            <Link
              to="/catalog"
              className="px-8 py-3 bg-slate-950/90 text-white rounded-full font-semibold hover:bg-slate-950 transition-all border border-white/20 shadow-[0_12px_25px_-15px_rgba(15,23,42,0.6)]"
            >
              {t('home.cta.catalog')} ->
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};








