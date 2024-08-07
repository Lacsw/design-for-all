import { splitPaths } from './createTree';

export default function searchArticles(words, articles) {
  const fullString = words.join(' ');
  const splits = splitPaths(articles);
  const ready = splits.map((item) => ({ ...item, weight: 0 }));
  ready.forEach((item) => {
    item.categories.forEach((el) => {
      if (el.toLowerCase() === fullString.toLowerCase()) {
        item.weight += 100;
      } else {
        words.forEach((word) => {
          if (el.toLowerCase() === word.toLowerCase()) {
            item.weight += 10;
          } else if (el.toLowerCase().includes(word.toLowerCase())) {
            item.weight += 1;
          }
        });
      }
    });
  });
  const matchArticles = ready.filter((item) => item.weight > 0);
  matchArticles.sort((a, b) => b.weight - a.weight);
  return matchArticles;
}
