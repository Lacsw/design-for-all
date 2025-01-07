/*
Повторяет логику компонента Author,
только данные тянутся не из автора статьи, а из текущего юзера. 
В будущем добавится своя логика,
поэтому сразу выделили в отдельный компонент.
*/

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { socialIcons } from 'utils/constants';
import { getCurrentTheme, getCurrentUser } from 'store/selectors';
import defaultAvatar from 'images/admin/avatar_default.svg';
import './User.css';

export default function User() {
  const theme = useSelector(getCurrentTheme);
  const user = useSelector(getCurrentUser);
  const [isOpen, setIsOpen] = useState(false);
  const socialList = Object.entries(user.social_media);
  const shownList = isOpen ? socialList : socialList.slice(0, 4);

  const renderSocialMedia = (shownList) => {
    return shownList.map((item, index) => (
      <a
        key={item[1] + index}
        href={item[1]}
        target="_blank"
        rel="noreferrer"
        className="social-link"
      >
        <img
          src={
            socialIcons[item[0]]?.[theme] ||
            socialIcons[item[0]] ||
            socialIcons.instagram
          }
          alt={item[0]}
          className="author__social"
        />
      </a>
    ));
  };

  return (
    <div className="author">
      <img
        src={user.avatar || defaultAvatar}
        alt="Аватар"
        className="author__avatar"
      />
      <div className="author__titles">
        <p className="author__name">{user.fio}</p>
        <p className="author__role">{user.role || 'user'}</p>
      </div>
      {user.social_media ? (
        <div className="author__socials-container">
          {renderSocialMedia(shownList)}
        </div>
      ) : (
        <p className="author__socials-text">(здесь будут контакты автора)</p>
      )}
      {socialList.length > 4 && (
        <p
          className={
            isOpen
              ? 'author__see-more author__see-more_opened'
              : 'author__see-more'
          }
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? 'Скрыть' : 'Показать все'}
        </p>
      )}
    </div>
  );
}
