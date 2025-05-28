// @ts-check
import React, { useEffect, useRef, useState } from 'react';
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
import { getErrorText, getImgByURL } from './helpers';
import authorApi from 'utils/api/author';
import { useDebounce } from 'utils/hooks';
import { useTranslation } from 'react-i18next';

export const ImageModal = ({ open, onClose, onConfirm }) => {
  const { t } = useTranslation();
  const [value, setValue] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isDragHover, setIsDragHover] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDebouncing, setIsDebouncing] = useState(false);
  /** @type {import('types/react/hooks').TUseState<'text' | 'file'>} */
  const [mode, setMode] = useState('text');

  /** @type {React.MutableRefObject<null | File>} */
  const fileRef = useRef(null);

  /**
   * @type {import('types/react/hooks').TUseState<
   *   import('./helpers').TImgErrors
   * >}
   */
  const [error, setError] = useState('');

  /** @type {React.RefObject<HTMLInputElement>} */
  const fileInputRef = useRef(null);

  /** @type {React.RefObject<HTMLElement>} */
  const modalRef = useRef(null);

  // #region text input change
  const checkURLPattern = (/** @type {string} */ value) => {
    if (!value) {
      setError('');
      setIsDebouncing(false);
      return;
    }

    if (/^https?:\/\/.+\..+$/.test(value)) {
      setError('');
    } else {
      setError('brokenUrl');
    }
    setIsDebouncing(false);
  };
  const checkURLPatternDbnc = useDebounce(checkURLPattern, 1000, true);

  /** @param {React.ChangeEvent<HTMLInputElement>} evt */
  const handleTextInputChange = (evt) => {
    fileRef.current = null;
    if (fileInputRef.current) {
      fileInputRef.current.files = null;
    }

    setValue(evt.target.value);
    setIsDebouncing(true);
    checkURLPatternDbnc(evt.target.value);
  };
  // #endregion text input change

  // #region file input change
  /** @param {React.ChangeEvent<HTMLInputElement>} evt */
  const handleFileInputChange = (evt) => {
    const file = evt.target.files[0];
    if (!file) {
      setError('');
      setMode('text');
      setValue('');
      return;
    }

    setIsLoading(true);
    setError('');
    setMode('file');
    setValue(evt.target.value.replace('fakepath', '...'));
    setIsDragging(false);
    setIsDragHover(false);
    fileRef.current = file;

    /** @type {import('utils/filesTypes').TOnImgValidating} */
    function handleCheckEnding(isValid, reason) {
      setIsLoading(false);

      if (!isValid) {
        if (reason === 'typeError') {
          setError('fileType');
        } else {
          setError('fileReading');
        }
        return;
      } else {
        setError('');
        // теперь ждём нажатия на галку - сабмита. Тогда конвертим в base64 и отправляем запрос на хостинг для получения URL-ки
      }
    }

    if (checkFileType(file, validFileTypesImg)) {
      if (file.size <= MAX_SIZE_IMG_B64_BYTES) {
        validateImageMimeType(file, handleCheckEnding);
      } else {
        setError('fileSize');
        setIsLoading(false);
      }
    } else {
      setError('fileType');
      setIsLoading(false);
    }
  };
  // #endregion file input change

  // #region submit
  const handleSubmit = () => {
    setIsLoading(true);

    if (fileRef.current) {
      authorApi
        .uploadImage(fileRef.current)
        .then((res) => {
          onConfirm(res.original_size);
          setValue('');
          setError('');
          setMode('text');
          fileRef.current = null;
        })
        .catch((err) => {
          setError('onHostingLoading');
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      getImgByURL({ value, setValue, setIsLoading, setError, onConfirm });
    }
  };
  // #endregion submit

  // #region clear btn
  const handleClearInputBtnClick = (/** @type {any} */ evt) => {
    setValue('');
    setError('');
    setMode('text');
    fileRef.current = null;
    if (fileInputRef.current) {
      fileInputRef.current.files = null;
    }
  };
  // #endregion clear btn

  // #region "is dragging" state
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
  // #endregion "is dragging" state

  // #region "drag hover" state
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
  // #endregion "drag hover" state

  // #region Render
  return (
    // @ts-ignore
    <Modal
      ref={modalRef}
      isOpen={open}
      onClose={onClose}
      onConfirm={handleSubmit}
      twoBtns
      isBlocked={!value || error || isLoading || isDebouncing}
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
            disabled={isLoading || isDebouncing}
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
            // @ts-ignore
            disabled={isLoading || mode === 'file'}
            value={value}
            errors={error}
            onChange={handleTextInputChange}
          >
            {value && (
              <IconButton
                disabled={isLoading || isDebouncing}
                onClick={handleClearInputBtnClick}
              >
                <BackspaceIcon />
              </IconButton>
            )}
          </Input>
        </Box>

        <IconButton
          disabled={isLoading || isDebouncing}
          onClick={() =>
            fileInputRef.current?.dispatchEvent(new MouseEvent('click'))
          }
        >
          <FolderRoundedIcon />
        </IconButton>
      </Box>

      <Typography className="text-error" color="error">
        {error ? getErrorText(error, t) : '\u00a0'}
      </Typography>
    </Modal>
  );
  // #endregion Render
};
