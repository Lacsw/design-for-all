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
