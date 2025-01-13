// @ts-check
/**
 * @typedef TJDImgErrors
 * @type {''
 *   | 'fileType'
 *   | 'fileSize'
 *   | 'brokenUrl'
 *   | 'noImgOnUrl'
 *   | 'fileReading'
 *   | 'onHostingLoading'
 *   | 'fromLinkLoading'}
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
  value,
  setValue,
  setError,
  onConfirm,
  setIsLoading,
}) => {
  fetch(value)
    .then(async (res) => {
      return await res
        .blob()
        .then(async (imgData) => {
          const src = URL.createObjectURL(imgData);
          let testImage = new Image();
          testImage.src = src;

          return await new Promise((resolve, reject) => {
            setTimeout(() => {
              if (testImage.width && testImage.height) {
                testImage = null;
                resolve(value);
              } else {
                reject('fromLinkLoading');
                setError('fromLinkLoading');
              }
            }, 200);
          });
        })
        .then((value) => {
          onConfirm(value);
          setValue('');
        })
        .catch((err) => setError('fromLinkLoading'));
    })
    .catch((err) => setError('fromLinkLoading'))
    .finally(() => {
      setIsLoading(false);
    });
};
