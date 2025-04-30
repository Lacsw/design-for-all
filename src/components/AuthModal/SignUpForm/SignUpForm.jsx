import React, { useCallback, useEffect, useState } from 'react';
import plusIcon from 'images/plus-icon.svg';
import plusIconB from 'images/plus-icon_black.svg';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getLanguage } from 'store/slices/user';
import { getCurrentTheme } from 'store/slices/theme';
import { Input, Modal } from 'components';
import authApi from 'utils/api/auth';
import { AUTH } from 'utils/translationKeys';

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
  const { t } = useTranslation();
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
          *{t(AUTH.EMAIL_LABEL)}
          <Input
            type="text"
            value={form.email}
            placeholder={t(AUTH.EMAIL_PLACEHOLDER)}
            onChange={handleInput}
            name="email"
            errors={errors.email}
          />
        </label>

        <label className="auth-modal__field">
          *{t(AUTH.PROJECTS_LABEL)}
          <div className="auth-modal__input-projects">
            <Input
              type="text"
              value={form.link_projects}
              placeholder={t(AUTH.PROJECTS_PLACEHOLDER)}
              onChange={handleInput}
              name="link_projects"
              errors={errors.link_projects}
            />
            <button type="button" className="auth-modal__input-projects-btn">
              <img
                src={theme === 'dark' ? plusIcon : plusIconB}
                alt={t(AUTH.ADD_PROJECT)}
              />
            </button>
          </div>
        </label>
        {captcha && (
          <label className="auth-modal__field">
            *{t(AUTH.CAPTCHA_LABEL)}
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
            {response.email && <p>{t(AUTH.EMAIL_EXISTS)}</p>}
            {response.link_projects?.length > 0 && (
              <p>{t(AUTH.PROJECT_LINK_EXISTS)}</p>
            )}
            {response.link_projects ? (
              <p>{t(AUTH.CHANGE_DATA)}</p>
            ) : (
              <p>{t(AUTH.CAPTCHA_ERROR)}</p>
            )}
          </div>
        )}
        <p className="auth-modal__politics">
          {t(AUTH.POLITICS_TEXT)}
          <br /> {t(AUTH.GIVE_PERMISSION)}{' '}
          <a
            href="personal"
            target="_blank"
            rel="noreferrer"
            className="auth-modal__link"
          >
            {t(AUTH.PERSONAL_DATA)}
          </a>{' '}
          {t(AUTH.AGREE_WITH)}{' '}
          <a
            href="terms-of-service"
            target="_blank"
            rel="noreferrer"
            className="auth-modal__link"
          >
            {t(AUTH.TERMS_OF_SERVICE)}
          </a>
        </p>

        <button
          className={`auth-modal__main-btn ${
            isFormValid ? 'auth-modal__main-btn_active' : ''
          }`}
          type="submit"
          aria-label={t(AUTH.SIGNUP_BUTTON_ARIA)}
          disabled={!isFormValid}
        >
          {t(AUTH.SIGNUP_BUTTON)}
        </button>
      </form>
      {success && (
        <Modal
          title={t(AUTH.SUCCESS_TITLE)}
          onConfirm={() => onClose()}
          isOpen
          large
        >
          <p className="small-text">
            {t(AUTH.SUCCESS_MESSAGE)}
          </p>
          <p className="small-text">
            {t(AUTH.SUCCESS_DESCRIPTION)}
          </p>
          <p className="small-text">
            {t(AUTH.SUCCESS_WARNING, { email: form.email })}
          </p>
        </Modal>
      )}
    </>
  );
}
