/**
 * Modulo operation
 *
 * @param {number} a dividend
 * @param {number} n divisor
 * @returns {number} remainder(unsigned)
 * @see https://en.wikipedia.org/wiki/Modulo
 */
export function mod(a, n) {
  return ((a % n) + n) % n;
}
