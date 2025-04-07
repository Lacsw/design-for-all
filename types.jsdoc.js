// DO NOT MAKE EXPORTS FROM THIS FILE (otherwise it will break)

// This file for global typedefinitions in JSDoc.

// #region React
/**
 * Type for **result** of call react hook useState.
 *
 * @deprecated This is for using with `_useState`, from
 *   `src/types/react/hooks.js`(#1).\
 *   Use type TState instead, see example in #1.
 * @template T
 * @typedef TState_DEPRECATED
 * @type {[value: T, setter: React.Dispatch<React.SetStateAction<T>>]}
 */

/**
 * Type for **result** of call react hook useState.
 *
 * @template T
 * @typedef TState
 * @type {ReturnType<typeof React.useState<T>>}
 */
// #endregion React
