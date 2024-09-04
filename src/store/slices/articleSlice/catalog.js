const section = {
  original: null,
  tree: null,
  fetchTime: 0,
};

const lang = {
  web: { ...section },
  desktop: { ...section },
  mobile: { ...section },
  manual: { ...section },
  titles: null,
};

export const catalog = {
  ru: { ...lang },
  en: { ...lang },
  es: { ...lang },
  zh: { ...lang },
};
