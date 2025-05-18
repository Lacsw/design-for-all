// @ts-check
import { useState } from 'react';
import authorApi from 'utils/api/author';
import { useTranslation } from 'react-i18next';
import { CREATION } from 'utils/translationKeys';

/**
 * @typedef {object} ApiError
 * @property {number} status - HTTP статус ошибки
 * @property {string} [message] - Сообщение об ошибке
 */

/**
 * Хук для проверки существования подкатегории.
 *
 * @param {string} lang - Язык (например, "en", "ru" и т.д.).
 * @returns {{
 *   hint: string;
 *   uuid: string | null;
 *   checkSubCategory: (subCategory: string) => Promise<void>;
 *   clearHint: () => void;
 * }}
 *   hint – сообщение для пользователя; uuid – идентификатор существующей подкатегории или null;
 *   checkSubCategory – функция, которая принимает подкатегорию и выполняет проверку;
 *   clearHint – функция для сброса сообщения.
 */
function useSubCategoryCheck(lang) {
  const { t } = useTranslation();
  const [hint, setHint] = useState('');
  const [uuid, setUuid] = useState(null);

  /**
   * Проверяет существование подкатегории
   * @param {string} subCategory - Подкатегория для проверки
   */
  const checkSubCategory = async (subCategory) => {
    try {
      const data = await authorApi.checkSubCategory(lang, subCategory); // Если сервер возвращает статус 200 и тело с uuid, подкатегория занята
      if (data && data.uuid) {
        setHint(t(CREATION.NEW_ARTICLE.SUB_CATEGORY.OCCUPIED_WITH_HINT));
        setUuid(data.uuid);
      }
    } catch (/** @type {unknown} */ error) {
      const apiError = /** @type {ApiError} */ (error);
      
      if (apiError.status === 404) {
        // 404: подкатегория не найдена – значит она свободна
        setHint('');
        setUuid(null)
      } else if (apiError.status === 422) {
        setHint(t(CREATION.NEW_ARTICLE.SUB_CATEGORY.INVALID_REQUEST));
        setUuid(null);
      } else if (apiError.status === 401) {
        setHint(t(CREATION.NEW_ARTICLE.SUB_CATEGORY.AUTH_REQUIRED));
        setUuid(null);
      } else {
        setHint(apiError.message || t(CREATION.NEW_ARTICLE.SUB_CATEGORY.CHECK_ERROR));
        setUuid(null);
      }
    }
  };

  const clearHint = () => {
    setHint('');
    setUuid(null);
  };

  return { hint, uuid, checkSubCategory, clearHint };
}

export default useSubCategoryCheck;
