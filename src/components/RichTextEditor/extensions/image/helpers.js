// @ts-check
import { defaultAligningClass } from './constants';

/**
 * @typedef TImgErrors
 * @type {''
 *   | 'fileType'
 *   | 'fileSize'
 *   | 'brokenUrl'
 *   | 'noImgOnUrl'
 *   | 'fileReading'
 *   | 'onHostingLoading'
 *   | 'fromLinkLoading'}
 */

/** @param {TImgErrors} errorKind */
export const getErrorText = (errorKind) => {
  switch (errorKind) {
    case 'fileSize':
      return 'Вес файла больше 23 Мб';
    case 'fileType':
      return 'Неверный формат файла';
    case 'noImgOnUrl':
      return 'Не удалось получить изображение по указанной ссылке';
    case 'brokenUrl':
      return 'Неккоректный URL-адрес';
    case 'fileReading':
      return 'Ошибка при чтении файла';
    case 'onHostingLoading':
      return 'Не удалось загрузить файл на хостинг';
    case 'fromLinkLoading':
      return 'Не удалось загрузить файл по указанной ссылке';
    default:
      return null;
  }
};

export const getImgByURL = ({
  value, // URL
  setValue,
  setError,
  onConfirm,
  setIsLoading,
}) => {
  let testImage = new Image();
  testImage.src = value; // #1

  const promise = new Promise((resolve, reject) => {
    // при установке значения в src(#1) расчёт размеров картинки не происходит сразу, даже если положить в src предварительно скачанный файл, конвертированный в Blob(см. 2e63e13eb602240e714ad9b8da1b89e539118265). Потому нужна асинхронность
    setTimeout(() => {
      if (testImage.width && testImage.height) {
        testImage = null;
        resolve(value);
      } else {
        reject('fromLinkLoading');
      }
    }, 200);
  });

  promise
    .then((res) => {
      onConfirm(res);
      setValue('');
    })
    .catch((err) => {
      setError(err);
    })
    .finally(() => {
      setIsLoading(false);
    });
};

/**
 * @param {DOMTokenList | string | string[]} value - data for processing
 *
 *   - {@link DOMTokenList} - elem.classList
 *   - string - "my-class my-second-class text_bold"
 *   - string[] - ["my-class", "my-second-class", "text_bold"]
 *
 * @returns {string}
 */
export const getAligningClass = (value) => {
  if (value instanceof DOMTokenList) {
    return value.contains('justify')
      ? 'justify'
      : value.contains('center')
      ? 'center'
      : defaultAligningClass;
  } else if (typeof value === 'string') {
    const set = new Set(value.split(' '));
    return set.has('justify')
      ? 'justify'
      : set.has('center')
      ? 'center'
      : defaultAligningClass;
  } else {
    return value.includes('justify')
      ? 'justify'
      : value.includes('center')
      ? 'center'
      : defaultAligningClass;
  }
};
