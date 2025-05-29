import { domain } from 'utils/config';
import i18n from 'i18next';
// Связывает i18next с React, предоставляет хуки useTranslation
import { initReactI18next } from 'react-i18next';
// Позволяет загружать переводы асинхронно по требованию
import Backend from 'i18next-http-backend';
// // Автоматически определяет язык пользователя на основе настроек браузера
import LanguageDetector from 'i18next-browser-languagedetector';

const initI18n = async () => {
  try {
    await i18n
      .use(Backend)
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        backend: {
          loadPath: `${domain}/interface_{{lng}}.json`,
          requestOptions: {
            cache: 'no-store',
          },
          reloadInterval: false,
          crossDomain: true,
          withCredentials: false,
        },
        supportedLngs: ['ru', 'en', 'zh', 'es'],
        fallbackLng: 'ru',
        detection: {
          order: ['localStorage', 'navigator'],
          lookupLocalStorage: 'i18nextLng',
          caches: ['localStorage'],
        },
        react: {
          useSuspense: false,
          transEmptyNodeValue: '',
          transSupportBasicHtmlNodes: true,
          transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p'],
        },
        debug: false,
        load: 'all',
        ns: ['translation'],
        defaultNS: 'translation',
      });

    // console.log('i18n initialized with language:', i18n.language);
  } catch (error) {
    console.error('Error initializing i18n:', error);
  }
};

initI18n();

// Функция для получения текущего языка интерфейса
// Используется для API запросов, поиска и других операций
export const getCurrentLanguage = () => {
  return i18n.language;
};

// Функция для изменения языка
export const changeLanguage = async (lng) => {
  try {
    // console.log('Changing language to:', lng);
    await i18n.changeLanguage(lng);
    // console.log('Language changed to:', lng);
  } catch (error) {
    console.error('Error changing language:', error);
  }
};

// Экспортируем настроенный экземпляр i18next
export default i18n;
