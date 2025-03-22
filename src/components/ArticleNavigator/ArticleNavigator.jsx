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
 * Всплывающее окно для отображения ближайшего заголовка <h1-6 /> статьи.
 *
 * @type {React.NamedExoticComponent<
 *   import('./types').TJDArticleNavigatorProps
 * >}
 */
export const ArticleNavigator = memo(function ArticleNavigatorRaw({
  flag,
  parentSelector,
  targetSelector,
  targetRef,
  scrollableElParams,
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
  /** @type {import('types').TJDUseState<HTMLElement | undefined>} */
  const [targetEl, setTargetEl] = useState();
  /** @type {import('types').TJDUseState<HTMLHeadingElement[]>} */
  const [headings, setHeadings] = useState([]);

  /** @type {React.RefObject<HTMLDivElement>} */
  const navigatorRef = useRef(null);

  /**
   * data - элемент, в котором можно взять инфу по скроллу (см. #1)
   *
   * @type {React.MutableRefObject<{
   *   el: Element | HTMLDivElement | Document | null;
   *   data: Element | HTMLElement | null;
   * }>}
   */
  const scrollableRef = useRef({
    el: null,
    data: null,
  });

  const [isShowing, setIsShowing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const findTargetEl = useCallback(() => {
    /** @type {HTMLElement | null} */
    const res = targetSelector
      ? targetRef.current?.querySelector(targetSelector)
      : targetRef.current;
    return res;
  }, [targetSelector, targetRef]);

  useEffect(() => {
    setTargetEl(findTargetEl());
  }, [findTargetEl, flag]);

  // ищем заголовки
  useEffect(() => {
    if (!targetEl) {
      return;
    }

    const headingsSelector = targetHeadings
      .filter((headingLevel) => {
        const headingLevelRounded = Math.round(headingLevel);
        return headingLevelRounded > 0 && headingLevelRounded < 7;
      })
      .map((headingLevel) => 'h' + headingLevel)
      .join(',');

    /** @type {NodeListOf<HTMLHeadingElement>} */
    const nodesList = targetEl.querySelectorAll(headingsSelector);
    setHeadings(Array.from(nodesList));
  }, [targetEl, targetHeadings]);

  // работаем с прокручиваемым элементом
  useEffect(() => {
    const [selector, searchMode] = scrollableElParams;
    if (searchMode === 'target' && !targetRef.current) {
      return;
    }
    /** @type {HTMLElement | Document | Element | null} */
    const scrollableEl =
      searchMode === 'root'
        ? selector === 'html'
          ? document
          : document.querySelector(selector)
        : targetRef.current.querySelector(selector);
    if (!scrollableEl) {
      scrollableRef.current = { el: null, data: null };
      return;
    }

    /** @type {(evt: Event) => void} */
    function handleScroll(evt) {
      const firstHeadingEl = headings[0];
      if (!firstHeadingEl) {
        return;
      }
      const rect = firstHeadingEl.getBoundingClientRect();

      // когда скролл на теге html, то обработчик вешаем на document, а инфа о скролле берется из document.documentElement... o_O #1
      const key = selector === 'html' ? 'documentElement' : null;

      /** @type {Element | HTMLElement} */
      const elWithScrollData = key ? scrollableEl[key] : scrollableEl;
      scrollableRef.current = { el: scrollableEl, data: elWithScrollData };

      if (
        rect.y < -firstShowingOffset &&
        elWithScrollData.scrollTop / elWithScrollData.scrollHeight <
          scrollPercent / 100
      ) {
        setIsShowing(true);
      } else {
        setIsShowing(false);
      }
    }

    scrollableEl.addEventListener('scroll', handleScroll);
    return () => scrollableEl?.removeEventListener('scroll', handleScroll);
  }, [
    scrollableElParams,
    targetRef,
    headings,
    firstShowingOffset,
    scrollPercent,
  ]);

  const markup = (
    <Box
      id={id}
      className={clsx(
        'article-navigator',
        isShowing && 'visible',
        isExpanded && 'expanded',
        className
      )}
      sx={mergeSx(sxRoot({}), sx)}
      ref={navigatorRef}
      onClick={(evt) => {
        if (
          evt.target instanceof HTMLElement &&
          evt.target.classList.contains('article-navigator')
        ) {
          // if (scrollableRef.current.data instanceof HTMLElement) {
          //   scrollableRef.current.data.style.overflow = 'initial';
          // }
          setIsExpanded(false);
        }
      }}
    >
      <ol
        className="article-navigator__list"
        onScroll={(evt) => {
          // stop scroll in parent when ol.article-navigator__list fully scrolled itself
          evt.stopPropagation();
        }}
        onClick={(evt) => {
          if (isShowing) {
            // if (scrollableRef.current.data instanceof HTMLElement) {
            //   scrollableRef.current.data.style.overflow = 'hidden';
            // }
            setIsExpanded(true);
          }
        }}
      >
        {headings.map((headingEl, idx) => {
          return (
            <li
              key={idx}
              className="article-navigator__item"
              onClick={(evt) => {
                if (!isExpanded) {
                  return;
                }
                headingEl.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="heading-text">{headingEl.textContent}</span>
              <span className="counter">
                {idx + 1}/{headings.length ? headings.length : '\u00A0'}
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
