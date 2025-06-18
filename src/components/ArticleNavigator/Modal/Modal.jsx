// @ts-check
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import useEmblaCarousel from 'embla-carousel-react';
import { Box, Fade, Modal as ModalMui, styled } from '@mui/material';
import { deepmerge } from '@mui/utils';
import clsx from 'clsx';

import {
  inclusiveRange,
  interpolate,
  invertSignIf,
  triangleWave,
} from 'utils/helpers/math';

import { defaultModalSlotProps } from '../constants';
import { sxRoot } from './styles';

/** @import * as Types from "../types" */

const StyledModal = styled(ModalMui)(({ theme }) => {
  // @ts-ignore
  return sxRoot(theme);
});

/** Модалка навигатора статей. */
export const NavigatorModal = memo(
  /** @type {React.FC<Types.IArtNavModalProps>} */ (
    function NavigatorModalRaw({
      isOpen,
      headings,
      onClose,
      id,
      sx,
      className,
      parentSelector,
      slotProps: slotPropsOuter,
      topMargin,
      scrollableEl,
      curHeading,
      setCurHeading: _setCurHeading,
    }) {
      const slotProps = useMemo(
        () => deepmerge({ ...defaultModalSlotProps }, slotPropsOuter),
        [slotPropsOuter]
      );
      // const headingsLength = headings.length;

      const [emblaOptions, setEmblaOptions] =
        /** @type {TState<import('embla-carousel').EmblaOptionsType>} */ (
          useState({
            axis: 'y',
            loop: false,
            skipSnaps: true,
            // duration: 10,
            containScroll: false,
          })
        );
      const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);

      const emblaElRef = useRef(/** @type {HTMLDivElement | null} */ (null));
      const olRef = useRef(/** @type {HTMLOListElement | null} */ (null));
      // const progRef = useRef(/** @type {HTMLElement | null} */ (null));
      /** Див с текстом о текущем номере заголовка в центре сцены. */
      const curIndexElRef = useRef(/** @type {HTMLDivElement | null} */ (null));
      /**
       * Индекс пункта списка( = заголовка ), который ближе всего к центру
       * колеса
       */
      const curIdx = useRef(/** @type {number | null} */ (null));

      // Кэшируем оригинальные трансформы Embla
      const originalTransforms = React.useRef(/** @type {string[]} */ ([]));

      /* При необходимости создании эффекта закольцованности
      (когда скролл близок к началу/концу списка) эмбла смещает соответствующие заголовки по игрику. */
      // const loopTransValRef = useRef(-448);

      /* (#1) embla вносит изменения в свойство transform, а именно в подствойство translate3d.
      При этом она к текущему значению прибавляют свою необходимую по ее мнению поправку.
      Потому когда мы сами меняем translate3d(матрицей или набором через запятую), то будет
      накапливаться значение - оно будет расти - элемент будет улетать в космос.
      Потому надо помнить, какую дельту мы применяли лично сами в прошлый раз. Сначал вычитаем ее, затем применяем
      вычисленную нами лично новую прибавку к базовому смещению, рассчитанному эмблой. */
      // const previousDeltas = React.useRef(/** @type {number[]} */ ([]));

      /**
       * @param {HTMLElement | undefined} target
       * @param {'+' | '-'} mode
       */
      // function correctPosition(target, mode) {
      //   if (!target) {
      //     return;
      //   }
      //   const sign = mode === '+' ? 1 : -1;
      //   /* При необходимости создании эффекта закольцованности
      //   (когда скролл близок к началу/концу списка) эмбла смещает соответствующие заголовки по игрику. */
      //   const loopTranslateVal = parseFloat(
      //     target?.style.transform.split(',')[5] || ''
      //   );
      //   const curTranslateY = parseFloat(target.style.translate.split(' ')[1]);
      //   target.style.translate = `0px ${
      //     loopTranslateVal
      //       ? curTranslateY
      //       : sign * loopTransValRef.current + (-1 * curTranslateY || 0)
      //   }px`;
      // }

      const applyWheelStyles = useCallback(() => {
        if (!emblaApi) {
          return;
        }
        const snapsList = emblaApi.scrollSnapList();
        if (snapsList.length < 2) {
          return;
        }

        const scrollProgress = emblaApi.scrollProgress();
        const slides = emblaApi.slideNodes();
        // if (progRef.current) {
        //   progRef.current.textContent = scrollProgress + '!';
        // }

        let closestSlideIndex = 0;
        let smallestDistance = Infinity;

        slides.forEach((slide, index) => {
          const slideSnap = snapsList[index];
          const translateDirection = slideSnap <= scrollProgress ? 1 : -1;
          const slideDistanceFromCenter = Math.abs(scrollProgress - slideSnap);
          /** Smoothing the scale for slides farthest from the center. */
          const scaleСorrection = slideDistanceFromCenter * 0.65;

          let enough = false;
          if (!enough && slideDistanceFromCenter < smallestDistance) {
            smallestDistance = slideDistanceFromCenter;
            closestSlideIndex = index;
          }

          // Для текущей прокрутки масштаб 1.0 => это начальная фаза.
          // Для каждого слайда движемся по треугольной волне и находим ординату, т.е. масштаб.
          // Если получаем отриц. ординату, то просто берем по модулю.
          // При каждом новом тике прокрутки - новый график, т.к. каждый раз новое начальное смещение.
          const scaleRaw = triangleWave(1, 2, slideSnap, -scrollProgress);
          const scaleRawAbs = Math.abs(scaleRaw);
          const scale = inclusiveRange(
            0,
            scaleRawAbs * 1.2 + scaleСorrection,
            1
          );

          let originTransform = originalTransforms.current[index].split(',');
          originTransform[0] = 'matrix(' + scale; // scale X
          originTransform[3] = String(scale); // scale Y

          /* При необходимости создании эффекта закольцованности
          (когда скролл близок к началу/концу списка) эмбла смещает соответствующие заголовки по игрику. */
          const originalTranslateYForLoop =
            +parseFloat(originTransform[5]) || 0;

          // ----- См. #1 -----
          // const translateY = originTransform[5];
          // const translateYParsed = parseFloat(translateY) || 0;
          // const delta =
          //   interpolate([1, 0], [MIN_SCALE, 50], scale) * translateDirection;
          // previousDeltas.current[index] = delta;
          // const res = translateYParsed + delta - previousDeltas.current[index];
          // originTransform[5] = res + ')';
          slide.style.transform = `${originTransform.join(',')}`;

          // браузер складывает смещение из transform и из отдельного правила translate
          const baseTranslate =
            interpolate([1, 0], [0, 110], scale) *
            invertSignIf(originalTranslateYForLoop, translateDirection);
          slide.style.translate = '0px ' + baseTranslate + 'px';

          slide.style.opacity = String(inclusiveRange(0, scaleRawAbs * 1.2, 1));

          // !!! Если влиять на высоты элементов (не стилевую через scale, а реальную), то логика эмблы ломается
          // slide.style.padding = `${interpolate(
          //   [1, 5],
          //   [0, 0],
          //   scaleRawAbs
          // )}px ${interpolate([1, 13], [0.3, 0], scaleRawAbs)}px`;

          // slide.style.margin = `${interpolate(
          //   [1, 13],
          //   [0.3, 0],
          //   scaleRawAbs
          // )}px 0px`;

          // slide.style.minHeight = interpolate([1, 46], [0, 5], scaleRawAbs) + 'px';
          // slide.style.height = interpolate([1, 46], [0, 5], scaleRawAbs) + 'px';
        });

        slides.forEach((s) => s.classList.remove('closest'));
        slides[closestSlideIndex].classList.add('closest');
        if (emblaElRef.current && curIndexElRef.current) {
          emblaElRef.current.style.setProperty(
            '--cur-idx',
            String(closestSlideIndex)
          );
          curIndexElRef.current.textContent =
            closestSlideIndex + 1 + '/' + slides.length;
        }
        curIdx.current = closestSlideIndex;

        // ------ USE THIS FOR CORRECT SLIDES POSITIONs WHEN LOOP = TRUE --------
        // if (scrollProgress >= -0.1 && scrollProgress <= 0.285) {
        //   const lastSlide = slides.at(-1);
        //   const penultimateSlide = slides.at(-2);
        //   const targetSlide = slides.at(-3);

        //   const loopTranslateVal = parseFloat(
        //     lastSlide?.style.transform.split(',')[5] || ''
        //   );
        //   if (loopTranslateVal) {
        //     loopTransValRef.current = loopTranslateVal;
        //   }

        //   correctPosition(lastSlide, '+');
        //   correctPosition(penultimateSlide, '+');
        //   scrollProgress <= 0.123 && correctPosition(targetSlide, '+');
        // } else {
        //   scrollProgress >= 0.55 && correctPosition(slides.at(0), '-');
        //   scrollProgress >= 0.65 && correctPosition(slides.at(1), '-');
        //   scrollProgress >= 0.76 && correctPosition(slides.at(2), '-');
        //   scrollProgress >= 0.91 && correctPosition(slides.at(3), '-');
        // }
      }, [emblaApi]);

      const onScroll = useCallback(
        function () {
          if (!emblaApi) {
            return;
          }

          originalTransforms.current = emblaApi.slideNodes().map((slide) => {
            const value = window.getComputedStyle(slide).transform;
            const res = value === 'none' ? 'matrix(1, 0, 0, 1, 0, 0)' : value;
            return res;
          });
          applyWheelStyles();
          // requestAnimationFrame(applyWheelStyles); // при переходах через начало колеса(с loop: true) были подергивания
        },
        [emblaApi, applyWheelStyles]
      );

      useEffect(() => {
        if (headings.length && curHeading) {
          const idx = curHeading.getAttribute('data-idx');
          if (idx) {
            setEmblaOptions((prev) => ({ ...prev, startIndex: +idx }));
          }
        }
      }, [headings, curHeading]);

      useEffect(() => {
        if (!emblaApi) {
          return;
        }

        onScroll();
        emblaApi.on('scroll', onScroll);
        return () => {
          emblaApi.off('scroll', onScroll);
        };
      }, [onScroll, emblaApi]);

      return (
        <StyledModal
          open={isOpen}
          sx={sx}
          id={id}
          container={() =>
            parentSelector ? document.querySelector(parentSelector) : null
          }
          className={className}
          slotProps={slotProps}
          disableScrollLock
          closeAfterTransition
          onClose={(evt, reason) => onClose(reason)}
          onKeyDown={(evt) => {
            if (!emblaApi) {
              return;
            }
            if (evt.key === 'Enter') {
              if (curIdx.current === null) {
                return;
              }
              const headingForClosestSlide = headings[curIdx.current];
              const rectForHeadingClosestSlide =
                headingForClosestSlide.getBoundingClientRect();
              const targetHeadingY = rectForHeadingClosestSlide.y;
              const curHeadingY = curHeading?.getBoundingClientRect().y ?? 0;
              const delta = targetHeadingY > curHeadingY ? 2 : -2; // чтобы IntersectionObserver сработал как надо

              onClose('click', headingForClosestSlide);
              scrollableEl?.scrollTo({
                top:
                  rectForHeadingClosestSlide.y -
                  (scrollableEl?.getBoundingClientRect().y ?? 0) -
                  -topMargin +
                  delta,
                left: 0,
                behavior: 'smooth',
              });
            } else if (evt.key === 'ArrowDown') {
              emblaApi.scrollNext();
            } else if (evt.key === 'ArrowUp') {
              emblaApi.scrollPrev();
            }
          }}
        >
          <Fade in={isOpen}>
            <Box
              className={clsx('article-navigator__modal')}
              ref={
                /** @param {HTMLDivElement | null} el */ (el) => {
                  emblaRef(el);
                  emblaElRef.current = el;
                }
              }
            >
              <ol
                ref={olRef}
                className="article-navigator__list"
                onClick={(evt) => {
                  if (evt.detail > 1) {
                    return;
                  }
                  if (!(evt.target instanceof HTMLLIElement)) {
                    return;
                  }
                  const target = /** @type {EventTarget & HTMLLIElement} */ (
                    evt.target
                  );

                  const targetIdx = target.getAttribute('data-idx');

                  if (targetIdx === null) {
                    return;
                  }
                  const targetIdxNum = Number(targetIdx);
                  if (!target.classList.contains('closest')) {
                    emblaApi?.scrollTo(Number(targetIdx));
                    return;
                  }

                  const targetHeading = headings[targetIdxNum];
                  const targetHeadingRect =
                    targetHeading.getBoundingClientRect();

                  onClose('click', targetHeading);

                  setTimeout(
                    () => {
                      const targetHeadingY = targetHeadingRect.y;
                      const curHeadingY =
                        curHeading?.getBoundingClientRect().y ?? 0;
                      const delta = targetHeadingY > curHeadingY ? 2 : -2; // чтобы IntersectionObserver сработал как надо

                      scrollableEl?.scrollTo({
                        top:
                          targetHeadingRect.y -
                          (scrollableEl?.getBoundingClientRect().y ?? 0) -
                          -topMargin +
                          delta,
                        left: 0,
                        behavior: 'smooth',
                      });
                    },
                    50 // equals to transition delay for .header (see #25-04-01-00-14) ---- UDP obsolete
                  );
                }}
              >
                {headings.map((headingEl, idx) => {
                  return (
                    <li
                      data-idx={idx}
                      key={idx + (headingEl.textContent || uuidv4())}
                      className={clsx(
                        'article-navigator__item',
                        curHeading === headingEl &&
                          'article-navigator__item_current'
                      )}
                    >
                      <span className="heading-text">
                        {headingEl.textContent}
                      </span>
                    </li>
                  );
                })}
              </ol>
              {/* <Box
                ref={progRef}
                sx={{
                  position: 'fixed',
                  top: '8px',
                  left: '12px',
                }}
              >
                0.000
              </Box>*/}
              <div
                className="article-navigator__cur-index"
                ref={curIndexElRef}
              />
            </Box>
          </Fade>
        </StyledModal>
      );
    }
  )
);
