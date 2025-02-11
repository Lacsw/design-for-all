import { useState } from 'react';
import authorApi from 'utils/api/author';

/**
 * Хук для проверки существования подкатегории.
 *
 * @param {string} lang - Язык (например, "en", "ru" и т.д.).
 * @returns {{
 *   hint: string,
 *   checkSubCategory: (subCategory: string) => Promise<void>,
 *   clearHint: () => void
 * }} 
 *   hint – сообщение для пользователя;
 *   checkSubCategory – функция, которая принимает подкатегорию и выполняет проверку;
 *   clearHint – функция для сброса сообщения.
 */
function useSubCategoryCheck(lang) {
  const [hint, setHint] = useState('');

  const checkSubCategory = async (subCategory) => {
    try {
      await authorApi.checkSubCategory(lang, subCategory);
      // Если сервер возвращает статус 204, подкатегория занята
      setHint('Подкатегория занята! Уточните текущую или предложите обновление существующей статьи.');
    } catch (error) {
      const errorMsg = error.toString();
      if (errorMsg.includes('404')) {
        // 404: подкатегория не найдена – очищаем хинт
        setHint('');
      } else if (errorMsg.includes('422')) {
        setHint('Некорректный запрос. Проверьте ввод.');
      } else if (errorMsg.includes('401')) {
        setHint('Для проверки необходимо авторизоваться.');
      } else {
        setHint('Ошибка проверки подкатегории.');
      }
    }
  };

  const clearHint = () => setHint('');

  return { hint, checkSubCategory, clearHint };
}

export default useSubCategoryCheck;
