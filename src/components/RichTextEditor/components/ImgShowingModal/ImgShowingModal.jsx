// @ts-check
import { Box, Fade, IconButton, Modal, styled } from '@mui/material';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearImgForShow, selectImgForShow } from 'store/slices/article';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { IMG_SHOWING_MODAL_ANIM_DUR } from './constants';
import { closeModalEvt, openModalEvt } from 'utils/modals';
import { store } from '../../../../store';

const StyledModal = styled(Modal)(({ theme }) => {
  const isLight = store.getState().theme.currentTheme === 'light';
  const media = theme.breakpoints;

  return {
    '--img-orig-w': '0px',
    right: 'var(--modal-corrector)',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '.container': {
      overflow: 'hidden',
      position: 'relative',
      borderRadius: '16px',

      backgroundColor: 'var(--color-bg-secondary)',
      boxShadow: isLight
        ? '0px 0px 10px 3px #00000040'
        : '0px 0px 10px 3px #8D8D8D4D',

      '&:focus-visible': {
        outline: 'none',
      },
    },

    '.closing-btn': {
      opacity: 0,
      position: 'absolute',
      top: '7px',
      right: '9px',
      transition: 'opacity 300ms 0ms',

      '&:hover': {
        opacity: 1,
      },
    },

    img: {
      display: 'block', // fix strip under the picture
      // minWidth: '60vw',
      width: 'fit-content',
      maxWidth: 'min(80vw, 1400px)',
      minHeight: '40px',
      height: 'auto',
      maxHeight: '90vh',
      objectFit: 'contain',
      objectPosition: 'center',
    },

    [media.down(900)]: {
      img: {
        // minWidth: '70vw',
      },
    },

    [media.down(650)]: {
      img: {
        // minWidth: '90vw',
      },
    },

    [media.down(520)]: {
      img: {
        // minWidth: '96vw',
      },
    },
  };
});

export const ImgShowingModal = () => {
  const dispatch = useDispatch();
  const imgForSHow = useSelector(selectImgForShow);

  const imgRef = useRef(/** @type {HTMLImageElement | null} */ (null));
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
      let testImage = new Image();
      testImage.src = imgForSHow;
      console.log('testImage', testImage.width);

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
          <img ref={imgRef} src={imgForSHow} alt="" />
        </Box>
      </Fade>
    </StyledModal>
  );
};
