import { useTranslation } from 'react-i18next';
import { BookingForm } from '../components/BookingForm';

export const Booking = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">{t('booking.title')}</h1>
      <div className="max-w-2xl">
        <BookingForm />
      </div>
    </div>
  );
};

