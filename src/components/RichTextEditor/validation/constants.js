// @ts-check

/** @type {import('./types').TJDValidationKinds[]} */
export const validationKinds = ['trim', 'empty', 'emptySymbols'];

/** @type {import('./types').TJDValidationOptions} */
export const defaultValidationOptions = {
  kinds: {
    empty: false,
    emptySymbols: false,
    trim: false,
  },
  mode: 'check',
};

/** @type {import('@tiptap/pm/model').ParseOptions} */
export const parseOptions = {
  /** сохранять множественные пробелы? по ум. HTML схлопывает их */
  preserveWhitespace: false,
};
