import { useCart } from '../context/CartContext';
import { useTranslation } from 'react-i18next';
import { CheckoutForm } from '../components/CheckoutForm';
import { CartSummary } from '../components/CartSummary';
import { Navigate } from 'react-router-dom';

export const Checkout = () => {
  const { cart } = useCart();
  const { t } = useTranslation();

  if (cart.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">{t('checkout.title')}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <CheckoutForm />
        <div>
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

