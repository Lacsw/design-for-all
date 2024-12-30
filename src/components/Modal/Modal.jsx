import React, { useEffect } from 'react';
import './Modal.css';
import { useSelector } from 'react-redux';
import { getCurrentTheme } from 'store/selectors';
import { Box } from '@mui/material';

const Modal = ({
  children,
  isOpen,
  onClose,
  onConfirm,
  title,
  large,
  twoBtns,
  isBlocked,
  sx,
}) => {
  const theme = useSelector(getCurrentTheme);
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
      className={`modal ${isOpen && 'modal_opened'} ${theme}`}
      onMouseDown={closeByOver}
      sx={sx}
    >
      <div
        className="modal__container"
        style={{
          padding: large ? '30px' : '20px',
          gap: large ? '20px' : '15px',
        }}
      >
        <h2
          className="modal__title"
          style={{
            fontSize: large ? '28px' : '18px',
            fontWeight: large ? '700' : '400',
          }}
        >
          {title}
        </h2>

        {children}

        <div className="modal__btns">
          <button
            onClick={onConfirm}
            className="modal__btn modal__btn_confirm"
            type="button"
            aria-label="кнопка подтверждения"
            disabled={isBlocked}
          />
          {twoBtns && (
            <button
              onClick={onClose}
              className="modal__btn modal__btn_cancel"
              type="button"
              aria-label="кнопка закрытия"
            />
          )}
        </div>
      </div>
    </Box>
  );
};

export default Modal;
