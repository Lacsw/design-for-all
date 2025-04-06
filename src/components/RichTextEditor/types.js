/**
 * @callback TRteOnInputProp
 * @param {import('./validation/types').TValidateResult} data
 * @returns {void}
 */

/**
 * @typedef TRteClassesProp
 * @property {string} [menuBar]
 * @property {string} [textTypeSelector]
 * @property {string} [button]
 */

/**
 * @typedef TRteProps
 * @property {string | null} [initialValue] - Html-string for INITIAL view
 * @property {Partial<import('./validation/types').TValidationOptions>} [validationsOptions]
 * @property {TRteOnInputProp} [onInput] - Cb fires with debounce when content
 *   changes in RTE
 * @property {boolean} [readOnly] - Isn't RTE editable
 * @property {string} [className]
 * @property {TRteClassesProp} [classes]
 * @property {boolean} [cancel] - If `true` the editor will return to the
 *   `initialValue`. Until the parameter `true` the editor will not apply new
 *   changes, so after reset **return this prop** to `false`
 * @property {import('csstype').Property.MaxHeight | undefined} [maxHeight="auto"]
 *   Default is `"auto"`
 * @property {string | number} [id]
 */

/**
 * @callback TRichTextEditor
 * @param {TRteProps} props
 */

export {};
