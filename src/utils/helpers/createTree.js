function createTree(data) {
  const preparedData = splitPaths(data);
  const tree = recursionTree(preparedData, 0);
  return tree;
}

export function splitPaths(data) {
  const preparedData = data.map((item) => {
    const categories = item.sub_category.split('/');
    categories.shift();
    return { ...item, categories };
  });
  return preparedData;
}

function recursionTree(articles, pathIndex) {
  const sections = {};
  const currentPaths = articles.map((item) => item.categories[pathIndex]);
  const uniquePaths = Array.from(new Set(currentPaths));

  uniquePaths.forEach((path) => {
    const filteredArticles = articles.filter(
      (item) => item.categories[pathIndex] === path
    );
    const finalArticle = filteredArticles.find(
      (item) => pathIndex === item.categories.length - 1
    );
    const otherArticles = filteredArticles.filter(
      (item) => pathIndex < item.categories.length - 1
    );

    if (filteredArticles.length === 1 && finalArticle) {
      sections[path] = finalArticle.uuid;
    } else {
      finalArticle
        ? (sections[path] = {
            ...recursionTree(otherArticles, pathIndex + 1),
            id: finalArticle.uuid,
          })
        : (sections[path] = recursionTree(filteredArticles, pathIndex + 1));
    }
  });

  return sections;
}

export default createTree;
