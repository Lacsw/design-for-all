/* eslint-disable react-hooks/rules-of-hooks */
// @ts-check

import { store } from '../../../store/index';
import { getCssVar } from 'utils/helpers/css-in-js';

/** @type {import('@mui/material').SxProps<import('@mui/material').Theme>} */
export const sxRoot = (theme) => {
  const media = theme.breakpoints;
  const isLight = store.getState().theme.currentTheme;

  const curItemBg = getCssVar('--color-item-active');

  return {
    right: 'var(--art-nav-right, 0px)',
    zIndex: 110,

    '.article-navigator__modal': {
      position: 'absolute',
      top: '17vh',
      left: '50%',
      transform: 'translate(-50%)',
      overflow: 'hidden',
      borderRadius: '6px',
      padding: '10px',
      minWidth: '500px',
      // width: '40vw',
      width: 'fit-content',
      maxWidth: '601px',

      background: 'var(--color-bg-secondary)',
      boxShadow: '0px 0px 10px 3px #00000040',

      ':focus-visible': {
        outline: '0',
      },

      '::before': {
        position: 'absolute',
        content: '""',
        top: '50%',
        left: '0',
        translate: '10px -50%',

        borderRadius: '6px',
        width: 'calc(100% - 20px)',
        height: '46px',

        background: curItemBg,
      },
    },

    '.article-navigator__list': {
      margin: '0',
      padding: '0',
      height: '226px',

      display: 'flex',
      flexDirection: 'column',

      color: isLight ? '#838383' : '#585858',
      fontFamily: 'Gotham',
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '130%',

      ':focus-visible': {
        outline: '0',
      },

      '::-webkit-scrollbar': {
        display: 'none',
      },
    },

    '.article-navigator__item': {
      margin: '5px 0',
      borderRadius: '6px',
      padding: '5px 13px',
      minHeight: '46px',
      height: '46px',
      flex: '1 1 100%',

      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

      cursor: 'pointer',
      transition: theme.transitions.create(['background', 'color'], {
        duration: 150,
      }) /*+ ', transalte 10ms'*/,

      '&.article-navigator__item_current': {
        borderRadius: '6px',
        // background: curItemBg,
        color: 'var(--color-success)',
        fontWeight: 600,
        letterSpacing: '2px',

        '&:hover': {
          // color: isLight ? '#838383' : '#585858',
          // background: curItemBg,
          // '.counter': {
          //   color: isLight ? '#585858' : '#bcbcbc',
          // },
        },
      },

      '&:hover': {
        // color: '#fff',
        // background: alpha(curItemBg, 0.8),
        // '.counter': {
        //   color: '#fff',
        // },
      },
      '&:active': {
        // background: alpha(curItemBg, 0.95),
      },

      '.heading-text': {
        WebkitFontSmoothing: 'antialiased',
      },
    },

    '.heading-text': {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textAlign: 'center',

      userSelect: 'none',

      transition: theme.transitions.create(['color'], {
        duration: 150,
      }),
    },

    '.counter': {
      color: isLight ? '#585858' : '#bcbcbc',
      marginLeft: '10px',
      minWidth: '30px',
      fontVariantNumeric: 'tabular-nums',
      textAlign: 'end',

      userSelect: 'none',

      transition: theme.transitions.create(['color'], {
        duration: 150,
      }),
    },

    [media.down(1300)]: {
      '.article-navigator__modal': {
        minWidth: '50vw',
        maxWidth: '60vw',
      },
    },
    [media.down(900)]: {
      '.article-navigator__modal': {
        minWidth: '60vw',
        maxWidth: '80vw',
      },
    },
    [media.down(600)]: {
      '.article-navigator__modal': {
        minWidth: '80vw',
        maxWidth: '90vw',
      },
    },
  };
};
