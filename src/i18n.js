import i18n from 'i18next';
// Связывает i18next с React, предоставляет хуки useTranslation
import { initReactI18next } from 'react-i18next';
// Позволяет загружать переводы асинхронно по требованию
// import Backend from 'i18next-http-backend';
// // Автоматически определяет язык пользователя на основе настроек браузера
import LanguageDetector from 'i18next-browser-languagedetector';
// Временно импортируем локальные переводы для разработки
import { ru, en, zh, es } from './utils/locales';
// Флаг для переключения между локальными и серверными переводами
const USE_BACKEND = false; // изменить на true когда бэкенд будет готов

const initI18n = async () => {
  try {
    await i18n
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
          order: ['querystring', 'localStorage', 'navigator'],
          lookupQuerystring: 'lng',
          lookupLocalStorage: 'i18nextLng',
          caches: ['localStorage'],
        },
        interpolation: {
          escapeValue: false,
        },
        react: {
          useSuspense: true,
        },
        debug: process.env.NODE_ENV === 'development',
      });
  } catch (error) {
    console.error('Error initializing i18next:', error);
  }
};

initI18n();

// Функция для получения текущего языка интерфейса
// Используется для API запросов, поиска и других операций
export const getCurrentLanguage = () => {
  return i18n.language;
};

// Функция для проверки необходимости обновления переводов
export const checkTranslationsUpdate = async () => {
  // Проверяем обновления только если используется бэкенд
  if (!USE_BACKEND) return;

  const lastUpdate = localStorage.getItem('translationsLastUpdate');
  const now = Date.now();
  
  if (!lastUpdate || (now - parseInt(lastUpdate)) > 86400000) {
    try {
      await i18n.reloadResources();
      localStorage.setItem('translationsLastUpdate', now.toString());
    } catch (error) {
      console.error('Failed to update translations:', error);
      // В случае ошибки продолжаем использовать кэшированные переводы
    }
  }
};

// Функция для переключения между локальными и серверными переводами
// Только для разработки
export const toggleTranslationSource = async () => {
  if (process.env.NODE_ENV === 'development') {
    const newValue = !USE_BACKEND;
    // Перезагружаем i18next с новыми настройками
    await i18n.init({
      ...i18n.options,
      resources: newValue ? undefined : {
        ru: { translation: ru },
        en: { translation: en },
        zh: { translation: zh },
        es: { translation: es },
      },
      backend: newValue ? {
        loadPath: 'https://design-for-all.net/interface_{{lng}}.json',
        cacheTTL: 86400 + 3600,
        allowEmpty: false,
        customHeaders: {
          'Cache-Control': 'max-age=86400'
        },
      } : undefined,
    });
    console.log(`Switched to ${newValue ? 'backend' : 'local'} translations`);
  }
};

// Экспортируем настроенный экземпляр i18next
export default i18n; 