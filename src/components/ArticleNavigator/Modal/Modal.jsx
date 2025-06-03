// @ts-check
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useEmblaCarousel from 'embla-carousel-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import { Box, Fade, Modal as ModalMui } from '@mui/material';
import { deepmerge } from '@mui/utils';
import { mergeSx } from 'merge-sx';
import clsx from 'clsx';
import { defaultModalSlotProps } from '../constants';
import { sxRoot } from './styles';

/** @import * as Types from "../types" */

/**
 * Modulo operation
 *
 * @param {number} a dividend
 * @param {number} n divisor
 * @returns {number} remainder(unsigned)
 * @see https://en.wikipedia.org/wiki/Modulo
 */
function mod(a, n) {
  return ((a % n) + n) % n;
}

/**
 * @param {number} a - амплитуда
 * @param {number} p - период
 * @param {number} x - координата точки по оси абсцисс
 * @param {number} [c] - начальная фаза колебания
 * @returns {number} y - координата точки по оси ординат
 */
function triangleWave(a, p, x, c) {
  const initialPhase = c ?? -(p / 4);
  return ((4 * a) / p) * Math.abs(mod(x - initialPhase, p) - p / 2) - a;
}

const k1 = 0.7;
const k2 = 0.7;
const MIN_SCALE = 0.75;

/** @type {[number, number]} */
const A = [0, MIN_SCALE];
/** @type {[number, number]} */
const C = [1, MIN_SCALE];

/**
 * @param {[number, number]} point1
 * @param {[number, number]} point2
 * @param {number} x
 */
// function calcY(point1, point2, x) {
//   const [x1, y1] = point1;
//   const [x2, y2] = point2;
//   let denominator = x2 - x1;
//   const isZero = denominator === 0;
//   let numerator = isZero ? 0 : (x - x1) * (y2 - y1);
//   denominator = isZero ? 1 : denominator;
//   return numerator / denominator + y1;
// }

/**
 * @param {[number, number]} point1
 * @param {[number, number]} point2
 * @param {number} x
 */
function calcY(point1, point2, x) {
  const [x1, y1] = point1;
  const [x2, y2] = point2;

  const denominator = x2 - x1;
  if (denominator === 0) {
    throw new Error('x1 === x2, zero denominator!');
  }

  const incline = (y2 - y1) / (x2 - x1);
}

const emblaPlugins = [WheelGesturesPlugin()];

/**
 * Модалка навигатора статей.
 *
 * @type {React.FC<Types.IArtNavModalProps>}
 */
export const Modal = ({
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
  setCurHeading,
}) => {
  const slotProps = deepmerge({ ...defaultModalSlotProps }, slotPropsOuter);
  const headingsLength = headings.length;

  const [emblaOptions, setEmblaOptions] =
    /** @type {TState<import('embla-carousel').EmblaOptionsType>} */ (
      useState({
        axis: 'y',
        loop: true,
        skipSnaps: true,
        // containScroll: 'keepSnaps',
      })
    );
  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions, emblaPlugins);

  const olRef = useRef(/** @type {HTMLOListElement | null} */ (null));

  // Кэшируем оригинальные трансформы Embla
  const originalTransforms = React.useRef(/** @type {string[]} */ ([]));

  const applyTransformStyles = useCallback(() => {
    if (!emblaApi) {
      return;
    }

    const snapsList = emblaApi.scrollSnapList();
    if (snapsList.length < 2) {
      return;
    }
    const snapStep = snapsList[2] - snapsList[1];
    const scrollProgress = emblaApi.scrollProgress();
    const remainingProgress = 1 - scrollProgress;
    const progressSegmentsDiff = 0.5 - scrollProgress;

    console.log(
      '---------------------scrollProgress',
      scrollProgress.toFixed(2)
    );

    emblaApi.slideNodes().forEach((slide, index) => {
      const slideSnap = snapsList[index];

      const scale = Math.abs(
        triangleWave(1, 2, 1 - slideSnap, -scrollProgress)
      );
      console.log(`${index}. slideSnap = ${slideSnap.toFixed(3)}
        Calced scale = ${scale.toFixed(3)}
        `);

      let originTransform = originalTransforms.current[index].split(',');
      originTransform[0] = 'matrix(' + scale;

      slide.style.transform = `${originTransform.join(',')}`;
    });
  }, [emblaApi]);

  useEffect(() => {
    setTimeout(() => {
      const curLi = olRef.current?.querySelector(
        '.article-navigator__item_current'
      );
      curLi?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    });
  }, [isOpen]);

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

    const onScroll = () => {
      if (!emblaApi) return;
      originalTransforms.current = emblaApi.slideNodes().map((slide) => {
        const value = window.getComputedStyle(slide).transform;
        const res = value === 'none' ? 'matrix(1, 0, 0, 1, 0, 0)' : value;
        return res;
      });
      requestAnimationFrame(applyTransformStyles);
    };

    onScroll();
    emblaApi.on('scroll', onScroll);

    return () => {
      emblaApi.off('scroll', onScroll);
    };
  }, [applyTransformStyles, emblaApi]);

  return (
    <ModalMui
      open={isOpen}
      sx={mergeSx(sxRoot, sx)}
      id={id}
      container={() =>
        parentSelector ? document.querySelector(parentSelector) : null
      }
      className={className}
      slotProps={slotProps}
      disableScrollLock
      closeAfterTransition
      onClose={(evt, reason) => onClose(reason)}
    >
      <Fade in={isOpen}>
        <Box className={clsx('article-navigator__modal')} ref={emblaRef}>
          <ol ref={olRef} className="article-navigator__list">
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
                  onClick={(evt) => {
                    if (evt.detail > 1) return;

                    onClose('click', headingEl);

                    setTimeout(
                      () => {
                        const targetY = headingEl.getBoundingClientRect().y;
                        const curY = curHeading?.getBoundingClientRect().y ?? 0;
                        const delta = targetY > curY ? 2 : -2;

                        // TODO: обращаться к прокручиваемому элементы через пропсы, потому что сейчас хардкод
                        document.documentElement.scrollTo({
                          top:
                            headingEl.getBoundingClientRect().y -
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
                  <span className="heading-text">{headingEl.textContent}</span>
                  <span className="counter">
                    {idx + 1}/{headingsLength || '\u00A0'}
                  </span>
                </li>
              );
            })}
          </ol>
        </Box>
      </Fade>
    </ModalMui>
  );
};
