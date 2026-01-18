import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as productsAPI from '../api/products';
import * as reviewsAPI from '../api/reviews';
import { ProductGallery } from '../components/ProductGallery';
import { RatingStars } from '../components/RatingStars';
import { AddToCartButton } from '../components/AddToCartButton';
import { FavoriteButton } from '../components/FavoriteButton';
import { ReviewsList } from '../components/ReviewsList';
import { ReviewForm } from '../components/ReviewForm';
import { SkeletonCard } from '../components/SkeletonCard';

export const ProductDetails = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewKey, setReviewKey] = useState(0);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const data = await productsAPI.getById(id);
      setProduct(data);
      
      // Обновляем средний рейтинг на основе отзывов
      await updateProductRating(data.id);
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProductRating = async (productId) => {
    try {
      const allReviews = await reviewsAPI.getAll();
      const productReviews = allReviews.filter(
        (r) => String(r.productId) === String(productId)
      );
      
      if (productReviews.length > 0) {
        const avgRating = productReviews.reduce((sum, r) => sum + (r.rating || 0), 0) / productReviews.length;
        const roundedRating = Math.round(avgRating * 10) / 10;
        
        // Обновляем рейтинг товара в состоянии
        setProduct(prev => prev ? { ...prev, ratingAvg: roundedRating } : null);
        
        // Обновляем рейтинг в API
        try {
          const currentProduct = await productsAPI.getById(productId);
          await productsAPI.update(productId, { ...currentProduct, ratingAvg: roundedRating });
        } catch (error) {
          console.warn('Could not update product rating in API:', error);
        }
      }
    } catch (error) {
      console.error('Error updating product rating:', error);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <SkeletonCard />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <p className="text-gray-600 dark:text-gray-400">{t('product.notFound')}</p>
      </div>
    );
  }

  const title = product[`title${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || product.titleKg;
  const description = product[`description${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || product.descriptionKg;
  const ratingCount = product.reviewsCount || product.ratingCount || (product.reviews ? product.reviews.length : 0) || 0;
  const specs = [
    { label: 'Dimensions', value: product.dimensions || product.size || 'N/A' },
    { label: 'Material', value: product.material || 'N/A' },
    { label: 'Color', value: product.color || 'N/A' },
    { label: 'Type', value: product.type || product.category || 'N/A' },
    { label: 'Weight', value: product.weight || 'N/A' },
    { label: 'Warranty', value: product.warranty || 'N/A' },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 mb-10">
        <ProductGallery product={product} />
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-3">{title}</h1>
            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              <RatingStars rating={product.ratingAvg || 0} size="sm" />
              <span>{Number(product.ratingAvg || 0).toFixed(1)}</span>
              <span>({ratingCount} reviews)</span>
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-semibold text-amber-400 mb-4">
            ${product.price?.toFixed(2) || '0.00'}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <AddToCartButton product={product} />
            <FavoriteButton productId={product.id} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-4 bg-white dark:bg-gray-900">
              <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Delivery</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white mt-2">2-5 business days</p>
            </div>
            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-4 bg-white dark:bg-gray-900">
              <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Returns</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white mt-2">14 days return policy</p>
            </div>
            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-4 bg-white dark:bg-gray-900">
              <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Stock</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white mt-2">
                {product.stock ? `In stock: ${product.stock}` : 'Check availability'}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10">
        <div className="space-y-8">
          <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 bg-white dark:bg-gray-900">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {t('product.description')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {description || t('product.noDescription')}
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 bg-white dark:bg-gray-900">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Specifications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {specs.map((spec) => (
                <div key={spec.label} className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-gray-500 dark:text-gray-400">{spec.label}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 bg-white dark:bg-gray-900">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {t('product.reviews')}
          </h2>
          <ReviewForm 
            productId={String(product.id)} 
            onReviewAdded={async () => {
              await updateProductRating(product.id);
              setReviewKey(prev => prev + 1);
            }} 
          />
          <div className="mt-8" key={reviewKey}>
            <ReviewsList productId={String(product.id)} />
          </div>
        </div>
      </div>
    </div>
  );
};


