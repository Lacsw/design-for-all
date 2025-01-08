import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectArticle } from 'store/slices/articleSlice';
import { socialIcons } from 'utils/constants';
import { getCurrentTheme } from 'store/selectors';
import ModalAuthor from './ModalAuthor';
import defaultAvatar from 'images/admin/avatar_default.svg';
import './Author.css';

export default function Author() {
  const theme = useSelector(getCurrentTheme);
  const { author } = useSelector(selectArticle);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const socialList = Object.entries(author.social_media);
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
      <div className="author__wrap" onClick={() => setIsModalOpen(true)}>
        <img
          src={author.avatar || defaultAvatar}
          alt="Аватар"
          className="author__avatar"
        />
        <div className="author__titles">
          <p className="author__name">{author.fio}</p>
          <p className="author__role">Автор</p>
        </div>
      </div>
      {author.social_media ? (
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
              ? 'author__see-more author__see-more_opened ' + theme
              : 'author__see-more ' + theme
          }
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? 'Скрыть' : 'Показать все'}
        </p>
      )}
      <ModalAuthor
        author={author}
        socials={renderSocialMedia(socialList)}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
