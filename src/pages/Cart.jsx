import { useCart } from '../context/CartContext';
import { useTranslation } from 'react-i18next';
import { CartItem } from '../components/CartItem';
import { CartSummary } from '../components/CartSummary';
import { EmptyState } from '../components/EmptyState';
import { Link } from 'react-router-dom';

export const Cart = () => {
  const { cart } = useCart();
  const { t } = useTranslation();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">{t('cart.title')}</h1>
        <EmptyState message={t('cart.empty')} icon="🛒" />
        <div className="text-center mt-6">
          <Link
            to="/catalog"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {t('nav.catalog')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">{t('cart.title')}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <div>
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

