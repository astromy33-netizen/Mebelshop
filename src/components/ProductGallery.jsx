import { useMemo, useState } from 'react';

export const ProductGallery = ({ product }) => {
  const images = useMemo(() => {
    const candidates = [
      ...(Array.isArray(product.images) ? product.images : []),
      ...(Array.isArray(product.gallery) ? product.gallery : []),
      ...(Array.isArray(product.photos) ? product.photos : []),
      product.cover,
    ].filter(Boolean);
    return [...new Set(candidates)];
  }, [product]);

  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="w-full h-64 sm:h-80 lg:h-[480px] bg-gray-200 dark:bg-gray-800 rounded-2xl flex items-center justify-center">
        <span className="text-gray-400">No Image</span>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 border border-white/10 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.6)]">
        <img
          src={images[activeIndex]}
          alt={product.titleKg || 'Product'}
          className="w-full h-64 sm:h-80 lg:h-[480px] object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3">
          {images.slice(0, 8).map((img, index) => {
            const active = index === activeIndex;
            return (
              <button
                key={img}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`rounded-xl overflow-hidden border transition-all ${
                  active
                    ? 'border-blue-500 ring-2 ring-blue-500/30'
                    : 'border-white/10 hover:border-blue-400/60'
                }`}
              >
                <img
                  src={img}
                  alt="Thumbnail"
                  className="w-full h-20 object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
