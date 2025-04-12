// @ts-check
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';

import {
  scrollPercentDefault,
  firstShowingOffsetDefault,
  targetHeadingsDefault,
  scrollableRefStub,
} from './constants';

import { Modal } from './Modal/Modal';
import { Bar } from './Bar/Bar';
import './viteCheckerSavior';
import {
  extractPaddings,
  getScrollBarWidth,
} from 'utils/helpers/adaptability/scrollbars';
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
  onOpen,
  onClose,
  slotProps,
}) {
  const { bar: barProps, modal: modalProps } = slotProps ?? {};

  const [targetEl, setTargetEl] =
    /** @type {TState<HTMLElement | null | undefined>} */ (useState());

  const [headings, setHeadings] = useState(
    /** @type {HTMLHeadingElement[]} */ ([])
  );

  const scrollableRef = useRef(
    /** @type {Types.IScrollableRefData} */ ({ ...scrollableRefStub })
  );

  const [isShowing, setIsShowing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const findTargetEl = useCallback(() => {
    /** @type {HTMLElement | null | undefined} */
    const res = targetSelector
      ? targetRef.current?.querySelector(targetSelector)
      : targetRef.current;
    return res;
  }, [targetSelector, targetRef]);

  const expand = () => {
    const ref = scrollableRef.current;
    if (ref.data instanceof HTMLElement === false) {
      return;
    }

    ref.data.style.overflow = 'hidden';

    if (ref.direction === 'ltr') {
      ref.data.style.paddingRight = ref.paddings.r + ref.barWidth + 'px';
    } else {
      ref.data.style.paddingLeft = ref.paddings.l + ref.barWidth + 'px';
    }

    document.documentElement.style.setProperty(
      '--art-nav-right',
      ref.barWidth + 'px'
    );
    setIsExpanded(true);
    onOpen?.(ref);
  };

  const collapse = () => {
    const ref = scrollableRef.current;
    if (ref.data instanceof HTMLElement === false) {
      return;
    }

    const styleDecl = ref.data.style;
    styleDecl.overflow = /** @type {any} */ (null);
    styleDecl.paddingRight = /** @type {any} */ (null);
    styleDecl.paddingLeft = /** @type {any} */ (null);

    document.documentElement.style.setProperty('--art-nav-right', '0px');
    setIsExpanded(false);
    onClose?.(ref);
  };

  /** @type {React.MouseEventHandler<HTMLDivElement>} */
  const handleBarClick = (evt) => {
    if (evt.detail > 1) return;
    expand();
  };

  /** @type {Types.ICloseArtNavModal} */
  const handleModalClosing = (reason, el) => {
    collapse();
  };

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
    const { selector, searchMode } = scrollableElParams;
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
      scrollableRef.current = {
        ...scrollableRefStub,
      };
      return;
    }

    // когда скролл на теге html, то обработчик вешаем на document, а инфа о скролле берется из document.documentElement... o_O #art-nav-1
    const key = selector === 'html' ? 'documentElement' : null;

    /** @type {Element | HTMLElement} */
    const elWithScrollData = key
      ? // @ts-ignore
        scrollableEl[key]
      : scrollableEl;

    // в рефу пишем только часть данных, остальная часть заполнится в эффекте #art-nav-2
    scrollableRef.current = {
      ...scrollableRef.current,
      el: scrollableEl,
      data: elWithScrollData,
    };

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

  // #art-nav-2
  // пересчёт данных при изменениях в скроллбаре родителя(положение, ширина)
  useEffect(() => {
    const ref = scrollableRef.current;
    if (ref.data instanceof HTMLElement === false) {
      return;
    }

    const compStyles = getComputedStyle(ref.data);
    const extractedPaddings = extractPaddings(compStyles);

    ref.paddings = extractedPaddings;
    ref.direction = compStyles.direction;
    const barW = getScrollBarWidth();
    ref.barWidth = barW;
  }, [scrollableElParams, targetRef]);

  return (
    <>
      <Bar
        parentSelector={parentSelector}
        isShowing={isShowing}
        label={'Ahaha TEST pumba'}
        index={0}
        quantity={headings.length}
        onClick={handleBarClick}
        {...barProps}
      />

      <Modal
        parentSelector={parentSelector}
        isOpen={isExpanded}
        headings={headings}
        onClose={handleModalClosing}
        {...modalProps}
      />
    </>
  );
});
