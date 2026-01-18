import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as productsAPI from '../api/products';

export const AdminProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    setLoadingProduct(true);
    setError('');
    try {
      const product = await productsAPI.getById(id);
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
        createdAt: product.createdAt || new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error loading product:', error);
      setError('Failed to load product. Please try again.');
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
        createdAt: id ? formData.createdAt : new Date().toISOString(),
      };
      
      if (id) {
        await productsAPI.update(id, data);
        setSuccess(true);
        setTimeout(() => {
          navigate('/admin/products');
        }, 1500);
      } else {
        await productsAPI.create(data);
        setSuccess(true);
        setTimeout(() => {
          navigate('/admin/products');
        }, 1500);
      }
    } catch (error) {
      console.error('Error saving product:', error);
      setError(t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  if (loadingProduct) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-2xl">
        <div className="text-center py-8">
          <div className="text-gray-600 dark:text-gray-400">{t('common.loading')}</div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {id ? t('admin.editProduct') : t('admin.addProduct')}
        </h2>
        <button
          type="button"
          onClick={() => navigate('/admin/products')}
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          ← {t('common.back')}
        </button>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded">
          {id ? t('admin.productUpdated') : t('admin.productCreated')} {t('checkout.success')} {t('admin.redirecting')}
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('admin.titleKg')}</label>
          <input
            type="text"
            name="titleKg"
            value={formData.titleKg}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('admin.titleRu')}</label>
          <input
            type="text"
            name="titleRu"
            value={formData.titleRu}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('admin.titleEn')}</label>
          <input
            type="text"
            name="titleEn"
            value={formData.titleEn}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('admin.descriptionKg')}</label>
          <textarea
            name="descriptionKg"
            value={formData.descriptionKg}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('admin.descriptionRu')}</label>
          <textarea
            name="descriptionRu"
            value={formData.descriptionRu}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('admin.descriptionEn')}</label>
          <textarea
            name="descriptionEn"
            value={formData.descriptionEn}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('admin.price')}</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('filter.category')}</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="sofa">Sofa</option>
              <option value="bed">Bed</option>
              <option value="table">Table</option>
              <option value="chair">Chair</option>
              <option value="wardrobe">Wardrobe</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('admin.cover')}</label>
          <input
            type="url"
            name="cover"
            value={formData.cover}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="https://example.com/image.jpg"
          />
          {formData.cover && (
            <div className="mt-2">
              <img
                src={formData.cover}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('admin.material')}</label>
            <input
              type="text"
              name="material"
              value={formData.material}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('admin.color')}</label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? t('common.loading') : t('common.save')}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            {t('common.cancel')}
          </button>
        </div>
      </div>
    </form>
  );
};
