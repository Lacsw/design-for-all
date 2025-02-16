// @ts-check
/* eslint-disable no-unused-vars */
import { ResolvedPos } from '@tiptap/pm/model';

/**
 * @typedef TJDValidatorResult
 * @property {string} validated - validated content (this is preparing for
 *   validation mode "correct content to valid") at least partially
 * @property {boolean} isValid
 */

/**
 * @callback TJDValidator
 * @param {import('@tiptap/core').Editor} editor
 * @returns {TJDValidatorResult}
 */

/**
 * @typedef TJDTrimValidatorProps
 * @property {import('@tiptap/core').Editor} editor
 * @property {number} from relates to {@link ResolvedPos}
 * @property {number} to relates to {@link ResolvedPos}
 * @property {string} content
 */

/**
 * @callback TJDTrimValidator
 * @param {TJDTrimValidatorProps} props
 * @returns {TJDValidatorResult & {
 *   textSelection: import('@tiptap/pm/state').TextSelection;
 * }}
 */

export const Types = {};
