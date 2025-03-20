import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentTheme, getLanguage } from 'store/selectors';
import Overlay from 'components/Overlay/Overlay';
import closeBtn from 'images/close-btn.svg';
import closeBtnBlack from 'images/close-btn_black.svg';
import loupe from 'images/loupe-icon.svg';
import loupeLight from 'images/loupe-icon_white.svg';
import './HeaderSearchInput.css';
import { useInteractiveManager } from 'utils/contexts/InteractiveManagerContext';
import { NavLink } from 'react-router-dom';
import { serverSearch } from 'utils/api/search';
import { useDebounce } from 'utils/hooks';
import {
  setMainCategory,
  setShouldRemountTree,
} from 'store/slices/articleSlice';

export default function HeaderSearchInput({ id, isMobileVisible = false }) {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const { activeComponent, openComponent, closeComponent } =
    useInteractiveManager();
  const language = useSelector(getLanguage);
  const theme = useSelector(getCurrentTheme);

  // Компонент открыт, если его id совпадает с активным
  const isShown = activeComponent === id;

  // Функция для запроса на сервер
  const performSearch = async (text) => {
    if (text.trim().length < 3) {
      setResults([]);
      return;
    }
    try {
      const res = await serverSearch({
        searchText: text,
        lang: language,
        pagination: '1;20',
      });
      setResults(res);
    } catch (err) {
      console.error('Ошибка поиска:', err);
      setResults([]);
    }
  };

  // Оборачиваем функцию поиска в debounce, чтобы не пинговать сервер слишком часто
  const debouncedSearch = useDebounce(performSearch, 500);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    if (isShown && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isShown]);

  const handleLoupeClick = () => {
    openComponent(id);
  };

  const handleCloseClick = () => {
    closeComponent(id);
  };
  return (
    <>
      {isShown && (
        <>
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
              placeholder="Поиск статей..."
              value={query}
              className="header-search-input__field"
              ref={inputRef}
              onChange={handleInputChange}
            />
            <button
              className="header-search-input__close-btn"
              onClick={handleCloseClick}
            >
              <img
                src={theme === 'light' ? closeBtnBlack : closeBtn}
                alt="Кнопка сброса"
              />
            </button>
          </div>
          {results.length > 0 && (
            <ul className="header-search__results">
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
            </ul>
          )}
        </>
      )}
      <button
        className={`header-search-input__loupe ${
          isShown && !isMobileVisible ? 'header-search-input-hide' : ''
        }`}
        onClick={isShown ? handleCloseClick : handleLoupeClick}
      >
        <img
          src={theme === 'light' ? loupeLight : loupe}
          alt="Иконка лупы"
          className="header__icon"
        />
      </button>
    </>
  );
}
