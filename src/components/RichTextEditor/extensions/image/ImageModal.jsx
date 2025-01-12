// @ts-check
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, IconButton, InputBase, Typography } from '@mui/material';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { Input, Modal } from 'components';
import { sxImageModalRoot } from './styles';
import {
  checkFileType,
  validateImageMimeType,
  validFileTypesImg,
} from 'utils/filesTypes';
import { MAX_SIZE_IMG_B64_BYTES } from './constants';
import { getErrorText } from './helpers';

export const ImageModal = ({ open, onClose, onConfirm }) => {
  const dispatch = useDispatch();

  // 'https://99px.ru/sstorage/53/2023/01/mid_348279_833663.jpg'
  // https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?t=st=1735490873~exp=1735494473~hmac=fbab72f21400732c1537bfc70180bcb6434d381415f8bc9cf96349f6312a2be6&w=1380
  // https://png.pngtree.com/background/20230612/original/pngtree-free-desktop-wallpaper-beautiful-green-fields-picture-image_3188257.jpg

  const [value, setValue] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isDragHover, setIsDragHover] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * @type {[
   *   import('./helpers').TJDImgErrors,
   *   React.Dispatch<React.SetStateAction<import('./helpers').TJDImgErrors>>,
   * ]}
   */
  const [error, setError] = useState('');

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
    setIsLoading(true);
    const file = evt.target.files[0];
    console.log('🚀 ~ handleFileInputChange ~ file:', file);

    /** @type {import('utils/filesTypes').TJDOnImgValidating} */
    function handleCheckEnding(isValid, reason) {
      setIsLoading(false);

      if (!isValid) {
        setError('fileType');
        console.log('handleCheckEnding ERROR isValid', isValid);
        return;
      }

      console.log('handleCheckEnding isValid', isValid);
    }

    if (checkFileType(file, validFileTypesImg)) {
      if (file.size <= MAX_SIZE_IMG_B64_BYTES) {
        validateImageMimeType(file, handleCheckEnding);
      } else {
        setError('fileSize');
      }
    } else {
      setError('fileType');
    }

    setValue(evt.target.value);
    setIsDragging(false);
    setIsDragHover(false);
  };

  const handleSubmit = () => {
    onConfirm(value);
  };

  const handleClearInputBtnClick = (/** @type {any} */ evt) => {
    setValue('');
    setError('');
  };

  // handle "is dragging" state
  useEffect(() => {
    /** @type {HTMLElement | null} */
    const modalEl = modalRef.current;

    /** @type {HTMLElement | null} */
    const modalContainerEl =
      modalRef.current?.querySelector('.modal__container');

    const turnOfDraggingState = (
      /** @type {DragEvent & { target: EventTarget & HTMLElement }} */ evt
    ) => {
      setIsDragging(false);
    };

    const handleDragEnter = (
      /** @type {DragEvent & { target: EventTarget & HTMLElement }} */ evt
    ) => {
      setIsDragging(true);
      window.addEventListener('mouseup', turnOfDraggingState, { once: true });
      window.addEventListener('blur', turnOfDraggingState, { once: true });
    };

    const handleDragEnterForModalRoot = (
      /** @type {DragEvent & { target: EventTarget & HTMLElement }} */ evt
    ) => {
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

  // #region Render
  return (
    // @ts-ignore
    <Modal
      ref={modalRef}
      isOpen={open}
      onClose={onClose}
      onConfirm={handleSubmit}
      twoBtns
      isBlocked={!value || error}
      title="Добавить изображение"
      sx={sxImageModalRoot({ isDragging, isDragHover })}
    >
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

          {/* @ts-ignore */}
          <Input
            className="text-input"
            placeholder="Адрес изображения"
            value={value}
            errors={error}
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

      <Typography color="error">{error && getErrorText(error)}</Typography>
    </Modal>
  );
  // #endregion Render
};
