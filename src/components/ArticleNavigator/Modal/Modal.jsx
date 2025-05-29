// @ts-check
import React, { useEffect, useRef, useState } from 'react';
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
        containScroll: 'keepSnaps',
      })
    );
  const [emblaRef] = useEmblaCarousel(emblaOptions, emblaPlugins);

  const olRef = useRef(/** @type {HTMLOListElement | null} */ (null));

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
