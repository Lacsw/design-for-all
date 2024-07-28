import { useLocation } from 'react-router-dom';
import { ArticlesTree } from 'components';
import treeIcon from 'images/tree-menu-icon.svg';
import searchIcon from 'images/search-icon.svg';
import './SideBar.css';

export default function SideBar() {
  const { pathname } = useLocation();
  const firstPath = pathname.split('/')[1];
  const title =
    firstPath === 'web' ? 'Web-приложения' :
    firstPath === 'mobile' ? 'Мобилки' :
    'Десктопчик';

  return (
    <nav className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__title-container">
          <h2 className="sidebar__title">{title}</h2>
          <img src={treeIcon} alt="выбрать" />
        </div>
        <img className="sidebar__search" src={searchIcon} alt="поиск" />
      </div>
      <ArticlesTree path={firstPath} />
    </nav>
  );
}
