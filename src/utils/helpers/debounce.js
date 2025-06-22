// @ts-check

/**
 * @template {Function} T
 * @param {T} callback
 * @param {number} delay
 * @returns {(...args: Parameters<T>) => void} We can't always return what the
 *   original `callback` returns.\
 *   So we can either return a promise or void. In this variation - void.
 */
export default function debounce(callback, delay) {
  /** @type {number | undefined} */
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(callback, delay, ...args);
  };
}
