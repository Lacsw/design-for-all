// @ts-check

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types
 *
 * `+` значит, что хостинг картинок `imgbb` поддерживает данный формат
 */
export const validFileTypesImg = [
  //'image/apng', //
  //'image/bmp', // +
  'image/gif', // +
  /** jpg не пишется в поле File.type */
  'image/jpeg', // +
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
 * @summary It just checks the file **extension**, which the **user can easily change**. So additional checks are needed.
 */
export function checkFileType(file, validTypes) {
  return validTypes.includes(file.type);
}

/**
 * @typedef TJDMime
 * @property {string} mime
 * @property {(number | undefined)[]} pattern
 */

/**
 * @type {TJDMime[]}
 * @see https://mimesniff.spec.whatwg.org/#matching-an-image-type-pattern
 */
export const imageMimes = [
  {
    mime: 'image/gif',
    pattern: [0x47, 0x49, 0x46, 0x38],
  },
  {
    mime: 'image/png',
    pattern: [0x89, 0x50, 0x4e, 0x47],
  },
  {
    mime: 'image/jpeg',
    pattern: [0xff, 0xd8, 0xff],
  },
  {
    mime: 'image/webp',
    pattern: [
      0x52,
      0x49,
      0x46,
      0x46,
      undefined,
      undefined,
      undefined,
      undefined,
      0x57,
      0x45,
      0x42,
      0x50,
      0x56,
      0x50,
    ],
  },
];

/**
 * @param {Uint8Array} bytes
 * @param {TJDMime} mime
 * @returns {boolean}
 */
export function isMime(bytes, mime) {
  return mime.pattern.every(
    (magicNumber, idx) => !magicNumber || bytes[idx] === magicNumber
  );
}

/**
 * @callback TJDOnImgValidating
 * @param {boolean} isValid
 * @param {'done' | 'type' | 'error'} reason
 *
 *   - `"done"` - everything is fine
 *   - `"type"` - file type is not valid
 *   - `"error"` - an error occurred while reading the file
 *
 * @returns {void}
 */

/**
 * @param {File} file
 * @param {TJDOnImgValidating} callback
 * @returns {void}
 * @summary The first few bytes of the file are read for checking the file's MIME-type.
 */
export function validateImageMimeType(file, callback) {
  const numBytesNeeded = Math.max(...imageMimes.map((m) => m.pattern.length));
  const blob = file.slice(0, numBytesNeeded); // Read the needed bytes of the file

  const fileReader = new FileReader();

  fileReader.onloadend = (evt) => {
    const result = fileReader.result;

    if (!evt || !result || typeof result === 'string') {
      callback(false, 'error');
      return;
    }

    /** @type {Uint8Array<ArrayBuffer>} */
    const bytes = new Uint8Array(result);
    const valid = imageMimes.some((mime) => isMime(bytes, mime));
    callback(valid, valid ? 'done' : 'type');
  };

  // async operation
  fileReader.readAsArrayBuffer(blob);
}
