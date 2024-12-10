/**
 * Sizes for icon buttons elements.
 *
 * Make sure that the CSS-vars and this object are synchronized.
 */
export const iconButtonSizes = {
  inPx(key) {
    const res = this[key];
    if (res) {
      return this[key] + 'px';
    } else {
      console.warn(`iconButtonSizes. Unknown key - ${key}.`);
      return;
    }
  },
  smallest: 22,
  small: 24,
  medium: 26,
  mediumer: 36,
  large: 44,
  /*The corresponding sizes of the icon (the SVG itself).*/
  svg: {
    inPx(key) {
      const res = this[key];
      if (res) {
        return this[key] + 'px';
      } else {
        console.warn(`iconButtonSizes. Unknown key - ${key}.`);
        return;
      }
    },
    smallest: 10,
    small: 14,
    medium: 14,
    mediumer: 14,
    large: 14,
  },
};
