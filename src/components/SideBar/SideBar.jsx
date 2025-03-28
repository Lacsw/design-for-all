import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArticlesTree, Overlay, SearchInput } from 'components';
import ResultItem from './ResultItem';
import {
  selectCatalog,
  selectMainCategory,
  selectShouldRemountTree,
  selectTitles,
  setShouldRemountTree,
} from 'store/slices/articleSlice';
import { getCurrentTheme, getLanguage } from 'store/selectors';
import searchArticles, { prepareValue } from 'utils/helpers/search';
import debounce from 'utils/helpers/debounce';
import treeIcon from 'images/tree-menu-icon.svg';
import treeIconB from 'images/tree-menu-icon-black.svg';
import './SideBar.css';
import { useInteractiveManager } from 'utils/contexts/InteractiveManagerContext';
import { useIsMobile } from 'utils/hooks/useIsMobile';

/*
Функция getSection определяет текущую секцию для отображения дерева статей.

1. Если задан mainCategory, функция перебирает все ключи в titles[lang] и, если найдено совпадение (значение равно mainCategory), возвращает соответствующий ключ.
2. Если mainCategory не задан или совпадение не найдено, функция пытается получить атрибут "main_category" из тега <title> в head документа.
3. Если атрибут найден, функция снова перебирает ключи в titles[lang] и возвращает ключ, если его значение совпадает с полученным атрибутом.
4. Если ни один из вариантов не сработал, функция возвращает строку 'desktop' в качестве значения по умолчанию.
*/

function getSection(titles, lang, mainCategory) {
  if (mainCategory) {
    for (let key in titles[lang]) {
      if (titles[lang][key] === mainCategory) return key;
    }
  }

  const category = document.head
    .querySelector('title')
    ?.getAttribute('main_category');

  if (category) {
    for (let key in titles[lang]) {
      if (titles[lang][key] === category) return key;
    }
  }

  return 'desktop';
}

export default function SideBar({ section, setSection }) {
  const dispatch = useDispatch();
  const { lang } = useParams();
  const language = useSelector(getLanguage);
  const theme = useSelector(getCurrentTheme);
  const catalog = useSelector(selectCatalog);
  const titles = useSelector(selectTitles);
  const mainCategory = useSelector(selectMainCategory);

  const shouldRemountTree = useSelector(selectShouldRemountTree);
  const [currentSection, setCurrentSection] = useState(
    () => section || getSection(titles, lang, mainCategory)
  );

  const [isInput, setIsInput] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState(null);
  const isMobile = useIsMobile();

  const { activeComponent, openComponent, closeComponent } =
    useInteractiveManager();
  const isTreeSearchOpen = activeComponent === 'treeSearch';

  const articles = catalog[language][currentSection].original;
  const titlesList = Object.keys(titles[language]).filter(
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
  }

  useEffect(() => {
    const newSection = getSection(titles, lang, mainCategory);
    setCurrentSection(newSection);
  }, [mainCategory, titles, lang]);

  // для корректного построения дерева
  useEffect(() => {
    if (shouldRemountTree) {
      dispatch(setShouldRemountTree(false));
    }
  }, [shouldRemountTree, dispatch]);

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
                {titles[language][currentSection] || ''}
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
                    {titles[language][title]}
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
