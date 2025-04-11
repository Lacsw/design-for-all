// @ts-check
import { useState } from 'react';
import authorApi from 'utils/api/author';

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
  const [hint, setHint] = useState('');
  const [uuid, setUuid] = useState(null);

  const checkSubCategory = async (subCategory) => {
    try {
      const data = await authorApi.checkSubCategory(lang, subCategory); // Если сервер возвращает статус 200 и тело с uuid, подкатегория занята
      if (data && data.uuid) {
        setHint(
          `Подкатегория занята! Уточните текущую или предложите обновление`
        );
        setUuid(data.uuid);
      }
    } catch (error) {
      if (error.status === 404) {
        // 404: подкатегория не найдена – значит она свободна
        setHint('');
        setUuid(null)
      } else if (error.status === 422) {
        setHint('Некорректный запрос. Проверьте ввод.');
        setUuid(null);
      } else if (error.status === 401) {
        setHint('Для проверки необходимо авторизоваться.');
        setUuid(null);
      } else {
        setHint(error.message || 'Ошибка проверки подкатегории.');
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
