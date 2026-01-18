import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

export const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const { user, logout } = useAuth();

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-700 dark:text-gray-200"
      >
        {isOpen ? '✕' : '☰'}
      </button>
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg z-50">
          <nav className="flex flex-col p-4 space-y-2">
            <Link to="/" onClick={() => setIsOpen(false)} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              {t('nav.home')}
            </Link>
            <Link to="/catalog" onClick={() => setIsOpen(false)} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              {t('nav.catalog')}
            </Link>
            <Link to="/cart" onClick={() => setIsOpen(false)} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              {t('nav.cart')}
            </Link>
            {user ? (
              <>
                <Link to="/orders" onClick={() => setIsOpen(false)} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  {t('nav.orders')}
                </Link>
                <Link to="/profile" onClick={() => setIsOpen(false)} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  {t('nav.profile')}
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" onClick={() => setIsOpen(false)} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    {t('nav.admin')}
                  </Link>
                )}
                <button onClick={() => { logout(); setIsOpen(false); }} className="px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  {t('nav.logout')}
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  {t('nav.login')}
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  {t('nav.register')}
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </div>
  );
};
