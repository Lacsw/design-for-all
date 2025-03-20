import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArticlesTree, SearchInput } from 'components';
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

  const articles = catalog[language][currentSection].original;
  const titlesList = Object.keys(titles[language]).filter(
    (item) => item !== currentSection
  );

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
    setIsOpen(false);
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
        )}
        <SearchInput
          id="sidebar"
          onChange={searchWithDelay}
          onSearch={setIsInput}
          onResults={setResults}
          onOpen={setIsOpen}
        />
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
        {results && (
          <ul className="sidebar__list">
            {results.length
              ? results.map((item) => (
                  <ResultItem item={item} language={language} key={item.uuid} />
                ))
              : 'Ничего не найдено'}
          </ul>
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
