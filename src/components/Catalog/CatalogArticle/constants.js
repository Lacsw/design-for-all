export const targetHeadings = [1, 2, 3];

/** @type {import('components/ArticleNavigator/types').IScrollableElParams} */
export const scrollableElParams = {
  selector: 'html',
  searchMode: 'root',
  flag: true,
  intersectionMargin: '-115px 0px 0px 0px',
};

/** @type {import('components/ArticleNavigator/types').IArticleNavigatorProps['slotProps']} */
export const artNavSlotProps = {
  bar: {
    id: 'catalog-article__navigator-bar',
  },
  modal: {
    id: 'catalog-article__navigator-modal',
  },
};
