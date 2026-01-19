import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RatingStars } from '../components/RatingStars';
import { FavoriteButton } from '../components/FavoriteButton';
import { AddToCartButton } from '../components/AddToCartButton';
import { ProductCard } from '../components/ProductCard';

const PRODUCTS_URL = 'https://6968854769178471522ab887.mockapi.io/productss';

export default function ProductDetails() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'kg';

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    let alive = true;
    setLoading(true);

    const load = async () => {
      try {
        const [productRes, allRes] = await Promise.all([
          fetch(`${PRODUCTS_URL}/${id}`),
          fetch(PRODUCTS_URL),
        ]);

        if (!productRes.ok) throw new Error('Failed to load product');
        if (!allRes.ok) throw new Error('Failed to load products');

        const productData = await productRes.json();
        const allItems = await allRes.json();

        if (!alive) return;
        setProduct(productData || null);
        setActiveImage(0);

        const list = Array.isArray(allItems) ? allItems : [];
        const relatedItems = list
          .filter((item) => item?.id !== productData?.id && item?.category === productData?.category)
          .slice(0, 4);
        setRelated(relatedItems);
      } catch {
        if (!alive) return;
        setProduct(null);
        setRelated([]);
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    };

    load();

    return () => {
      alive = false;
    };
  }, [id]);

  const titleKey = `title${lang.charAt(0).toUpperCase() + lang.slice(1)}`;
  const descKey = `description${lang.charAt(0).toUpperCase() + lang.slice(1)}`;

  const title = product?.[titleKey] || product?.titleKg || product?.titleRu || product?.titleEn || '—';
  const description =
    product?.[descKey] || product?.descriptionKg || product?.descriptionRu || product?.descriptionEn || '';

  const price = Number(product?.price || 0);
  const rating = Number(product?.ratingAvg || 0);
  const stock = Number(product?.stock ?? 0);

  const images = useMemo(() => {
    const arr = Array.isArray(product?.images) ? product.images.filter(Boolean) : [];
    if (arr.length) return arr;
    return product?.cover ? [product.cover] : [];
  }, [product]);

  if (loading) {
    return <div className="p-6 text-slate-200">Loading...</div>;
  }

  if (!product) {
    return (
      <div className="p-6 text-slate-200">
        Товар не найден.{' '}
        <Link className="text-amber-300 underline" to="/">
          На главную
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl p-4 sm:p-6">
      <div className="mb-4 text-sm text-slate-400">
        <Link to="/" className="hover:text-slate-200">
          Главная
        </Link>{' '}
        <span> / </span>
        <span className="text-slate-200">{title}</span>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-[#0c121d] p-4">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-900/70">
            {images.length ? (
              <img
                src={images[Math.min(activeImage, images.length - 1)]}
                alt={title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-slate-400">
                {t('product.noImage') || 'No Image'}
              </div>
            )}

            <div className="absolute right-3 top-3">
              <div onClick={(e) => e.stopPropagation()}>
                <FavoriteButton productId={product.id} variant="ghost" />
              </div>
            </div>
          </div>

          {images.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-3">
              {images.slice(0, 4).map((src, idx) => (
                <button
                  key={`${src}-${idx}`}
                  onClick={() => setActiveImage(idx)}
                  className={`overflow-hidden rounded-xl border ${
                    idx === activeImage ? 'border-amber-300' : 'border-white/10'
                  }`}
                >
                  <img src={src} alt="" className="h-20 w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0c121d] p-5 sm:p-6">
          <h1 className="text-2xl font-bold text-slate-100 sm:text-3xl">{title}</h1>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-slate-300">
              <RatingStars rating={rating} size="sm" />
              <span className="text-sm">{rating.toFixed(1)}</span>
            </div>

            <span className="text-3xl font-extrabold text-[#f3c86a]">
              ${price.toFixed(2)}
            </span>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                stock > 0 ? 'bg-emerald-500/15 text-emerald-300' : 'bg-rose-500/15 text-rose-300'
              }`}
            >
              {stock > 0 ? `В наличии: ${stock}` : 'Нет в наличии'}
            </span>
          </div>

          {description && (
            <p className="mt-4 leading-relaxed text-slate-300">{description}</p>
          )}

          <div className="mt-6 rounded-xl border border-white/10 bg-black/20 p-4">
            <h3 className="mb-3 text-sm font-semibold text-slate-200">Характеристики</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex justify-between gap-4">
                <span className="text-slate-400">Категория</span>
                <span className="text-slate-200">{product.category || '—'}</span>
              </li>
              <li className="flex justify-between gap-4">
                <span className="text-slate-400">Материал</span>
                <span className="text-slate-200">{product.material || '—'}</span>
              </li>
              <li className="flex justify-between gap-4">
                <span className="text-slate-400">Цвет</span>
                <span className="text-slate-200">{product.color || '—'}</span>
              </li>
              <li className="flex justify-between gap-4">
                <span className="text-slate-400">Наличие</span>
                <span className="text-slate-200">{stock > 0 ? 'В наличии' : 'Нет в наличии'}</span>
              </li>
            </ul>
          </div>

          <div className="mt-6">
            <AddToCartButton product={product} variant="ozon" disabled={stock <= 0} />
          </div>
        </div>
      </div>

      <div className="mt-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-slate-100">Похожие товары</h2>
          <Link to="/catalog" className="text-slate-100 font-semibold hover:text-slate-300">
            Смотреть все
          </Link>
        </div>
        {related.length === 0 ? (
          <div className="text-slate-400">Похожих товаров пока нет.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
