import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-white dark:bg-gradient-to-r dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-slate-700 dark:text-white py-12 mt-auto border-t border-slate-200 dark:border-gray-700/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8 mb-8">
          <div className="animate-fadeIn text-center md:text-left">
            <h3 className="text-2xl font-extrabold mb-4 gradient-text">MebelMart</h3>
            <p className="text-slate-500 dark:text-gray-400">{t('footer.description')}</p>
          </div>
          <div className="animate-fadeIn text-center md:text-left" style={{animationDelay: '0.1s'}}>
            <h4 className="text-lg font-bold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2 text-slate-500 dark:text-gray-400">
              <li><a href="/catalog" className="hover:text-slate-900 dark:hover:text-white transition-colors duration-300">{t('nav.catalog')}</a></li>
              <li><a href="/about" className="hover:text-slate-900 dark:hover:text-white transition-colors duration-300">{t('footer.about')}</a></li>
              <li><a href="/contact" className="hover:text-slate-900 dark:hover:text-white transition-colors duration-300">{t('footer.contact')}</a></li>
            </ul>
          </div>
          <div className="animate-fadeIn text-center md:text-left" style={{animationDelay: '0.15s'}}>
            <h4 className="text-lg font-bold mb-4">Помощь</h4>
            <ul className="space-y-2 text-slate-500 dark:text-gray-400">
              <li><a href="/help/order" className="hover:text-slate-900 dark:hover:text-white transition-colors duration-300">Как сделать заказ</a></li>
              <li><a href="/help/payment" className="hover:text-slate-900 dark:hover:text-white transition-colors duration-300">Оплата</a></li>
              <li><a href="/help/delivery" className="hover:text-slate-900 dark:hover:text-white transition-colors duration-300">Доставка</a></li>
              <li><a href="/help/returns" className="hover:text-slate-900 dark:hover:text-white transition-colors duration-300">Возврат товаров</a></li>
              <li><a href="/help/contacts" className="hover:text-slate-900 dark:hover:text-white transition-colors duration-300">Контакты</a></li>
              <li><a href="/help/security" className="hover:text-slate-900 dark:hover:text-white transition-colors duration-300">Безопасность</a></li>
              <li><a href="/help/compliance" className="hover:text-slate-900 dark:hover:text-white transition-colors duration-300">Горячая линия комплаенс</a></li>
            </ul>
          </div>
          <div className="animate-fadeIn text-center md:text-left" style={{animationDelay: '0.2s'}}>
            <h4 className="text-lg font-bold mb-4">{t('footer.followUs')}</h4>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="#" className="w-10 h-10 bg-slate-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-slate-700 dark:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transform hover:scale-110 transition-all duration-300">FB</a>
              <a href="#" className="w-10 h-10 bg-slate-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-slate-700 dark:text-white hover:bg-gradient-to-r hover:from-pink-600 hover:to-red-600 hover:text-white transform hover:scale-110 transition-all duration-300">IG</a>
              <a href="#" className="w-10 h-10 bg-slate-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-slate-700 dark:text-white hover:bg-gradient-to-r hover:from-blue-400 hover:to-cyan-400 hover:text-white transform hover:scale-110 transition-all duration-300">TW</a>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-200 dark:border-gray-700/50 pt-8 text-center">
          <p className="text-slate-500 dark:text-gray-400">&copy; 2024 MebelMart. {t('footer.rights')}.</p>
        </div>
      </div>
    </footer>
  );
};



