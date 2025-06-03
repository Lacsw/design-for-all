import { mod } from './operators';

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
 * f\left(x\right)\ =\ \frac{4a}{p}\cdot\left|\operatorname{mod}\left(\left(x+c\right),\ p\right)\ -\ \frac{p}{2}\right|\ -\ a \
 */
export function triangleWave(a, p, x, c) {
  const initialPhase = c ?? -(p / 4); // начальную фазу прибавляем! Иначе приходилось делать <1 - смещение_вправо>
  return ((4 * a) / p) * Math.abs(mod(x + initialPhase, p) - p / 2) - a;
}
