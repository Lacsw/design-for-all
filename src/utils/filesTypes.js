/**
 * @see https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types
 *
 * `+` значит, что хостинг картинок `imgbb` поддерживает данный формат
 */
export const fileTypesImage = [
  //'image/apng',
  //'image/bmp', // +
  'image/gif', // +
  'image/jpeg', // +
  //'image/pjpeg',
  'image/png', // +
  //'image/svg+xml',
  //'image/tiff', // +
  'image/webp', // +
  //'image/x-icon', //
  //'image/heic', // нативно в вебе не поддерживается?
  //'image/avif', // +
  //'application/pdf', // +
];

/**
 * @param {File} file
 * @param {string[]} types
 * @returns {boolean}
 */
export function checkFileType(file, types) {
  return types.includes(file.type);
}
