import './AuthorNavbar.css';

import LinkButton from '../../LinkButton/LinkButton';
import newArticleIcon from '../../../images/account/new-article-icon.svg';
import articlesIconBlack from '../../../images/account/articles-black-icon.svg';
import articlesIconWhite from '../../../images/account/articles-white-icon.svg';
import profileWhiteIcon from '../../../images/account/profile-white-icon.svg';
import profileBlackIcon from '../../../images/account/profile-black-icon.svg';
import logoutIcon from '../../../images/account/logout-icon.svg';

export default function AuthorNavbar() {
	return (
		<nav className="author-navbar">
			<ul className="author-navbar__list">
				<li>
					<LinkButton to="/author/new-article" icon={newArticleIcon}>
						Написать статью
					</LinkButton>
				</li>

				<li className="author-navbar__item">
					<LinkButton
						to="/author/articles"
						icon={articlesIconWhite}
						activeIcon={articlesIconBlack}
					>
						Публикации
					</LinkButton>
				</li>

				<li className="author-navbar__item">
					<LinkButton
						to="/author/profile"
						icon={profileWhiteIcon}
						activeIcon={profileBlackIcon}
					>
						Профиль
					</LinkButton>
				</li>

				<li className="author-navbar__item">
					<LinkButton to="/logout" icon={logoutIcon}>
						Выйти
					</LinkButton>
				</li>
			</ul>
		</nav>
	);
}
