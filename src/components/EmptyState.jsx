export const EmptyState = ({ message, icon }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
      {icon && <div className="text-6xl mb-4">{icon}</div>}
      <p className="text-lg">{message}</p>
    </div>
  );
};
