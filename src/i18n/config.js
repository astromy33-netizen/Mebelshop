import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import kg from './locales/kg.json';
import ru from './locales/ru.json';
import en from './locales/en.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      kg: { translation: kg },
      ru: { translation: ru },
      en: { translation: en },
    },
    lng: localStorage.getItem('language') || 'kg',
    fallbackLng: 'kg',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
