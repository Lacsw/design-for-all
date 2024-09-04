import { createPortal } from 'react-dom';
import { modalRoot } from 'utils/modal';
import defaultAvatar from 'images/author/avatar.svg';
import './ModalAuthor.css';
import { useEffect } from 'react';

const ModalAuthor = ({ author, socials, isOpen, onClose }) => {

  useEffect(() => {
    if (!isOpen) return;
    function closeByEsc(evt) {
      evt.key === 'Escape' && onClose();
    }
    document.addEventListener('keydown', closeByEsc);
    return () => document.removeEventListener('keydown', closeByEsc);
  }, [isOpen, onClose]);

  return createPortal(
    <>
      <div
        className={`modal-backdrop${isOpen ? ' modal-backdrop_open' : ''}`}
        onMouseDown={onClose}
      />
      <div className={`modal-content${isOpen ? ' modal-content_open' : ''}`}>
        <img
          src={author.avatar || defaultAvatar}
          alt="Аватар"
          className="modal-content__avatar"
        />
        <div className="modal-content__info">
          <div className="author__titles">
            <p className="author__name">{author.fio}</p>
            <p className="author__role">Автор</p>
          </div>
          {socials.length ? (
            <div className="author__socials-container rowgap">{socials}</div>
          ) : (
            <p className="author__socials-text">
              (здесь будут контакты автора)
            </p>
          )}
        </div>
      </div>
    </>,
    modalRoot
  );
};

export default ModalAuthor;
