import { Input, Modal } from 'components';
import React, { useState } from 'react';

export const ImageModal = ({ open, onClose, onConfirm }) => {
  const [value, setValue] = useState('');

  const handleChange = (evt) => {
    setValue(evt.target.value);
  };

  const handleSubmit = () => {
    onConfirm(value);
  };

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      onConfirm={handleSubmit}
      twoBtns
      title="Добавить изображение"
    >
      <Input value={value} onChange={handleChange} />
    </Modal>
  );
};
