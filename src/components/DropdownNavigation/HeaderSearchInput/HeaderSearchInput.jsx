import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLanguage } from 'store/slices/user';
import { getCurrentTheme } from 'store/slices/theme';
import Overlay from 'components/Overlay/Overlay';
import closeBtn from 'images/close-btn.svg';
import closeBtnBlack from 'images/close-btn_black.svg';
import loupe from 'images/loupe-icon.svg';
import loupeLight from 'images/loupe-icon_white.svg';
import './HeaderSearchInput.css';
import { useInteractiveManager } from 'utils/contexts/InteractiveManagerContext';
import { NavLink } from 'react-router-dom';
import { setMainCategory, setShouldRemountTree } from 'store/slices/catalog/slice';
import debounce from 'utils/helpers/debounce';
import { useServerSearch } from 'utils/hooks/useServerSearch';
import { useTranslation } from 'react-i18next';
import { HEADER } from 'utils/translationKeys';

export default function HeaderSearchInput({ id, isMobileVisible = false }) {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const resultsRef = useRef(null);
  const language = useSelector(getLanguage);
  const theme = useSelector(getCurrentTheme);
  const { t } = useTranslation();

  // Локальное состояние для мгновенного отображения введенного текста
  const [localQuery, setLocalQuery] = useState('');

  // Локальные состояния для показа индикаторов с задержкой
  const [showLoading, setShowLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  // Получаем управление видимостью из контекста
  const { activeComponent, openComponent, closeComponent } =
    useInteractiveManager();

  // Кастомный хук для поиска
  const { state, debouncedSearch, handleScroll } = useServerSearch(language);
  const { results, loading, error } = state;

  // isShown определяет, открыт ли компонент
  const isShown = activeComponent === id;

  const shouldHideResults =
    (!results || results.length === 0) && !showLoading && !showError;

  // При вводе обновляем localQuery и запускаем debouncedSearch, который обновит состояние в useServerSearch через SET_QUERY
  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocalQuery(value);
    debouncedSearch(value);
  };

  // Фокусируем input и сбрасываем скролл контейнера при открытии
  useEffect(() => {
    if (isShown && inputRef.current) {
      inputRef.current.focus();
      if (resultsRef.current) resultsRef.current.scrollTop = 0;
    }
  }, [isShown]);

  const handleLoupeClick = () => openComponent(id);
  const handleCloseClick = () => closeComponent(id);

  const handleCleaAndClose = () => {
    if (localQuery !== '') {
      // Если в поле есть текст — очищаем его
      setLocalQuery('');
      // Если используется серверный поиск, можно сбросить запрос:
      debouncedSearch('');
    } else {
      // Если поле уже пустое — закрываем компонент
      handleCloseClick();
    }
  };

  // Обработчик скролла с debounce
  useEffect(() => {
    const container = resultsRef.current;
    if (!container) return;
    const debouncedScroll = debounce(handleScroll, 200);
    container.addEventListener('scroll', debouncedScroll);
    return () => {
      container.removeEventListener('scroll', debouncedScroll);
    };
  }, [handleScroll]);

  // Задержка для отображения индикатора загрузки (300 мс)
  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => setShowLoading(true), 300);
      return () => clearTimeout(timer);
    } else {
      setShowLoading(false);
    }
  }, [loading]);

  // Задержка для отображения ошибки (300 мс)
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setShowError(true), 300);
      return () => clearTimeout(timer);
    } else {
      setShowError(false);
    }
  }, [error]);

  return (
    <>
      <div
        className={
          isShown
            ? 'header-search-input_active'
            : 'header-search-input_disabled'
        }
      >
        <Overlay
          onClick={handleCloseClick}
          customClass={
            isMobileVisible ? 'overlay__mobile-search' : 'overlay__header'
          }
          disableHover={true}
        />
        <div className="header-search-input">
          <input
            type="text"
            placeholder={t(HEADER.SEARCH.PLACEHOLDER)}
            value={localQuery}
            className="header-search-input__field"
            ref={inputRef}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                handleCloseClick();
              }
            }}
          />
          <button
            className="header-search-input__close-btn"
            onClick={handleCleaAndClose}
          >
            <img
              src={theme === 'light' ? closeBtnBlack : closeBtn}
              alt={t(HEADER.SEARCH.RESET_BUTTON)}
            />
          </button>
          <ul
            className={`header-search__results ${shouldHideResults ? 'hide' : ''
              }`}
            ref={resultsRef}
          >
            {results.map((item) => (
              <li key={item.uuid} className="header-search__result">
                <NavLink
                  to={`/${language}/${item.uuid}`}
                  className="header-search__link"
                  onClick={() => {
                    dispatch(setMainCategory(item.main_category));
                    dispatch(setShouldRemountTree(true));
                    handleCloseClick();
                  }}
                >
                  <span className="header-search__title">{item.title}</span>
                  <span className="header-search__sub-category">
                    {item.sub_category}
                  </span>
                </NavLink>
              </li>
            ))}
            {showLoading && (
              <li className="header-search__result">
                <p className="header-search__result-text">{t(HEADER.SEARCH.LOADING)}</p>
              </li>
            )}
            {showError && (
              <li className="header-search__result">
                <p className="header-search__result-text">{error}</p>
              </li>
            )}
          </ul>
        </div>
      </div>
      <button
        className={`header-search-input__loupe ${isShown && !isMobileVisible ? 'header-search-input-hide' : ''
          }`}
        onClick={isShown ? handleCloseClick : handleLoupeClick}
      >
        <img
          src={theme === 'light' ? loupeLight : loupe}
          alt={t(HEADER.SEARCH.ICON_ALT)}
          className="header__icon"
        />
      </button>
    </>
  );
}
