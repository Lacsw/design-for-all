import { useState } from 'react';
import './ModalFIO.css';
import { Input, Modal } from 'components';
import { useSelector } from 'react-redux';

const fioValidation = {
  regex: /^[А-Яа-яЁё\w\s-]+$/,
  min: 3,
  max: 64,
  check(value) {
    return (
      value &&
      this.regex.test(value) &&
      value.length >= this.min &&
      value.length <= this.max
    );
  },
};

export default function ModalFIO({ isOpen, onClose, onSave, title }) {
  const { currentUser } = useSelector((state) => state.user);
  const [fio, setFio] = useState('');
  const [error, setError] = useState('');

  function handleInput({ target }) {
    let error =
      currentUser.fio !== target.value && fioValidation.check(target.value) ? '' : 'Некорректно';
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
          placeholder={'Круглова Мария'}
          onChange={handleInput}
          errors={error}
        />
      </label>
    </Modal>
  );
}
