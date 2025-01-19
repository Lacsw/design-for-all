/**
 * @typedef TJDValidationKinds
 * @type {'trim' | 'empty' | 'emptySymbols'}
 */

/**
 * @typedef TJDValidationOptions
 * @property {Record<TJDValidationKinds, boolean>} kinds - виды проверок
 * @property {'check' | 'prevent'} mode Режим работы валидации
 *
 *   - `check` - просто уведомлять об ошибке
 *   - `prevent` - предотвращать неккоректный ввод (TODO)
 */

/**
 * @typedef TJDValidateResult
 * @property {object} validity
 * @property {boolean} validity.isValid - is editor content valid
 * @property {string} content - editor content --- HTML-string
 */

export const Types = {};
