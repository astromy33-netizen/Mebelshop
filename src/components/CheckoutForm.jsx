import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTranslation } from 'react-i18next';
import * as ordersAPI from '../api/orders';

export const CheckoutForm = () => {
  const { user } = useAuth();
  const { cart, getTotal, clearCart } = useCart();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!address.trim() || !phone.trim()) {
      alert(t('checkout.fillAll'));
      return;
    }

    setLoading(true);
    try {
      await ordersAPI.create({
        userId: user.id,
        items: cart,
        total: getTotal(),
        status: 'pending',
        address,
        phone,
        createdAt: new Date().toISOString(),
      });
      clearCart();
      alert(t('checkout.success'));
      navigate('/orders');
    } catch (error) {
      console.error('Error creating order:', error);
      alert(t('checkout.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('checkout.title')}</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('checkout.address')}
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('checkout.phone')}
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? t('common.loading') : t('checkout.submit')}
        </button>
      </div>
    </form>
  );
};

