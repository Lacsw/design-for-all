import { mainCategory as mainCategoryTable } from 'utils/constants';

// Функция нужна, если пользователь переходит с главной по ссылке на статью на языке,отличном от текущего.
 function convertMainCategory(mainCategoryTable, updateMainCategory, targetLang) {

  for (const langItem of mainCategoryTable) {
    for (const key in langItem.category) {
      if (langItem.category[key] === updateMainCategory) {

        const targetItem = mainCategoryTable.find(item => item.lang === targetLang);
        if (targetItem) {
          return targetItem.category[key] || updateMainCategory;
        }
      }
    }
  }
  return 'desktop';
}


/*
Функция getSection определяет ключ для отображения дерева статей, используя приоритетный порядок источников:

1. Если в URL присутствует hash, и он является одним из допустимых значений (web, desktop, mobile, manual), функция возвращает этот hash.
2. Если hash отсутствует, а параметр mainCategory задан, его значение преобразуется в соответствующее для указанного языка (lang) через convertMainCategory. Функция затем ищет ключ в titles[lang], значение которого совпадает с преобразованным mainCategory, и возвращает его, если найдено.
3. Если mainCategory не задан или совпадение не найдено, функция пытается получить атрибут "main_category" из тега <title> в head документа и, найдя совпадение в titles[lang], возвращает соответствующий ключ.
4. Если ни один из способов не дал результата, функция возвращает 'desktop' в качестве значения по умолчанию.
*/

export default function getSection(titles, lang, mainCategory) {
    const validKeys = Object.keys(titles[lang] || {});
    
    const rawHash = window.location.hash
      ? window.location.hash.replace(/^#\/?/, '')
      : '';
  
    if (rawHash && validKeys.includes(rawHash)) {
      return rawHash;
    }
  
    if (mainCategory) {
      // Приводим mainCategory к значению для текущего языка (lang)
      const converted = convertMainCategory(mainCategoryTable, mainCategory, lang);
      for (let key in titles[lang]) {
        if (titles[lang][key] === converted) return key;
      }
    }
  
    const category = document.head
      .querySelector('title')
      ?.getAttribute('main_category');
  
    if (category) {
      for (let key in titles[lang]) {
        if (titles[lang][key] === category) return key;
      }
    }
  
    // Возвращаем первый доступный ключ или 'desktop' как запасной вариант
    return validKeys.length > 0 ? validKeys[0] : 'desktop';
  }