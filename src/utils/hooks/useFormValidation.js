import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { COMMON } from 'utils/translationKeys';

const initialValues = {
  email: '',
  password: '',
  login: '',
};

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const NAME_REGEX = /^[А-Яа-яЁё\w-]{8,32}$/;
const PASSWORD_REGEX = /^[А-Яа-яЁё\w-]{8,32}$/;

function validateEmail(value, errorMessage) {
  return EMAIL_REGEX.test(value) ? '' : errorMessage;
}

function validateName(value, errorMessage) {
  return NAME_REGEX.test(value) ? '' : errorMessage;
}

function validatePassword(value, errorMessage) {
  return PASSWORD_REGEX.test(value) ? '' : errorMessage;
}

export function useFormValidation() {
  const { t } = useTranslation();
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
            error = validateEmail(value, t(COMMON.VALIDATION.EMAIL_MESSAGE));
            break;
          case 'login':
            error = validateName(value, t(COMMON.VALIDATION.NAME_MESSAGE));
            break;
          case 'password':
            error = validatePassword(
              value,
              t(COMMON.VALIDATION.PASSWORD_MESSAGE)
            );
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
    [errors, values, t]
  );

  return { values, handleChange, errors, isValid };
}
