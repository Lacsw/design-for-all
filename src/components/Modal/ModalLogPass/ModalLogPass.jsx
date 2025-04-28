import { useState } from 'react';
import './ModalLogPass.css';
import { Input, Modal } from 'components';
import { useTranslation } from 'react-i18next';
import { PROFILE } from 'utils/translationKeys';

const logPassValidation = {
  login: /^[А-Яа-яЁё\w-]+$/,
  password: /^[А-Яа-яЁё\w-]+$/,
  min: 8,
  max: 32,
  check(type, value) {
    return (
      this[type].test(value) &&
      value.length >= this.min &&
      value.length <= this.max
    );
  },
};

const initialValues = {
  login: '',
  old_login: '',
  password: '',
  old_password: '',
};

export default function ModalLogPass({ isOpen, onClose, onSave, name }) {
  const { t } = useTranslation();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);
  const isValid =
    !errors[name] &&
    !errors['old_' + name] &&
    values[name] &&
    values['old_' + name];
  const modalType = name === 'login' ? t(PROFILE.MODAL.LOGIN_TITLE) : t(PROFILE.MODAL.PASSWORD_TITLE);

  function handleInput({ target }) {
    let error =
      !target.value || logPassValidation.check(name, target.value)
        ? ''
        : 'Некорректно';
    setErrors((prev) => ({ ...prev, [target.name]: error }));
    setValues((prev) => ({ ...prev, [target.name]: target.value }));
  }

  function addData() {
    onSave({ [name]: values[name], ['old_' + name]: values['old_' + name] });
    onClose();
  }

  return (
    <Modal
      title={t(PROFILE.MODAL.TITLE, { name: modalType })}
      onClose={onClose}
      onConfirm={addData}
      isOpen={isOpen}
      twoBtns
      isBlocked={!isValid}
    >
      <label className="modal-reccomendation__label">
        <span className={'modal-reccomendation__span'}>
          {t(PROFILE.MODAL.OLD_TITLE, { name: modalType })}
        </span>
        <Input
          type={'text'}
          name={'old_' + name}
          value={values['old_' + name]}
          placeholder={'old_' + name}
          onChange={handleInput}
          errors={errors['old_' + name]}
        />
      </label>
      <label className="modal-reccomendation__label">
        <span className={'modal-reccomendation__span'}>
          {t(PROFILE.MODAL.NEW_TITLE, { name: modalType })}
        </span>
        <Input
          type={'text'}
          name={name}
          value={values[name]}
          placeholder={'new_' + name}
          onChange={handleInput}
          errors={errors[name]}
        />
      </label>
    </Modal>
  );
}
