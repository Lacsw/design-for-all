// @ts-check
import { alpha } from '@mui/material';

/**
 * @type {import('types/mui/sx').TSxPropCbWithData<{
 *   maxHeight: import('csstype').Property.MaxHeight | undefined;
 * }>}
 */
export const sxEditorWrapper = (props) => (theme) => {
  return {
    maxHeight: props.maxHeight,
  };
};

/** @type {import('@mui/material').SxProps} */
export const sxErrorBoundary = (theme) => {
  return {
    margin: '10px 6px',
    border: '1px solid var(--color-failure)',
    borderRadius: '12px',
    padding: '8px 16px',

    background: alpha('#ac3e3e', 0.3),

    '.main-text': {
      fontFamily: 'Inter',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '150%',
      letterSpacing: '2%',
    },
  };
};
