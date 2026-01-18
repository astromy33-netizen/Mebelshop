import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AdminLayout } from '../../components/AdminLayout';
import { StatsChart } from '../../components/StatsChart';
import * as ordersAPI from '../../api/orders';
import * as productsAPI from '../../api/products';
import * as usersAPI from '../../api/users';

export const AdminDashboard = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });
  const [chartData, setChartData] = useState([]);
  const [latestOrders, setLatestOrders] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [products, orders, users] = await Promise.all([
        productsAPI.getAll(),
        ordersAPI.getAll(),
        usersAPI.getAll(),
      ]);

      const revenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);

      setStats({
        totalProducts: products.length,
        totalOrders: orders.length,
        totalUsers: users.length,
        totalRevenue: revenue,
      });

      // Latest orders (last 3)
      const sortedOrders = [...orders].sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      setLatestOrders(sortedOrders.slice(0, 3));

      // Users list (first 2)
      setUsersList(users.slice(0, 2));

      // Chart data with sales and orders
      const monthlyData = [
        { name: 'Jan', sales: 1200, orders: 45 },
        { name: 'Apr', sales: 1900, orders: 52 },
        { name: 'Mar', sales: 3000, orders: 78 },
        { name: 'Jur', sales: 2780, orders: 65 },
        { name: 'May', sales: 1890, orders: 48 },
        { name: 'Jul', sales: 2390, orders: 72 },
      ];
      setChartData(monthlyData);
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
      case 'completed':
        return 'text-green-600 dark:text-green-400';
      case 'pending':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'shipped':
        return 'text-blue-600 dark:text-blue-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <AdminLayout>
      {loading ? (
        <div className="text-gray-600 dark:text-gray-400">{t('common.loading')}</div>
      ) : (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('admin.totalProducts')}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalProducts}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center text-2xl">
                  🛋️
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">New Orders</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalOrders}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-2xl">
                  🛒
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('admin.totalRevenue')}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">${stats.totalRevenue.toFixed(2)}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center text-2xl">
                  💰
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('admin.totalUsers')}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalUsers}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-2xl">
                  👥
                </div>
              </div>
            </div>
          </div>

          {/* Chart and Orders */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Sales Overview</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Monthly Sales & Orders</p>
              <StatsChart data={chartData} />
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Latest Orders</h3>
              <div className="space-y-3">
                {latestOrders.length > 0 ? (
                  latestOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">📁</span>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            Order #{order.id} | <span className={getStatusColor(order.status)}>{order.status}</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          ${order.total?.toFixed(2) || '0.00'}
                        </span>
                        <span className="text-gray-400">📧</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-500 dark:text-gray-400">No orders yet</div>
                )}
              </div>
            </div>
          </div>

          {/* Users List */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Users List</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {t('admin.tableId')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Role
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {usersList.length > 0 ? (
                    usersList.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {user.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {user.fullName || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 capitalize">
                          {user.role || 'user'}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
