import { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArticlesTree, Overlay, SearchInput } from 'components';
import ResultItem from './ResultItem';
import {
  selectCatalog,
  selectTitles,
} from 'store/slices/article/slice';
import {
  selectCurrentCategory,
  setCurrentCategory,
} from 'store/slices/catalog/slice';
import { getLanguage } from 'store/slices/user';
import { getCurrentTheme } from 'store/slices/theme';
import searchArticles, { prepareValue } from 'utils/helpers/search';
import debounce from 'utils/helpers/debounce';
import treeIcon from 'images/tree-menu-icon.svg';
import treeIconB from 'images/tree-menu-icon-black.svg';
import './SideBar.css';
import { useInteractiveManager } from 'utils/contexts/InteractiveManagerContext';
import { useIsMobile } from 'utils/hooks/useIsMobile';
import { useTranslation } from 'react-i18next';
import { CATALOG } from 'utils/translationKeys';


export default function SideBar() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const language = useSelector(getLanguage);
  const theme = useSelector(getCurrentTheme);
  const isMobile = useIsMobile();
  const catalog = useSelector(selectCatalog);
  const titles = useSelector(selectTitles);
  const currentCategory = useSelector(selectCurrentCategory);

  const [isInput, setIsInput] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState(null);

  const { activeComponent, componentOptions, openComponent, closeComponent } = useInteractiveManager();
  const isTreeSearchOpen = activeComponent === 'treeSearch';
  const isMobileSidebarOpen = activeComponent === 'mobileSidebar';

  
  // список секций, исключая текущую для выбора в выпадающем списке
  const titlesList = useMemo(() =>
    Object.keys(titles?.[language] || {}).filter(
      (item) => item !== currentCategory
    ),
    [titles, language, currentCategory]
  );

  // открытие инпута поиска
  useEffect(() => {
    setIsInput(isTreeSearchOpen);
  }, [isTreeSearchOpen]);

  // локальный поиск по статьям в текущей категории
  const handleSearch = useCallback(({ target }) => {
    const value = prepareValue(target.value);
    const isReady = value.replace(/\s/g, '').length >= 3;
    const articles = catalog?.[language]?.[currentCategory]?.original || [];
    setResults(isReady ? searchArticles(value, articles) : null);
  }, [catalog, language, currentCategory]);

  // поиск с задержкой
  const searchWithDelay = debounce(handleSearch, 500);

  const handleSectionClick = useCallback((category) => {
    setIsOpen(o => !o);
    dispatch(setCurrentCategory(category));
  }, [dispatch]);

  // открытие поиска при открытии мобильного меню
  useEffect(() => {
    if (isMobile && isMobileSidebarOpen && componentOptions?.activateSearch) {
      setIsInput(true);
    }
  }, [isMobileSidebarOpen, isMobile, componentOptions]);

  return (
    <nav className="sidebar">
      <div className="sidebar__header">
        {!isInput && (
          <>
            <div
              className="sidebar__title-container"
              onClick={() => setIsOpen(!isOpen)}
            >
              <h2 className="sidebar__title">
                {titles?.[language]?.[currentCategory] || currentCategory}
              </h2>
              <img
                className={isOpen ? 'sidebar__icon_open' : ''}
                src={theme === 'dark' ? treeIcon : treeIconB}
                alt="выбрать"
              />
            </div>
            {isOpen && (
              <ul className="sidebar__list">
                {titlesList.map((title) => (
                  <li
                    className="sidebar__item"
                    key={title}
                    onClick={() => handleSectionClick(title)}
                  >
                    {titles?.[language]?.[title] || title}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        <SearchInput
          isInput={isInput}
          id="sidebar"
          onChange={searchWithDelay}
          onSearch={setIsInput}
          onResults={setResults}
          onOpen={() => openComponent('treeSearch')}
        />
        {isInput && (
          <>
            {!isMobile && (
              <Overlay
                onClick={() => {
                  closeComponent('treeSearch');
                  setIsInput(false);
                }}
                customClass="overlay__header"
                disableHover={true}
                zIndex={-1}
              />
            )}
            <ul className="sidebar__list">
              {!results ? (
                <li className="sidebar__item">{t(CATALOG.SIDE_BAR.SEARCH_INPUT.NO_RESULTS)}</li>
              ) : results.length === 0 ? (
                <li className="sidebar__item">{t(CATALOG.SIDE_BAR.SEARCH_INPUT.NO_RESULTS)}</li>
              ) : (
                results.map((item) => (
                  <ResultItem
                    item={item}
                    language={language}
                    key={item.uuid}
                    onClick={() => setIsInput(false)}
                  />
                ))
              )}
            </ul>
          </>
        )}
      </div>
      <ArticlesTree
        key={currentCategory}
        path={currentCategory}
        catalog={catalog}
        language={language}
      />
    </nav>
  );
}
