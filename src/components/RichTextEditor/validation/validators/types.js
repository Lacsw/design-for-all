// @ts-check
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ResolvedPos } from '@tiptap/pm/model';

/**
 * @typedef TValidatorResult
 * @property {string} validated - validated content (this is preparing for
 *   validation mode "correct content to valid") at least partially
 * @property {boolean} isValid
 */

/**
 * @callback TValidator
 * @param {import('@tiptap/core').Editor} editor
 * @returns {TValidatorResult}
 */

/**
 * @typedef TTrimValidatorProps
 * @property {import('@tiptap/core').Editor} editor
 * @property {number} from relates to {@link ResolvedPos}
 * @property {number} to relates to {@link ResolvedPos}
 * @property {string} content
 */

/**
 * @callback TTrimValidator
 * @param {TTrimValidatorProps} props
 * @returns {TValidatorResult & {
 *   textSelection: import('@tiptap/pm/state').TextSelection;
 * }}
 */

export const Types = {};
