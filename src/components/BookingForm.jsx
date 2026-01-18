import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import * as bookingsAPI from '../api/bookings';
import * as productsAPI from '../api/products';
import { DatePickerSimple } from './DatePickerSimple';
import { TimeSlotsSimple } from './TimeSlotsSimple';

export const BookingForm = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await productsAPI.getAll();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setProductsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProduct || !date || !time) {
      alert(t('booking.fillAll'));
      return;
    }

    setLoading(true);
    try {
      await bookingsAPI.create({
        userId: user.id,
        productId: selectedProduct,
        date,
        time,
        status: 'pending',
      });
      alert(t('booking.success'));
      setSelectedProduct('');
      setDate('');
      setTime('');
    } catch (error) {
      console.error('Error creating booking:', error);
      alert(t('booking.error'));
    } finally {
      setLoading(false);
    }
  };

  if (productsLoading) {
    return <div className="text-gray-600 dark:text-gray-400">{t('common.loading')}</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('booking.title')}</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('booking.selectProduct')}
          </label>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">{t('booking.selectProduct')}</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.titleKg || product.titleRu || product.titleEn}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('booking.selectDate')}
          </label>
          <DatePickerSimple value={date} onChange={setDate} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('booking.selectTime')}
          </label>
          <TimeSlotsSimple value={time} onChange={setTime} />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? t('common.loading') : t('booking.submit')}
        </button>
      </div>
    </form>
  );
};

