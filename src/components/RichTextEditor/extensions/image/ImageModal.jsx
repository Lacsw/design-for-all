import { Box, IconButton, InputBase } from '@mui/material';
import { Input, Modal } from 'components';
import React, { useEffect, useRef, useState } from 'react';
import { sxImageModalRoot } from './styles';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';

export const ImageModal = ({ open, onClose, onConfirm }) => {
  const [value, setValue] = useState(
    'https://99px.ru/sstorage/53/2023/01/mid_348279_833663.jpg'
  );
  const [isDragging, setIsDragging] = useState(false);
  const [isDragHover, setIsDragHover] = useState(false);

  /** @type {import('react').RefObject<HTMLInputElement>} */
  const fileInputRef = useRef(null);

  /** @type {import('react').RefObject<HTMLElement>} */
  const modalRef = useRef(null);

  /** @param {import('react').ChangeEvent<HTMLInputElement>} evt */
  const handleTextInputChange = (evt) => {
    setValue(evt.target.value);
  };

  /** @param {import('react').ChangeEvent<HTMLInputElement>} evt */
  const handleFileInputChange = (evt) => {
    setValue(evt.target.value);
    setIsDragging(false);
    setIsDragHover(false);
  };

  const handleSubmit = () => {
    onConfirm(value);
  };

  useEffect(() => {
    /** @type {HTMLElement | null} */
    const modalEl = modalRef.current;
    /** @type {HTMLElement | null} */
    const modalContainerEl =
      modalRef.current?.querySelector('.modal__container');

    const turnOfDraggingState = (evt) => {
      console.log('turnOfDraggingState', evt);
      setIsDragging(false);
    };

    const handleDragEnter = (evt) => {
      console.log('handleDragEnter');
      setIsDragging(true);
      window.addEventListener('mouseup', turnOfDraggingState, { once: true });
      window.addEventListener('blur', turnOfDraggingState, { once: true });
    };

    modalContainerEl?.addEventListener('dragenter', handleDragEnter);
    // modalContainerEl?.addEventListener('dragleave', turnOfDraggingState);
    return () => {
      modalContainerEl?.removeEventListener('dragenter', handleDragEnter);
      // modalContainerEl?.removeEventListener('dragleave', turnOfDraggingState);
    };
  }, []);

  useEffect(() => {
    const fileInputEl = fileInputRef.current;

    const handleDragEnter = () => {
      setIsDragHover(true);
    };

    const turnOffDragHoverState = () => {
      setIsDragHover(false);
    };

    fileInputEl?.addEventListener('dragenter', handleDragEnter);
    fileInputEl?.addEventListener('dragleave', turnOffDragHoverState);
    fileInputEl?.addEventListener('drop', turnOffDragHoverState);
    return () => {
      fileInputEl?.removeEventListener('dragenter', handleDragEnter);
      fileInputEl?.removeEventListener('dragleave', turnOffDragHoverState);
      fileInputEl?.removeEventListener('drop', turnOffDragHoverState);
    };
  }, []);

  return (
    <Modal
      ref={modalRef}
      isOpen={open}
      onClose={onClose}
      onConfirm={handleSubmit}
      twoBtns
      // isBlocked={true}
      title="Добавить изображение"
      sx={sxImageModalRoot({ isDragging, isDragHover })}
    >
      <p>https://99px.ru/sstorage/53/2023/01/mid_348279_833663.jpg</p>
      <p>
        https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?t=st=1735490873~exp=1735494473~hmac=fbab72f21400732c1537bfc70180bcb6434d381415f8bc9cf96349f6312a2be6&w=1380
      </p>
      <p>
        https://png.pngtree.com/background/20230612/original/pngtree-free-desktop-wallpaper-beautiful-green-fields-picture-image_3188257.jpg
      </p>

      <Box className="container">
        <Box className="inputs-container">
          <InputBase
            className="file-input"
            type="file"
            inputRef={fileInputRef}
            onChange={handleFileInputChange}
            inputProps={{
              accept: '.bmp, .gif, .jpg, .jpeg, .png, .tiff, .webp, .avif',
            }}
          />

          <Input
            className="text-input"
            value={value}
            onChange={handleTextInputChange}
          />
        </Box>

        <IconButton
          onClick={() =>
            fileInputRef.current?.dispatchEvent(new MouseEvent('click'))
          }
        >
          <FolderRoundedIcon />
        </IconButton>
      </Box>
    </Modal>
  );
};
