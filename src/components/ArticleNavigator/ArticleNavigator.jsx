// @ts-check
import { Box } from '@mui/material';
import clsx from 'clsx';
import { mergeSx } from 'merge-sx';
import React, { memo, useEffect, useState } from 'react';
import { sxRoot } from './styles';

/** @type {import('react').MutableRefObject<HTMLHeadingElement[]>} */

/**
 * @type {import('react').NamedExoticComponent<
 *   import('./types').TJDArticleNavigatorProps
 * >}
 */
export const ArticleNavigator = memo(function ArticleNavigatorRaw(props) {
  /** @type {import('types/react/hooks').TJDUseState<HTMLHeadingElement[]>} */
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    const selector = props.targetHeadings
      .filter((headingLevel) => {
        const headingLevelRounded = Math.round(headingLevel);
        return headingLevelRounded > 0 && headingLevelRounded < 7;
      })
      .map((headingLevel) => 'h' + headingLevel)
      .join(',');

    const targetEL = props.selector
      ? props.targetRef.current?.querySelector(props.selector)
      : props.targetRef.current;
    if (!targetEL) {
      return;
    }

    const nodesList = targetEL.querySelectorAll(selector);
    // @ts-ignore
    setHeadings(Array.from(nodesList));
  }, [props.selector, props.flag, props.targetHeadings, props.targetRef]);

  return (
    <Box
      id={props.id}
      className={clsx('article-navigator', props.className)}
      sx={mergeSx(sxRoot({}), props.sx)}
    >
      <ol>
        {headings.map((headingEl, idx) => {
          return (
            <li
              key={idx}
              onClick={(e) => {
                headingEl.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {headingEl.textContent}
            </li>
          );
        })}
      </ol>
    </Box>
  );
});
