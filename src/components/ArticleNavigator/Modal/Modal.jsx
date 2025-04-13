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
      onClose={(evt, reason) => onClose(reason)}
    >
      <Fade in={isOpen}>
        <Box className={clsx('article-navigator__modal')}>
          <ol className="article-navigator__list">
            {headings.map((headingEl, idx) => {
              return (
                <li
                  key={idx}
                  className="article-navigator__item"
                  onClick={(evt) => {
                    onClose('click', headingEl);
                    setTimeout(
                      () => headingEl.scrollIntoView({ behavior: 'smooth' }),
                      50 // equals to transition delay for .header (see #25-04-01-00-14)
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
