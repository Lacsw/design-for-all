// @ts-check
import React, { useEffect, useRef } from 'react';
import { Box, Fade, Modal as ModalMui } from '@mui/material';
import { mergeSx } from 'merge-sx';
import clsx from 'clsx';
import { sxRoot } from './styles';
import { defaultModalSlotProps } from '../constants';
import { deepmerge } from '@mui/utils';

/** @import * as Types from "../types" */

/**
 * @param {HTMLLIElement} li
 * @param {number} idx
 */
// const getScale = (li, idx) => {};

/**
 * Модалка навигатора статей.
 *
 * @type {React.FC<Types.IArtNavModalProps>}
 */
export const Modal = ({
  isOpen,
  headings,
  onClose,
  id,
  sx,
  className,
  parentSelector,
  slotProps: slotPropsOuter,
  topMargin,
  scrollableEl,
  curHeading,
  setCurHeading,
}) => {
  const slotProps = deepmerge({ ...defaultModalSlotProps }, slotPropsOuter);
  const headingsLength = headings.length;

  const olRef = useRef(/** @type {HTMLOListElement | null} */ (null));

  useEffect(() => {
    setTimeout(() => {
      const curLi = olRef.current?.querySelector(
        '.article-navigator__item_current'
      );
      curLi?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    });
  }, [isOpen]);

  // useEffect(() => {
  //   const cleanRef = {
  //     cur: () => null,
  //   };

  //   const idTime = setTimeout(() => {
  //     if (!olRef.current) {
  //       console.log('RETURN');
  //       return;
  //     }
  //     console.log('GOOD');

  //     /** @type {MutationCallback} */
  //     const cb = (changes, observer) => {
  //       console.log('changes', changes);
  //     };
  //     let observer = new MutationObserver(cb);

  //     cleanRef.cur = () => {
  //       observer.disconnect();
  //       // @ts-ignore
  //       observer = null;
  //       return null;
  //     };

  //     const liArr = Array.from(olRef.current.querySelectorAll('li'));
  //     liArr.forEach((li) => {
  //       if (!li) {
  //         console.log('NO LI');
  //         return;
  //       }

  //       observer.observe(li, {
  //         attributes: true,
  //         characterData: true,
  //         attributeOldValue: true,
  //       });
  //     });
  //   });

  //   return () => {
  //     cleanRef.cur();
  //     clearTimeout(idTime);
  //   };
  // }, [headings, isOpen]);

  return (
    <ModalMui
      open={isOpen}
      sx={mergeSx(sxRoot, sx)}
      id={id}
      container={() =>
        parentSelector ? document.querySelector(parentSelector) : null
      }
      className={className}
      slotProps={slotProps}
      disableScrollLock
      closeAfterTransition
      onClose={(evt, reason) => onClose(reason)}
    >
      <Fade in={isOpen}>
        <Box className={clsx('article-navigator__modal')}>
          <ol
            ref={olRef}
            className="article-navigator__list"
            // onScroll={(e) => {
            //   if (!olRef.current) return;

            //   const liEls = Array.from(olRef.current.querySelectorAll('li'));

            //   liEls.forEach((i, idx) => {
            //     // i.style.transform = getScale(i, idx);
            //     if (idx === 3) {
            //       console.log('listIIII', { i });
            //     }
            //   });
            // }}
          >
            {headings.map((headingEl, idx) => {
              return (
                <li
                  key={idx}
                  className={clsx(
                    'article-navigator__item',
                    curHeading === headingEl &&
                      'article-navigator__item_current'
                  )}
                  onClick={(evt) => {
                    if (evt.detail > 1) return;

                    onClose('click', headingEl);

                    setTimeout(
                      () => {
                        const targetY = headingEl.getBoundingClientRect().y;
                        const curY = curHeading?.getBoundingClientRect().y ?? 0;
                        const delta = targetY > curY ? 2 : -2;

                        document.documentElement.scrollTo({
                          top:
                            headingEl.getBoundingClientRect().y -
                            (scrollableEl?.getBoundingClientRect().y ?? 0) -
                            -topMargin +
                            delta,
                          left: 0,
                          behavior: 'smooth',
                        });
                      },
                      50 // equals to transition delay for .header (see #25-04-01-00-14) ---- UDP obsolete
                    );
                  }}
                >
                  <span className="heading-text">{headingEl.textContent}</span>
                  <span className="counter">
                    {idx + 1}/{headingsLength || '\u00A0'}
                  </span>
                </li>
              );
            })}
          </ol>
        </Box>
      </Fade>
    </ModalMui>
  );
};
