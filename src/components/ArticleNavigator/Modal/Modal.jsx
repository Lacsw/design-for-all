// @ts-check
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useEmblaCarousel from 'embla-carousel-react';
import { Box, Fade, Modal as ModalMui } from '@mui/material';
import { deepmerge } from '@mui/utils';
import { mergeSx } from 'merge-sx';
import clsx from 'clsx';
import { defaultModalSlotProps } from '../constants';
import { sxRoot } from './styles';

/** @import * as ArtNavTypes from "../types" */
/** @import * as Types from "./types" */

const CIRCLE_DEGREES = 360;
const wheelItemSize = 46;
const wheelItemsInView = 7;
const LOOP = false;

/**
 * Модалка навигатора статей.
 *
 * @type {React.FC<ArtNavTypes.IArtNavModalProps>}
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
  setCurHeading: _setCurHeading,
}) => {
  const slotProps = deepmerge({ ...defaultModalSlotProps }, slotPropsOuter);

  const [emblaOptions, _setEmblaOptions] =
    /** @type {TState<import('embla-carousel').EmblaOptionsType>} */ (
      useState({
        axis: 'y',
        loop: LOOP,
        skipSnaps: true,
        dragFree: false,
        containScroll: false,
        watchSlides: false,
        // duration: 10,
      })
    );
  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);

  const olRef = useRef(/** @type {HTMLOListElement | null} */ (null));
  const rootNodeRef = useRef(/** @type {HTMLDivElement | null} */ (null));

  const wheelItemCount = Math.max(headings.length, 15);
  const wheelItemRadius = CIRCLE_DEGREES / wheelItemCount;
  const inViewDegrees = wheelItemRadius * wheelItemsInView;
  const wheelRadius = Math.round(
    wheelItemSize / 2 / Math.tan(Math.PI / wheelItemCount)
  );

  const slideCount = 20;
  const totalRadius = slideCount * wheelItemRadius;
  const rotationOffset = LOOP ? 0 : wheelItemRadius;

  const isInView = useCallback(
    /**
     * @param {number} wheelLocation
     * @param {number} slidePosition
     * @returns {boolean}
     */
    (wheelLocation, slidePosition) =>
      Math.abs(wheelLocation - slidePosition) < inViewDegrees,
    [inViewDegrees]
  );

  /** @type {Types.TSetSlideStyles} */
  const setSlideStyles = useCallback(
    (emblaApi, index, loop, slideCount, totalRadius) => {
      const slideNode = emblaApi.slideNodes()[index];
      const wheelLocation = emblaApi.scrollProgress() * totalRadius;
      const positionDefault = emblaApi.scrollSnapList()[index] * totalRadius;
      const positionLoopStart = positionDefault + totalRadius;
      const positionLoopEnd = positionDefault - totalRadius;

      let inView = false;
      let angle = index * -wheelItemRadius;

      if (isInView(wheelLocation, positionDefault)) {
        inView = true;
      }

      if (loop && isInView(wheelLocation, positionLoopEnd)) {
        inView = true;
        angle = -CIRCLE_DEGREES + (slideCount - index) * wheelItemRadius;
      }

      if (loop && isInView(wheelLocation, positionLoopStart)) {
        inView = true;
        angle = -(totalRadius % CIRCLE_DEGREES) - index * wheelItemRadius;
      }

      if (inView) {
        slideNode.style.opacity = '1';
        slideNode.style.transform = `translateY(-${
          index * 100
        }%) rotateX(${angle}deg) translateZ(${wheelRadius}px)`;
      } else {
        slideNode.style.opacity = '0';
        slideNode.style.transform = 'none';
      }
    },
    [wheelItemRadius, wheelRadius, isInView]
  );

  /** @type {Types.TSetContainerStyles} */
  const setContainerStyles = useCallback(
    (emblaApi, wheelRotation) => {
      emblaApi.containerNode().style.transform = `translateZ(${wheelRadius}px) rotateX(${wheelRotation}deg)`;
    },
    [wheelRadius]
  );

  const inactivateEmblaTransform = useCallback(
    /**
     * @param {import('embla-carousel').EmblaCarouselType} emblaApi
     * @returns
     */
    (emblaApi) => {
      if (!emblaApi) return;
      const { translate, slideLooper } = emblaApi.internalEngine();
      translate.clear();
      translate.toggleActive(false);
      slideLooper.loopPoints.forEach(({ translate }) => {
        translate.clear();
        translate.toggleActive(false);
      });
    },
    []
  );

  const rotateWheel = useCallback(
    /**
     * @param {import('embla-carousel').EmblaCarouselType} emblaApi
     * @returns
     */
    (emblaApi) => {
      const rotation = slideCount * wheelItemRadius - rotationOffset;
      const wheelRotation = rotation * emblaApi.scrollProgress();
      setContainerStyles(emblaApi, wheelRotation);
      emblaApi.slideNodes().forEach((_, index) => {
        setSlideStyles(emblaApi, index, LOOP, slideCount, totalRadius);
      });
    },
    [
      slideCount,
      wheelItemRadius,
      rotationOffset,
      setContainerStyles,
      setSlideStyles,
      totalRadius,
    ]
  );

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on('pointerUp', (emblaApi) => {
      const { scrollTo, target, location } = emblaApi.internalEngine();
      const diffToTarget = target.get() - location.get();
      const factor = Math.abs(diffToTarget) < wheelItemSize / 2.5 ? 10 : 0.1;
      const distance = diffToTarget * factor;
      scrollTo.distance(distance, true);
    });

    emblaApi.on('scroll', rotateWheel);

    emblaApi.on('reInit', (emblaApi) => {
      inactivateEmblaTransform(emblaApi);
      rotateWheel(emblaApi);
    });

    inactivateEmblaTransform(emblaApi);
    rotateWheel(emblaApi);
  }, [emblaApi, inactivateEmblaTransform, rotateWheel]);

  return (
    <ModalMui
      open={isOpen}
      sx={mergeSx(sxRoot, sx)}
      id={id}
      container={() =>
        parentSelector ? document.querySelector(parentSelector) : null
      }
      className={clsx(className, 'artnav__modal')}
      slotProps={slotProps}
      disableScrollLock
      closeAfterTransition
      onClose={(evt, reason) => onClose(reason)}
    >
      <Fade in={isOpen}>
        <Box className="ios-picker">
          <Box className="ios-picker__scene" ref={rootNodeRef}>
            <Box className="ios-picker__viewport" ref={emblaRef}>
              <ol ref={olRef} className="ios-picker__container">
                {headings.map((headingEl, idx) => {
                  return (
                    <li
                      data-idx={idx}
                      key={idx + (headingEl.textContent || uuidv4())}
                      className={clsx(
                        curHeading === headingEl && 'ios-picker__item_current',
                        'ios-picker__slide'
                      )}
                    >
                      <span className="heading-text">
                        {headingEl.textContent}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </Box>
          </Box>
          <Box className="embla__ios-picker__label">{`0/${headings.length}`}</Box>
        </Box>
      </Fade>
    </ModalMui>
  );
};

// const a = (evt) => {
//                         if (evt.detail !== 2) {
//                           return;
//                         }

//                         onClose('click', headingEl);

//                         setTimeout(
//                           () => {
//                             const targetY = headingEl.getBoundingClientRect().y;
//                             const curY =
//                               curHeading?.getBoundingClientRect().y ?? 0;
//                             const delta = targetY > curY ? 2 : -2;

//                             document.documentElement.scrollTo({
//                               top:
//                                 headingEl.getBoundingClientRect().y -
//                                 (scrollableEl?.getBoundingClientRect().y ?? 0) -
//                                 -topMargin +
//                                 delta,
//                               left: 0,
//                               behavior: 'smooth',
//                             });
//                           },
//                           50 // equals to transition delay for .header (see #25-04-01-00-14) ---- UDP obsolete
//                         );
//                       }
