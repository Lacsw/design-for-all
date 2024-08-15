import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ArticlesTree, SearchInput } from 'components';
import { selectCatalog, fetchTitles } from 'store/slices/articleSlice';
import { getLanguage } from 'store/selectors';
import searchArticles, { prepareValue } from 'utils/helpers/search';
import debounce from 'utils/helpers/debounce';
import treeIcon from 'images/tree-menu-icon.svg';
import './SideBar.css';

export default function SideBar() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const language = useSelector(getLanguage);
  const catalog = useSelector(selectCatalog);
  const [isInput, setIsInput] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState(null);
  const firstPath = pathname.split('/')[1];
  const articles = catalog[language][firstPath].original;
  const { titles } = catalog[language];
  const titlesList = titles
    ? Object.keys(titles).filter((item) => item !== firstPath)
    : [];

  useEffect(() => {
    !titles && dispatch(fetchTitles(language));
    setResults(null);
  }, [language, titles, dispatch]);

  function handleSearch({ target }) {
    const value = prepareValue(target.value);
    const isReady = value.replace(/\s/g, '').length >= 3;
    if (isReady) {
      const results = searchArticles(value, articles);
      setResults(results);
    } else setResults(null);
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
            <h2 className="sidebar__title">{titles?.[firstPath] || ''}</h2>
            <img
              className={isOpen && 'sidebar__icon_open'}
              src={treeIcon}
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
            {titlesList.map((path) => (
              <li key={path}>
                <Link to={'/' + path} onClick={() => setIsOpen(false)}>
                  {titles[path]}
                </Link>
              </li>
            ))}
          </ul>
        )}
        {results && (
          <ul className="sidebar__list">
            {results.length
              ? results.map((item) => (
                  <li key={item.uuid}>
                    <Link to={language + '/' + item.uuid}>
                      {item.categories.join('/')}
                    </Link>
                  </li>
                ))
              : 'Ничего не найдено'}
          </ul>
        )}
      </div>
      <ArticlesTree path={firstPath} catalog={catalog} language={language} />
    </nav>
  );
}
