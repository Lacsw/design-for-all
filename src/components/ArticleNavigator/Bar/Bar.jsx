// @ts-check
import React, { memo, useLayoutEffect, useState } from 'react';
import { Box, Fade, Popper } from '@mui/material';
import { mergeSx } from 'merge-sx';
import clsx from 'clsx';
import { sxRoot } from './styles';
import './styles.css';
import { defaultBarSlotProps as defaultBarBaseProps } from '../constants';
import { deepmerge } from '@mui/utils';

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
    ...basePropsOuter
  }) => {
    const baseProps = deepmerge({ ...defaultBarBaseProps }, basePropsOuter);
    const { id, sx, className, timeout } = baseProps;

    const [anchorEl, setAnchorEl] = /** @type {TState<HTMLElement | null>} */ (
      useState(null)
    );

    useLayoutEffect(() => {
      if (parentSelector) {
        const elem = document.querySelector(parentSelector);
        if (elem instanceof HTMLElement === false) {
          throw new Error(
            `ArticleNavigator, Bar component:\n
            Can't find element for appending bar. Passed prop "parentSelector" is ${parentSelector}.`
          );
        }
      } else {
        setAnchorEl(document.body);
      }
    }, [parentSelector]);

    if (!anchorEl) {
      return null;
    }

    return (
      <Popper
        open={isShowing}
        container={anchorEl}
        anchorEl={anchorEl}
        sx={mergeSx(sxRoot, sx)}
        id={id}
        className={className}
        transition
        popperOptions={{
          strategy: 'fixed',
        }}
        style={{
          transform: 'translateY(0px)',
        }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={timeout}>
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
        )}
      </Popper>
    );
  }
);
