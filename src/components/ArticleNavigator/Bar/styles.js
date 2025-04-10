/* eslint-disable react-hooks/rules-of-hooks */
// @ts-check

import { useSelector } from 'react-redux';
import { getCurrentTheme } from 'store/selectors';

/** @type {import('@mui/material').SxProps} */
export const sxRoot = () => {
  const theme = useSelector(getCurrentTheme);

  return {
    '.article-navigator': {
      backgroundColor: 'rgba(218, 218, 218, 0.8)',
    },
  };
};
