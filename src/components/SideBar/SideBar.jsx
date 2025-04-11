import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArticlesTree, Overlay, SearchInput } from 'components';
import ResultItem from './ResultItem';
import {
  selectCatalog,
  selectMainCategory,
  selectShouldRemountTree,
  selectTitles,
  setShouldRemountTree,
  setMainCategory,
} from 'store/slices/article';
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

export default function SideBar({ section, setSection }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const language = useSelector(getLanguage);
  const theme = useSelector(getCurrentTheme);
  const isMobile = useIsMobile();
  const catalog = useSelector(selectCatalog);
  const titles = useSelector(selectTitles);
  const mainCategory = useSelector(selectMainCategory);
  const shouldRemountTree = useSelector(selectShouldRemountTree);
  const [currentSection, setCurrentSection] = useState(
    () => section || getSection(titles, language, mainCategory)
  );
  const [isInput, setIsInput] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState(null);

  const { activeComponent, openComponent, closeComponent } =
    useInteractiveManager();
  const isTreeSearchOpen = activeComponent === 'treeSearch';

  // Добавляем проверки на существование данных
  const articles = catalog?.[language]?.[currentSection]?.original || [];

  const titlesList = Object.keys(titles[language] || {}).filter(
    (item) => item !== currentSection
  );

  useEffect(() => {
    setIsInput(isTreeSearchOpen);
  }, [isTreeSearchOpen]);

  function handleSearch({ target }) {
    const value = prepareValue(target.value);
    const isReady = value.replace(/\s/g, '').length >= 3;
    if (isReady) {
      const results = searchArticles(value, articles);
      setResults(results);
    } else setResults(null);
  }

  const searchWithDelay = debounce(handleSearch, 500);

  function changeSection(section) {
    setIsOpen(!isOpen);
    setCurrentSection(section);
    if (setSection) setSection(section);

    // Обновляем mainCategory в Redux
    if (titles?.[language]?.[section]) {
      dispatch(setMainCategory(titles[language][section]));
    }
  }

  // Если внешний пропс section не задан, обновляем раздел по mainCategory
  useEffect(() => {
    if (!section && titles?.[language]) {
      const newSection = getSection(titles, language, mainCategory);
      setCurrentSection(newSection);
    }
  }, [mainCategory, titles, language, section]);

  // Следим за изменением hash в URL и обновляем раздел, если нужно
  useEffect(() => {
    const validKeys = Object.keys(titles?.[language] || {});
    const rawHash = location.hash ? location.hash.replace(/^#\/?/, '') : '';
    if (rawHash && validKeys.includes(rawHash) && rawHash !== currentSection) {
      setCurrentSection(rawHash);
      if (setSection) {
        setSection(rawHash);
      }
    }
  }, [location.hash, currentSection, setSection, titles, language]);

  // для корректного построения дерева
  useEffect(() => {
    if (shouldRemountTree) {
      // Обновляем текущий раздел при изменении mainCategory
      const newSection = getSection(titles, language, mainCategory);
      setCurrentSection(newSection);
      if (setSection) {
        setSection(newSection);
      }
      dispatch(setShouldRemountTree(false));
    }
  }, [shouldRemountTree, dispatch, mainCategory, titles, language, setSection]);

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
                {titles?.[language]?.[currentSection] || ''}
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
                    onClick={() => changeSection(title)}
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
                <li className="sidebar__item">Введите запрос...</li>
              ) : results.length === 0 ? (
                <li className="sidebar__item">Ничего не найдено</li>
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
        key={
          shouldRemountTree ? `${currentSection}-${Date.now()}` : currentSection
        }
        path={currentSection}
        catalog={catalog}
        language={language}
      />
    </nav>
  );
}
