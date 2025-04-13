/* eslint-disable react-hooks/rules-of-hooks */
// @ts-check

import { alpha } from '@mui/material';
import { useSelector } from 'react-redux';
import { getIsThemeLight } from 'store/slices/theme';

/** @type {import('@mui/material').SxProps<import('@mui/material').Theme>} */
export const sxRoot = (theme) => {
  const media = theme.breakpoints;
  const isLight = useSelector(getIsThemeLight);

  const itemActionBg = isLight ? '#242424' : '#dadada';

  return {
    right: 'var(--art-nav-right, 0px)',
    zIndex: 110,

    '.article-navigator__modal': {
      position: 'absolute',
      top: '17vh',
      left: '50%',
      transform: 'translate(-50%)',

      ':focus-visible': {
        outline: '0',
      },
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

      ':focus-visible': {
        outline: '0',
      },

      '::-webkit-scrollbar': {
        display: 'none',
      },
    },

    '.article-navigator__item': {
      margin: '10px 0',
      borderRadius: '6px',
      padding: '5px 13px',

      display: 'flex',
      justifyContent: 'space-between',

      cursor: 'pointer',
      transition: theme.transitions.create(['background', 'color'], {
        duration: 150,
      }),

      '&.article-navigator__item_current': {
        background: 'var(--color-item-active)',
        borderRadius: '6px',

        '&:hover': {
          color: isLight ? '#838383' : '#585858',
          background: 'var(--color-item-active)',

          '.counter': {
            color: isLight ? '#585858' : '#bcbcbc',
          },
        },
      },

      '&:hover': {
        color: '#fff',
        background: alpha(itemActionBg, 0.8),

        '.counter': {
          color: '#fff',
        },
      },
      '&:active': {
        background: alpha(itemActionBg, 0.95),
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
