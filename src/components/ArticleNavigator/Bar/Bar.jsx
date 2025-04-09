// @ts-check
import React, { memo } from 'react';
import { Box } from '@mui/material';
import { mergeSx } from 'merge-sx';
import clsx from 'clsx';
import { sxRoot } from './styles';
import './styles.css';

/** @import * as Types from "../types" */

/**
 * Панель, появляющаяся в верхней части статьи.\
 * При клике в неё рендериится модалка - отдельный компонент.
 *
 * @type {React.FC<Types.IArtNavBarProps>}
 */
export const Bar = memo(
  ({ isShowing, label, index, quantity, onClick, id, className, sx }) => {
    return (
      <Box
        id={id}
        className={clsx('article-navigator', isShowing && 'visible', className)}
        sx={mergeSx(sxRoot, sx)}
        onClick={onClick}
      >
        <Box className="article-navigator__container">
          <span className="heading-text">{label}</span>
          <span className="counter">
            {index + 1}/{quantity || '\u00A0'}
          </span>
        </Box>
      </Box>
    );
  }
);
