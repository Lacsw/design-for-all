// src/store/slices/catalog/middleware.js
import { createListenerMiddleware } from '@reduxjs/toolkit';
import { setCurrentCategory } from './slice';
import { fetchTree } from '../article';
import { VALID_SECTIONS } from 'utils/constants';

export const catalogListener = createListenerMiddleware();

// Слушатель для обработки изменений категории
catalogListener.startListening({
  actionCreator: setCurrentCategory,
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState();
    const { language } = state.user;
    const { catalog, titles } = state.article;
    const category = action.payload;

    // Если категория пустая, значит мы вышли из каталога
    if (!category) {
      return;
    }

    // Находим соответствующую секцию для категории
    const section = Object.entries(titles[language] || {}).find(
      ([_, value]) => value === category
    )?.[0];

    if (!section || !VALID_SECTIONS.includes(section)) {
      return;
    }
    
    // Обновляем URL если нужно
    const currentHash = window.location.hash.replace(/^#\/?/, '');
    if (currentHash !== section) {
      window.history.pushState({}, '', `#${section}`);
    }
    
    // Проверяем необходимость загрузки данных
    const sectionData = catalog?.[language]?.[section];
    const fetchTime = sectionData?.fetchTime || 0;
    
    // Загружаем данные только если их нет или они устарели (старше 10.5 минут)
    if (!sectionData?.original || Date.now() - fetchTime > 630000) {
      await listenerApi.dispatch(fetchTree(`${language}_${section}`));
    }
  },
});

// Слушатель для обработки изменений URL
catalogListener.startListening({
  predicate: (action, currentState, previousState) => {
    // Проверяем, что hash действительно изменился
    const currentHash = window.location.hash.replace(/^#\/?/, '');
    return currentHash !== previousState?.catalog?.currentCategory;
  },
  effect: async (_, listenerApi) => {
    const hash = window.location.hash.replace(/^#\/?/, '');
    const state = listenerApi.getState();
    const { titles } = state.article;
    const { language } = state.user;

    if (hash && VALID_SECTIONS.includes(hash)) {
      // Находим категорию по секции
      const category = titles[language]?.[hash];
      
      if (category && state.catalog.currentCategory !== category) {
        listenerApi.dispatch(setCurrentCategory(category));
      }
    }
  },
});