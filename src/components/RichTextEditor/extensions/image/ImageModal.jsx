import { Input, Modal } from 'components';
import React, { useState } from 'react';

export const ImageModal = ({ open, onClose, onConfirm }) => {
  const [value, setValue] = useState(
    'https://99px.ru/sstorage/53/2023/01/mid_348279_833663.jpg'
  );

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
      isBlocked={true}
      title="Добавить изображение"
    >
      <p>https://99px.ru/sstorage/53/2023/01/mid_348279_833663.jpg</p>
      <p>
        https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?t=st=1735490873~exp=1735494473~hmac=fbab72f21400732c1537bfc70180bcb6434d381415f8bc9cf96349f6312a2be6&w=1380
      </p>
      <p>
        https://png.pngtree.com/background/20230612/original/pngtree-free-desktop-wallpaper-beautiful-green-fields-picture-image_3188257.jpg
      </p>
      <Input value={value} onChange={handleChange} />
    </Modal>
  );
};
