import { createPortal } from 'react-dom';
import { modalRoot } from 'utils/modal';
import defaultAvatar from 'images/admin/avatar_default.svg';
import './ModalAuthor.css';
import { useCallback, useEffect, useState } from 'react';
import Preloader from 'components/Preloader/Preloader';
import authorApi from 'utils/api/author';
import SocialLinks from './SocialLinks';

const ModalAuthor = ({ author, isOpen, onClose }) => {
  const [reviewer, setReviewer] = useState({});
  const closeModal = useCallback(() => {
    onClose();
    setReviewer({});
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    function closeByEsc(evt) {
      evt.key === 'Escape' && closeModal();
    }
    document.addEventListener('keydown', closeByEsc);
    return () => document.removeEventListener('keydown', closeByEsc);
  }, [isOpen, closeModal]);

  useEffect(() => {
    if (author.fio || !isOpen) return;
    authorApi
      .getReviewer(author.uuid)
      .then((data) => setReviewer(data))
      .catch((err) => console.log(err));
  }, [author, isOpen]);

  return createPortal(
    <>
      <div
        className={`modal-backdrop${isOpen ? ' modal-backdrop_open' : ''}`}
        onMouseDown={closeModal}
      />
      <div
        className={`modal-content${isOpen ? ' modal-content_open' : ''}`}
        style={{ top: isOpen ? '160px' : author.fio ? '50px' : '200px' }}
      >
        <img
          src={author.avatar || defaultAvatar}
          alt="Аватар"
          className="modal-content__avatar"
        />
        {!author.fio && !reviewer.fio ? (
          <Preloader size={75} />
        ) : (
          <div className="modal-content__info">
            <div className="author__titles">
              <p className="author__name">{author.fio || reviewer.fio}</p>
              <p className="author__role">Автор</p>
            </div>
            {Object.keys(author.social_media || {}).length ||
            Object.keys(reviewer.social_media || {}).length ? (
              <div className="author__socials-container rowgap">
                <SocialLinks
                  socialData={author.social_media || reviewer.social_media}
                />
              </div>
            ) : (
              <p className="author__socials-text">
                (здесь будут контакты автора)
              </p>
            )}
          </div>
        )}
      </div>
    </>,
    modalRoot
  );
};

export default ModalAuthor;
