// @ts-check

/**
 * @callback TJDRteOnInputProp
 * @param {import('./validation/types').TJDValidateResult} data
 * @returns {void}
 */

/**
 * @typedef TJDRteClassesProp
 * @property {string} [menuBar]
 * @property {string} [textTypeSelector]
 * @property {string} [button]
 */

/**
 * @typedef RichTextEditorProps
 * @property {string | null} [initialValue] - Html-string for INITIAL view
 * @property {Partial<import('./validation/types').TJDValidationOptions>} [validationsOptions]
 * @property {TJDRteOnInputProp} [onInput] - Cb fires with debounce when content
 *   changes in RTE
 * @property {import('@tiptap/react').EditorOptions['onCreate']} [onCreate]
 * @property {(editor: import('@tiptap/react').Editor) => void} [onRealCreate]
 *   - `onCreate` cb is called when the element is created but not attached to the
 *       DOM-tree. `onRealCreate` cb is called in the effect when the attachment
 *       is already done
 *
 * @property {boolean} [readOnly] - Isn't RTE editable
 * @property {string} [className]
 * @property {TJDRteClassesProp} [classes]
 * @property {boolean} [cancel] - If `true` the editor will return to the
 *   `initialValue`. Until the parameter `true` the editor will not apply new
 *   changes, so after reset **return this prop** to `false`
 * @property {import('csstype').Property.MaxHeight | undefined} [maxHeight="auto"]
 *   Default is `"auto"`
 * @property {string | number} [id]
 */

/**
 * @callback TJDRichTextEditor
 * @param {RichTextEditorProps} props
 */

export {};
