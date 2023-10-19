import React, { useContext } from 'react';

import './Author.css';
import avatar from '../../images/author/avatar.svg';
import social from '../../images/author/social-icon.svg';
import social1 from '../../images/author/social-icon (2).svg';
import social2 from '../../images/author/social-icon (3).svg';
import social3 from '../../images/author/social-icon (4).svg';
import { UserContext } from '../../contexts/UserContext';

export default function Author({ isAuthorAccount, avatarImg }) {
	const user = useContext(UserContext);

	return (
		<>
			{user && (
				<div
					className={
						!isAuthorAccount ? 'author' : 'author author_account-position'
					}
				>
					<div className="author__container">
						<img
							src={avatar} /*{user.avatar || avatar}*/
							alt="Аватар"
							className="author__avatar"
						/>
						<div className="author__author">
							<p className="author__name">{user.fio}</p>
							<p className="author__position">{user.role}</p>
						</div>
						{user.social_media.length ? (
							<div className="author__socials-container">
								<img src={social} alt="Иконка" className="author__social" />
								<img src={social1} alt="Иконка" className="author__social" />
								<img src={social2} alt="Иконка" className="author__social" />
								<img src={social3} alt="Иконка" className="author__social" />
							</div>
						) : (
							<p className="author__socials-text">
								(здесь будут контакты автора)
							</p>
						)}

						{!isAuthorAccount && (
							<p className="author__see-more">Показать все</p>
						)}
					</div>
				</div>
			)}
		</>
	);
}
