// src/store/slices/catalog/middleware.js
import { createListenerMiddleware } from '@reduxjs/toolkit';
import { setCurrentSection, setCurrentCategory } from './slice';
import { fetchTree } from '../article';
import { VALID_SECTIONS } from 'utils/constants';

export const catalogListener = createListenerMiddleware();

// Слушатель для синхронизации URL и состояния
catalogListener.startListening({
  actionCreator: setCurrentSection,
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState();
    const { language } = state.user;
    const { catalog } = state.article;
    const section = action.payload;

    if (!VALID_SECTIONS.includes(section)) {
      return;
    }
    
    const currentHash = window.location.hash.replace(/^#\/?/, '');
    if (currentHash !== section) {
      window.history.pushState({}, '', `#${section}`);
    }
    
    // Проверяем наличие данных и их свежесть
    const sectionData = catalog?.[language]?.[section];
    const fetchTime = sectionData?.fetchTime || 0;
    
    // Загружаем данные только если их нет или они устарели (старше 10.5 минут)
    if (!sectionData?.original || Date.now() - fetchTime > 630000) {
      listenerApi.dispatch(fetchTree(`${language}_${section}`));
    }
  },
});

// Слушатель для обработки изменений категории
catalogListener.startListening({
  actionCreator: setCurrentCategory,
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState();
    const { language, titles } = state.article;
    const category = action.payload;

    // Находим соответствующую секцию для категории
    const section = Object.entries(titles[language] || {}).find(
      ([_, value]) => value === category
    )?.[0];

    if (section) {
      const validSection = VALID_SECTIONS.includes(section) ? section : 'desktop';
      listenerApi.dispatch(setCurrentSection(validSection));
    }
  },
});

// Слушатель для обработки изменений URL
catalogListener.startListening({
  predicate: (action, currentState, previousState) => {
    // Проверяем, что hash действительно изменился
    const currentHash = window.location.hash.replace(/^#\/?/, '');
    return currentHash !== previousState?.catalog?.currentHash;
  },
  effect: async (_, listenerApi) => {
    const hash = window.location.hash.replace(/^#\/?/, '');

    if (hash && VALID_SECTIONS.includes(hash)) {
      const currentState = listenerApi.getState();

      if (currentState.catalog.currentSection !== hash) {
        listenerApi.dispatch(setCurrentSection(hash));
      }
    }
  },
});
