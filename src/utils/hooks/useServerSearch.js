import { useCallback, useMemo, useReducer, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import searchApi from 'utils/api/search';
import debounce from 'utils/helpers/debounce';
import { HEADER } from 'utils/constants/translationKeys';

// Начальное состояние поиска
const initialState = {
  query: '', // текст запроса
  results: [], // результаты поиска
  loading: false, // флаг загрузкаи
  error: '', // сообщение об ошибке
  hasMore: true, // флаг, есть ли ещё результаты для подгрузки (пагинация)
};

// Редьюсер для управления состоянием поиска
function searchReducer(state, action) {
  switch (action.type) {
    case 'SET_QUERY':
      return { ...state, query: action.payload };
    case 'SEARCH_START':
      return { ...state, loading: true, error: '' };
    case 'SEARCH_SUCCESS':
      return {
        ...state,
        loading: false,
        results:
          action.page === 1
            ? action.payload
            : [...state.results, ...action.payload],
        hasMore: action.payload.length === 20,
        error: '',
      };
    case 'SEARCH_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
        hasMore: false,
        results: action.page === 1 ? [] : state.results,
      };
    case 'RESET_RESULTS':
      return { ...state, results: [], error: '', hasMore: true };
    default:
      return state;
  }
}

export function useServerSearch(language) {
  // Управление состоянием поиска
  const [state, dispatch] = useReducer(searchReducer, initialState);
  const { t } = useTranslation();

  // Номер страницы для подгрузки результатов
  const pageRef = useRef(1);

  // функция для отправки запроса на сервер
  const performSearch = useCallback(
    async (text, pageNumber = 1) => {
      if (text.trim().length < 3) {
        dispatch({ type: 'RESET_RESULTS' });
        return;
      }
      dispatch({ type: 'SEARCH_START' });
      try {
        const res = await searchApi.serverSearch({
          searchText: text,
          lang: language,
          pagination: `${pageNumber};20`,
        });
        dispatch({ type: 'SEARCH_SUCCESS', payload: res, page: pageNumber });
      } catch (err) {
        let errorMsg = t(HEADER.SEARCH.ERROR.UNKNOWN);
        
        // Проверяем статус ошибки
        if (err.status === 404 || err.response?.status === 404) {
          errorMsg = t(HEADER.SEARCH.ERROR.NO_RESULTS);
        } else if (err.message && err.message.includes('network')) {
          errorMsg = t(HEADER.SEARCH.ERROR.NETWORK);
        } else if (err.message && err.message.includes('server')) {
          errorMsg = t(HEADER.SEARCH.ERROR.SERVER);
        }
        
        // Передаем номер страницы, чтобы знать, нужно ли очищать результаты
        dispatch({
          type: 'SEARCH_FAILURE',
          payload: errorMsg,
          page: pageNumber,
        });
      }
    },
    [language, t]
  );

  // При изменении текста запроса срабатывает через 500 мс
  const debouncedSearch = useMemo(
    () =>
      debounce((text) => {
        pageRef.current = 1;
        performSearch(text, 1);
        dispatch({ type: 'SET_QUERY', payload: text });
      }, 500),
    [performSearch]
  );

  // Обработчик скролла для подгрузки следующей страницы
  const handleScroll = useCallback(
    (evt) => {
      const target = evt.target;
      if (
        target.scrollHeight - (target.scrollTop + target.offsetHeight) < 100 &&
        !state.loading &&
        state.hasMore
      ) {
        pageRef.current++;
        performSearch(state.query, pageRef.current);
      }
    },
    [state.loading, state.hasMore, state.query, performSearch]
  );

  return { state, debouncedSearch, handleScroll, pageRef, dispatch };
}
