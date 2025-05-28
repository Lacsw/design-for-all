// @ts-check
import { defaultAligningClass } from './constants';
import { RTE } from 'utils/translationKeys';

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

/** 
 * @param {TImgErrors} errorKind 
 * @param {import('i18next').TFunction} t
 */
export const getErrorText = (errorKind, t) => {
  switch (errorKind) {
    case 'fileSize':
      return t(RTE.IMAGE.ERRORS.FILE_SIZE);
    case 'fileType':
      return t(RTE.IMAGE.ERRORS.FILE_TYPE);
    case 'noImgOnUrl':
      return t(RTE.IMAGE.ERRORS.NO_IMAGE_ON_URL);
    case 'brokenUrl':
      return t(RTE.IMAGE.ERRORS.BROKEN_URL);
    case 'fileReading':
      return t(RTE.IMAGE.ERRORS.FILE_READING);
    case 'onHostingLoading':
      return t(RTE.IMAGE.ERRORS.ON_HOSTING_LOADING);
    case 'fromLinkLoading':
      return t(RTE.IMAGE.ERRORS.FROM_LINK_LOADING);
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
