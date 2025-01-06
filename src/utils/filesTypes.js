/**
 * @see https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types
 *
 * `+` значит, что хостинг картинок `imgbb` поддерживает данный формат
 */
export const validFileTypesImg = [
  //'image/apng', //
  //'image/bmp', // +
  'image/gif', // +
  'image/jpeg', // +
  'image/jpg', // +
  //'image/pjpeg', //
  'image/png', // +
  //'image/svg+xml', //
  //'image/tiff', // +
  'image/webp', // +
  //'image/x-icon', //
  //'image/heic', // нативно в вебе не поддерживается?
  //'image/avif', // +
  //'application/pdf', // +
];

/**
 * @param {File} file
 * @param {string[]} validTypes - Types names, e.g. ["image/png",
 *   "application/pdf"]
 * @returns {boolean}
 */
export function checkFileType(file, validTypes) {
  return validTypes.includes(file.type);
}
