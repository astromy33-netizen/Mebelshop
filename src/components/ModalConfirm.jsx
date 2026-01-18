import { useTranslation } from 'react-i18next';

export const ModalConfirm = ({ isOpen, onClose, onConfirm, title, message }) => {
  const { t } = useTranslation();
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-md w-full animate-scaleIn">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300">{message}</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transform hover:scale-105 active:scale-95 transition-all duration-300"
          >
            {t('common.cancel')}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg"
          >
            {t('common.delete')}
          </button>
        </div>
      </div>
    </div>
  );
};
