import i18n from 'i18next';
// Связывает i18next с React, предоставляет хуки useTranslation
import { initReactI18next } from 'react-i18next';
// Автоматически определяет язык пользователя на основе настроек браузера
import LanguageDetector from 'i18next-browser-languagedetector';
// Временно импортируем локальные переводы для разработки
import { ru, en, zh, es } from './utils/locales';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ru: { translation: ru },
      en: { translation: en },
      zh: { translation: zh },
      es: { translation: es },
    },
    supportedLngs: ['ru', 'en', 'zh', 'es'],
    fallbackLng: 'ru',
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    debug: process.env.NODE_ENV === 'development',
  });

// Функция для получения текущего языка интерфейса
// Используется для API запросов, поиска и других операций
export const getCurrentLanguage = () => i18n.language;

// Экспортируем настроенный экземпляр i18next
export default i18n; 