import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectArticle } from 'store/slices/articleSlice';
import { getCurrentTheme } from 'store/selectors';
import SocialLinks from './SocialLinks';
import ModalAuthor from './ModalAuthor';
import defaultAvatar from 'images/admin/avatar_default.svg';
import './Author.css';

export default function Author() {
  const theme = useSelector(getCurrentTheme);
  const { author } = useSelector(selectArticle);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <SocialLinks socialData={author.social_media} cut={!isOpen} />
        </div>
      ) : (
        <p className="author__socials-text">(здесь будут контакты автора)</p>
      )}
      {Object.keys(author.social_media).length > 4 && (
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
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
