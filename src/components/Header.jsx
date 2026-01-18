import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { BurgerMenu } from './BurgerMenu';

export const Header = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const { cart } = useCart();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const displayName = user?.fullName || user?.email || 'User';
  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

  return (
    <header className="bg-white/90 dark:bg-slate-950/95 backdrop-blur-lg shadow-[0_10px_30px_-20px_rgba(0,0,0,0.15)] dark:shadow-[0_10px_30px_-20px_rgba(0,0,0,0.8)] sticky top-0 z-50 border-b border-slate-200/70 dark:border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
          <Link to="/" className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-rose-400 hover:opacity-90 transition-opacity">
            MebelMart
          </Link>

          <nav className="hidden md:flex items-center justify-center gap-4 lg:gap-8">
            <Link to="/" className="text-slate-700 hover:text-slate-950 dark:text-slate-200 dark:hover:text-white font-medium relative group transition-all duration-300">
              {t('nav.home')}
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-rose-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/catalog" className="text-slate-700 hover:text-slate-950 dark:text-slate-200 dark:hover:text-white font-medium relative group transition-all duration-300">
              {t('nav.catalog')}
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-rose-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/cart" className="relative text-slate-700 hover:text-slate-950 dark:text-slate-200 dark:hover:text-white font-medium group transition-all duration-300">
              {t('nav.cart')}
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-rose-400 group-hover:w-full transition-all duration-300"></span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-bounce-in shadow-lg">
                  {cartCount}
                </span>
              )}
            </Link>
            {user ? (
              <>
                <Link to="/orders" className="text-slate-700 hover:text-slate-950 dark:text-slate-200 dark:hover:text-white font-medium relative group transition-all duration-300">
                  {t('nav.orders')}
                  <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-rose-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="text-slate-700 hover:text-slate-950 dark:text-slate-200 dark:hover:text-white font-medium relative group transition-all duration-300">
                  {t('nav.login')}
                  <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-rose-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </>
            )}
          </nav>

          <div className="flex items-center justify-end gap-2 sm:gap-3">
            <ThemeToggle />
            <LanguageSwitcher />
            {user?.role === 'admin' && (
              <Link
                to="/admin"
                className="hidden sm:inline-flex items-center px-3 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-semibold hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-all"
              >
                {t('nav.admin')}
              </Link>
            )}
            {user && (
              <button
                onClick={logout}
                className="hidden sm:inline-flex items-center px-3 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-semibold hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-all"
              >
                {t('nav.logout')}
              </button>
            )}
            <BurgerMenu />
            <Link
              to="/profile"
              className="flex items-center gap-3 px-3 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={displayName}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-orange-400 to-rose-500 text-slate-950 flex items-center justify-center text-sm font-semibold">
                  {initials || 'U'}
                </div>
              )}
              <div className="hidden sm:flex flex-col leading-tight text-left">
                <span className="text-sm font-semibold text-slate-900 dark:text-white max-w-[140px] truncate">
                  {displayName}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {t('nav.profile')}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
