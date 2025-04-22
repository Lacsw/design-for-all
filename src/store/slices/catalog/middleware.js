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
    const { language } = listenerApi.getState().user;
    const section = action.payload;
    
    // Проверяем, что секция валидна, иначе используем 'desktop'
    const validSection = VALID_SECTIONS.includes(section) ? section : 'desktop';
    
    // Обновляем URL только если он отличается от текущего
    const currentHash = window.location.hash.replace(/^#\/?/, '');
    if (currentHash !== validSection) {
      window.history.pushState({}, '', `#${validSection}`);
    }
    
    // Загружаем данные для новой секции
    listenerApi.dispatch(fetchTree(`${language}_${validSection}`));
  }
});

// Слушатель для обработки изменений категории
catalogListener.startListening({
  actionCreator: setCurrentCategory,
  effect: async (action, listenerApi) => {
    const { language, titles } = listenerApi.getState().article;
    const category = action.payload;
    
    // Находим соответствующую секцию для категории
    const section = Object.entries(titles[language] || {}).find(
      ([_, value]) => value === category
    )?.[0];
    
    if (section) {
      // Проверяем, что секция валидна, иначе используем 'desktop'
      const validSection = VALID_SECTIONS.includes(section) ? section : 'desktop';
      listenerApi.dispatch(setCurrentSection(validSection));
    }
  }
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
    
    if (hash) {
      // Проверяем, что hash является валидной секцией
      const validSection = VALID_SECTIONS.includes(hash) ? hash : 'desktop';
      
      // Проверяем, что текущая секция отличается от валидной
      const currentState = listenerApi.getState();
      if (currentState.catalog.currentSection !== validSection) {
        listenerApi.dispatch(setCurrentSection(validSection));
      }
    }
  }
});