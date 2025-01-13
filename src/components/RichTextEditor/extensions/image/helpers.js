/**
 * @typedef TJDImgErrors
 * @type {''
 *   | 'fileType'
 *   | 'fileSize'
 *   | 'brokenUrl'
 *   | 'noImgOnUrl'
 *   | 'fileReading'
 *   | 'onLoading'}
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
    case 'fileReading':
      return 'Ошибка при чтении файла';
    case 'onLoading':
      return 'Не удалось загрузить файл на хостинг';
    default:
      return null;
  }
};
