import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArticlesTree } from 'components';
import { selectCatalog } from 'store/slices/articleSlice';
import searchArticles, { prepareValue } from 'utils/helpers/search';
import debounce from 'utils/helpers/debounce';
import treeIcon from 'images/tree-menu-icon.svg';
import searchIcon from 'images/search-icon.svg';
import './SideBar.css';

export default function SideBar() {
  const { pathname } = useLocation();
  const { original } = useSelector(selectCatalog);
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState(null);
  const firstPath = pathname.split('/')[1];
  const title =
    firstPath === 'web'
      ? 'веб'
      : firstPath === 'mobile'
      ? 'телефон'
      : 'десктоп';

  function handleSearch({ target }) {
    const value = prepareValue(target.value);
    const isReady = value.replace(/\s/g, '').length >= 3;
    if (isReady) {
      const results = searchArticles(value, original);
      setResults(results);
    } else setResults(null);
  }

  const searchWithDelay = debounce(handleSearch, 500);

  return (
    <nav className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__title-container">
          <h2 className="sidebar__title">{title}</h2>
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
                  <li key={item.uuid}>
                    {item.categories.join('/')}
                  </li>
                ))
              : 'Ничего не найдено'}
          </ul>
        )}
      </div>
      <ArticlesTree path={firstPath} />
    </nav>
  );
}
