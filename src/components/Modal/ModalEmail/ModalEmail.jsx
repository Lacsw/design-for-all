import { useState } from 'react';
import './ModalEmail.css';
import { Input, Modal } from 'components';

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

export default function ModalEmail({ isOpen, onClose, onSave, title }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  function handleInput({ target }) {
    let error =
      !target.value || emailValidation.check(target.value)
        ? ''
        : 'Некорректный Email';
    setError(error);
    setEmail(target.value);
  }

  function addEmail() {
    onSave('email', email);
    onClose();
  }

  return (
    <Modal
      title={title}
      onClose={onClose}
      onConfirm={addEmail}
      isOpen={isOpen}
      twoBtns
      isBlocked={error || !email}
    >
      <label className="modal-reccomendation__label">
        <Input
          type={'email'}
          value={email}
          placeholder={'example@domain.com'}
          onChange={handleInput}
          errors={error}
        />
      </label>
    </Modal>
  );
}
