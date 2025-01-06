import React, { useEffect, useRef, useState } from 'react';
import { Box, IconButton, InputBase, Typography } from '@mui/material';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { Input, Modal } from 'components';
import { sxImageModalRoot } from './styles';
import { checkFileType, validFileTypesImg } from 'utils/filesTypes';
import { MAX_SIZE_IMG_B64_BYTES } from './constants';

export const ImageModal = ({ open, onClose, onConfirm }) => {
  // 'https://99px.ru/sstorage/53/2023/01/mid_348279_833663.jpg'
  const [value, setValue] = useState('');
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
    const file = evt.target.files[0];
    console.log(
      '🚀 ~ handleFileInputChange ~ evt.target.files[0]:',
      evt.target.files[0]
    );
    const isTypeValid = checkFileType(file, validFileTypesImg);
    console.log('🚀 ~ handleFileInputChange ~ isTypeValid:', isTypeValid);
    const isSizeValid = file.size <= MAX_SIZE_IMG_B64_BYTES;
    console.log('🚀 ~ handleFileInputChange ~ isSizeValid:', isSizeValid);

    setValue(evt.target.value);
    setIsDragging(false);
    setIsDragHover(false);
  };

  const handleSubmit = () => {
    onConfirm(value);
  };

  const handleClearInputBtnClick = (evt) => {
    setValue('');
  };

  // handle "is dragging" state
  useEffect(() => {
    /** @type {HTMLElement | null} */
    const modalEl = modalRef.current;

    /** @type {HTMLElement | null} */
    const modalContainerEl =
      modalRef.current?.querySelector('.modal__container');

    const turnOfDraggingState = (evt) => {
      setIsDragging(false);
    };

    const handleDragEnter = (evt) => {
      setIsDragging(true);
      window.addEventListener('mouseup', turnOfDraggingState, { once: true });
      window.addEventListener('blur', turnOfDraggingState, { once: true });
    };

    const handleDragEnterForModalRoot = (evt) => {
      /* If we will move out of div.modal__container - event "dragenter" will be emitted on div.modal,
        so we can disable dashed borders around input.

        Other events (due to bubbling) will be ignored because their targets
        may be elements inside div.modal__container, which would cause unwanted border hiding.
      */
      if (evt.target.classList.contains('modal')) {
        turnOfDraggingState(evt);
      }
    };

    modalContainerEl?.addEventListener('dragenter', handleDragEnter);
    modalEl?.addEventListener('dragenter', handleDragEnterForModalRoot);
    return () => {
      modalContainerEl?.removeEventListener('dragenter', handleDragEnter);
      modalEl?.removeEventListener('dragenter', handleDragEnterForModalRoot);
    };
  }, []);

  // handle "drag hover" state
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
      {/* <p>https://99px.ru/sstorage/53/2023/01/mid_348279_833663.jpg</p>
      <p>
        https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?t=st=1735490873~exp=1735494473~hmac=fbab72f21400732c1537bfc70180bcb6434d381415f8bc9cf96349f6312a2be6&w=1380
      </p>
      <p>
        https://png.pngtree.com/background/20230612/original/pngtree-free-desktop-wallpaper-beautiful-green-fields-picture-image_3188257.jpg
      </p> */}

      <Typography className="tip">
        Укажите ссылку или выберите/перетащите файл
      </Typography>

      <Box className="container">
        <Box className="inputs-container">
          <InputBase
            className="file-input"
            type="file"
            inputRef={fileInputRef}
            onChange={handleFileInputChange}
            inputProps={{
              accept: '.jpg, .jpeg, .png, .webp, .gif',
            }}
          />

          <Input
            className="text-input"
            placeholder="Адрес изображения"
            value={value}
            onChange={handleTextInputChange}
          >
            {value && (
              <IconButton onClick={handleClearInputBtnClick}>
                <BackspaceIcon />
              </IconButton>
            )}
          </Input>
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
