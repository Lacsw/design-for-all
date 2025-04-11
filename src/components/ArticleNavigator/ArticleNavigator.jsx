// @ts-check
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';

import {
  scrollPercentDefault,
  firstShowingOffsetDefault,
  targetHeadingsDefault,
} from './constants';

import { Modal } from './Modal/Modal';
import { Bar } from './Bar/Bar';
import './styles.css';
import './viteCheckerSavior';
/** @import * as Types from "./types" */

/**
 * Всплывающее окно для отображения ближайшего заголовка <h1-6 /> статьи.
 *
 * Структурно компонент состоит из двух модальных эл-ов:
 *
 * - bar - панель вверху статьи с текущим заголовком;
 * - modal - список в виде колеса.
 *
 * @type {React.NamedExoticComponent<Types.IArticleNavigatorProps>}
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
  slotProps,
}) {
  const { bar: barProps, modal: modalProps } = slotProps ?? {};

  // const parentEl = useMemo(
  //   () => document.querySelector(parentSelector),
  //   [parentSelector]
  // );

  const [targetEl, setTargetEl] =
    /** @type {TState<HTMLElement | null | undefined>} */ (useState());

  const [headings, setHeadings] = useState(
    /** @type {HTMLHeadingElement[]} */ ([])
  );

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

  const headerElRef = useRef(/** @type {HTMLElement | null} */ (null));

  const [isShowing, setIsShowing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const findTargetEl = useCallback(() => {
    /** @type {HTMLElement | null | undefined} */
    const res = targetSelector
      ? targetRef.current?.querySelector(targetSelector)
      : targetRef.current;
    return res;
  }, [targetSelector, targetRef]);

  // const expand = () => {
  //   if (scrollableRef.current.data instanceof HTMLElement) {
  //     scrollableRef.current.data.style.overflow = 'hidden';
  //   }
  //   headerElRef.current?.classList.add('navigator-expanded');
  //   setIsExpanded(true);
  // };

  // const collapse = () => {
  //   if (scrollableRef.current.data instanceof HTMLElement) {
  //     scrollableRef.current.data.style.overflow = 'auto';
  //   }
  //   headerElRef.current?.classList.remove('navigator-expanded');
  //   setIsExpanded(false);
  // };

  /** @type {React.MouseEventHandler<HTMLDivElement>} */
  const handleBarClick = (evt) => {
    if (evt.detail > 1) return;
  };

  /** @type {Types.ICloseArtNavModal} */
  const handleModalClosing = (reason, el) => {};

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
    if (searchMode === 'target' || !targetRef.current) {
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

    // когда скролл на теге html, то обработчик вешаем на document, а инфа о скролле берется из document.documentElement... o_O #1
    const key = selector === 'html' ? 'documentElement' : null;

    /** @type {Element | HTMLElement} */
    const elWithScrollData = key
      ? // @ts-ignore
        scrollableEl[key]
      : scrollableEl;

    scrollableRef.current = { el: scrollableEl, data: elWithScrollData };

    if (elWithScrollData instanceof HTMLElement) {
      elWithScrollData.style.scrollbarGutter = 'stable';
    }

    headerElRef.current = document.querySelector('header.header') || null;

    /** @type {(evt: Event) => void} */
    function handleScroll(evt) {
      const firstHeadingEl = headings[0];
      if (!firstHeadingEl) {
        return;
      }
      const rect = firstHeadingEl.getBoundingClientRect();

      if (
        rect.y < -firstShowingOffset &&
        elWithScrollData.scrollTop / elWithScrollData.scrollHeight <
          scrollPercent / 100
      ) {
        setIsShowing(true);
      } else {
        // collapse();
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
  return (
    <>
      <Bar
        parentSelector={parentSelector}
        isShowing={isShowing}
        label={'Ahaha TEST pumbaggg'}
        index={0}
        quantity={headings.length}
        onClick={handleBarClick}
        {...barProps}
      />

      <Modal
        isOpen={isExpanded}
        headings={headings}
        onClose={handleModalClosing}
        {...modalProps}
      />
    </>
  );

  // if (parentEl) {
  //   return (
  //     <>
  //       {createPortal(barEl, parentEl)}
  //       {createPortal(modalEl, parentEl)}
  //     </>
  //   );
  // }
  // return null;
});
