import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import authApi from 'utils/api/auth';
import { useFormValidation } from 'utils/hooks/useFormValidation';
import { signInStart, signInSuccess, signInFailure } from 'store/slices/user';
import Input from 'components/Input/Input';
import defaultAvatar from '../../../images/admin/avatar_default.svg';
import { AUTH } from 'utils/translationKeys';

function LoginForm({ onClose }) {
  // TODO: обработать загрузгу и ошибки валидации/сервера
  // const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { values, handleChange, errors, isValid } = useFormValidation();
  const { t } = useTranslation();
  const isFormValid =
    values.login !== '' &&
    values.password !== '' &&
    isValid &&
    !errors.login &&
    !errors.password;

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (!values.login || !values.password) {
      return dispatch(signInFailure(t(AUTH.FILL_ALL_FIELDS)));
    }

    try {
      dispatch(signInStart());
      const userData = await authApi.loginAuthor({
        login: values.login,
        password: values.password,
      });

      if (!userData.avatar || userData.avatar.includes('some-site')) {
        userData.avatar = defaultAvatar;
      }

      dispatch(signInSuccess(userData));

      // Проверяем наличие returnUrl и выполняем редирект
      const returnUrl = searchParams.get('returnUrl');
      if (returnUrl) {
        // Используем window.location для перехода по хеш-роуту
        window.location.href = decodeURIComponent(returnUrl);
      } else {
        // Если нет returnUrl, просто закрываем модальное окно
        onClose();
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <form className="auth-modal__container" onSubmit={handleSubmit}>
      <label className="auth-modal__field">
        {t(AUTH.LOGIN_LABEL)}
        <Input
          type="text"
          name="login"
          className="auth-modal__input"
          placeholder={t(AUTH.LOGIN_PLACEHOLDER)}
          value={values.login}
          onChange={handleChange}
          isValid={isValid}
          required={true}
          errors={errors.login}
        />
      </label>

      <label className="auth-modal__field">
        {t(AUTH.PASSWORD_LABEL)}
        <Input
          name="password"
          type="password"
          className="auth-modal__input"
          placeholder={t(AUTH.PASSWORD_PLACEHOLDER)}
          value={values.password}
          onChange={handleChange}
          isValid={isValid}
          required={true}
          errors={errors.password}
        />
      </label>

      <button
        className={`auth-modal__main-btn ${
          isFormValid ? 'auth-modal__main-btn_active' : ''
        }`}
        type="submit"
        aria-label={t(AUTH.LOGIN_BUTTON_ARIA)}
        disabled={!isFormValid}
      >
        {t(AUTH.LOGIN_BUTTON)}
      </button>
    </form>
  );
}

export default memo(LoginForm);
