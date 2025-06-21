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
  linIntl,
  invertSignIf,
  triangleWave,
} from 'utils/helpers/math';

import { defaultModalSlotProps } from '../constants';
import { sxRoot } from './styles';
import { AUTHOR_AND_REVIEWERS_TOGGLING_EVT_NAME } from 'components/AuthorAndReviewers/const';
import { WheelConfig } from './helpers';

/** @import * as Types from "../types" */

const StyledModal = styled(ModalMui)(({ theme }) => {
  // @ts-ignore
  return sxRoot(theme);
});

/** Модалка навигатора статей. */
export const NavigatorModal = memo(
  /** @type {React.FC<Types.IArtNavModalProps>} */ (
    function NavigatorModalRaw({
      headings,
      curHeading,
      setCurHeading: _setCurHeading,
      isOpen,
      onClose,
      parentSelector,
      scrollableEl,
      id,
      sx,
      className,
      slotProps: slotPropsOuter,
      topMargin,
    }) {
      const slotProps = useMemo(
        () => deepmerge({ ...defaultModalSlotProps }, slotPropsOuter),
        [slotPropsOuter]
      );

      const wCfg = useMemo(
        () => new WheelConfig(headings.length),
        [headings.length]
      );

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
      const progRef = useRef(/** @type {HTMLElement | null} */ (null));
      /** Див с текстом о текущем номере заголовка в центре сцены. */
      const curIndexElRef = useRef(/** @type {HTMLDivElement | null} */ (null));
      /**
       * Индекс пункта списка( = заголовка ), который ближе всего к центру
       * колеса
       */
      const curIdx = useRef(/** @type {number | null} */ (null));

      // Кэшируем оригинальные трансформы Embla
      const originalTransforms = React.useRef(/** @type {string[]} */ ([]));

      // #region applyWheelStyles
      const applyWheelStyles = useCallback(() => {
        if (!emblaApi) {
          return;
        }
        const snapsList = emblaApi.scrollSnapList();

        const scrollProgress = emblaApi.scrollProgress();
        const slides = emblaApi.slideNodes();
        if (progRef.current) {
          progRef.current.textContent = scrollProgress.toFixed(4);
        }

        let closestSlideIndex = 0;
        let smallestDistance = Infinity;

        slides.forEach((slide, index) => {
          const slideSnap = snapsList[index];
          const translateDirection = slideSnap <= scrollProgress ? 1 : -1;
          const slideDistanceFromCenter = Math.abs(scrollProgress - slideSnap);
          /** Smoothing the scale for slides farthest from the center. */
          const scaleСorrection =
            slideDistanceFromCenter * wCfg.scaleSmoothingCoeff;

          let enough = false;
          if (!enough && slideDistanceFromCenter < smallestDistance) {
            smallestDistance = slideDistanceFromCenter;
            closestSlideIndex = index;
          }

          // Для текущей прокрутки масштаб 1.0 => это начальная фаза.
          // Для каждого слайда движемся по треугольной волне и находим ординату, т.е. масштаб.
          // Если получаем отриц. ординату, то просто берем по модулю.
          // При каждом новом тике прокрутки - новый график, т.к. каждый раз новое начальное смещение.
          const scaleRaw = triangleWave(
            1,
            wCfg.triangleWavePeriod,
            slideSnap,
            -scrollProgress
          );
          const scaleRawAbs = Math.abs(scaleRaw);
          const scale = inclusiveRange(
            wCfg.minScale,
            scaleRawAbs * wCfg.scaleCoeff + scaleСorrection,
            1
          );

          let originTransform = originalTransforms.current[index].split(',');
          originTransform[0] = 'matrix(' + scale; // scale X
          originTransform[3] = String(scale); // scale Y

          /* При необходимости создании эффекта закольцованности
          (когда скролл близок к началу/концу списка) эмбла смещает соответствующие заголовки по игрику. */
          const originalTranslateYForLoop =
            +parseFloat(originTransform[5]) || 0;

          slide.style.transform = `${originTransform.join(',')}`;

          if (headings.length > 3) {
            // браузер складывает смещение из transform и из отдельного правила translate
            const baseTranslate =
              linIntl([1, 0], [0, wCfg.extraTranslateMaximum], scale) *
              invertSignIf(originalTranslateYForLoop, translateDirection);
            slide.style.translate = '0px ' + baseTranslate + 'px';
          }

          slide.style.opacity = String(
            inclusiveRange(wCfg.minOpacity, scaleRawAbs * wCfg.opacityCoeff, 1)
          );
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
      }, [emblaApi, headings.length, wCfg]);
      // #endregion applyWheelStyles

      // #region onScroll
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
      // #endregion onScroll

      // #region effects
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

      // на мобилке при открытии шапки она налазит на модалку колеса
      useEffect(() => {
        const handler = (/** @type {any} */ evt) => {
          if (evt.detail.open) {
            onClose('backdropClick');
          }
        };

        window.addEventListener(
          AUTHOR_AND_REVIEWERS_TOGGLING_EVT_NAME,
          handler
        );

        return () => {
          window.removeEventListener(
            AUTHOR_AND_REVIEWERS_TOGGLING_EVT_NAME,
            handler
          );
        };
      }, [onClose]);
      // #endregion effects

      // #region render
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
          onWheel={(evt) => {
            if (!emblaApi) {
              return;
            }

            const directionSign = evt.deltaY > 0 ? 1 : -1;

            if (directionSign > 0) {
              emblaApi.scrollNext();
            } else {
              emblaApi.scrollPrev();
            }
          }}
          onKeyDown={(evt) => {
            if (!emblaApi) {
              return;
            }
            if (evt.key === 'Enter' || evt.keyCode === 32) {
              if (curIdx.current === null) {
                return;
              }

              if (evt.keyCode === 32) {
                evt.preventDefault();
                evt.stopPropagation();
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

                  // setTimeout(
                  // () => {
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
                  // },
                  // 50 // equals to transition delay for .header (see #25-04-01-00-14) ---- UDP obsolete
                  // );
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
              <Box
                ref={progRef}
                sx={{
                  position: 'fixed',
                  top: '8px',
                  left: '12px',
                  color: 'red',
                }}
              >
                0.000
              </Box>
              <div
                className="article-navigator__cur-index"
                ref={curIndexElRef}
              />
            </Box>
          </Fade>
        </StyledModal>
      );
      // #endregion render
    }
  )
);
