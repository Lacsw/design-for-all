import React, { forwardRef, useEffect } from 'react';
import './Modal.css';
import { useSelector } from 'react-redux';
import { getCurrentTheme } from 'store/slices/theme';
import { Box } from '@mui/material';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { COMMON } from 'utils/translationKeys';

const Modal = forwardRef(function Modal(
  {
    children,
    isOpen,
    onClose,
    onConfirm,
    title,
    large,
    twoBtns,
    isBlocked,
    sx,
  },
  ref
) {
  const theme = useSelector(getCurrentTheme);
  const { t } = useTranslation();
  useEffect(() => {
    if (isOpen) {
      const closeByEsc = (evt) => {
        if (evt.key === 'Escape') {
          twoBtns ? onClose() : onConfirm();
        }
      };
      document.addEventListener('keydown', closeByEsc);
      return () => document.removeEventListener('keydown', closeByEsc);
    }
  }, [isOpen, onClose, onConfirm, twoBtns]);

  const closeByOver = (evt) => {
    if (evt.target.classList.contains('modal')) {
      twoBtns ? onClose() : onConfirm();
    }
  };

  return (
    <Box
      className={clsx('modal', isOpen && 'modal_opened', theme)}
      onMouseDown={closeByOver}
      sx={sx}
      ref={ref}
    >
      <Box
        className="modal__container"
        sx={{
          padding: large ? '30px' : '20px',
          gap: large ? '20px' : '15px',
        }}
      >
        <Box
          component="h2"
          className="modal__title"
          sx={{
            fontSize: large ? '28px' : '18px',
            fontWeight: large ? '700' : '400',
          }}
        >
          {title}
        </Box>

        {children}

        <div className="modal__btns">
          <button
            onClick={onConfirm}
            className="modal__btn modal__btn_confirm"
            type="button"
            aria-label={t(COMMON.MODAL.CONFIRM_BUTTON)}
            disabled={isBlocked}
          />
          {twoBtns && (
            <button
              onClick={onClose}
              className="modal__btn modal__btn_cancel"
              type="button"
              aria-label={t(COMMON.MODAL.CANCEL_BUTTON)}
            />
          )}
        </div>
      </Box>
    </Box>
  );
});

export default Modal;
