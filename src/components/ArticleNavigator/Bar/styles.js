/* eslint-disable react-hooks/rules-of-hooks */
// @ts-check
import { useSelector } from 'react-redux';
import { getIsThemeLight } from 'store/slices/theme';

/** @type {import('@mui/material').SxProps<import('@mui/material').Theme>} */
export const sxRoot = (theme) => {
  const media = theme.breakpoints;
  const isLight = useSelector(getIsThemeLight);

  return {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,

    transform: 'translateY(0px)',
    right: 'var(--art-nav-right, 0px)',
    pointerEvents: 'none',
    touchAction: 'none',
    zIndex: 100,

    color: 'var(--color-secondary)',
    fontFamily: 'Gotham',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '130%',

    '.article-navigator': {
      pointerEvents: 'all',
      touchAction: 'initial',

      position: 'absolute',
      top: '62px',
      left: '50%',
      transform: 'translate(-50%)',

      borderRadius: '6px',
      padding: '14px 13px',

      minWidth: '300px',
      width: '40vw',
      maxWidth: '601px',

      backgroundColor: isLight ? 'rgb(36, 36, 36)' : 'rgb(218, 218, 218)',
      boxShadow: '0px 0px 10px 3px #00000040',
    },

    '.article-navigator__container': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    '.heading-text': {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textAlign: 'center',
    },

    '.counter': {
      color: isLight ? 'var(--color-main-disabled)' : '#585858',
      marginLeft: '10px',
    },

    [media.down(1300)]: {
      '.article-navigator': {
        width: '60vw',
      },
    },

    [media.down(900)]: {
      '.article-navigator': {
        width: '80vw',
      },
    },

    [media.down(601)]: {
      '.article-navigator': {
        top: '86px',
        padding: '8px 8px',
        width: '90vw',
      },

      '.heading-text': {
        maxHeight: '37px',
        whiteSpace: 'initial',
      },
    },

    [media.down(480)]: {
      '.article-navigator': {
        padding: '5px',
      },
    },
  };
};
