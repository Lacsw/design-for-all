import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';

import './AuthModal.css';
import { LoginForm, SignUpForm } from 'components';
import { modalRoot } from 'utils/modal';
import { AUTH } from 'utils/translationKeys';

/**
 * modalMode - 'login' (по ум.) | 'signUp'
 */
const AuthModal = ({ isOpen, onChange, modalMode = 'login' }) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (isOpen) {
      const closeByEsc = (evt) => {
        if (evt.key === 'Escape') onChange();
      };
      document.addEventListener('keydown', closeByEsc);
      return () => document.removeEventListener('keydown', closeByEsc);
    }
  }, [isOpen, onChange]);

  const closeByOver = (evt) => {
    if (evt.target.classList.contains('auth-modal')) {
      onChange();
    }
  };

  const handleSignUpTabClick = () => {
    onChange('signUp');
  };

  const handleLoginTabClick = () => {
    onChange('login');
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
          {t(AUTH.LOGIN)}
        </button>
        <button
          className={
            modalMode === 'signUp'
              ? 'auth-modal__active-btn'
              : 'auth-modal__inactive-btn'
          }
          onClick={handleSignUpTabClick}
        >
          {t(AUTH.SIGNUP)}
        </button>
      </div>
      {modalMode === 'login' ? (
        <LoginForm onClose={onChange} />
      ) : (
        <SignUpForm onClose={onChange} />
      )}
    </div>,
    modalRoot
  );
};

export default AuthModal;
