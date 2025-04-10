import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectArticle } from 'store/slices/articleSlice';
import { getCurrentTheme } from 'store/slices/theme';
import SocialLinks from './SocialLinks';
import ModalAuthor from './ModalAuthor';
import defaultAvatar from 'images/admin/avatar_default.svg';
import './Author.css';
import { useIsMobile } from 'utils/hooks/useIsMobile';

export default function Author({ showReviewers }) {
  const theme = useSelector(getCurrentTheme);
  const { author } = useSelector(selectArticle);
  // const [isOpen, setIsOpen] = useState(false);

  // Для десктопа локальное состояние для переключения социальных ссылок
  const [desktopSocialOpen, setDesktopSocialOpen] = useState(false);
  // Для мобильных используем отдельное состояние
  const [mobileSocialOpen, setMobileSocialOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useIsMobile(600);

  const socialOpen = isMobile ? mobileSocialOpen : desktopSocialOpen;

  return (
    <div className={`author ${showReviewers ? 'flex-column' : ''}`}>
      <div
        className={`author__wrap ${showReviewers ? 'flex-column' : ''}`}
        onClick={() => {
          if (!isMobile) {
            setIsModalOpen(true);
          }
        }}
      >
        <img
          src={author.avatar || defaultAvatar}
          alt="Аватар"
          className="author__avatar"
        />
        <div className="author__titles">
          <p
            className={`author__name ${
              showReviewers && isMobile
                ? 'author__name-no-cut'
                : 'author__name-cut'
            }`}
          >
            {author.fio}
          </p>
          <p className="author__role">Автор</p>
        </div>
      </div>
      {author.social_media ? (
        <div
          className="author__socials-container"
          onClick={(e) => e.stopPropagation()}
        >
          <SocialLinks socialData={author.social_media} cut={!socialOpen} />
        </div>
      ) : (
        <p className="author__socials-text">(здесь будут контакты автора)</p>
      )}
      {Object.keys(author.social_media).length > 4 &&
        // Для десктопа кнопка всегда отображается,
        // для мобильных — только если showReviewers prop равен true.
        (!isMobile || (isMobile && showReviewers)) && (
          <p
            className={
              socialOpen
                ? 'author__see-more author__see-more_opened ' + theme
                : 'author__see-more ' + theme
            }
            onClick={(e) => {
              // Предотвращаем всплытие, если нужно
              e.stopPropagation();
              if (isMobile) {
                setMobileSocialOpen((prev) => !prev);
              } else {
                setDesktopSocialOpen((prev) => !prev);
              }
            }}
          >
            {socialOpen ? 'Скрыть' : 'Показать все'}
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
