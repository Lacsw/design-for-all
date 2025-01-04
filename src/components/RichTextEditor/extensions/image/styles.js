/** @type {import('types/mui/sx').SxPropCbWithData} */
export const sxImageModalRoot =
  ({ isDragging, isDragHover }) =>
  (theme) => {
    return {
      '.container': {
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
      },

      '.inputs-container': {
        position: 'relative',
        padding: '3px',
        border: isDragging
          ? '2px dashed var(--color-success)'
          : '2px dashed transparent',
        borderRadius: '12px',
      },

      '.file-input': {
        opacity: 0,
        position: 'absolute',
        left: 0,
        top: 0,
        width: '110%',
        height: '110%',
        pointerEvents: !isDragging ? 'none' : null,
        touchAction: !isDragging ? 'none' : null,
      },

      '.text-input': {
        opacity: isDragHover ? 0.5 : null,
        pointerEvents: isDragging ? 'none' : null,
        touchAction: isDragging ? 'none' : null,
      },
    };
  };
