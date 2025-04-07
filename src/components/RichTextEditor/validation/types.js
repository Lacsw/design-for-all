/**
 * @typedef TValidationKinds
 * @type {'trim' | 'empty' | 'emptySymbols'}
 */

/**
 * @typedef TValidationOptions
 * @property {Record<TValidationKinds, boolean>} kinds - виды проверок
 * @property {'check'} [mode] Режим работы валидации
 *
 *   - `check` - просто уведомлять об ошибке
 *   - `prevent` - предотвращать неккоректный ввод (TODO)
 */

/**
 * @typedef TValidateResult
 * @property {object} validity
 * @property {boolean} validity.isValid - is editor content valid
 * @property {string} content - editor content --- HTML-string
 */

export const Types = {};
