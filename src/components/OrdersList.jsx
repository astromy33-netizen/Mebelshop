import { useTranslation } from 'react-i18next';
import { OrderCard } from './OrderCard';
import { EmptyState } from './EmptyState';

export const OrdersList = ({ orders }) => {
  const { t } = useTranslation();

  if (orders.length === 0) {
    return <EmptyState message={t('empty.noOrders')} icon="📦" />;
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
};
