// @ts-check

import { calcIntledY } from 'utils/helpers/math';

/**
 * Для параметров колеса значения можем получать через интерполяцию.\
 * В качестве x выступает число заголовков.\
 * В качестве y - значение для параметра.
 *
 * Таким образом выносим логику условий в отдельное место.
 *
 * !! Теперь логика зависит от числа шагов, на которое слайд удален от центра,
 * так\
 * что от интерполяции можно почти полностью отказаться.
 *
 * Задайте два одинаковых Y, чтобы создать горизантльный участок.\
 * На краевых участках при бесконечом изм-ии X это предовтратит бесконечное\
 * изменение Y.
 */
export class WheelConfig {
  /** @param {number} listLength */
  constructor(listLength) {
    this.x = listLength;

    this.triangleWavePeriod = this.intlFor('triangleWavePeriodRange');
    this.minScale = this.intlFor('minScaleRange');
    this.scaleCoeff = this.intlFor('scaleCoeffRange');
    this.scaleSmoothingCoeff = this.intlFor('scaleSmoothingCoeffRange');
    this.extraTranslateMaximum = this.intlFor('extraTranslateMaximumRange');
    this.minOpacity = this.intlFor('minOpacityRange');
    this.opacityCoeff = this.intlFor('opacityCoeffRange');
  }

  // Перирод волнового графика.
  // Влияет на то, как скоро элементы списка начнут не уменьшаться, а вновь увеличиватся в масштабе.
  // Это происходит, т.к. используется график треугольной волны
  triangleWavePeriodRange = {
    3: 12,
    4: 20,
    5: 20,
  };
  // мин. масштаб элемента списка (перекрывает значение от треугольно-волнового графика)
  minScaleRange = {
    x: [4, 5],
    y: [0, 0],
  };
  // сырое абсолютное значение масштаба, полученное по графику волны, умножается на этот коэф.
  scaleCoeffRange = {
    3: 1,
    4: 1,
  };
  // величина отдаленности элемента списка от центра сцены умножается на этот коэф.
  // Сглаживаем уменьшение масштаба
  scaleSmoothingCoeffRange = {
    x: [3, 4],
    y: [0, 0],
  };
  // К наиболее отдаленным от центра сцены элементам списка
  // необходимо применять корректировку смещения. Иначе элементы скрываются
  // со сцены слишком рано (по макету хотят видеть 3-4 эл-та помимо центрального).
  // Этот параметр - величина корректировки, когда масштаб(не сырой, а также скорректированный) равен 0.
  // Влияет также на расстояние между элементами.
  extraTranslateMaximumRange = {
    3: 70,
    4: 70,
  };
  // минимальная непрозрачность
  minOpacityRange = {
    x: [3, 4],
    y: [0.4, 0.4],
  };
  // коэф., применяемый к значению, получаемому с графика треугольной волны, когда
  // ведется расчет непрозрачности
  opacityCoeffRange = {
    x: [3, 4, 5],
    y: [1.2, 1.2, 1.2],
  };

  /**
   * @param {keyof WheelConfig} key
   * @returns {number}
   */
  intlFor(key) {
    const data = this[key];
    // @ts-ignore
    if ('x' in data && 'y' in data) {
      // @ts-ignore
      return calcIntledY(this[key].x, this[key].y, this.x);
    }

    /**
     * - object key - x, headings length
     * - object value - y, value for wheel parameter
     *
     * @type {[string, number][]}
     */
    const entries = Object.entries(data);

    /** @type {number[]} */
    const xs = [];
    /** @type {number[]} */
    const ys = [];

    entries.forEach((entry) => {
      xs.push(Number(entry[0]));
      ys.push(entry[1]);
    });

    return calcIntledY(xs, ys, this.x);
  }

  // Гетеры будут считать значение при каждом обращении.
  // А обращений много, т.к. происходят на событие скролла карусели
  // get triangleWavePeriod() {
  //   return this.intlFor('triangleWavePeriodRange');
  // }
  // get minScale() {
  //   return this.intlFor('minScaleRange');
  // }
  // get scaleCoeff() {
  //   return this.intlFor('scaleCoeffRange');
  // }
  // get scaleSmoothingCoeff() {
  //   return this.intlFor('scaleSmoothingCoeffRange');
  // }
  // get extraTranslateMaximum() {
  //   return this.intlFor('extraTranslateMaximumRange');
  // }
  // get minOpacity() {
  //   return this.intlFor('minOpacityRange');
  // }
  // get opacityCoeff() {
  //   return this.intlFor('opacityCoeffRange');
  // }
}
