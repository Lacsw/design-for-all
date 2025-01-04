import { Box, IconButton, InputBase } from '@mui/material';
import { Input, Modal } from 'components';
import React, { useRef, useState } from 'react';
import { sxImageModalRoot } from './styles';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';

export const ImageModal = ({ open, onClose, onConfirm }) => {
  const [value, setValue] = useState(
    'https://99px.ru/sstorage/53/2023/01/mid_348279_833663.jpg'
  );

  /** @param {import('react').ChangeEvent<HTMLInputElement>} evt */
  const handleChange = (evt) => {
    setValue(evt.target.value);
  };

  const handleSubmit = () => {
    onConfirm(value);
  };

  const ref = useRef(null);

  /** @param {import('react').ChangeEvent<HTMLInputElement>} evt */
  const handleChange2 = (evt) => {
    console.log('handleChange2', evt);
    setValue(evt.target.value);
  };

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      onConfirm={handleSubmit}
      twoBtns
      // isBlocked={true}
      title="Добавить изображение"
      sx={sxImageModalRoot}
    >
      <p>https://99px.ru/sstorage/53/2023/01/mid_348279_833663.jpg</p>
      <p>
        https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?t=st=1735490873~exp=1735494473~hmac=fbab72f21400732c1537bfc70180bcb6434d381415f8bc9cf96349f6312a2be6&w=1380
      </p>
      <p>
        https://png.pngtree.com/background/20230612/original/pngtree-free-desktop-wallpaper-beautiful-green-fields-picture-image_3188257.jpg
      </p>

      <Box className="input-container">
        <InputBase
          className="file-input"
          type="file"
          inputRef={ref}
          onChange={handleChange2}
        />
        <Input className="text-input" value={value} onChange={handleChange} />
      </Box>

      <IconButton
        onClick={() => ref.current?.dispatchEvent(new MouseEvent('click'))}
      >
        <FolderRoundedIcon />
      </IconButton>
    </Modal>
  );
};
