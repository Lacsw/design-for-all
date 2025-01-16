// @ts-check
/**
 * @type {import('types/mui/sx').TJDSxPropCbWithData<{
 *   isDragging: boolean;
 *   isDragHover: boolean;
 * }>}
 */
export const sxImageModalRoot =
  ({ isDragging, isDragHover }) =>
  (theme) => {
    return {
      '.modal__container': {
        gap: '0px',
      },

      '.tip': {
        margin: '15px 0 3px',
      },

      '.container': {
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        width: '100%',
      },

      '.inputs-container': {
        position: 'relative',
        padding: '3px',
        border: isDragging
          ? '2px dashed var(--color-success)'
          : '2px dashed transparent',
        borderRadius: '12px',
        flex: '1 1 auto',
      },

      '.file-input': {
        opacity: 0,
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        pointerEvents: !isDragging ? 'none' : null,
        touchAction: !isDragging ? 'none' : null,
      },

      '.text-input': {
        opacity: isDragHover ? 0.5 : null,
        pointerEvents: isDragging ? 'none' : null,
        touchAction: isDragging ? 'none' : null,
        minHeight: '50px',
        // width: '300px',
        // maxWidth: '85%',
      },

      '.text-error': {
        width: '100%',
        marginBottom: '5px',
      },
    };
  };
