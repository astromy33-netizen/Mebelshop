import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';

export const OrderCard = ({ order }) => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const lang = currentLanguage;

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{t('orders.orderNumber')} #{order.id}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status] || statusColors.pending}`}>
          {order.status}
        </span>
      </div>
      <div className="space-y-2 mb-4">
        {order.items?.map((item) => {
          const title = item[`title${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || item.titleKg;
          return (
            <div key={item.id} className="flex justify-between text-gray-700 dark:text-gray-300">
              <span>{title} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          );
        })}
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900 dark:text-white">{t('cart.total')}</span>
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
            ${order.total?.toFixed(2) || '0.00'}
          </span>
        </div>
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          <p>{t('checkout.address')}: {order.address}</p>
          <p>{t('checkout.phone')}: {order.phone}</p>
        </div>
      </div>
    </div>
  );
};
