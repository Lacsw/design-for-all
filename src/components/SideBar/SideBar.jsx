import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ArticlesTree } from 'components';
import { selectCatalog, fetchTitles } from 'store/slices/articleSlice';
import { getLanguage } from 'store/selectors';
import searchArticles, { prepareValue } from 'utils/helpers/search';
import debounce from 'utils/helpers/debounce';
import treeIcon from 'images/tree-menu-icon.svg';
import searchIcon from 'images/search-icon.svg';
import './SideBar.css';

export default function SideBar() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const language = useSelector(getLanguage);
  const catalog = useSelector(selectCatalog);
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState(null);
  const firstPath = pathname.split('/')[1];
  const articles = catalog[language][firstPath].original;
  const { titles } = catalog[language];

  useEffect(() => {
    !titles && dispatch(fetchTitles(language));
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
        <div className="sidebar__title-container">
          <h2 className="sidebar__title">{titles?.[firstPath] || ''}</h2>
          <img src={treeIcon} alt="выбрать" />
        </div>
        <img
          className="sidebar__search"
          src={searchIcon}
          alt="поиск"
          onClick={() => setIsOpen(true)}
        />
        {isOpen && (
          <input
            type="text"
            className="sidebar__input"
            onChange={searchWithDelay}
          />
        )}
        {results && (
          <ul className="sidebar__list">
            {results.length
              ? results.map((item) => (
                  <li key={item.uuid}>{item.categories.join('/')}</li>
                ))
              : 'Ничего не найдено'}
          </ul>
        )}
      </div>
      <ArticlesTree path={firstPath} catalog={catalog} language={language} />
    </nav>
  );
}
