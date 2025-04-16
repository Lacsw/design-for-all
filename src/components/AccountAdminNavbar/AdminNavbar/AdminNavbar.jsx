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
import { getCurrentTheme } from 'store/slices/theme';
import { adminHash } from 'utils/constants';
import { useTranslation } from 'react-i18next';
import { ADMIN_NAVBAR } from 'utils/constants/translationKeys';
export default function AdminNavbar({ logout }) {
  const { t } = useTranslation();
  const theme = useSelector(getCurrentTheme);
  return (
    <nav className="admin-navbar">
      <ul className="admin-navbar__list">
        <li>
          <HashButton
            to="#/admin/creates"
            kit={adminHash.requests}
            icon={theme === 'dark' ? articlesIconWhite : articlesIconBlack}
            activeIcon={
              theme === 'dark' ? articlesIconBlack : articlesIconWhite
            }
          >
            {t(ADMIN_NAVBAR.REQUESTS)}
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
            {t(ADMIN_NAVBAR.CREATE_USER)}
          </HashButton>
        </li>

        <li className="admin-navbar__item">
          <HashButton
            to="#/admin/profile"
            icon={theme === 'dark' ? profileWhiteIcon : profileBlackIcon}
            activeIcon={theme === 'dark' ? profileBlackIcon : profileWhiteIcon}
          >
            {t(ADMIN_NAVBAR.PROFILE)}
          </HashButton>
        </li>

        <li className="admin-navbar__item">
          <HashButton
            icon={theme === 'dark' ? logoutIconW : logoutIconB}
            onClick={logout}
          >
            {t(ADMIN_NAVBAR.LOGOUT)}
          </HashButton>
        </li>
      </ul>
    </nav>
  );
}
