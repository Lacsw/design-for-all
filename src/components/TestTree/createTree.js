function createTree(data) {
  const preparedData = splitPaths(data);
  const tree = recursionTree(preparedData, 1);
  return tree;
}

function splitPaths(data) {
  const preparedData = data.map(item => {
    const sub_category = item.sub_category.split('/');
    return { ...item, sub_category };
  });
  return preparedData;
}

function recursionTree(articles, pathIndex) {

  const sections = {};
  const currentPaths = articles.map(item => item.sub_category[pathIndex]);
  const uniquePaths = Array.from(new Set(currentPaths));

  uniquePaths.forEach(path => {
    const filteredArticles = articles.filter(item => item.sub_category[pathIndex] === path);
    const finalArticle = filteredArticles.find(item => pathIndex === item.sub_category.length - 1);
    if (filteredArticles.length === 1 && finalArticle) {
      sections[path] = finalArticle.uuid;
    } else {
      finalArticle ?
        sections[path] = { ...recursionTree(filteredArticles.filter(item => pathIndex < item.sub_category.length - 1), pathIndex + 1), id: finalArticle.uuid } :
        sections[path] = recursionTree(filteredArticles, pathIndex + 1);
    }
  });

  return sections;
}

export default createTree;