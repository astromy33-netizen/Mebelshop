import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RatingStars } from './RatingStars';
import { FavoriteButton } from './FavoriteButton';
import { AddToCartButton } from './AddToCartButton';
import { getProductId } from '../utils/productId';

export const ProductCard = ({ product }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const title = product[`title${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || product.titleKg;
  const price = product.price || 0;
  const productId = getProductId(product);
  const ratingValue = Number(product.ratingAvg || 0).toFixed(1);
  const LinkTag = productId ? Link : 'div';
  const linkProps = productId ? { to: `/product/${productId}` } : {};

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_-30px_rgba(15,23,42,0.4)] h-full flex flex-col">
      <LinkTag {...linkProps} className="block relative">
        <div className="relative h-56 sm:h-60 lg:h-64 overflow-hidden bg-gray-50">
          {product.cover ? (
            <img
              src={product.cover}
              alt={title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
              {t('product.noImage') || 'No Image'}
            </div>
          )}
          <div className="absolute top-3 right-3 z-10">
            <FavoriteButton productId={productId} variant="ghost" />
          </div>
        </div>
      </LinkTag>
      <div className="p-5 sm:p-6 flex-1 flex flex-col">
        <LinkTag {...linkProps}>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
            {title}
          </h3>
        </LinkTag>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <RatingStars rating={product.ratingAvg || 0} size="sm" />
            <span className="text-sm">{ratingValue}</span>
          </div>
          <span className="text-2xl sm:text-3xl font-bold text-amber-500">
            ${price.toFixed(2)}
          </span>
        </div>
        <div onClick={(e) => e.stopPropagation()} className="mt-auto">
          <AddToCartButton product={product} variant="ozon" />
        </div>
      </div>
    </div>
  );
};
