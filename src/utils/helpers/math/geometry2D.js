// @ts-check

import { findClosestIdx, mod } from './operators';

/**
 * Linear interpolation
 *
 * @param {[number, number]} point1
 * @param {[number, number]} point3
 * @param {number} x2
 * @returns {number}
 */
export function linIntl(point1, point3, x2) {
  const [x1, y1] = point1;
  const [x3, y3] = point3;
  if (x1 === x3) {
    if (y1 === y3) {
      return y1;
    } else {
      throw Error('x1 === x3 but y1 !== y3');
    }
  }
  return ((x2 - x1) * (y3 - y1)) / (x3 - x1) + y1;
}

/**
 * Follows for linear-piecewise functions logic.
 *
 * If the value is outside the graph, the last segment\
 * of the graph will be extrapolated.
 *
 * @param {number[]} xs
 * @param {number} x
 * @returns {[number, number]} indexes
 */
export function pickLinIntlPoints(xs, x) {
  if (xs.length < 2) {
    throw new Error("Can't pick interpolator points. Length need to be >= 2.");
  }

  const [closestIdx, diff] = findClosestIdx(xs, x);

  if (diff === 0) {
    return [closestIdx, closestIdx];
  }

  const xBeforeClosest = xs[closestIdx - 1];
  const xAfterClosest = xs[closestIdx + 1];

  if (diff < 0) {
    if (typeof xBeforeClosest === 'number') {
      return [closestIdx - 1, closestIdx]; // interpolating
    } else {
      return [closestIdx, closestIdx + 1]; // extrapolating
    }
  }

  // diff > 0
  if (typeof xAfterClosest === 'number') {
    return [closestIdx, closestIdx + 1]; // interpolating
  } else {
    return [closestIdx - 1, closestIdx]; // extrapolating
  }
}

/**
 * @param {number[]} xs
 * @param {number[]} ys
 * @param {number} x
 * @returns {number}
 */
export function calcIntledY(xs, ys, x) {
  if (!xs.length || xs.length !== ys.length) {
    throw new Error("Invalid arrays, can't interpolate!");
  }

  const [idxA, idxB] = pickLinIntlPoints(xs, x);
  const xA = xs[idxA];
  const yA = ys[idxA];
  const xB = xs[idxB];
  const yB = ys[idxB];

  return linIntl([xA, yA], [xB, yB], x);
}

/**
 * Specify extremum points for a linear-piecewise function and\
 * get these points back, as well as a function `for` for calculating an
 * arbitrary x.
 *
 * @example
 *   ```js
 *   const pwlFn = createPiecewiseLinearFunc(
 *     [1, 5, 7],
 *     [4, 12, -9]
 *   );
 *   pwlFn.for(0); // x = 0 ==> y = 2
 *   pwlFn.for(4); // 10
 *   console.log("5 ==>", pwlFn.for(5)); // 12
 *   ```;
 *
 * @param {number[]} xs - X's of extremes
 * @param {number[]} ys - Y's of extremes
 */
export function createPiecewiseLinearFunc(xs, ys) {
  if (xs.length < 2 || xs.length !== ys.length) {
    throw new Error('The coordinates of the extremum points are invalid.');
  }

  /**
   * @param {number} x
   * @returns {number}
   * @this {{ xs: number[]; ys: number[] }}
   */
  function calcY(x) {
    return calcIntledY(this.xs, this.ys, x);
  }

  const piecewiseLinearFunc = {
    xs,
    ys,
    for: calcY,
  };

  return piecewiseLinearFunc;
}

/**
 * @param {number} a - амплитуда
 * @param {number} p - период
 * @param {number} x - координата точки по оси абсцисс
 * @param {number} [c] - начальная фаза колебания
 * @returns {number} y - координата точки по оси ординат
 * @see https://en.wikipedia.org/wiki/Triangle_wave
 *
 * @see https://www.desmos.com/Calculator \
 * Use this in desmos input:\
 * f\left(x\right)\ =\ \frac{4a}{p}\cdot\left|\operatorname{mod}\left(\left(x+c\right),\ p\right)\ -\ \frac{p}{2}\right|\ -\ a
 * a = ... --- амплитуда
 * p = ... --- период
 * c = -... --- начальная фаза
 *
 * See also wheel.dwg file.
 */
export function triangleWave(a, p, x, c) {
  const initialPhase = c ?? -(p / 4); // начальную фазу прибавляем! Иначе приходилось делать <1 - смещение_вправо>
  return ((4 * a) / p) * Math.abs(mod(x + initialPhase, p) - p / 2) - a;
}
