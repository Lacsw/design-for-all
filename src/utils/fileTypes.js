// https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types
export const fileTypesImage = [
  //плюс значит, что наш хостинг картинок поддерживает данные форматы,
  //'image/apng',
  //'image/bmp', // +
  'image/gif', // +
  'image/jpeg', // +
  //'image/pjpeg',
  'image/png', // +
  //'image/svg+xml',
  //'image/tiff', // +
  'image/webp', // +
  //'image/x-icon',
  //'image/heic', // нативно в вебе не поддерживается?
  //'image/avif', // +
  //'application/pdf', // +
];

export function validFileType(file, types) {
  return types.includes(file.type);
}
