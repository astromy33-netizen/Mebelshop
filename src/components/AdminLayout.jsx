import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

export const AdminLayout = ({ children }) => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col md:flex-row">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <AdminHeader user={user} />
          <div className="flex-1 p-4 sm:p-6 bg-gray-100 dark:bg-gray-900">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export const AdminSidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const menuItems = [
    { path: '/admin', label: t('admin.dashboard'), icon: 'DB' },
    { path: '/admin/products', label: t('admin.products'), icon: 'PR' },
    { path: '/admin/orders', label: t('admin.orders'), icon: 'OR' },
    { path: '/admin/users', label: t('admin.users'), icon: 'US' },
  ];

  return (
    <div className="w-full md:w-64 md:min-h-screen bg-gradient-to-b from-blue-900 via-blue-900 to-indigo-950 flex flex-col">
      <div className="p-4 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-blue-700/70 text-white flex items-center justify-center text-base font-semibold shadow-inner">
            MM
          </div>
          <div>
            <h2 className="text-white font-semibold text-lg">MebelMart</h2>
            <p className="text-blue-200/80 text-xs">Admin Panel</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 sm:px-4 py-2 space-y-2">
        {menuItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${
                active
                  ? 'bg-blue-700/60 text-white shadow-[0_14px_28px_-18px_rgba(0,0,0,0.7)]'
                  : 'text-blue-200/80 hover:bg-blue-800/60 hover:text-white'
              }`}
            >
              {active && (
                <span className="absolute left-0 top-0 h-full w-1 rounded-r-full bg-blue-300"></span>
              )}
              <span className={`w-11 h-11 rounded-2xl flex items-center justify-center text-sm font-semibold ${
                active ? 'bg-blue-600 text-white' : 'bg-blue-800/60 text-blue-100'
              }`}>
                {item.icon}
              </span>
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
        <button
          onClick={() => {
            logout();
            navigate('/');
          }}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-blue-200/80 hover:bg-blue-800/60 hover:text-white transition-all"
        >
          <span className="w-11 h-11 rounded-2xl bg-blue-800/60 text-blue-100 flex items-center justify-center text-sm font-semibold">
            LG
          </span>
          <span className="font-medium">{t('nav.logout')}</span>
        </button>
        <Link
          to="/help"
          className="flex items-center gap-4 px-4 py-3 rounded-2xl text-blue-200/80 hover:bg-blue-800/60 hover:text-white transition-all"
        >
          <span className="w-11 h-11 rounded-2xl bg-blue-800/60 text-blue-100 flex items-center justify-center text-sm font-semibold">
            HP
          </span>
          <span className="font-medium">Help</span>
        </Link>
      </nav>
    </div>
  );
};
export const AdminHeader = ({ user }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-4">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
    </div>
  );
};




