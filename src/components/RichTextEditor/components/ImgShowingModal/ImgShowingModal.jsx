// @ts-check
import { Box, Fade, IconButton, Modal, styled } from '@mui/material';
import React, { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearImgForShow, selectImgForShow } from 'store/slices/article';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { IMG_SHOWING_MODAL_ANIM_DUR } from './constants';
import { closeModalEvt, openModalEvt } from 'utils/modals';

const StyledModal = styled(Modal)(() => {
  return {
    right: 'var(--modal-corrector)',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '.container': {
      position: 'relative',

      '&:focus-visible': {
        outline: 'none',
      },
    },

    '.closing-btn': {
      position: 'absolute',
      top: '7px',
      right: '9px',
    },

    img: {
      borderRadius: '16px',
      minWidth: '60vw',
      width: 'fit-content',
      maxWidth: 'min(60vw, "1100px")',
      height: 'auto',
      maxHeight: '90vh',
      objectFit: 'cover',
      objectPosition: 'center',
    },
  };
});

export const ImgShowingModal = () => {
  const dispatch = useDispatch();
  const imgForSHow = useSelector(selectImgForShow);

  const [isOpen, setIsOpen] = useState(!!imgForSHow);

  const close = () => {
    setIsOpen(false);
    window.dispatchEvent(closeModalEvt);
    setTimeout(() => {
      dispatch(clearImgForShow());
    }, IMG_SHOWING_MODAL_ANIM_DUR);
  };

  useLayoutEffect(() => {
    if (imgForSHow) {
      window.dispatchEvent(openModalEvt);
      setIsOpen(true);
    }
  }, [imgForSHow]);

  return (
    <StyledModal className="imgShowingModal-root" open={isOpen} onClose={close}>
      <Fade in={isOpen} timeout={IMG_SHOWING_MODAL_ANIM_DUR}>
        <Box className="container">
          <IconButton className="closing-btn" onClick={close}>
            <CloseRoundedIcon />
          </IconButton>
          <img src={imgForSHow} alt="" />
        </Box>
      </Fade>
    </StyledModal>
  );
};
