import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ModalConfirm } from './ModalConfirm';
import * as productsAPI from '../api/products';
import { getProductId } from '../utils/productId';

export const AdminProductsTable = ({ products, onRefresh }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const lang = i18n.language;
  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = async (id) => {
    try {
      await productsAPI.remove(id);
      if (onRefresh) onRefresh();
      setDeleteId(null);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  if (products.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
        <p className="text-gray-600 dark:text-gray-400 text-lg">{t('admin.noProducts')}</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-[640px] w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="px-4 py-3 text-left text-gray-900 dark:text-white">Image</th>
              <th className="px-4 py-3 text-left text-gray-900 dark:text-white">{t('admin.tableTitle')}</th>
              <th className="px-4 py-3 text-left text-gray-900 dark:text-white">{t('admin.tableCategory')}</th>
              <th className="px-4 py-3 text-left text-gray-900 dark:text-white">{t('admin.tablePrice')}</th>
              <th className="px-4 py-3 text-left text-gray-900 dark:text-white">{t('admin.tableActions')}</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const title = product[`title${lang.charAt(0).toUpperCase() + lang.slice(1)}`] || product.titleKg;
              const productId = getProductId(product);
              return (
                <tr key={productId || product.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 overflow-hidden border border-gray-200 dark:border-gray-600">
                      {product.cover ? (
                        <img
                          src={product.cover}
                          alt={title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{title}</td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300 capitalize">{product.category}</td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">${product.price?.toFixed(2) || '0.00'}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => productId && navigate(`/admin/products/edit/${productId}`)}
                        disabled={!productId}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm transition-colors"
                      >
                        {t('common.edit')}
                      </button>
                      <button
                        onClick={() => productId && setDeleteId(productId)}
                        disabled={!productId}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm transition-colors"
                      >
                        {t('common.delete')}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ModalConfirm
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => handleDelete(deleteId)}
        title={t('admin.deleteProduct')}
        message={t('admin.confirmDelete')}
      />
    </>
  );
};

