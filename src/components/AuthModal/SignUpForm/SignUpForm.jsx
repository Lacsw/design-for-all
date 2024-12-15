import React, { useCallback, useEffect, useState } from 'react';
import plusIcon from 'images/plus-icon.svg';
import plusIconB from 'images/plus-icon_black.svg';
import { useSelector } from 'react-redux';
import { getCurrentTheme, getLanguage } from 'store/selectors';
import { Input, Modal } from 'components';
import authApi from 'utils/api/auth';

const emailValidation = {
  regex: /^\S+@\S+\.\S+$/,
  min: 6,
  max: 320,
  check(value) {
    return (
      this.regex.test(value) &&
      value.length >= this.min &&
      value.length <= this.max
    );
  },
};

export default function SignUpForm({ onClose }) {
  const lang = useSelector(getLanguage);
  const theme = useSelector(getCurrentTheme);
  const [form, setForm] = useState({
    lang,
    email: '',
    answer: '',
    link_projects: '',
  });
  const [errors, setErrors] = useState({ email: true, link_projects: true });
  const [captcha, setCaptcha] = useState('');
  const [success, setSuccess] = useState(false);
  const [response, setResponse] = useState('');
  const isFormValid = form.answer && !errors.email && !errors.link_projects;

  function handleSubmit(evt) {
    evt.preventDefault();
    const answer = Number(form.answer);
    const link_projects = [form.link_projects];
    const data = { ...form, answer, link_projects };
    authApi
      .regUser(data)
      .then(() => setSuccess(true))
      .catch((message) => {
        setResponse(message);
        getCaptcha();
        setForm((prev) => ({ ...prev, answer: '' }));
      });
  }

  function handleInput({ target }) {
    setForm((prev) => ({ ...prev, [target.name]: target.value }));
    if (target.name === 'answer') return;
    let error;
    if (target.name === 'email') {
      error = !emailValidation.check(target.value);
    } else {
      error = !(/^\S+\.\S+$/.test(target.value) && target.value.length > 3);
    }
    setErrors((prev) => ({ ...prev, [target.name]: error }));
  }

  const getCaptcha = useCallback(() => {
    authApi
      .getCaptcha(theme[0])
      .then((blob) => {
        const objUrl = URL.createObjectURL(blob);
        setCaptcha(objUrl);
      })
      .catch((err) => console.log(err));
  }, [theme]);

  useEffect(() => {
    if (!captcha && !errors.email && !errors.link_projects) {
      getCaptcha();
    }
  }, [captcha, errors, getCaptcha]);

  return (
    <>
      <form
        className="auth-modal__container auth-modal__container_signup"
        onSubmit={handleSubmit}
      >
        <label className="auth-modal__field">
          *Email
          <Input
            type="text"
            value={form.email}
            placeholder="example@domain.com"
            onChange={handleInput}
            name="email"
            errors={errors.email}
          />
        </label>

        <label className="auth-modal__field">
          *Ссылки на ваши проекты
          <div className="auth-modal__input-projects">
            <Input
              type="text"
              value={form.link_projects}
              placeholder="https://example.com/my-project"
              onChange={handleInput}
              name="link_projects"
              errors={errors.link_projects}
            />
            <button type="button" className="auth-modal__input-projects-btn">
              <img
                src={theme === 'dark' ? plusIcon : plusIconB}
                alt="добавить проект"
              />
            </button>
          </div>
        </label>
        {captcha && (
          <label className="auth-modal__field">
            *Капча
            <div className="auth-modal__input-projects">
              <input
                type="text"
                className="auth-modal__input answer"
                placeholder="?"
                value={form.answer}
                name="answer"
                onChange={handleInput}
                autoComplete="off"
                maxLength="2"
              />
              <div
                className="captcha"
                style={{ backgroundImage: `url(${captcha})` }}
              />
            </div>
          </label>
        )}
        {response && (
          <div className="auth-modal__errors">
            {response.email && <p>Указанная почта уже есть в системе.</p>}
            {response.link_projects?.length > 0 && (
              <p>Ссылка на проект была прислана ранее.</p>
            )}
            {response.link_projects ? (
              <p>Измените данные и попробуйте снова.</p>
            ) : (
              <p>Возможно, ошибка в капче. Решите новую.</p>
            )}
          </div>
        )}
        <p className="auth-modal__politics">
          Нажимая кнопку «Зарегистрироваться» вы:
          <br /> Даете право на обработку{' '}
          <a
            href="personal"
            target="_blank"
            rel="noreferrer"
            className="auth-modal__link"
          >
            персональных данных
          </a>{' '}
          Соглашаетесь с{' '}
          <a
            href="terms-of-service"
            target="_blank"
            rel="noreferrer"
            className="auth-modal__link"
          >
            пользовательским соглашением
          </a>
        </p>

        <button
          className={`auth-modal__main-btn ${
            isFormValid ? 'auth-modal__main-btn_active' : ''
          }`}
          type="submit"
          aria-label="кнопка входа"
          disabled={!isFormValid}
        >
          Регистрация
        </button>
      </form>
      {success && (
        <Modal
          title="Заявка отправлена!"
          onConfirm={() => onClose()}
          isOpen
          large
        >
          <p className="small-text">
            Заявка на регистрацию аккаунта отправлена.
          </p>
          <p className="small-text">
            Компетенции каждого автора проверяются администраторами вручную по
            предоставленным ссылкам на проекты.
            <br />
            Неопытные участники к авторству не допускаются.
          </p>
          <p className="small-text">
            После отклонения или одобрения заявки, вы получите уведомление на
            почту: {form.email}
          </p>
        </Modal>
      )}
    </>
  );
}
