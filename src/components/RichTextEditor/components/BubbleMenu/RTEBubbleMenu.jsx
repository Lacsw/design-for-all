// @ts-check
import { IconButton, InputBase, Tooltip } from '@mui/material';
import { BubbleMenu } from '@tiptap/react';
import {
  countLinksInSelection,
  validateHref,
} from 'components/RichTextEditor/extensions/link/helpers';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import clsx from 'clsx';
import { shallowEqual, useSelector } from 'react-redux';
import { getIsThemeLight } from 'store/selectors';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { useDebounce } from 'utils/hooks';
import { linkExtConfig } from 'components/RichTextEditor/extensions/link/config';
import { TextSelection } from '@tiptap/pm/state';

/**
 * @typedef TJDRTEBubbleMenuProps
 * @property {import('@tiptap/core').Editor | null} editor
 */

/** @type {import('react').FC<TJDRTEBubbleMenuProps>} */
const RTEBubbleMenuRaw = ({ editor }) => {
  const isLight = useSelector(getIsThemeLight);

  const [flag, setFlag] = useState(false);

  /** @type {import('types/react/hooks').TJDUseState<'read' | 'write'>} */
  const [inputMode, setInputMode] = useState('read');
  const [href, setHref] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isDebouncing, setIsDebouncing] = useState(false);

  /** @type {import('react').RefObject<HTMLInputElement | null>} */
  const inputRef = useRef(null);
  /**
   * @type {import('react').MutableRefObject<
   *   import('prosemirror-model').Mark | null
   * >}
   */
  const curLinkMarkRef = useRef(null);

  /** @type {import('@tiptap/extension-bubble-menu').BubbleMenuPluginProps['shouldShow']} */
  const shouldShow = (params) => {
    if (!params.editor.isEditable) {
      return false;
    }

    setFlag((prev) => !prev);

    const markType = editor.state.schema.marks.link;
    const { state, from, to } = params;

    const linkQty = countLinksInSelection(params.view);
    const isSingleLink = linkQty === 1;
    let linkQtyWithExtraChecking = linkQty;

    if (isSingleLink) {
      state.doc.nodesBetween(from, to, (node, pos) => {
        if (node.isText) {
          node.marks.forEach((mark) => {
            if (mark.type === markType) {
              curLinkMarkRef.current = mark;
              setHref(mark.attrs.href);
              setIsValid(true);
            }
          });
        }
      });
    } else if (linkQty === 0 && from === to) {
      // когда каретка в конце марки, то меню не показывается, фиксим это (#1)
      // ! при выделении нулевой длины
      state.doc.nodesBetween(from - 1, to, (node, pos) => {
        if (node.isText) {
          node.marks.forEach((mark) => {
            if (mark.type === markType) {
              linkQtyWithExtraChecking++;
              curLinkMarkRef.current = mark;
              setHref(mark.attrs.href);
              setIsValid(true);
            }
          });
        }
      });
    }

    return isSingleLink || linkQtyWithExtraChecking === 1;
  };

  /** @param {import('react').MouseEvent<HTMLButtonElement>} evt */
  const handleEditingClick = (evt) => {
    if (inputMode === 'read') {
      setInputMode('write');

      if (inputRef.current) {
        const inputEl = inputRef.current.querySelector('input');
        setTimeout(() => {
          inputEl.focus();
          inputEl.setSelectionRange(inputEl.value.length, inputEl.value.length);
        }, 200);
      }
    } else {
      // mode write - clear btn
      setHref('');
      setIsDebouncing(true);
      runValidatingDbncd('');
    }
  };

  const runValidating = useCallback(
    (/** @type {string} */ value) => {
      const res = !value ? true : validateHref(value);
      setIsValid(res);
      setIsDebouncing(false);
    },
    [setIsValid]
  );
  const runValidatingDbncd = useDebounce(runValidating, 500, true);

  /** @param {import('react').MouseEvent<HTMLButtonElement>} evt */
  const handleSubmit = (evt) => {
    // debugger;
    if (!isValid || evt.detail > 1) {
      return;
    }

    const { doc, tr, selection } = editor.state;
    const { from, to } = selection;

    /** @type {null | number} */
    let trStart = null;
    /** @type {null | number} */
    let trEnd = null;
    const markType = editor.state.schema.marks.link;
    /** @type {import('prosemirror-model').Mark | null} */
    let curLinkMark = null;

    const getCurLinkMarkAttrs = () => curLinkMark.attrs;
    const getTrStart = () => trStart;
    const setTrStart = (/** @type {number} */ value) => {
      trStart = value;
    };

    doc.nodesBetween(from, to, (node, pos) => {
      if (node.isText) {
        // наше бабл-меню появляется только когда одна ссылка попала в выделение
        node.marks.forEach((mark) => {
          if (mark.type === markType) {
            curLinkMark = mark;
            if (trStart === null) {
              trStart = pos;
            }
            trEnd = pos + node.nodeSize;
          }
        });
      }
    });

    // когда каретка в конце марки, то меню все равно покажется(#1), потому надо искать ссылки и до каретки,
    // если в изначальном выделении марка ссылки найдена не была
    if (curLinkMark === null && from === to) {
      // готовимся двигаться взад по текстовым нодам с одинаковой маркой ссылки, но с различными стилевым маркам
      trStart = trEnd = to;

      // для начала проверяем первую текстовую ноду до каретки
      const prevNode = doc.nodeAt(from - 1);
      if (prevNode.isText) {
        prevNode.marks.forEach((mark) => {
          if (mark.type === markType) {
            trStart = trStart - prevNode.nodeSize;
            /* на данную марку ссылки и будем ориентироваться. Если у идущих до prevNode текстовых нод
             такие же марки - смещаем вычисляемую позицию начала нашей транзакции(markStart) */
            curLinkMark = mark;
          }
        });
      }

      if (curLinkMark === null) {
        // не должны сюда попасть, т.к. меню не появится при отсутствии марки ссылки в селекции или в ноде до селекции
        console.warn('Link mark not found!');
      } else {
        /** @type {boolean | null} */
        let isMarksEqual = null;
        const setIsMarksEqual = (/** @type {boolean} */ value) => {
          isMarksEqual = value;
        };

        let counter = 0;

        const check = () => isMarksEqual === null || isMarksEqual;

        while (check()) {
          console.log('iter');
          counter++;
          const anotherNode = doc.nodeAt(getTrStart() - 1);
          // nodeSize это ещё и вход + выход?
          if (anotherNode.isText) {
            anotherNode.marks.forEach((mark) => {
              if (mark.type === markType) {
                const curLinkMarkAttrs = getCurLinkMarkAttrs();
                const trStart = getTrStart();
                if (shallowEqual(curLinkMarkAttrs, mark.attrs)) {
                  setIsMarksEqual(true);
                  setTrStart(trStart - anotherNode.nodeSize);
                } else {
                  setIsMarksEqual(false);
                }
              } else {
                setIsMarksEqual(false);
              }
            });
          } else {
            setIsMarksEqual(false);
          }
        }
        console.log('counter', counter);
      }
    }

    if (!href) {
      tr.removeMark(trStart, trEnd, markType);
    } else {
      const newURL = href.includes(':')
        ? new URL(href)
        : new URL(`${linkExtConfig.defaultProtocol}://${href}`);

      if (trStart !== null && trEnd !== null) {
        tr.removeMark(trStart, trEnd, markType);
        const newMark = markType.create({
          ...curLinkMark.attrs,
          href: newURL.href,
        });

        const newSelection = TextSelection.create(tr.doc, trEnd);
        tr.setSelection(newSelection);

        tr.addMark(trStart, trEnd, newMark);
      }
    }

    editor.view.dispatch(tr);
    editor.commands.focus();
  };

  /** @param {import('react').ChangeEvent<HTMLInputElement>} evt */
  const handleInputChange = (evt) => {
    if (inputMode === 'read') {
      return;
    }

    setHref(evt.target.value);
    setIsDebouncing(true);
    runValidatingDbncd(evt.target.value);
  };

  /** @param {import('react').KeyboardEvent<HTMLInputElement>} evt */
  const handleInputKeyDown = (evt) => {
    // @ts-ignore
    if (inputMode === 'write') {
      return;
    } else if (inputMode === 'read') {
      if (
        evt.key === 'ArrowLeft' ||
        evt.key === 'ArrowRight' ||
        (evt.ctrlKey && evt.code === 'KeyA') ||
        (evt.ctrlKey && evt.code === 'KeyC')
      ) {
        return;
      } else {
        evt.preventDefault();
      }
    }
  };

  useEffect(() => {
    const id = window.setTimeout(() => {
      setInputMode('read');
    }, 300);
    return () => clearTimeout(id);
  }, [flag]);

  return (
    editor && (
      <BubbleMenu
        shouldShow={shouldShow}
        tippyOptions={{
          interactive: true,
          duration: 350,
          placement: 'bottom',
          //   offset: ({ placement, popper, reference }) => {
          //     if (placement === 'bottom') {
          //       return [22, 0];
          //     } else if (placement === 'top') {
          //       return [0, 22];
          //     } else {
          //       return [10, 10];
          //     }
          //   },
          popperOptions: {
            strategy: 'fixed', // fix vertical scroll on html tag when bubble-menu outside of view (TODO WHY?)
          },
          zIndex: 3,
        }}
        className="rte__bubble-menu"
        editor={editor}
      >
        {/* @ts-ignore */}
        <InputBase
          ref={inputRef}
          placeholder="URL"
          value={href}
          error={!isValid}
          onKeyDown={handleInputKeyDown}
          onChange={handleInputChange}
          className={clsx(
            // @ts-ignore
            inputMode === 'write' && 'editable'
          )}
        />

        <Tooltip
          title={inputMode === 'read' ? 'Редактировать' : 'Очистить'}
          enterDelay={500}
          enterNextDelay={500}
        >
          <span>
            <IconButton
              className={clsx('rte__button', !isLight ? 'inverted' : undefined)}
              onClick={handleEditingClick}
              // @ts-ignore
              disabled={inputMode === 'write' && !href.length}
            >
              {inputMode === 'read' ? <EditRoundedIcon /> : <BackspaceIcon />}
            </IconButton>
          </span>
        </Tooltip>

        <Tooltip
          title={'Применить изменения'}
          enterDelay={500}
          enterNextDelay={500}
        >
          <span>
            <IconButton
              className={clsx('rte__button', !isLight ? 'inverted' : undefined)}
              onClick={handleSubmit}
              disabled={
                inputMode === 'read' ||
                !isValid ||
                curLinkMarkRef.current?.attrs?.href === href ||
                isDebouncing
              }
            >
              <DoneRoundedIcon />
            </IconButton>
          </span>
        </Tooltip>
      </BubbleMenu>
    )
  );
};

export const RTEBubbleMenu = memo(RTEBubbleMenuRaw);
