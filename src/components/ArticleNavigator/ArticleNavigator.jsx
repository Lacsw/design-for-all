// @ts-check
import { Box } from '@mui/material';
import clsx from 'clsx';
import { mergeSx } from 'merge-sx';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { sxRoot } from './styles';
import './styles.css';
import {
  scrollPercentDefault,
  firstShowingOffsetDefault,
  targetHeadingsDefault,
} from './constants';

/**
 * @type {import('react').NamedExoticComponent<
 *   import('./types').TJDArticleNavigatorProps
 * >}
 */
export const ArticleNavigator = memo(function ArticleNavigatorRaw({
  flag,
  selector,
  targetRef,
  selectorOfScrollableEl,
  firstShowingOffset = firstShowingOffsetDefault,
  scrollPercent = scrollPercentDefault,
  targetHeadings = targetHeadingsDefault,
  className,
  id,
  sx,
}) {
  /** @type {import('types/react/hooks').TJDUseState<HTMLHeadingElement[]>} */
  const [headingsEls, setHeadingsEls] = useState([]);

  /** @type {React.RefObject<HTMLDivElement>} */
  const navigatorRef = useRef(null);

  /** @type {import('types/react/hooks').TJDUseState<boolean>} */
  const [isShowing, setIsShowing] = useState(false);

  const findTargetEl = useCallback(() => {
    /** @type {HTMLElement | null} */
    const res = selector
      ? targetRef.current?.querySelector(selector)
      : targetRef.current;
    return res;
  }, [selector, targetRef]);

  /**
   * @type {import('types/react/hooks').TJDUseState<
   *   HTMLElement | undefined
   * >}
   */
  const [targetEl, setTargetEl] = useState(findTargetEl());

  useEffect(() => {
    setTargetEl(findTargetEl());
  }, [findTargetEl, flag]);

  useEffect(() => {
    const headingsSelector = targetHeadings
      .filter((headingLevel) => {
        const headingLevelRounded = Math.round(headingLevel);
        return headingLevelRounded > 0 && headingLevelRounded < 7;
      })
      .map((headingLevel) => 'h' + headingLevel)
      .join(',');

    if (!targetEl) {
      return;
    }

    /** @type {NodeListOf<HTMLHeadingElement>} */
    const nodesList = targetEl.querySelectorAll(headingsSelector);
    setHeadingsEls(Array.from(nodesList));
  }, [targetEl, flag, targetHeadings]);

  useEffect(() => {
    const [selectorOfScrlEl, mode] = selectorOfScrollableEl;
    if (mode === 'target' && !targetRef.current) {
      return;
    }
    /** @type {HTMLElement | null} */
    const scrollableEl =
      mode === 'root'
        ? document.querySelector(selectorOfScrlEl)
        : targetRef.current.querySelector(selectorOfScrlEl);
    if (!scrollableEl) {
      return;
    }

    /** @type {(evt: Event) => void} */
    function handleScroll(evt) {
      const firstHeadingEl = headingsEls[0];
      if (!firstHeadingEl) {
        return;
      }

      const bounding = firstHeadingEl.getBoundingClientRect();
      if (
        bounding.y < -firstShowingOffset &&
        scrollableEl.scrollTop / scrollableEl.scrollHeight < scrollPercent / 100
      ) {
        setIsShowing(true);
      } else {
        setIsShowing(false);
      }
    }

    scrollableEl.addEventListener('scroll', handleScroll);
    return () => {
      scrollableEl?.removeEventListener('scroll', handleScroll);
    };
  }, [
    headingsEls,
    flag,
    selectorOfScrollableEl,
    targetRef,
    firstShowingOffset,
    scrollPercent,
  ]);

  return (
    <Box
      id={id}
      className={clsx('article-navigator', isShowing && 'visible', className)}
      sx={mergeSx(sxRoot({}), sx)}
      ref={navigatorRef}
    >
      <ol
        className="article-navigator__list"
        onScroll={(e) => {
          // stop scroll in parent when ol.article-navigator__list fully scrolled itself
          e.stopPropagation();
        }}
      >
        {headingsEls.map((headingEl, idx) => {
          return (
            <li
              key={idx}
              className="article-navigator__item"
              onClick={(e) => {
                headingEl.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {headingEl.textContent}
            </li>
          );
        })}
      </ol>
      <Box>{headingsEls.length ? headingsEls.length : '\u00A0'}</Box>
    </Box>
  );
});
