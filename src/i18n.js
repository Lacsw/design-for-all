import i18n from 'i18next';
// Связывает i18next с React, предоставляет хуки useTranslation
import { initReactI18next } from 'react-i18next';
// Позволяет загружать переводы асинхронно по требованию
import Backend from 'i18next-http-backend';
// Автоматически определяет язык пользователя на основе настроек браузера
import LanguageDetector from 'i18next-browser-languagedetector';
// Временно импортируем локальные переводы для разработки
import ru from './locales/ru.json';
import en from './locales/en.json';
import zh from './locales/zh.json';
import es from './locales/es.json';
// Флаг для переключения между локальными и серверными переводами
const USE_BACKEND = false; // изменить на true когда бэкенд будет готов

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // Временные локальные переводы для разработки
    resources: USE_BACKEND ? undefined : {
        ru: { translation: ru },
        en: { translation: en },
        zh: { translation: zh },
        es: { translation: es },
    },

    // Поддерживаемые языки интерфейса
    supportedLngs: ['ru', 'en', 'zh', 'es'],
    fallbackLng: 'ru',

    // Настройки для загрузки переводов с бэкенда
    backend: USE_BACKEND ? {
      // Формируем URL для загрузки переводов
      loadPath: 'https://design-for-all.net/interface_{{lng}}.json',
      
      // Добавляем кэширование на 24 часа + небольшой запас
      cacheTTL: 86400 + 3600, // 25 часов в секундах
      
      // Проверяем статус ответа
      allowEmpty: false,
      
      // Можно добавить обработку ошибок
      customHeaders: {
        'Cache-Control': 'max-age=86400'
      },
    } : undefined,

    // Настройки определения языка
    detection: {
      order: [
        'querystring',
        'localStorage',
        'navigator',
      ],
      lookupQuerystring: 'lng',
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },

    // Настройки интерполяции
    interpolation: {
      escapeValue: false,
    },

    // Настройки для React
    react: {
      useSuspense: true,
    },

    // Включаем отладку только в режиме разработки
    debug: process.env.NODE_ENV === 'development',
  })
  .catch((error) => {
    console.error('Error initializing i18next:', error);
  });

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