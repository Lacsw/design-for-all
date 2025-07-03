// @ts-check
import { Box, Fade, IconButton, Modal, styled } from '@mui/material';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearImgForShow, selectImgForShow } from 'store/slices/article';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { IMG_SHOWING_MODAL_ANIM_DUR } from './constants';
import { closeModalEvt, openModalEvt } from 'utils/modals';
import { store } from '../../../../store';

const StyledModal = styled(Modal)(({ theme }) => {
  const isLight = store.getState().theme.currentTheme === 'light';
  // const media = theme.breakpoints;

  return {
    '--comp-h': 'auto',
    right: 'var(--modal-corrector)',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '.container': {
      overflow: 'hidden',
      position: 'relative',

      borderRadius: '16px',
      minWidth: 'min(90vw, 500px)',
      width: 'fit-content',
      maxWidth: 'min(90vw, 1400px)',

      height: 'fit-content',
      maxHeight: '90vh',

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

    '.img-container': {
      height: 'var(--comp-h)',
      overflow: 'auto',
    },

    img: {
      display: 'block', // fix strip under the picture
      width: '100%',
      objectFit: 'contain',
      objectPosition: 'center',
    },

    // [media.down(900)]: {
    // },
  };
});

export const ImgShowingModal = () => {
  const dispatch = useDispatch();
  const imgForSHow = useSelector(selectImgForShow);

  const root = useRef(/** @type {HTMLElement | null} */ (null));
  const container = useRef(/** @type {HTMLElement | null} */ (null));
  const [isOpen, setIsOpen] = useState(!!imgForSHow);

  const handleResize = useCallback(() => {
    if (container.current && root.current) {
      root.current.style.setProperty('--comp-h', 'auto');
      const styles = getComputedStyle(container.current);
      root.current.style.setProperty('--comp-h', styles.height);
    }
  }, []);

  const close = () => {
    setIsOpen(false);
    window.dispatchEvent(closeModalEvt);
    root.current?.style.setProperty('--comp-h', 'auto');
    dispatch(clearImgForShow());
  };

  useLayoutEffect(() => {
    if (imgForSHow) {
      setTimeout(handleResize);

      window.dispatchEvent(openModalEvt);
      setIsOpen(true);
    }
  }, [handleResize, imgForSHow]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return (
    <StyledModal
      // @ts-ignore
      ref={root}
      className="imgShowingModal-root"
      open={isOpen}
      onClose={close}
    >
      <Fade in={isOpen} timeout={IMG_SHOWING_MODAL_ANIM_DUR}>
        <Box ref={container} className="container">
          <IconButton className="closing-btn" onClick={close}>
            <CloseRoundedIcon />
          </IconButton>
          <Box className="img-container">
            <img src={imgForSHow} alt="" />
          </Box>
        </Box>
      </Fade>
    </StyledModal>
  );
};
