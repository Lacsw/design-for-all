// @ts-check
import React from 'react';
import { Box } from '@mui/material';
import { mergeSx } from 'merge-sx';
import clsx from 'clsx';
import { sxRoot } from './styles';
import './styles.css';

/** @import * as Types from "../types" */

/**
 * Модалка навигатора статей.
 *
 * @type {React.FC<Types.IArtNavModalProps>}
 */
export const Modal = ({ isOpen, headings, onClose, id, sx, className }) => {
  const headingsLength = headings.length;

  return (
    <Box
      id={id}
      className={clsx(
        'article-navigator__modal',
        isOpen && 'opened',
        className
      )}
      sx={mergeSx(sxRoot, sx)}
    >
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
                  50 // equals to transition delay in ./styles.js .header (see #25-04-01-00-14)
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
  );
};
