import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArticlesTree, SearchInput } from 'components';
import ResultItem from './ResultItem';
import { selectCatalog, selectTitles } from 'store/slices/articleSlice';
import { getCurrentTheme, getLanguage } from 'store/selectors';
import searchArticles, { prepareValue } from 'utils/helpers/search';
import debounce from 'utils/helpers/debounce';
import treeIcon from 'images/tree-menu-icon.svg';
import treeIconB from 'images/tree-menu-icon-black.svg';
import './SideBar.css';

/*
Функция срабатывает при переходе в статью по прямой ссылке, т.е. когда нет выбранного
пользователем раздела. Пытается найти категорию статьи в html и вычислить название общего
ключа для переключения дерева статей в нужный раздел. В случае неудачи возвращает
название раздела `desktop`.
*/
function getSection(titles, lang) {
  const category = document.head
    .querySelector('title')
    .getAttribute('main_category');
  for (let key in titles[lang]) {
    if (titles[lang][key] === category) return key;
  }
  return 'desktop';
}

export default function SideBar({ section, setSection }) {
  const { lang } = useParams();
  const language = useSelector(getLanguage);
  const theme = useSelector(getCurrentTheme);
  const catalog = useSelector(selectCatalog);
  const titles = useSelector(selectTitles);

  const [isInput, setIsInput] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState(null);

  const sureSection = section ? section : getSection(titles, lang);
  const articles = catalog[language][sureSection].original;
  const titlesList = Object.keys(titles[language]).filter(
    (item) => item !== sureSection
  );

  function handleSearch({ target }) {
    const value = prepareValue(target.value);
    const isReady = value.replace(/\s/g, '').length >= 3;
    if (isReady) {
      const results = searchArticles(value, articles);
      setResults(results);
    } else setResults(null);
  }

  function changeSection(section) {
    setIsOpen(false);
    setSection(section);
  }

  const searchWithDelay = debounce(handleSearch, 500);

  return (
    <nav className="sidebar">
      <div className="sidebar__header">
        {!isInput && (
          <div
            className="sidebar__title-container"
            onClick={() => setIsOpen(!isOpen)}
          >
            <h2 className="sidebar__title">
              {titles[language][sureSection] || ''}
            </h2>
            <img
              className={isOpen ? 'sidebar__icon_open' : ''}
              src={theme === 'dark' ? treeIcon : treeIconB}
              alt="выбрать"
            />
          </div>
        )}
        <SearchInput
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
                  <ResultItem item={item} language={language} />
                ))
              : 'Ничего не найдено'}
          </ul>
        )}
      </div>
      <ArticlesTree path={sureSection} catalog={catalog} language={language} />
    </nav>
  );
}
