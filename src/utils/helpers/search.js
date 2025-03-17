import { splitPaths } from './createTree';

export default function searchArticles(text, articles) {
  const withSplit = splitPaths(articles);
  const withWeight = withSplit.map((item) => ({
    ...item,
    weight: 0,
    marked: [],
  }));
  setWeights(withWeight, text);
  const matchArticles = withWeight.filter((item) => item.weight > 0);
  matchArticles.sort((a, b) => b.weight - a.weight);
  return matchArticles;
}

export function setWeights(articles, text) {
  const fullString = text.toLowerCase();
  const words = fullString.split(' ').filter(Boolean);

  articles.forEach((art) => {
    const markedSet = new Set();
    art.categories.forEach((cat) => {
      const category = cat.toLowerCase();
      let highlighted = category;
      if (category === fullString) {
        art.weight += 100;
        highlighted = `<b>${category}</b>`;
      } else if (words.length > 1 && category.includes(fullString)) {
        art.weight += 20;
        highlighted = category.replace(
          new RegExp(fullString, 'gi'),
          `<b>${fullString}</b>`
        );
      } else {
        words.forEach((inputWord) => {
          if (category === inputWord) {
            art.weight += 10;
            highlighted = category.replace(
              new RegExp(inputWord, 'gi'),
              `<b>${inputWord}</b>`
            );
          } else if (words.length === 1 && category.includes(inputWord)) {
            art.weight += 1;
            highlighted = category.replace(
              new RegExp(inputWord, 'gi'),
              `<b>${inputWord}</b>`
            );
          }
        });
      }
      markedSet.add(highlighted);
    });
    art.marked = Array.from(markedSet);
  });
}

export function prepareValue(value) {
  const valueWithoutSymbols = value.replace(/[^\p{L}\p{N}\-\s]/gu, '');
  const valueWithoutExtraSpaces = valueWithoutSymbols
    .trim()
    .replace(/\s\s+/g, ' ');
  return valueWithoutExtraSpaces;
}
