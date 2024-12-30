/**
 * @callback TJDRteOnInputProp
 * @param {import('./validators').TJDValidateResult} data
 * @returns {void}
 */

/**
 * @typedef TJDRteClassesProp
 * @type {object}
 * @property {string} [menuBar]
 * @property {string} [textTypeSelector]
 * @property {string} [button]
 */

/**
 * @typedef RichTextEditorProps
 * @type {object}
 * @property {string | null} [initialValue] - Html-string for INITIAL view
 * @property {any} [validationsOptions]
 * @property {TJDRteOnInputProp} [onInput] - Cb fires with debounce when content
 *   changes ib RTE
 * @property {boolean} [readOnly] - Isn't RTE editable
 * @property {string} [className]
 * @property {TJDRteClassesProp} [classes]
 * @property {boolean} [cancel] - If `true` the editor will return to the
 *   `initialValue`. Until the parameter `true` the editor will not apply new
 *   changes, so after reset **return this prop** to `false`
 * @property {string} [maxHeight]
 * @property {string | number} [id]
 */

/**
 * @callback TJDRichTextEditor
 * @param {RichTextEditorProps} props
 */

export {};
