// @ts-check

import { useCallback, useRef } from 'react';

/**
 * @typedef TThrottleOptions
 * @property {boolean} leading
 * @property {boolean} trailing
 */

/** @type {TThrottleOptions} */
const defaultOptions = {
  leading: true,
  trailing: true,
};

/**
 * @template {Function} T
 * @param {T} func
 * @param {number} delay
 * @param {TThrottleOptions} [options]
 * @returns {(
 *   this: ThisParameterType<T>,
 *   ...args: Parameters<T>
 * ) => ReturnType<T> | undefined}
 */
export function useThrottle(func, delay, options = defaultOptions) {
  const { leading, trailing } = options;
  const planned = useRef(false);
  // @ts-ignore
  const savedThis = useRef(/** @type {ThisParameterType<T> | null} */ (this));
  // @ts-ignore
  const savedArgs = useRef(/** @type {Parameters<T> | null} */ (arguments));

  const wrapper = useCallback(
    function () {
      function execute() {
        if (savedArgs.current) {
          const res = func.apply(savedThis.current, savedArgs.current);
          savedThis.current = null;
          savedArgs.current = null;
          return res;
        }
      }

      if (planned.current) {
        // @ts-ignore
        savedThis.current = this;
        // @ts-ignore
        savedArgs.current = arguments;
        return;
      }

      planned.current = true;
      if (leading) {
        setTimeout(() => {
          planned.current = false;
        }, delay);
        return execute();
      } else if (trailing) {
        setTimeout(() => {
          planned.current = false;
          execute();
        }, delay);
        return;
      }

      return;
    },
    [delay, func, leading, trailing]
  );

  return wrapper;
}
