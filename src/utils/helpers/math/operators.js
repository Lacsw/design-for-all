// @ts-check

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

/**
 * Get a number from a range. Inclusive.
 *
 * @param {number} a - The point of the range
 * @param {number} x - Desired value
 * @param {number} b - The point of the range
 * @returns {number}
 */
export function inclusiveRange(a, x, b) {
  const isAMin = a <= b;
  const min = isAMin ? a : b;
  const max = isAMin ? b : a;
  return Math.min(max, Math.max(x, min));
}

/**
 * @param {any} condition
 * @param {number} num
 * @returns {number}
 */
export function invertSignIf(condition, num) {
  return condition ? -1 * num : num;
}

/**
 * @param {number[]} xs - отсортированный массив
 * @param {number} x
 * @returns {[number, number]}
 */
export function findClosestIdx(xs, x) {
  let closestIndex = -1;
  let smallestDiff = Infinity;
  let smallestDiffAbs = Infinity;

  for (let i = 0; i < xs.length; i++) {
    const diff = x - xs[i];
    const diffAbs = Math.abs(diff);

    if (diffAbs < smallestDiffAbs) {
      closestIndex = i;
      smallestDiff = diff;
      smallestDiffAbs = diffAbs;
    } else {
      break;
    }
  }

  return [closestIndex, smallestDiff];
}
