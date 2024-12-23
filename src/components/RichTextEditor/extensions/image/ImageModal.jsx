import { Input, Modal } from 'components';
import React from 'react';

export const ImageModal = ({ open, onClose, onConfirm }) => {
  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      onConfirm={onConfirm}
      twoBtns
      title="Добавить изображение"
    >
      <Input value="" />
    </Modal>
  );
};
