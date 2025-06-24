function findInTree(nodes, valueToFind) {
  for (const node of nodes) {
    // совпадение либо по id (если это статья), либо по key (если это узел без статьи)
    if (node.id === valueToFind || node.key === valueToFind) {
      return true;
    }
    if (node.children && node.children.length) {
      if (findInTree(node.children, valueToFind)) {
        return true;
      }
    }
  }
  return false;
}

export default findInTree;
