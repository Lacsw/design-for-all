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
 * Linear interpolation
 *
 * @param {[number, number]} point1
 * @param {[number, number]} point3
 * @param {number} x2
 * @returns {number}
 */
export function interpolate(point1, point3, x2) {
  const [x1, y1] = point1;
  const [x3, y3] = point3;
  return ((x2 - x1) * (y3 - y1)) / (x3 - x1) + y1;
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
 * @returns {number}
 */
export function findClosestIdx(xs, x) {
  let closestIndex = -1;
  let smallestDistance = Infinity;

  for (let i = 0; i < xs.length; i++) {
    const distance = Math.abs(x - xs[i]);
    if (distance < smallestDistance) {
      closestIndex = i;
      smallestDistance = distance;
    } else {
      break;
    }
  }

  return closestIndex;
}
