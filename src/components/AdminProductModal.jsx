import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import * as productsAPI from '../api/products';

export const AdminProductModal = ({ isOpen, onClose, productId, onSuccess }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    titleKg: '',
    titleRu: '',
    titleEn: '',
    descriptionKg: '',
    descriptionRu: '',
    descriptionEn: '',
    price: '',
    cover: '',
    category: 'sofa',
    material: '',
    color: '',
    ratingAvg: 0,
  });

  useEffect(() => {
    if (isOpen) {
      if (productId) {
        loadProduct();
      } else {
        resetForm();
      }
    }
  }, [isOpen, productId]);

  const resetForm = () => {
    setFormData({
      titleKg: '',
      titleRu: '',
      titleEn: '',
      descriptionKg: '',
      descriptionRu: '',
      descriptionEn: '',
      price: '',
      cover: '',
      category: 'sofa',
      material: '',
      color: '',
      ratingAvg: 0,
    });
    setError('');
    setSuccess(false);
  };

  const loadProduct = async () => {
    setLoadingProduct(true);
    setError('');
    try {
      const product = await productsAPI.getById(productId);
      setFormData({
        titleKg: product.titleKg || '',
        titleRu: product.titleRu || '',
        titleEn: product.titleEn || '',
        descriptionKg: product.descriptionKg || '',
        descriptionRu: product.descriptionRu || '',
        descriptionEn: product.descriptionEn || '',
        price: product.price || '',
        cover: product.cover || '',
        category: product.category || 'sofa',
        material: product.material || '',
        color: product.color || '',
        ratingAvg: product.ratingAvg || 0,
      });
    } catch (error) {
      console.error('Error loading product:', error);
      setError(t('common.error'));
    } finally {
      setLoadingProduct(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    
    if (!formData.titleKg || !formData.titleRu || !formData.titleEn) {
      setError(t('checkout.fillAll'));
      return;
    }
    
    if (!formData.price || Number(formData.price) <= 0) {
      setError(t('checkout.fillAll'));
      return;
    }

    setLoading(true);
    try {
      const data = {
        ...formData,
        price: Number(formData.price),
        ratingAvg: Number(formData.ratingAvg) || 0,
        createdAt: productId ? formData.createdAt : new Date().toISOString(),
      };
      
      if (productId) {
        await productsAPI.update(productId, data);
        setSuccess(true);
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 1000);
      } else {
        await productsAPI.create(data);
        setSuccess(true);
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 1000);
      }
    } catch (error) {
      console.error('Error saving product:', error);
      setError(t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {productId ? t('admin.editProduct') : t('admin.addProduct')}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-xl">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-4 p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-xl">
              {productId ? t('admin.productUpdated') : t('admin.productCreated')} {t('checkout.success')}!
            </div>
          )}

          {loadingProduct ? (
            <div className="text-center py-8">
              <div className="text-gray-600 dark:text-gray-400">{t('common.loading')}</div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {t('admin.titleKg')} *
                  </label>
                  <input
                    type="text"
                    name="titleKg"
                    value={formData.titleKg}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {t('admin.titleRu')} *
                  </label>
                  <input
                    type="text"
                    name="titleRu"
                    value={formData.titleRu}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {t('admin.titleEn')} *
                  </label>
                  <input
                    type="text"
                    name="titleEn"
                    value={formData.titleEn}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {t('admin.descriptionKg')}
                  </label>
                  <textarea
                    name="descriptionKg"
                    value={formData.descriptionKg}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {t('admin.descriptionRu')}
                  </label>
                  <textarea
                    name="descriptionRu"
                    value={formData.descriptionRu}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {t('admin.descriptionEn')}
                  </label>
                  <textarea
                    name="descriptionEn"
                    value={formData.descriptionEn}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {t('admin.price')} *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {t('filter.category')}
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  >
                    <option value="sofa">Sofa</option>
                    <option value="bed">Bed</option>
                    <option value="table">Table</option>
                    <option value="chair">Chair</option>
                    <option value="wardrobe">Wardrobe</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {t('admin.material')}
                  </label>
                  <input
                    type="text"
                    name="material"
                    value={formData.material}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {t('admin.color')}
                  </label>
                  <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {t('admin.cover')}
                </label>
                <input
                  type="url"
                  name="cover"
                  value={formData.cover}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
                {formData.cover && (
                  <div className="mt-3">
                    <img
                      src={formData.cover}
                      alt="Preview"
                      className="w-40 h-40 object-cover rounded-xl border-2 border-gray-300 dark:border-gray-600 shadow-lg"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg"
                >
                  {loading ? t('common.loading') : t('common.save')}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transform hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  {t('common.cancel')}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
