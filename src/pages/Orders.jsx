import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import * as ordersAPI from '../api/orders';
import { OrdersList } from '../components/OrdersList';
import { EmptyState } from '../components/EmptyState';
import { SkeletonList } from '../components/SkeletonList';

export const Orders = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadOrders();1
    }
  }, [user]);

  const loadOrders = async () => {
    try {
      const allOrders = await ordersAPI.getAll();
      const userOrders = allOrders.filter((order) => order.userId === user.id);
      setOrders(userOrders);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">{t('orders.title')}</h1>
        <SkeletonList count={3} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">{t('orders.title')}</h1>
      {orders.length === 0 ? (
        <EmptyState message={t('orders.empty')} icon="📦" />
      ) : (
        <OrdersList orders={orders} />
      )}
    </div>
  );
};

