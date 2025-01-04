/** @type {import('types/mui/sx').SxPropCb} */
export const sxImageModalRoot = (theme) => {
  return {
    '.input-container': {
      position: 'relative',
    },

    '.file-input': {
      opacity: 0,
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
    },

    '.text-input': {},
  };
};
