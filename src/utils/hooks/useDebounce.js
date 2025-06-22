// @ts-check
import { useRef, useEffect, useCallback } from 'react';

/**
 * @template {Function} T
 * @param {T} func
 * @param {number} delay
 * @param {boolean} [cleanUp] Default is `false`.\
 *   If `true` when the component is unmounted, the deferred call will be
 *   cancelled.
 * @returns {(this: ThisParameterType<T>, ...args: Parameters<T>) => void} We
 *   can't always return what the original `func` returns.\
 *   So we can either return a promise or void. In this hook variation - void.
 */
export function useDebounce(func, delay, cleanUp = false) {
  /** @type {React.MutableRefObject<number | undefined>} */
  const timeoutId = useRef();

  const clearTimer = useCallback(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = undefined;
    }
  }, []);

  useEffect(() => {
    if (cleanUp) {
      return clearTimer;
    }
  }, [cleanUp, clearTimer]);

  const debouncedFunc = useCallback(
    (/** @type {Parameters<T>} */ ...args) => {
      clearTimer();
      timeoutId.current = window.setTimeout(() => func(...args), delay);
    },
    [clearTimer, func, delay]
  );

  return debouncedFunc;
}
