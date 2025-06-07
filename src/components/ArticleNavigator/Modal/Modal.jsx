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
import {
  inclusiveRange,
  interpolate,
  invertSignIf,
  triangleWave,
} from 'utils/helpers/math';

/** @import * as Types from "../types" */

const MIN_SCALE = 0.2;
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
  const previousDeltas = React.useRef(/** @type {number[]} */ ([]));

  const applyTransformStyles = useCallback(() => {
    if (!emblaApi) {
      return;
    }

    const snapsList = emblaApi.scrollSnapList();
    if (snapsList.length < 2) {
      return;
    }

    const scrollProgress = emblaApi.scrollProgress();
    // if (scrollProgress === 0) {
    //   return;
    // }

    console.log('scrollProgress', scrollProgress);

    emblaApi.slideNodes().forEach((slide, index) => {
      const slideSnap = snapsList[index];
      const translateDirection = slideSnap <= scrollProgress ? 1 : -1;

      // Для текущей прокрутки масштаб 1.0 => это начальная фаза.
      // Для каждого слайда движемся по треугольной волне и находим ординату, т.е. масштаб.
      // Если получаем отриц. ординату, то просто берем по модулю.
      // При каждом новом тике прокрутки - новый график, т.к. каждый раз новое начальное смещение.
      const scaleRaw = triangleWave(1, 2, slideSnap, -scrollProgress);
      const scaleRawAbs = Math.abs(scaleRaw);
      const scale = inclusiveRange(MIN_SCALE, scaleRawAbs * 1.2, 1);

      let originTransform = originalTransforms.current[index].split(',');
      originTransform[0] = 'matrix(' + scale; // scale X
      originTransform[3] = String(scale); // scale Y

      const originalTranslateYForLoop = parseFloat(originTransform[5]) || 0;

      // const translateY = originTransform[5];
      // const translateYParsed = parseFloat(translateY) || 0;
      // const delta =
      //   interpolate([1, 0], [MIN_SCALE, 50], scale) * translateDirection;
      // const res = translateYParsed + delta - previousDeltas.current[index];
      // previousDeltas.current[index] = delta;
      // originTransform[5] = res + ')';

      // if (index === 7) {
      //   originTransform[5] = '-400)';
      // }

      slide.style.transform = `${originTransform.join(',')}`;

      slide.style.translate =
        '0px ' +
        interpolate([1, 0], [0, 100], scale) *
          invertSignIf(originalTranslateYForLoop, translateDirection) +
        originalTranslateYForLoop +
        'px';

      slide.style.opacity = String(inclusiveRange(0.7, scaleRawAbs, 1));

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
      applyTransformStyles();
      // requestAnimationFrame(applyTransformStyles); // при переходах через начало колеса(с loop: true) были подергивания
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
