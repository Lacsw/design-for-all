import React from 'react';
import plusIcon from 'images/plus-icon.svg';

export default function SignUpForm({ onClose }) {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onClose();
  };

  return (
    <form className="auth-modal__container auth-modal__container_signup">
      <label className="auth-modal__field">
        *Email
        <input type="Email" className="auth-modal__input" placeholder="email" />
      </label>

      <label className="auth-modal__field">
        *Ссылки на ваши проекты
        <div className="auth-modal__input-projects">
          <input
            type="url"
            className="auth-modal__input"
            placeholder="Ссылка на проект"
          />
          <button className="auth-modal__input-projects-btn">
            <img src={plusIcon} alt="добавить проект" />
          </button>
        </div>
      </label>

      <p className="auth-modal__politics">
        Нажимая кнопку «Зарегистрироваться» вы:
        <br /> Даете право на обработку{' '}
        <a href="personal" target="_blank" rel="noreferrer">
          персональных данных
        </a>{' '}
        Соглашаетесь с{' '}
        <a href="terms-of-service" target="_blank" rel="noreferrer">
          пользовательским соглашением
        </a>
      </p>

      <button
        onClick={handleSubmit}
        className="auth-modal__main-btn"
        type="submit"
        aria-label="кнопка входа"
      >
        Регистрация
      </button>
    </form>
  );
}
