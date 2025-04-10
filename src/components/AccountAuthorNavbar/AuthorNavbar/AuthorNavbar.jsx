import './AuthorNavbar.css';

import HashButton from 'components/LinkButton/HashButton';
import { hashPaths } from 'utils/constants';
import newArticleIcon from 'images/account/new-article-icon.svg';
import articlesIconBlack from 'images/account/articles-black-icon.svg';
import articlesIconWhite from 'images/account/articles-white-icon.svg';
import profileWhiteIcon from 'images/account/profile-white-icon.svg';
import profileBlackIcon from 'images/account/profile-black-icon.svg';
import logoutIcon from 'images/account/logout-icon.svg';

export default function AuthorNavbar({ logout }) {
  return (
    <nav className="author-navbar">
      <ul className="author-navbar__list">
        <li>
          <HashButton to={hashPaths.newArticle} icon={newArticleIcon}>
            Написать статью
          </HashButton>
        </li>

        <li className="author-navbar__item">
          <HashButton
            to={hashPaths.articles}
            icon={articlesIconWhite}
            activeIcon={articlesIconBlack}
          >
            Публикации
          </HashButton>
        </li>

        <li className="author-navbar__item">
          <HashButton
            to={hashPaths.profile}
            icon={profileWhiteIcon}
            activeIcon={profileBlackIcon}
          >
            Профиль
          </HashButton>
        </li>

        <li className="author-navbar__item">
          <HashButton onClick={logout} icon={logoutIcon}>
            Выйти
          </HashButton>
        </li>
      </ul>
    </nav>
  );
}