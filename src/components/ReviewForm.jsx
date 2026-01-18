import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import * as reviewsAPI from '../api/reviews';

export const ReviewForm = ({ productId, onReviewAdded }) => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  if (!user) {
    return <p className="text-gray-600 dark:text-gray-400">{t('review.pleaseLogin')}</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      alert(t('review.fillText'));
      return;
    }

    if (!productId) {
      alert(t('review.noProduct'));
      return;
    }

    setLoading(true);
    try {
      const reviewData = {
        productId: String(productId),
        userId: String(user.id),
        rating: Number(rating),
        text: text.trim(),
        createdAt: new Date().toISOString(),
      };

      await reviewsAPI.create(reviewData);
      
      // Очищаем форму
      setText('');
      setRating(5);
      
      // Обновляем список отзывов и рейтинг товара
      if (onReviewAdded) {
        onReviewAdded();
      }
      
      // Показываем успешное сообщение
      alert(t('review.success'));
    } catch (error) {
      console.error('Error creating review:', error);
      alert(t('review.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('product.writeReview')}</h3>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('product.rating')}</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>{r} {t('product.stars')}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t('review.writePlaceholder')}
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? t('common.loading') : t('review.submit')}
      </button>
    </form>
  );
};
