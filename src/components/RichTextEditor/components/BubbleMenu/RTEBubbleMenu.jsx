// @ts-check
import { IconButton, InputBase } from '@mui/material';
import { BubbleMenu } from '@tiptap/react';
import { countLinksInSelection } from 'components/RichTextEditor/extensions/link/helpers';
import React, { memo, useEffect, useRef, useState } from 'react';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { getIsThemeLight } from 'store/selectors';

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

  /** @type {import('react').RefObject<HTMLInputElement>} */
  const inputRef = useRef(null);

  /** @type {import('@tiptap/extension-bubble-menu').BubbleMenuPluginProps['shouldShow']} */
  const shouldShow = (params) => {
    if (!params.editor.isEditable) {
      return false;
    }
    setFlag((prev) => !prev);

    const isSingleLink = countLinksInSelection(params.view) === 1;
    if (isSingleLink) {
      const { state, to } = params;

      const node = state.doc.nodeAt(to);
      if (node) {
        const linkMark = node.marks.find(
          (mark) => mark.type === state.schema.marks.link
        );
        if (linkMark) {
          const href = linkMark.attrs.href;
          setHref(href);
        }
      }
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
      setInputMode('read');
    }
  };

  /** @param {import('react').ChangeEvent<HTMLInputElement>} evt */
  const handleInputChange = (evt) => {
    if (inputMode === 'read') {
      return;
    }

    setHref(evt.target.value);
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
    const id = window.setTimeout(() => setInputMode('read'), 300);
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
          // errors={error}
          onKeyDown={handleInputKeyDown}
          onChange={handleInputChange}
          className={clsx(
            // @ts-ignore
            inputMode === 'write' && 'editable'
          )}
        />

        <IconButton
          className={clsx('rte__button', !isLight ? 'inverted' : undefined)}
          onClick={handleEditingClick}
        >
          <EditRoundedIcon />
        </IconButton>
      </BubbleMenu>
    )
  );
};

export const RTEBubbleMenu = memo(RTEBubbleMenuRaw);
