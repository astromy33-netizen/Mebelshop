import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const FiltersPanel = ({ filters, onFilterChange, products = [] }) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  // Получаем уникальные значения из товаров
  const categories = ['sofa', 'bed', 'table', 'chair', 'wardrobe'];
  
  // Функция перевода категорий
  const translateCategory = (category) => {
    return t(`category.${category}`);
  };

  // Функция перевода цветов
  const translateColor = (color) => {
    if (!color) return color;
    // Нормализуем строку: убираем пробелы, приводим к нижнему регистру
    const normalized = color.toLowerCase().trim().replace(/\s+/g, '');
    // Пробуем разные варианты ключей
    const keys = [
      normalized,
      normalized.replace(/[ё]/g, 'е'),
      color.toLowerCase().trim()
    ];
    
    for (const key of keys) {
      const translationKey = `color.${key}`;
      const translated = t(translationKey, { defaultValue: color });
      // Если перевод отличается от ключа, значит перевод найден
      if (translated && translated !== translationKey) {
        return translated;
      }
    }
    return color; // Если перевода нет, вернем оригинал
  };

  // Функция перевода материалов
  const translateMaterial = (material) => {
    if (!material) return material;
    // Нормализуем строку: убираем пробелы, приводим к нижнему регистру
    const normalized = material.toLowerCase().trim().replace(/\s+/g, '');
    // Пробуем разные варианты ключей
    const keys = [
      normalized,
      normalized.replace(/[ё]/g, 'е'),
      material.toLowerCase().trim()
    ];
    
    for (const key of keys) {
      const translationKey = `material.${key}`;
      const translated = t(translationKey, { defaultValue: material });
      // Если перевод отличается от ключа, значит перевод найден
      if (translated && translated !== translationKey) {
        return translated;
      }
    }
    return material; // Если перевода нет, вернем оригинал
  };
  
  const getUniqueValues = (field) => {
    const values = products
      .map(p => p[field])
      .filter(Boolean)
      .filter((v, i, arr) => arr.indexOf(v) === i);
    return values.sort();
  };

  const colors = getUniqueValues('color');
  const materials = getUniqueValues('material');

  const hasActiveFilters = filters.category || filters.color || filters.material || 
    filters.minPrice || filters.maxPrice || filters.minRating || filters.sort;

  const resetFilters = () => {
    onFilterChange('category', '');
    onFilterChange('color', '');
    onFilterChange('material', '');
    onFilterChange('minPrice', '');
    onFilterChange('maxPrice', '');
    onFilterChange('minRating', '');
    onFilterChange('sort', '');
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-5 sm:p-6 rounded-2xl shadow-[0_18px_45px_-30px_rgba(15,23,42,0.5)] mb-6 border border-gray-200/70 dark:border-white/10">
      <div className="flex items-center justify-between gap-3 mb-5">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('filters.title')}</h3>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              {t('filters.reset')}
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm font-semibold text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition-colors"
          >
            {t('filters.more')}
          </button>
        </div>
      </div>

      {/* Основные фильтры - всегда видимы */}
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {t('filter.category')}
          </label>
          <select
            value={filters.category || ''}
            onChange={(e) => onFilterChange('category', e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300/80 dark:border-white/10 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
          >
            <option value="">{t('filters.all')}</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {translateCategory(cat)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {t('filter.color')}
          </label>
          <select
            value={filters.color || ''}
            onChange={(e) => onFilterChange('color', e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300/80 dark:border-white/10 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
          >
            <option value="">{t('filters.all')}</option>
            {colors.map((color) => (
              <option key={color} value={color}>
                {translateColor(color)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {t('filter.sort')}
          </label>
          <select
            value={filters.sort || ''}
            onChange={(e) => onFilterChange('sort', e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300/80 dark:border-white/10 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
          >
            <option value="">{t('filters.default')}</option>
            <option value="priceAsc">{t('filter.sortPriceAsc')}</option>
            <option value="priceDesc">{t('filter.sortPriceDesc')}</option>
            <option value="ratingDesc">{t('filter.sortRatingDesc')}</option>
            <option value="nameAsc">{t('filter.sortNameAsc')}</option>
          </select>
        </div>
      </div>

      {/* Расширенные фильтры - показываются при раскрытии */}
      {isExpanded && (
        <div className="grid grid-cols-1 gap-4 pt-4 border-t border-gray-200 dark:border-white/10 animate-fadeIn">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {t('filter.material')}
            </label>
            <select
              value={filters.material || ''}
              onChange={(e) => onFilterChange('material', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300/80 dark:border-white/10 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
            >
              <option value="">{t('filters.all')}</option>
              {materials.map((material) => (
                <option key={material} value={material}>
                  {translateMaterial(material)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {t('filter.priceRange')}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder={t('filter.minPrice')}
                value={filters.minPrice || ''}
                onChange={(e) => onFilterChange('minPrice', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300/80 dark:border-white/10 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                min="0"
              />
              <span className="text-gray-500 dark:text-gray-400">-</span>
              <input
                type="number"
                placeholder={t('filter.maxPrice')}
                value={filters.maxPrice || ''}
                onChange={(e) => onFilterChange('maxPrice', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300/80 dark:border-white/10 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {t('filter.minRating')}
            </label>
            <select
              value={filters.minRating || ''}
              onChange={(e) => onFilterChange('minRating', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300/80 dark:border-white/10 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
            >
              <option value="">{t('filters.all')}</option>
              <option value="4.5">4.5+ rating</option>
              <option value="4.0">4.0+ rating</option>
              <option value="3.5">3.5+ rating</option>
              <option value="3.0">3.0+ rating</option>
            </select>
          </div>
        </div>
      )}

      {/* Показываем активные фильтры */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-white/10">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400 font-semibold">
              {t('filters.active')}:
            </span>
            {filters.category && (
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-full text-sm font-medium">
                {t('filter.category')}: {translateCategory(filters.category)}
              </span>
            )}
            {filters.color && (
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-full text-sm font-medium">
                {t('filter.color')}: {translateColor(filters.color)}
              </span>
            )}
            {filters.material && (
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-full text-sm font-medium">
                {t('filter.material')}: {translateMaterial(filters.material)}
              </span>
            )}
            {(filters.minPrice || filters.maxPrice) && (
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-full text-sm font-medium">
                ${filters.minPrice || '0'} - ${filters.maxPrice || '∞'}
              </span>
            )}
            {filters.minRating && (
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-full text-sm font-medium">
                ⭐ {filters.minRating}+
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};





