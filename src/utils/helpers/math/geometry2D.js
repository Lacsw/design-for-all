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
  return ((x2 - x1) * (y3 - y1)) / (x3 - x1) + y1;
}

/**
 * @param {number[]} xs
 * @param {number} x
 * @returns {[number, number]} indexes
 */
export function pickLinIntlPoints(xs, x) {
  if (xs.length < 2) {
    throw new Error("Can't pick interpolator points. Length need to be >= 2.");
  }
  const [closestIdx, diff] = findClosestIdx(xs, x);

  if (!diff) {
    return [closestIdx, closestIdx];
  }

  const xBefore = xs[closestIdx - 1];
  const xAfter = xs[closestIdx + 1];

  if (typeof xBefore === 'number' && typeof xAfter === 'number') {
    if (diff < 0) {
      return [closestIdx - 1, closestIdx + 1];
    } else {
      return [];
    }
  }

  if (closestIdx === 0) {
    return [0, closestIdx + 1];
  }

  if (closestIdx === xs.length - 1) {
    // @ts-ignore
    return [closestIdx - 1, closestIdx];
  }

  throw new Error("Can't pick interpolator points.");
}

/**
 * @param {number[]} xs
 * @param {number[]} ys
 * @returns {object}
 */
export function createInterpolator(xs, ys) {
  if (xs.length < 2 || xs.length !== ys.length) {
    throw new Error('Lengths are bad!');
  }

  /**
   * @param {number} x
   * @returns {number}
   * @this {{ xs: number[]; ys: number[] }}
   */
  function get(x) {
    const [xa, xb] = pickLinIntlPoints(this.xs, x);
    const [ya, yb] = pickLinIntlPoints(this.ys, x);

    return 0;
  }

  const interpolator = {
    xs,
    ys,
    get,
  };

  return interpolator;
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
