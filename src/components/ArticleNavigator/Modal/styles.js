/* eslint-disable react-hooks/rules-of-hooks */
// @ts-check

import { useSelector } from 'react-redux';
import { getIsThemeLight } from 'store/slices/theme';

/** @type {import('@mui/material').SxProps<import('@mui/material').Theme>} */
export const sxRoot = (theme) => {
  const media = theme.breakpoints;
  const isLight = useSelector(getIsThemeLight);

  return {
    right: 'var(--art-nav-right, 0px)',
    zIndex: 110,

    '.article-navigator__modal': {
      position: 'absolute',
      top: '17vh',
      left: '50%',
      transform: 'translate(-50%)',
    },

    '.article-navigator__list': {
      overflow: 'auto',

      margin: 0,
      borderRadius: '6px',
      padding: '10px',
      height: 'fit-content',
      maxHeight: '246px',
      minWidth: '300px',
      width: '40vw',
      maxWidth: '601px',

      background: 'var(--color-bg-secondary)',
      boxShadow: '0px 0px 10px 3px #00000040',

      color: isLight ? '#838383' : '#585858',
      fontFamily: 'Gotham',
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '130%',
    },

    '.article-navigator__item': {
      margin: '10px 0',
      padding: '0px 13px',
    },

    [media.down(1300)]: {
      '.article-navigator__list': {
        width: '60vw',
      },
    },
    [media.down(900)]: {
      '.article-navigator__list': {
        width: '80vw',
      },
    },
    [media.down(600)]: {
      '.article-navigator__list': {
        width: '90vw',
      },
    },
  };
};
