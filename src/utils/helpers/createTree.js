/**
 * createTree строит дерево из массива статей с полем sub_category вида "веб/стили/агент/предложения".
 * Каждый узел получает:
 *  - key: полный путь (без глабвной категории `веб/`), т.е. "стили/агент"
 *  - id: UUID статьи, если она привязана к этому узлу, или null
 *  - children: вложенные узлы
 */

function createTree(data) {
  const preparedData = splitPaths(data);

  //Запускатся рекурсия по уровням
  return buildNode(preparedData, 0, '');
}

//Разбивает sub_category на массив ["веб","стили","агент",…], и убираем главную категорию
export function splitPaths(data) {
  const preparedData = data.map((item) => {
    const categories = item.sub_category.split('/');
    categories.shift();
    return { uuid: item.uuid, categories };
  });
  return preparedData;
}

/**
 * @param {Array<{uuid:string, categories:string[]}>} items
 * @param {number} level — текущий индекс в categories[]
 * @param {string} parentPath — полный путь до этого уровня,  т.е.. "" или "стили" или "стили/агент"
 */

function buildNode(items, level, parentPath) {
  const node = [];
  // все уникальные имена сегментов на этом уровне
  const names = Array.from(new Set(items.map(i => i.categories[level])));

  for (const name of names) {
    // полный путь для ключа
    const fullPath = parentPath ? `${parentPath}/${name}` : name;

    // статьи, относящиеся к этому сегменту
    const sameLevel = items.filter(i => i.categories[level] === name);

    // статья, если она “заканчивается” здесь
    const exact = sameLevel.find(i => i.categories.length === level + 1);

    // оставшиеся для детей
    const rest = sameLevel.filter(i => i.categories.length > level + 1);

    node.push({
      key:      fullPath,             // уникальный ключ для React
      title:    name,                 // отображаемое название узла
      id:       exact ? exact.uuid : null, // UUID или null
      children: rest.length
        ? buildNode(rest, level + 1, fullPath)
        : []
    });
  }

  return node;
}

export default createTree;
