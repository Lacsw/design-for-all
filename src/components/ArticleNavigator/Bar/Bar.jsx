// @ts-check
import React, { memo, useLayoutEffect, useState } from 'react';
import { Box, Fade } from '@mui/material';
import { mergeSx } from 'merge-sx';
import clsx from 'clsx';
import { sxRoot } from './styles';
import { defaultBarSlotProps as defaultBarBaseProps } from '../constants';
import { deepmerge } from '@mui/utils';
import { createPortal } from 'react-dom';

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

    const [parentEl, setParentEl] = useState(
      /** @type {Element | null} */ (null)
    );

    useLayoutEffect(() => {
      if (parentSelector) {
        const el = document.querySelector(parentSelector);
        if (el) {
          setParentEl(el);
        } else {
          throw new Error(
            `Article navigator.\n
            Bar component: can't find element for appending bar.\n
            Passed prop "parentSelector" is: ${parentSelector}.`
          );
        }
      } else {
        setParentEl(document.body);
      }
    }, [parentSelector]);

    const markup = (
      <Box sx={mergeSx(sxRoot, sx)} id={id} className={className}>
        <Fade in={isShowing} timeout={timeout}>
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
      </Box>
    );

    if (parentEl) {
      return createPortal(markup, parentEl);
    } else {
      return null;
    }
  }
);
