import { useEffect, useState } from 'react';

const FAVORITES_KEY = 'favorites';

const readFavorites = () => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch (error) {
    console.error('Error reading favorites:', error);
    return [];
  }
};

const writeFavorites = (items) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Error saving favorites:', error);
  }
};

export const FavoriteButton = ({ productId, variant = 'default' }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const sync = () => {
      if (!productId) {
        setIsFavorite(false);
        return;
      }
      const favorites = readFavorites();
      setIsFavorite(favorites.includes(String(productId)));
    };

    sync();
    window.addEventListener('storage', sync);
    window.addEventListener('favorites-updated', sync);
    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener('favorites-updated', sync);
    };
  }, [productId]);

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!productId) return;

    const id = String(productId);
    const favorites = readFavorites();
    const exists = favorites.includes(id);
    const nextFavorites = exists
      ? favorites.filter((item) => item !== id)
      : [...favorites, id];

    writeFavorites(nextFavorites);
    setIsFavorite(!exists);
    setIsAnimating(true);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('favorites-updated'));
    }
    setTimeout(() => setIsAnimating(false), 180);
  };

  const baseClasses = variant === 'light'
    ? 'w-10 h-10 rounded-full bg-white/70 border border-white/60 backdrop-blur text-white/90 shadow-sm'
    : variant === 'ghost'
      ? 'w-10 h-10 rounded-full border border-slate-200/80 bg-white/0 text-slate-500/80 shadow-sm'
      : 'w-10 h-10 rounded-full border border-white/10 backdrop-blur text-white/80 bg-slate-900/70 shadow-sm';
  const hoverClasses = variant === 'light'
    ? 'hover:bg-white/85'
    : variant === 'ghost'
      ? 'hover:bg-white/80 hover:text-slate-900'
      : 'hover:bg-slate-900/85';

  return (
    <button
      onClick={handleToggle}
      className={`${baseClasses} ${hoverClasses} ${!isFavorite ? 'hover:text-white' : ''} flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/60 active:scale-95 ${
        isAnimating ? 'scale-[1.08]' : 'scale-100'
      } ${isFavorite ? 'text-rose-500 shadow-[0_0_18px_rgba(239,68,68,0.45)]' : ''}`}
      aria-pressed={isFavorite}
      aria-label="Toggle favorite"
      type="button"
    >
      <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
        <path
          d="M12 20.5l-1.45-1.32C6.4 15.36 4 13.28 4 10.5 4 8.5 5.5 7 7.5 7c1.54 0 3.04.99 3.57 2.36h1.87C13.46 7.99 14.96 7 16.5 7 18.5 7 20 8.5 20 10.5c0 2.78-2.4 4.86-6.55 8.68L12 20.5z"
          fill={isFavorite ? '#EF4444' : 'none'}
          stroke={isFavorite ? '#EF4444' : 'currentColor'}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};
