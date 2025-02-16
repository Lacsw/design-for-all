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
import { useSelector } from 'react-redux';
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
  const curLinkMark = useRef(null);

  /** @type {import('@tiptap/extension-bubble-menu').BubbleMenuPluginProps['shouldShow']} */
  const shouldShow = (params) => {
    if (!params.editor.isEditable) {
      return false;
    }

    setFlag((prev) => !prev);
    const isSingleLink = countLinksInSelection(params.view) === 1;

    if (isSingleLink) {
      const { state, from, to } = params;
      const markType = editor.state.schema.marks.link;

      state.doc.nodesBetween(from, to, (node, pos) => {
        if (node.isText) {
          node.marks.forEach((mark) => {
            if (mark.type === markType) {
              curLinkMark.current = mark;
              const href = mark.attrs.href;
              setHref(href);
              setIsValid(true);
            }
          });
        }
      });
    }

    return isSingleLink;
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
    if (!isValid || evt.detail > 1) {
      return;
    }

    const { tr, selection, doc } = editor.state;
    const { from, to } = selection;

    let markStart = null;
    let markEnd = null;
    const markType = editor.state.schema.marks.link;
    /** @type {import('prosemirror-model').Mark | null} */
    let curLinkMark = null;

    doc.nodesBetween(from, to, (node, pos) => {
      if (node.isText) {
        // наше бабл-меню появляется только когда одна ссылка попала в выделение
        node.marks.forEach((mark) => {
          if (mark.type === markType) {
            curLinkMark = mark;
            markStart = pos;
            markEnd = pos + node.nodeSize;
          }
        });
      }
    });

    if (!href) {
      tr.removeMark(markStart, markEnd, markType);
    } else {
      const newURL = href.includes(':')
        ? new URL(href)
        : new URL(`${linkExtConfig.defaultProtocol}://${href}`);

      if (markStart !== null && markEnd !== null) {
        tr.removeMark(markStart, markEnd, markType);
        const newMark = markType.create({
          ...curLinkMark.attrs,
          href: newURL.href,
        });

        const newSelection = TextSelection.create(tr.doc, markEnd);
        tr.setSelection(newSelection);

        tr.addMark(markStart, markEnd, newMark);
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
          zIndex: 1,
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
                curLinkMark.current?.attrs.href === href ||
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
