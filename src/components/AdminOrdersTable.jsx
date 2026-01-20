import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as ordersAPI from '../api/orders';

export const AdminOrdersTable = ({ orders, usersMap = {}, onRefresh }) => {
  const { t } = useTranslation();
  const [updatingId, setUpdatingId] = useState(null);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      const order = orders.find((o) => o.id === orderId);
      await ordersAPI.update(orderId, { ...order, status: newStatus });
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error('Error updating order:', error);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-[720px] w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="px-4 py-3 text-left text-gray-900 dark:text-white">ID</th>
            <th className="px-4 py-3 text-left text-gray-900 dark:text-white">User ID</th>
            <th className="px-4 py-3 text-left text-gray-900 dark:text-white">Total</th>
            <th className="px-4 py-3 text-left text-gray-900 dark:text-white">Status</th>
            <th className="px-4 py-3 text-left text-gray-900 dark:text-white">Date</th>
            <th className="px-4 py-3 text-left text-gray-900 dark:text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
                    {order.items?.[0]?.cover ? (
                      <img
                        src={order.items[0].cover}
                        alt={`Order ${order.id}`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                        N/A
                      </div>
                    )}
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{order.id}</span>
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                    {usersMap[String(order.userId)]?.avatar ? (
                      <img
                        src={usersMap[String(order.userId)].avatar}
                        alt={`User ${order.userId}`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                        U
                      </div>
                    )}
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{order.userId}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-gray-700 dark:text-gray-300">${order.total?.toFixed(2)}</td>
              <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{order.status}</td>
              <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  disabled={updatingId === order.id}
                  className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

