import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { RatingStars } from "./RatingStars";
import { FavoriteButton } from "./FavoriteButton";
import { AddToCartButton } from "./AddToCartButton";
import { getProductId } from "../utils/productId";

export const ProductCard = ({ product }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  console.log(product);
  

  const lang = i18n.language || "kg";
  const titleKey = `title${lang.charAt(0).toUpperCase() + lang.slice(1)}`;
  const title = product?.[titleKey] || product?.titleKg || product?.titleRu || "—";

  const price = Number(product?.price || 0);
  const productId = product.id
  const canNavigate = productId !== null && productId !== undefined;
  const ratingValue = Number(product?.ratingAvg || 0).toFixed(1);

  const handleCardClick = () => {
    // if (!canNavigate) return;
    navigate(`/product/${productId}`);
  };

  const handleKeyDown = (event) => {
    if (!canNavigate) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      navigate(`/product/${productId}`);
    }
  };

  const CardInner = (
    <>
      <div className="relative h-56 sm:h-60 lg:h-64 overflow-hidden bg-slate-900/80">
        {product?.cover ? (
          <img
            src={product.cover}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-900 text-slate-400">
            {t("product.noImage") || "No Image"}
          </div>
        )}

        <div className="absolute right-3 top-3 z-10 opacity-70 transition-opacity group-hover:opacity-100">
          <div
            className="transition-transform duration-200 group-hover:scale-105"
            onClick={(e) => e.stopPropagation()}
          >
            <FavoriteButton productId={productId} variant="ghost" />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-slate-100 sm:text-xl">
          {title}
        </h3>

        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-300">
            <RatingStars rating={product?.ratingAvg || 0} size="sm" />
            <span className="text-sm">{ratingValue}</span>
          </div>

          <span className="text-2xl font-bold text-[#f3c86a] sm:text-3xl">
            ${price.toFixed(2)}
          </span>
        </div>

        <div
          onClick={(e) => e.stopPropagation()}
          className="mt-auto transition-transform duration-200 group-hover:scale-[1.02]"
        >
          <AddToCartButton product={product} variant="ozon" />
        </div>
      </div>
    </>
  );

  return (
    <div
      className={`group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-white/10 bg-[#0c121d] shadow-[0_20px_55px_-35px_rgba(6,10,18,0.9)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_30px_70px_-40px_rgba(6,10,18,0.95)] ${
        canNavigate ? "cursor-pointer" : ""
      }`}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      role={canNavigate ? "button" : undefined}
      tabIndex={canNavigate ? 0 : undefined}
    >
      <div className="block">{CardInner}</div>
    </div>
  );
};
