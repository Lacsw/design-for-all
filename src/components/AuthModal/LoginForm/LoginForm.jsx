import authApi from '../../../utils/api/auth';
import { useFormValidation } from '../../../utils/hooks/useFormValidation';
import Input from '../../Input/Input';

export default function LoginForm({ onClose }) {
  const { values, handleChange, errors, isValid } = useFormValidation();
  const isFormValid =
    values.login !== '' &&
    values.password !== '' &&
    isValid &&
    !errors.login &&
    !errors.password;

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    console.log(values);
    try {
      const user = authApi.loginAuthor({
        login: values.login,
        password: values.password,
      });
      //TODO: достать юзера в стейт
      console.log(user);
    } catch (error) {
      console.log(error);
    }
    onClose();
  };

  return (
    <form className="auth-modal__container">
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
        onClick={handleSubmit}
        className={`auth-modal__main-btn ${
          isFormValid ? 'auth-modal__main-btn_active' : ''
        }`}
        type="submit"
        aria-label="кнопка входа"
        disabled={isFormValid}
      >
        Войти
      </button>
    </form>
  );
}
