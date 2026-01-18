export const DatePickerSimple = ({ value, onChange }) => {
  const today = new Date().toISOString().split('T')[0];

  return (
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      min={today}
      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
    />
  );
};
