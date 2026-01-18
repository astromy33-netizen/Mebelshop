import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTranslation } from 'react-i18next';

export const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const title = item[`title${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || item.titleKg;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <Link to={`/product/${item.id}`} className="w-full sm:w-auto">
        <div className="w-full sm:w-24 h-40 sm:h-24 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
          {item.cover ? (
            <img src={item.cover} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">{t('product.noImage') || 'No Image'}</div>
          )}
        </div>
      </Link>
      <div className="flex-1 w-full">
        <Link to={`/product/${item.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
            {title}
          </h3>
        </Link>
        <p className="text-gray-600 dark:text-gray-400">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex w-full sm:w-auto items-center justify-between sm:justify-start gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            -
          </button>
          <span className="w-12 text-center text-gray-900 dark:text-white">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            +
          </button>
        </div>
        <div className="text-right sm:text-left">
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-600 hover:text-red-700 text-sm mt-1"
          >
            {t('cart.remove')}
          </button>
        </div>
      </div>
    </div>
  );
};
