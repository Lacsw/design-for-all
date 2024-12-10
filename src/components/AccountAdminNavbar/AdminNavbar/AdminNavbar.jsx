import './AdminNavbar.css';
import newAuthorWhiteIcon from 'images/account/new-author-icon.svg';
import newAuthorBlackIcon from 'images/account/new-author-black-icon.svg';
import articlesIconBlack from 'images/account/articles-black-icon.svg';
import articlesIconWhite from 'images/account/articles-white-icon.svg';
import profileWhiteIcon from 'images/account/profile-white-icon.svg';
import profileBlackIcon from 'images/account/profile-black-icon.svg';
import logoutIconW from 'images/account/logout-icon.svg';
import logoutIconB from 'images/account/logout-icon_black.svg';
import HashButton from 'components/LinkButton/HashButton';
import { useSelector } from 'react-redux';
import { getCurrentTheme } from 'store/selectors';

export default function AdminNavbar() {
  const theme = useSelector(getCurrentTheme);
  return (
    <nav className="admin-navbar">
      <ul className="admin-navbar__list">
        <li>
          <HashButton
            to="#/admin/creates"
            icon={theme === 'dark' ? articlesIconWhite : articlesIconBlack}
            activeIcon={
              theme === 'dark' ? articlesIconBlack : articlesIconWhite
            }
          >
            Заявки
          </HashButton>
        </li>

        <li className="admin-navbar__item">
          <HashButton
            to="#/admin/create-user"
            icon={theme === 'dark' ? newAuthorWhiteIcon : newAuthorBlackIcon}
            activeIcon={
              theme === 'dark' ? newAuthorBlackIcon : newAuthorWhiteIcon
            }
          >
            Создать пользователя
          </HashButton>
        </li>

        <li className="admin-navbar__item">
          <HashButton
            to="#/admin/profile"
            icon={theme === 'dark' ? profileWhiteIcon : profileBlackIcon}
            activeIcon={theme === 'dark' ? profileBlackIcon : profileWhiteIcon}
          >
            Профиль
          </HashButton>
        </li>

        <li className="admin-navbar__item">
          <HashButton
            to="/"
            icon={theme === 'dark' ? logoutIconW : logoutIconB}
          >
            Выйти
          </HashButton>
        </li>
      </ul>
    </nav>
  );
}
