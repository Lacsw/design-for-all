import { useEffect, useState, useCallback, useMemo } from 'react';
// import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArticlesTree, Overlay, SearchInput } from 'components';
import ResultItem from './ResultItem';
import {
  selectCatalog,
  selectTitles,
} from 'store/slices/article/slice';
import {
  selectMainCategory,
  selectShouldRemountTree,
  setShouldRemountTree,
  setMainCategory,
  setCurrentSection,
  selectCurrentSection,
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

import getSection from 'utils/helpers/getSection';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CATALOG } from 'utils/translationKeys';
  
const SPECIAL_SECTIONS = ['updates', 'search'];

export default function SideBar({ section }) {
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();
  const language = useSelector(getLanguage);
  const theme = useSelector(getCurrentTheme);
  const isMobile = useIsMobile();
  const catalog = useSelector(selectCatalog);
  const titles = useSelector(selectTitles);
  const mainCategory = useSelector(selectMainCategory);
  const shouldRemountTree = useSelector(selectShouldRemountTree);
  const currentSection = useSelector(selectCurrentSection);
  
  const [isInput, setIsInput] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState(null);
  const [treeKey, setTreeKey] = useState(currentSection);

  const { activeComponent, componentOptions, openComponent, closeComponent } = useInteractiveManager();
  const isTreeSearchOpen = activeComponent === 'treeSearch';
  const isMobileSidebarOpen = activeComponent === 'mobileSidebar';

  const titlesList = useMemo(() => 
    Object.keys(titles?.[language] || {}).filter(
    (item) => item !== currentSection
    ),
    [titles, language, currentSection]
  );

  const updateSection = useCallback((newSection) => {
    const cleanSection = newSection.replace(/^\//, '');
    dispatch(setCurrentSection(cleanSection));
    if (titles?.[language]?.[cleanSection]) {
      dispatch(setMainCategory(titles[language][cleanSection]));
    }
  }, [titles, language, dispatch]);

  useEffect(() => {
    setIsInput(isTreeSearchOpen);
  }, [isTreeSearchOpen]);

  const handleSearch = useCallback(({ target }) => {
    const value = prepareValue(target.value);
    const isReady = value.replace(/\s/g, '').length >= 3;
    const articles = catalog?.[language]?.[currentSection]?.original || [];
    setResults(isReady ? searchArticles(value, articles) : null);
  }, [catalog, language, currentSection]);

  const searchWithDelay = debounce(handleSearch, 500);

  const handleSectionClick = useCallback((section) => {
    setIsOpen(!isOpen);
    updateSection(section);
  }, [isOpen, updateSection]);

  // Обработка изменений внешнего section
  useEffect(() => {
    if (!section && titles?.[language]) {
      const newSection = getSection(titles, language, mainCategory);
      updateSection(newSection);
    }
  }, [mainCategory, titles, language, section, updateSection]);

  // Обработка изменений hash
  useEffect(() => {
    const hash = location.hash.slice(1);
    if (hash && !SPECIAL_SECTIONS.includes(hash)) {
      updateSection(hash);
    }
  }, [location.hash, updateSection]);

  // Обработка remount tree
  useEffect(() => {
    if (shouldRemountTree) {
      const newSection = getSection(titles, language, mainCategory);
      updateSection(newSection);
      setTreeKey(`${newSection}-${Date.now()}`);
      dispatch(setShouldRemountTree(false));
    }
  }, [shouldRemountTree, titles, language, mainCategory, updateSection, dispatch]);

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
                {titles?.[language]?.[currentSection] || currentSection}
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
        key={treeKey}
        path={currentSection}
        catalog={catalog}
        language={language}
      />
    </nav>
  );
}
