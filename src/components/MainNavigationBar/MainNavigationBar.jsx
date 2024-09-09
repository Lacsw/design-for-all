import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCurrentTheme } from 'store/selectors';
import './MainNavigationBar.css';

export default function MainNavigationBar({
  navLinksList,
  onClick,
  activeTab,
  setSection
}) {
  const theme = useSelector(getCurrentTheme);
  return (
    <ul className="main-navbar">
      {navLinksList.map((icon, i) => (
        <li
          className="main-navbar__item"
          key={i}
          onClick={() => onClick({ name: icon.name, index: i })}
        >
          <img
            src={icon[theme]}
            alt={icon.name}
            className="main-navbar__icon"
          />
          <div
            className={cn(
              `main-navbar__link main-navbar__link_${
                theme === 'dark' ? 'light' : 'dark'
              }`,
              {
                current: activeTab.name === icon.name,
              }
            )}
            onClick={() => setSection(icon.link)}
          >
            Перейти
          </div>
        </li>
      ))}
    </ul>
  );
}
