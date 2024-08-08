import { useLocation } from 'react-router-dom';
import { ArticlesTree } from 'components';
import treeIcon from 'images/tree-menu-icon.svg';
import searchIcon from 'images/search-icon.svg';
import './SideBar.css';
import { useState } from 'react';
import searchArticles from 'utils/helpers/search';
import { useSelector } from 'react-redux';
import { selectCatalog } from 'store/slices/articleSlice';
import debounce from 'utils/helpers/debounce';

export default function SideBar() {
  const { pathname } = useLocation();
  const { original } = useSelector(selectCatalog);
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(null);
  const firstPath = pathname.split('/')[1];
  const title =
    firstPath === 'web'
      ? 'веб'
      : firstPath === 'mobile'
      ? 'телефон'
      : 'десктоп';

  function handleSearch({ target }) {
    const searchWords = target.value.split(' ').filter((item) => item);
    const isOk = searchWords.reduce((acc, item) => (acc += item.length), 0);
    if (isOk < 3) {
      setValue(null);
      return;
    }
    const results = searchArticles(searchWords, original);
    setValue(results);
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
        {value && (
          <ul className="sidebar__list">
            {value.length
              ? value.map((item) => (
                  <li key={item.uuid}>{item.categories.join('/') + ' ' + item.weight}</li>
                ))
              : 'Ничего не найдено'}
          </ul>
        )}
      </div>
      <ArticlesTree path={firstPath} />
    </nav>
  );
}
