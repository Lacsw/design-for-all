import cn from 'classnames';
import { useSelector } from 'react-redux';
import { getCurrentTheme } from 'store/slices/theme';
import './MainNavigationBar.css';
import { NavLink } from 'react-router-dom';

export default function MainNavigationBar({
  navLinksList,
  onClick,
  activeTab,
  setSection,
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
          <NavLink
            to={icon.link}
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
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
