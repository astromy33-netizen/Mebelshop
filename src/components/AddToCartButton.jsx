import { useCart } from '../context/CartContext';
import { useTranslation } from 'react-i18next';

export const AddToCartButton = ({ product, variant = 'default' }) => {
  const { addToCart } = useCart();
  const { t } = useTranslation();

  const handleAdd = () => {
    addToCart(product);
  };

  if (variant === 'icon') {
    return (
      <button
        onClick={handleAdd}
        aria-label={t('product.addToCart')}
        className="w-11 h-11 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 text-slate-950 font-bold text-xl shadow-[0_16px_30px_-18px_rgba(249,115,22,0.9)] hover:scale-105 transition-all"
      >
        +
      </button>
    );
  }

  if (variant === 'ozon') {
    return (
      <button
        onClick={handleAdd}
        className="w-full px-4 py-2 bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 text-slate-950 rounded-lg font-semibold text-sm shadow-[0_14px_30px_-18px_rgba(249,115,22,0.7)] hover:shadow-[0_18px_40px_-18px_rgba(244,63,94,0.65)] hover:-translate-y-0.5 transition-all"
      >
        {t('product.addToCart')}
      </button>
    );
  }

  return (
    <button
      onClick={handleAdd}
      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group"
    >
      <span className="relative z-10">{t('product.addToCart')}</span>
      <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
    </button>
  );
};
