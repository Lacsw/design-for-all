import { useState } from 'react';
import './ModalFIO.css';
import { Input, Modal } from 'components';

const fioValidation = {
  regex: /^[А-Яа-яЁё\w\s-]+$/,
  min: 3,
  max: 64,
  check(value) {
    return (
      this.regex.test(value) &&
      value.length >= this.min &&
      value.length <= this.max
    );
  },
};

export default function ModalFIO({ isOpen, onClose, onSave, title }) {
  const [fio, setFio] = useState('');
  const [error, setError] = useState('');

  function handleInput({ target }) {
    let error =
      !target.value || fioValidation.check(target.value) ? '' : 'Некорректно';
    setError(error);
    setFio(target.value);
  }

  function addFio() {
    onSave({ fio });
    onClose();
  }

  return (
    <Modal
      title={title}
      onClose={onClose}
      onConfirm={addFio}
      isOpen={isOpen}
      twoBtns
      isBlocked={error || !fio}
    >
      <label className="modal-reccomendation__label">
        <Input
          type={'text'}
          value={fio}
          placeholder={'example@domain.com'}
          onChange={handleInput}
          errors={error}
        />
      </label>
    </Modal>
  );
}
