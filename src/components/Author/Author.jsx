import { useSelector } from 'react-redux';

import './Author.css';
import defaultAvatar from '../../images/author/avatar.svg';
import { socialIcons } from '../../utils/constants';

export default function Author({ isAuthorAccount }) {
  const { currentUser } = useSelector((state) => state.user);

  const renderSocialMedia = () => {
    return Object.entries(currentUser.social_media).map(
      ([key, value], index) => (
        <a key={index} href={value} target="_blank" rel="noreferrer">
          <img src={socialIcons[key]} alt="Иконка" className="author__social" />
        </a>
      )
    );
  };

  return (
    <>
      {currentUser && (
        <div
          className={
            !isAuthorAccount ? 'author' : 'author author_account-position'
          }
        >
          <div className="author__container">
            <img
              src={currentUser.avatar || defaultAvatar}
              alt="Аватар"
              className="author__avatar"
            />
            <div className="author__author">
              <p className="author__name">{currentUser.fio}</p>
              <p className="author__position">{currentUser.role}</p>
            </div>
            {currentUser.social_media ? (
              <div className="author__socials-container">
                {renderSocialMedia()}
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
