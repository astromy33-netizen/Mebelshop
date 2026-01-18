import { useTranslation } from 'react-i18next';

export const TimeSlotsSimple = ({ value, onChange }) => {
  const { t } = useTranslation();
  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
    >
      <option value="">{t('booking.selectTime')}</option>
      {timeSlots.map((time) => (
        <option key={time} value={time}>{time}</option>
      ))}
    </select>
  );
};
