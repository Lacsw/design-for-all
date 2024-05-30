import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import './AuthModal.css';
import { LoginForm, SignUpForm } from 'components';
import { modalRoot } from 'utils/modal';

/**
 * modalMode - 'login' (по ум.) | 'signUp'
 */
const AuthModal = ({ isOpen, onClose, modalMode = 'login', setModalMode }) => {
  useEffect(() => {
    if (isOpen) {
      const closeByEsc = (evt) => {
        if (evt.key === 'Escape') onClose();
      };
      document.addEventListener('keydown', closeByEsc);
      return () => document.removeEventListener('keydown', closeByEsc);
    }
  }, [isOpen, onClose]);

  const closeByOver = (evt) => {
    if (evt.target.classList.contains('auth-modal')) {
      onClose();
    }
  };

  const handleSignUpTabClick = () => {
    setModalMode('signUp');
  };

  const handleLoginTabClick = () => {
    setModalMode('login');
  };

  return ReactDOM.createPortal(
    <div
      className={`auth-modal ${isOpen && 'auth-modal_opened'}`}
      onClick={closeByOver}
    >
      <div className="auth-modal__btns">
        <button
          className={
            modalMode === 'login'
              ? 'auth-modal__active-btn'
              : 'auth-modal__inactive-btn auth-modal__inactive-btn_login'
          }
          onClick={handleLoginTabClick}
        >
          Авторизация
        </button>
        <button
          className={
            modalMode === 'signUp'
              ? 'auth-modal__active-btn'
              : 'auth-modal__inactive-btn'
          }
          onClick={handleSignUpTabClick}
        >
          Регистрация
        </button>
      </div>
      {modalMode === 'login' ? (
        <LoginForm onClose={onClose} />
      ) : (
        <SignUpForm onClose={onClose} />
      )}
    </div>,
    modalRoot
  );
};

export default AuthModal;
