import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentTheme } from 'store/slices/theme';
import { setCurrentSection } from 'store/slices/catalog/slice';
import './MainNavigationBar.css';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MAIN_NAVBAR } from 'utils/translationKeys';

export default function MainNavigationBar({
  navLinksList,
  onClick,
  activeTab,
}) {
  const dispatch = useDispatch();
  const theme = useSelector(getCurrentTheme);
  const { t } = useTranslation();

  // Обработчик для кнопки "перейти"
  const handleLinkClick = (icon) => {
    // Проверяем, что мы не пытаемся установить ту же секцию
    if (window.location.hash.replace(/^#\/?/, '') !== icon.link) {
      dispatch(setCurrentSection(icon.link));
    }
  };

  return (
    <ul className="main-navbar">
      {navLinksList.map((icon, i) => (
        <li
          className="main-navbar__item"
          key={i}
          onClick={() => onClick({ name: icon.id, index: i })}
        >
          <img
            src={icon[theme]}
            alt={icon.id}
            className="main-navbar__icon"
          />
          <NavLink
            to={icon.link}
            className={cn(
              `main-navbar__link main-navbar__link_${theme === 'dark' ? 'light' : 'dark'
              }`,
              {
                current: activeTab.name === icon.id,
              }
            )}
            onClick={() => handleLinkClick(icon)}
          >
            {t(MAIN_NAVBAR.GO_TO)}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
