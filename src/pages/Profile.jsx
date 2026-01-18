import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import * as usersAPI from '../api/users';
import * as favoritesAPI from '../api/favorites';
import * as ordersAPI from '../api/orders';
import * as productsAPI from '../api/products';
import { Link } from 'react-router-dom';
import { getProductId } from '../utils/productId';

export const Profile = () => {
  const { user, login } = useAuth();
  const { t, i18n } = useTranslation();
  const { currentLanguage } = useLanguage();
  const lang = currentLanguage;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    avatar: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        email: user.email || '',
        avatar: user.avatar || '',
      });
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    setLoadingData(true);
    try {
      // Load favorites
      const allFavorites = await favoritesAPI.getAll();
      const userFavorites = allFavorites.filter(
        (f) => String(f.userId) === String(user.id)
      );
      
      // Get product details for favorites
      const favoriteProducts = await Promise.all(
        userFavorites.slice(0, 5).map(async (fav) => {
          try {
            const product = await productsAPI.getById(fav.productId);
            return product;
          } catch (error) {
            return null;
          }
        })
      );
      setFavoriteItems(favoriteProducts.filter(Boolean));

      // Load recent orders
      const allOrders = await ordersAPI.getAll();
      const userOrders = allOrders
        .filter((order) => String(order.userId) === String(user.id))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
      setRecentOrders(userOrders);

      // Load users list (for admin)
      if (user.role === 'admin') {
        const allUsers = await usersAPI.getAll();
        setUsersList(allUsers.slice(0, 5));
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const updatedUser = await usersAPI.update(user.id, {
        ...user,
        fullName: formData.fullName,
        email: formData.email,
        avatar: formData.avatar,
      });

      // Update auth context
      login(updatedUser, localStorage.getItem('token'));
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert(t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'text-yellow-600',
      processing: 'text-blue-600',
      shipped: 'text-green-600',
      delivered: 'text-green-600',
      cancelled: 'text-red-600',
    };
    return colors[status] || 'text-gray-600';
  };

  const getStatusIcon = (status) => {
    if (status === 'shipped' || status === 'delivered') return '📦';
    if (status === 'processing') return '🛒';
    return '📁';
  };

  if (!user) {
    return null;
  }

  const avatarUrl = formData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName || 'User')}&background=6366f1&color=fff&size=200`;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            {/* User Header */}
            <div className="text-center mb-8">
              <img
                src={avatarUrl}
                alt={user.fullName}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-gray-200 dark:border-gray-700"
              />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {user.fullName}
              </h2>
              <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                <span className="text-green-500">✓</span>
                <span className="capitalize">{user.role === 'admin' ? t('profile.admin') : t('profile.user')}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
            </div>

            {/* Edit Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {success && (
                <div className="p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-lg">
                  {t('profile.saved')}
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {t('profile.fullName')}
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {t('profile.emailAddress')}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {t('profile.avatar')}
                </label>
                <div className="flex items-center gap-4">
                  <img
                    src={avatarUrl}
                    alt="Avatar"
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
                  />
                  <label className="px-4 py-2.5 bg-blue-600 text-white rounded-xl cursor-pointer hover:bg-blue-700 transition-all font-semibold">
                    {t('profile.uploadNewImage')}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold disabled:opacity-50 transition-all transform hover:scale-105 active:scale-95"
              >
                {loading ? t('common.loading') : t('profile.saveChanges')}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column - Dashboard Widgets */}
        <div className="space-y-6">
          {/* Favorite Items */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              {t('profile.favoriteItems')}
            </h3>
            {loadingData ? (
              <div className="text-gray-500 dark:text-gray-400">{t('common.loading')}</div>
            ) : favoriteItems.length === 0 ? (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {t('profile.noFavorites')}
              </div>
            ) : (
              <div className="space-y-3">
                {favoriteItems.map((product) => {
                  const title = product[`title${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || product.titleKg;
                  const productId = getProductId(product);
                  return (
                    <Link
                      key={productId || product.id}
                      to={productId ? `/product/${productId}` : '#'}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                      aria-disabled={!productId}
                    >
                      <img
                        src={product.cover || 'https://via.placeholder.com/60'}
                        alt={title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {title}
                        </p>
                        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                          ${product.price?.toFixed(2) || '0.00'}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Recent Orders */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              {t('profile.recentOrders')}
            </h3>
            {loadingData ? (
              <div className="text-gray-500 dark:text-gray-400">{t('common.loading')}</div>
            ) : recentOrders.length === 0 ? (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {t('profile.noOrders')}
              </div>
            ) : (
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{getStatusIcon(order.status)}</span>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {t('orders.orderNumber')} #{order.id}
                        </p>
                        {order.status && (
                          <p className={`text-xs ${getStatusColor(order.status)}`}>
                            {order.status}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        ${order.total?.toFixed(2) || '0.00'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Users List (Admin only) */}
          {user.role === 'admin' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                {t('profile.usersList')}
              </h3>
              {loadingData ? (
                <div className="text-gray-500 dark:text-gray-400">{t('common.loading')}</div>
              ) : usersList.length === 0 ? (
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {t('profile.noUsers')}
                </div>
              ) : (
                <div className="space-y-3">
                  {usersList.map((u) => (
                    <div
                      key={u.id}
                      className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <span className="text-xl">👤</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {u.fullName || 'N/A'}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {u.email}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

