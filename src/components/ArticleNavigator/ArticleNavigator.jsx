// @ts-check
import { Box } from '@mui/material';
import clsx from 'clsx';
import { mergeSx } from 'merge-sx';
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { sxRoot } from './styles';
import './styles.css';
import {
  scrollPercentDefault,
  firstShowingOffsetDefault,
  targetHeadingsDefault,
} from './constants';
import { createPortal } from 'react-dom';

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
  parentSelector,
  firstShowingOffset = firstShowingOffsetDefault,
  scrollPercent = scrollPercentDefault,
  targetHeadings = targetHeadingsDefault,
  className,
  id,
  sx,
}) {
  const parentEl = useMemo(
    () => document.querySelector(parentSelector),
    [parentSelector]
  );

  /** @type {import('types/react/hooks').TJDUseState<HTMLHeadingElement[]>} */
  const [headingsEls, setHeadingsEls] = useState([]);

  /** @type {React.RefObject<HTMLDivElement>} */
  const navigatorRef = useRef(null);

  const [isShowing, setIsShowing] = useState(false);
  const [expanded, setExpanded] = useState(false);

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

  const markup = (
    <Box
      id={id}
      className={clsx(
        'article-navigator',
        isShowing && 'visible',
        expanded && 'expanded',
        className
      )}
      sx={mergeSx(sxRoot({}), sx)}
      ref={navigatorRef}
    >
      <ol
        className="article-navigator__list"
        onScroll={(evt) => {
          // stop scroll in parent when ol.article-navigator__list fully scrolled itself
          evt.stopPropagation();
        }}
        onClick={(evt) => {
          if (isShowing) {
            setExpanded(true);
          }
        }}
      >
        {headingsEls.map((headingEl, idx) => {
          return (
            <li
              key={idx}
              className="article-navigator__item"
              onClick={(e) => {
                if (!expanded) {
                  return;
                }
                headingEl.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="heading-text">{headingEl.textContent}</span>
              <span className="counter">
                {idx + 1}/{headingsEls.length ? headingsEls.length : '\u00A0'}
              </span>
            </li>
          );
        })}
      </ol>
    </Box>
  );

  if (parentEl) {
    return createPortal(markup, parentEl);
  } else {
    return null;
  }
});
