import { splitPaths } from './createTree';

export default function searchArticles(text, articles) {
  const withSplit = splitPaths(articles);
  const withWeight = withSplit.map((item) => ({ ...item, weight: 0 }));
  setWeights(withWeight, text);
  const matchArticles = withWeight.filter((item) => item.weight > 0);
  matchArticles.sort((a, b) => b.weight - a.weight);
  return matchArticles;
}

export function setWeights(articles, text) {
  const fullString = text.toLowerCase();
  const words = fullString.split(' ');

  articles.forEach((art) => {
    art.categories.forEach((cat) => {
      const category = cat.toLowerCase();
      const splitCategory = category.split(' ');
      if (category === fullString) {
        art.weight += 100;
      } else if (
        words.length > 1 &&
        splitCategory.length > 1 &&
        category.includes(fullString)
      ) {
        art.weight += 20;
      } else {
        splitCategory.forEach((catWord) => {
          words.forEach((inputWord) => {
            if (catWord === inputWord) {
              art.weight += 10;
            } else if (words.length === 1 && catWord.includes(inputWord))
              art.weight += 1;
          });
        });
      }
    });
  });
}

export function prepareValue(value) {
  const valueWithoutSymbols = value.replace(/[^\p{L}\p{N}\-\s]/gu, '');
  const valueWithoutExtraSpaces = valueWithoutSymbols
    .trim()
    .replace(/\s\s+/g, ' ');
  return valueWithoutExtraSpaces;
}
