import './SideBar.css';
import MenuTree from '../MenuTree/MenuTree';
import treeIcon from 'images/tree-menu-icon.svg';
import searchIcon from 'images/search-icon.svg';

export default function SideBar() {
  return (
    <nav className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__title-container">
          <h2 className="sidebar__title">Web-приложения</h2>
          <img src={treeIcon} alt="выбрать" />
        </div>
        <img className="sidebar__search" src={searchIcon} alt="поиск" />
      </div>
      <MenuTree />
    </nav>
  );
}
