import { useRef } from 'react';

// for original positions of these code pieces see https://github.com/Lacsw/design-for-all/blob/7c6d4325f3de5938de830be597ced47562cb8932/src/components/ArticleNavigator/Modal/Modal.jsx
const DRAFTS_FOR_WHEEL = () => {
  /*
  При необходимости создании эффекта закольцованности
  (когда скролл близок к началу/концу списка) эмбла смещает соответствующие заголовки по игрику.
*/
  const loopTransValRef = useRef(-448);

  /*
  (#1) embla вносит изменения в свойство transform, а именно в подствойство translate3d.
  При этом она к текущему значению прибавляют свою необходимую по ее мнению поправку.
  Потому когда мы сами меняем translate3d(матрицей или набором через запятую), то будет
  накапливаться значение - оно будет расти - элемент будет улетать в космос.
  Потому надо помнить, какую дельту мы применяли лично сами в прошлый раз. Сначал вычитаем ее, затем применяем
  вычисленную нами лично новую прибавку к базовому смещению, рассчитанному эмблой.
*/
  const _previousDeltas = useRef(/** @type {number[]} */ ([]));

  /**
   * @param {HTMLElement | undefined} target
   * @param {'+' | '-'} mode
   */
  function _correctPosition(target, mode) {
    if (!target) {
      return;
    }
    const sign = mode === '+' ? 1 : -1;
    /* При необходимости создании эффекта закольцованности
  (когда скролл близок к началу/концу списка) эмбла смещает соответствующие заголовки по игрику. */
    const loopTranslateVal = parseFloat(
      target?.style.transform.split(',')[5] || ''
    );
    const curTranslateY = parseFloat(target.style.translate.split(' ')[1]);
    target.style.translate = `0px ${
      loopTranslateVal
        ? curTranslateY
        : sign * loopTransValRef.current + (-1 * curTranslateY || 0)
    }px`;
  }

  // IN APPLY WHEEL STYLES

  // ----- См. #1 -----
  // const translateY = originTransform[5];
  // const translateYParsed = parseFloat(translateY) || 0;
  // const delta =
  //   interpolate([1, 0], [MIN_SCALE, 50], scale) * translateDirection;
  // previousDeltas.current[index] = delta;
  // const res = translateYParsed + delta - previousDeltas.current[index];
  // originTransform[5] = res + ')';

  // !!! Если влиять на высоты элементов (не стилевую через scale, а реальную), то логика эмблы ломается
  // slide.style.padding = `${linIntl(
  //   [1, 5],
  //   [0, 0],
  //   triangleValAbs
  // )}px ${linIntl([1, 13], [0.3, 0], triangleValAbs)}px`;

  // slide.style.margin = `${linIntl(
  //   [1, 13],
  //   [0.3, 0],
  //   triangleValAbs
  // )}px 0px`;

  // slide.style.minHeight =
  //   linIntl([1, 46], [0, 5], triangleValAbs) + 'px';
  // slide.style.height = linIntl([1, 46], [0, 5], triangleValAbs) + 'px';

  // ------ USE THIS FOR CORRECT SLIDES POSITIONs WHEN LOOP = TRUE --------
  // if (scrollProgress >= -0.1 && scrollProgress <= 0.285) {
  //   const lastSlide = slides.at(-1);
  //   const penultimateSlide = slides.at(-2);
  //   const targetSlide = slides.at(-3);
  //
  //   const loopTranslateVal = parseFloat(
  //     lastSlide?.style.transform.split(',')[5] || ''
  //   );
  //   if (loopTranslateVal) {
  //     loopTransValRef.current = loopTranslateVal;
  //   }
  //
  //   correctPosition(lastSlide, '+');
  //   correctPosition(penultimateSlide, '+');
  //   scrollProgress <= 0.123 && correctPosition(targetSlide, '+');
  // } else {
  //   scrollProgress >= 0.55 && correctPosition(slides.at(0), '-');
  //   scrollProgress >= 0.65 && correctPosition(slides.at(1), '-');
  //   scrollProgress >= 0.76 && correctPosition(slides.at(2), '-');
  //   scrollProgress >= 0.91 && correctPosition(slides.at(3), '-');
  // }
};
