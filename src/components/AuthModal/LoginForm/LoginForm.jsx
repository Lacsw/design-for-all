import React, { useContext } from 'react';
import authApi from '../../../utils/api/auth';
import { useFormValidation } from '../../../utils/hooks/useFormValidation';
import { UserContext } from '../../../contexts/UserContext';
import Input from '../../Input/Input';

function LoginForm({ onClose }) {
  const { user, setUser } = useContext(UserContext);
  const { values, handleChange, errors, isValid } = useFormValidation();
  const isFormValid =
    values.login !== '' &&
    values.password !== '' &&
    isValid &&
    !errors.login &&
    !errors.password;

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const userData = await authApi.loginAuthor({
        login: values.login,
        password: values.password,
      });
      if (!user) setUser(userData);
    } catch (error) {
      console.log(error);
    }
    onClose();
  };

  return (
    <form className="auth-modal__container" onSubmit={handleSubmit}>
      <label className="auth-modal__field">
        Логин
        <Input
          type="text"
          name="login"
          className="auth-modal__input"
          placeholder="Логин"
          value={values.login}
          onChange={handleChange}
          isValid={isValid}
          required={true}
          errors={errors.login}
        />
      </label>

      <label className="auth-modal__field">
        Пароль
        <Input
          name="password"
          type="password"
          className="auth-modal__input"
          placeholder="Пароль"
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
        aria-label="кнопка входа"
        disabled={!isFormValid}
      >
        Войти
      </button>
    </form>
  );
}

export default React.memo(LoginForm);
