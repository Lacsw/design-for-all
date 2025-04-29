/*
Повторяет логику компонента Author,
только данные тянутся не из автора статьи, а из текущего юзера. 
В будущем добавится своя логика,
поэтому сразу выделили в отдельный компонент.
*/

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { socialIcons } from 'utils/constants';
import { getCurrentUser } from 'store/slices/user';
import { getCurrentTheme } from 'store/slices/theme';
import defaultAvatar from 'images/admin/avatar_default.svg';
import { getSocialHref } from 'utils/socials';
import './User.css';
import { useTranslation } from 'react-i18next'; 
import { USER } from 'utils/translationKeys';

export default function User() {
  const { t } = useTranslation();
  const theme = useSelector(getCurrentTheme);
  const user = useSelector(getCurrentUser);
  const [isOpen, setIsOpen] = useState(false);
  const socialList = user?.social_media
    ? Object.entries(user.social_media)
    : [];
  const shownList = isOpen ? socialList : socialList.slice(0, 4);

  const renderSocialMedia = (shownList) => {
    return shownList.map(([name, url], index) => (
      <a
        key={`${name}-${index}`}
        href={getSocialHref(name, url)}
        target="_blank"
        rel="noreferrer"
        className="social-link"
      >
        <img
          src={
            socialIcons[name]?.[theme] ||
            socialIcons[name] ||
            socialIcons['default'][theme]
          }
          alt={name}
          className="user__social"
        />
      </a>
    ));
  };

  return (
    <div className="user">
      <img
        src={user.avatar || defaultAvatar}
        alt="Аватар"
        className="user__avatar"
      />
      <div className="user__titles">
        <p className="user__name">{user.fio}</p>
        <p className="user__role">{user.role || 'user'}</p>
      </div>
      {user.social_media ? (
        <div className="user__socials-container">
          {renderSocialMedia(shownList)}
        </div>
      ) : (
        <p className="user__socials-text">{t(USER.SOCIALS_MISSING)}</p>
      )}
      {socialList.length > 4 && (
        <p
          className={
            isOpen ? 'user__see-more user__see-more_opened' : 'user__see-more'
          }
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? t(USER.SEE_LESS) : t(USER.SEE_MORE)}
        </p>
      )}
    </div>
  );
}
