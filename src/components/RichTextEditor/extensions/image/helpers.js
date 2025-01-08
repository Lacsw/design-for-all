/**
 * @typedef TJDImgErrors
 * @type {'' | 'fileType' | 'fileSize' | 'brokenUrl' | 'noImgOnUrl'}
 */

/** @param {TJDImgErrors} errorKind */
export const getErrorText = (errorKind) => {
  switch (errorKind) {
    case 'fileSize':
      return 'Вес файла больше 23 Мб';
    case 'fileType':
      return 'Неверный формат файла';
    case 'noImgOnUrl':
      return 'Не удалось получить изображение по указанной ссылке';
    case 'brokenUrl':
      return '';
    default:
      return null;
  }
};
