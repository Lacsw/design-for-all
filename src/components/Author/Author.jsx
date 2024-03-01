import React, { useContext } from 'react';

import './Author.css';
import avatar from '../../images/author/avatar.svg';
import telegramSocial from '../../images/author/telegram-social.svg';
import behanceSocial from '../../images/author/behance-social.svg';
import dribbleSocial from '../../images/author/dribble-social.svg';
import youtubeSocial from '../../images/author/youtube-social.svg';

import { UserContext } from '../../contexts/UserContext';

export default function Author({ isAuthorAccount, avatarImg }) {
	const { user } = useContext(UserContext);
	const ava = 'https://i.ibb.co/FnbXMMq/image.png';

	//TODO: вынеси в консты
	const socialImages = {
		telegram: telegramSocial,
		behance: behanceSocial,
		dribble: dribbleSocial,
		youtube: youtubeSocial,
	};

	return (
		<>
			{user && (
				<div
					className={
						!isAuthorAccount ? 'author' : 'author author_account-position'
					}
				>
					<div className="author__container">
						<img src={ava || avatar} alt="Аватар" className="author__avatar" />
						<div className="author__author">
							<p className="author__name">{user.fio}</p>
							<p className="author__position">{user.role}</p>
						</div>
						{user.social_media ? (
							<div className="author__socials-container">
								{Object.entries(user.social_media).map(
									([key, value], index) => (
										<a
											key={index}
											href={value}
											target="_blank"
											rel="noreferrer"
										>
											<img
												src={socialImages[key]}
												alt="Иконка"
												className="author__social"
											/>
										</a>
									)
								)}
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
