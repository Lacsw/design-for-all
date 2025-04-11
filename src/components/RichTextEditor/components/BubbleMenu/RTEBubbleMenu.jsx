// @ts-check
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { IconButton, InputBase, Tooltip } from '@mui/material';
import { BubbleMenu } from '@tiptap/react';
import { TextSelection } from '@tiptap/pm/state';

import { getIsThemeLight } from 'store/slices/theme';
import { useDebounce } from 'utils/hooks';
import { validateLink } from 'components/RichTextEditor/extensions/link/link';
import { linkExtConfig } from 'components/RichTextEditor/extensions/link/config';
import { countLinksInSelection } from 'components/RichTextEditor/extensions/link/helpers';

import BackspaceIcon from '@mui/icons-material/Backspace';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import clsx from 'clsx';

/**
 * @typedef TRTEBubbleMenuProps
 * @property {import('@tiptap/core').Editor | null} editor
 */

/** @type {React.FC<TRTEBubbleMenuProps>} */
const RTEBubbleMenuRaw = ({ editor }) => {
  const isLight = useSelector(getIsThemeLight);

  const [flag, setFlag] = useState(false);

  const [inputMode, setInputMode] =
    /** @type {TState<'read' | 'write'>} */
    (useState('read'));

  const [href, setHref] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isDebouncing, setIsDebouncing] = useState(false);

  /** @type {React.RefObject<HTMLInputElement | null>} */
  const inputRef = useRef(null);
  /**
   * @type {React.MutableRefObject<
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
    const isSingleLink = countLinksInSelection(params.view) === 1;

    if (isSingleLink) {
      const { state, from, to } = params;
      const markType = editor.state.schema.marks.link;

      state.doc.nodesBetween(from, to, (node, pos) => {
        if (node.isText) {
          node.marks.forEach((mark) => {
            if (mark.type === markType) {
              curLinkMarkRef.current = mark;
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

  /** @param {React.MouseEvent<HTMLButtonElement>} evt */
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

      runValidating(href);
    } else {
      // mode write - clear btn
      setHref('');
      setIsDebouncing(true);
      runValidatingDbncd('');
    }
  };

  const runValidating = useCallback(
    (/** @type {string} */ value) => {
      const res = !value ? true : validateLink(value);
      setIsValid(res);
      setIsDebouncing(false);
    },
    [setIsValid]
  );
  const runValidatingDbncd = useDebounce(runValidating, 500, true);

  /** @param {React.MouseEvent<HTMLButtonElement>} evt */
  const handleSubmit = (evt) => {
    if (!isValid || evt.detail > 1) {
      return;
    }

    const { doc, tr, selection } = editor.state;
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
            if (markStart === null) {
              markStart = pos;
            }
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

  /** @param {React.ChangeEvent<HTMLInputElement>} evt */
  const handleInputChange = (evt) => {
    if (inputMode === 'read') {
      return;
    }

    setHref(evt.target.value);
    setIsDebouncing(true);
    runValidatingDbncd(evt.target.value);
  };

  /** @param {React.KeyboardEvent<HTMLInputElement>} evt */
  const handleInputKeyDown = (evt) => {
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
        <InputBase
          ref={inputRef}
          placeholder="URL"
          value={href}
          error={!isValid}
          onKeyDown={handleInputKeyDown}
          onChange={handleInputChange}
          className={clsx(inputMode === 'write' && 'editable')}
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
