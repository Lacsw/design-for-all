/* eslint-disable react-hooks/rules-of-hooks */
// @ts-check

import { useSelector } from 'react-redux';
import { getIsThemeLight } from 'store/slices/theme';
import { getCssVar } from 'utils/helpers/css-in-js';

/** @type {import('@mui/material').SxProps<import('@mui/material').Theme>} */
export const sxRoot = (theme) => {
  const media = theme.breakpoints;
  const isLight = useSelector(getIsThemeLight);

  const curItemBg = getCssVar('--color-item-active');
  return {
    right: 'var(--art-nav-right, 0px)',
    zIndex: 110,

    '.ios-picker': {
      position: 'absolute',
      top: '20vh',
      left: '50%',
      transform: 'translate(-50%)',

      borderRadius: '6px',
      width: '500px',
      height: '246px',

      background: 'var(--color-bg-secondary)',
      boxShadow: '0px 0px 10px 3px #00000040',
    },

    '.ios-picker__scene': {
      minWidth: '100%',
      height: '100%',

      display: 'flex',
      alignItems: 'center',
      touchAction: 'pan-x',
    },

    '.ios-picker__viewport': {
      height: '32px',
      width: '100%',
      perspective: '10000px',

      WebkitUserSelect: 'none',
      MozUserSelect: 'none',
      MsUserSelect: 'none',
      userSelect: 'none',
      WebkitTouchCallout: 'none',
      KhtmlUserSelect: 'none',
      WebkitTapHighlightColor: 'transparent',
    },

    '.ios-picker__container': {
      height: '100%',
      width: '100%',

      color: isLight ? '#838383' : '#585858',
      fontFamily: 'Gotham',
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '130%',

      transformStyle: 'preserve-3d',
      willChange: 'transform',
    },

    '.ios-picker__slide': {
      width: '100%',
      height: '100%',
      fontSize: '19px',
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backfaceVisibility: 'hidden',
      opacity: 0,

      WebkitUserSelect: 'none',
      MozUserSelect: 'none',
      MsUserSelect: 'none',
      userSelect: 'none',
      WebkitTouchCallout: 'none',
      KhtmlUserSelect: 'none',
    },

    '.heading-text': {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textAlign: 'center',
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

    '.ios-picker__label': {
      fontWeight: 700,
      transform: 'translateX(-55px)',
      pointerEvents: 'none',
    },

    // [media.down(1300)]: {
    //   '.ios-picker__viewport': {
    //     minWidth: '50vw',
    //     maxWidth: '60vw',
    //   },
    // },
  };
};
