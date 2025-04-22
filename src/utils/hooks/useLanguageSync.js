import { useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { changeLanguage, getLanguage } from 'store/slices/user';

/**
 * Хук для синхронизации языка между Redux и i18next
 * Redux является источником правды для языка
 * i18next используется только для работы с переводами
 */
export const useLanguageSync = () => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const language = useSelector(getLanguage);
  
  // Функция для изменения языка
  const setLanguage = useCallback((newLanguage) => {
    if (newLanguage !== language) {
      // Обновляем только Redux, i18next обновится через эффект
      dispatch(changeLanguage(newLanguage));
    }
  }, [dispatch, language]);
  
  // Синхронизация i18next с Redux
  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language, i18n]);
  
  // Синхронизация Redux с i18next (обратная синхронизация)
  useEffect(() => {
    const handleLanguageChanged = (lng) => {
      // Если язык i18next изменился, но не совпадает с языком в Redux
      if (lng !== language) {
        dispatch(changeLanguage(lng));
      }
    };
    
    // Подписываемся на событие изменения языка в i18next
    i18n.on('languageChanged', handleLanguageChanged);
    
    // Отписываемся при размонтировании
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n, language, dispatch]);
  
  // Мемоизируем возвращаемый объект
  return useMemo(() => ({
    language,
    setLanguage
  }), [language, setLanguage]);
}; 