import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AdminLayout } from '../../components/AdminLayout';
import { AdminOrdersTable } from '../../components/AdminOrdersTable';
import { SkeletonList } from '../../components/SkeletonList';
import * as ordersAPI from '../../api/orders';
import * as usersAPI from '../../api/users';

export const AdminOrders = () => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [usersMap, setUsersMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const [ordersData, usersData] = await Promise.all([
        ordersAPI.getAll(),
        usersAPI.getAll(),
      ]);
      setOrders(ordersData);
      const map = {};
      usersData.forEach((user) => {
        map[String(user.id)] = user;
      });
      setUsersMap(map);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">{t('admin.orders')}</h1>
      {loading ? (
        <SkeletonList count={5} />
      ) : (
        <AdminOrdersTable orders={orders} usersMap={usersMap} onRefresh={loadOrders} />
      )}
    </AdminLayout>
  );
};

