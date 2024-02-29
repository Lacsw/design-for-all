import { useCallback, useState } from 'react';

const initialValues = {
  email: '',
  password: '',
  login: '',
};

const errorMessages = {
  email:
    'Некорректно введено e-mail. Допустимые символы для ввода: только цифры, латинские буквы, нижнее подчеркивание, дефис, знак @ и точка',
  name: 'Некорректно введено Имя. Допустимые символы для ввода: от 2 до 50 символов, пробел, дефис, кириллические, латинские буквы',
  password:
    'Пароль должен состоять из 6 символов, буквы в верхнем и нижнем регистре, пробел, дефис',
};

function validateEmail(value) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(value) ? '' : errorMessages.email;
}

function validateName(value) {
  const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]{2,50}$/;
  return regex.test(value) ? '' : errorMessages.name;
}

function validatePassword(value) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\s-]{6,}$/;
  return regex.test(value) ? '' : errorMessages.password;
}

export function useFormValidation() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);
  const [isValid, setIsValid] = useState(false);

  const handleChange = useCallback(
    (event) => {
      const target = event.target;
      const name = target.name;
      const value = target.value.trim();
      let error = '';

      if (value.trim() !== '') {
        switch (name) {
          case 'email':
            error = validateEmail(value);
            break;
          case 'login':
            error = validateName(value);
            break;
          case 'password':
            error = validatePassword(value);
            break;
          default:
            break;
        }
      }

      setErrors({ ...errors, [name]: error });
      setValues({ ...values, [name]: value });
      const form = target.closest('form');
      if (form) {
        setIsValid(form.checkValidity());
      }
    },
    [errors, values]
  );

  return { values, handleChange, errors, isValid };
}
