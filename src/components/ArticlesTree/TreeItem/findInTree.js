function findInTree(nodes, valueToFind) {
  // Перебираем каждый узел в массиве nodes
  for (const node of nodes) {
    // Если у текущего узла его id совпадает с искомым — сразу возвращаем true
    if (node.id === valueToFind) {
      return true;
    }

    // Иначе, если у узла есть потомки (children) — рекурсивно ищем среди них
    if (node.children && node.children.length) {
      if (findInTree(node.children, valueToFind)) {
        return true;
      }
    }
  }

  // Если ни в одном узле и ни в одном поддереве не нашли — возвращаем false
  return false;
}

export default findInTree;
