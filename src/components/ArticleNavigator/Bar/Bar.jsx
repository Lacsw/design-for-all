// @ts-check
import React, { memo } from 'react';
import { Box, Fade, Modal } from '@mui/material';
import { mergeSx } from 'merge-sx';
import clsx from 'clsx';
import { sxRoot } from './styles';
import './styles.css';
import { barSlotProps } from '../constants';

/** @import * as Types from "../types" */

/**
 * Панель, появляющаяся в верхней части статьи.\
 * При клике по бару - рендерится модалка.
 *
 * @type {React.FC<Types.IArtNavBarProps>}
 */
export const Bar = memo(
  ({
    parentSelector,
    isShowing,
    label,
    index,
    quantity,
    onClick,
    id,
    className,
    sx,
    slotProps,
  }) => {
    return (
      <Modal
        open={isShowing}
        disableEnforceFocus
        disableEscapeKeyDown
        disableAutoFocus
        disableRestoreFocus
        disableScrollLock
        hideBackdrop
        container={() =>
          parentSelector ? document.querySelector(parentSelector) : null
        }
        sx={mergeSx(sxRoot, sx)}
        id={id}
        className={className}
        slotProps={slotProps ?? barSlotProps}
      >
        <Fade in={isShowing}>
          <Box
            className={clsx('article-navigator', isShowing && 'visible')}
            onClick={onClick}
          >
            <Box className="article-navigator__container">
              <span className="heading-text">{label}</span>

              <span className="counter">
                {index + 1}/{quantity || '\u00A0'}
              </span>
            </Box>
          </Box>
        </Fade>
      </Modal>
    );
  }
);
