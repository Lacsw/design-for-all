import './AdminNavbar.css';

import LinkButton from '../../LinkButton/LinkButton';
import newAuthorWhiteIcon from '../../../images/account/new-author-icon.svg';
import newAuthorBlackIcon from '../../../images/account/new-author-black-icon.svg';
import articlesIconBlack from '../../../images/account/articles-black-icon.svg';
import articlesIconWhite from '../../../images/account/articles-white-icon.svg';
import profileWhiteIcon from '../../../images/account/profile-white-icon.svg';
import profileBlackIcon from '../../../images/account/profile-black-icon.svg';
import logoutIcon from '../../../images/account/logout-icon.svg';

export default function AdminNavbar() {
	return (
		<nav className="admin-navbar">
			<ul className="admin-navbar__list">
				<li>
					<LinkButton
						to="/admin/applications"
						icon={articlesIconWhite}
						activeIcon={articlesIconBlack}
					>
						Заявки
					</LinkButton>
				</li>

				<li className="admin-navbar__item">
					<LinkButton
						to="/admin/create-user"
						icon={newAuthorWhiteIcon}
						activeIcon={newAuthorBlackIcon}
					>
						Создать пользователя
					</LinkButton>
				</li>

				<li className="admin-navbar__item">
					<LinkButton
						to="/admin/profile"
						icon={profileWhiteIcon}
						activeIcon={profileBlackIcon}
					>
						Профиль
					</LinkButton>
				</li>

				<li className="admin-navbar__item">
					<LinkButton to="/logout" icon={logoutIcon}>
						Выйти
					</LinkButton>
				</li>
			</ul>
		</nav>
	);
}
