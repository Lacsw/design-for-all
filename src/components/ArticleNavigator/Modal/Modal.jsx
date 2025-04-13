// @ts-check
import React from 'react';
import { Box, Fade, Modal as ModalMui } from '@mui/material';
import { mergeSx } from 'merge-sx';
import clsx from 'clsx';
import { sxRoot } from './styles';
import { defaultModalSlotProps } from '../constants';
import { deepmerge } from '@mui/utils';

/** @import * as Types from "../types" */

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
        <Box className={clsx('article-navigator__modal')}>
          <ol className="article-navigator__list">
            {headings.map((headingEl, idx) => {
              return (
                <li
                  key={idx}
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
