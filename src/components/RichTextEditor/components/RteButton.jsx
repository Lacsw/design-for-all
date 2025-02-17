// @ts-check
import { IconButton, Tooltip } from '@mui/material';
import React, { useCallback } from 'react';
import {
  checkIsCommandActive,
  checkIsCommandDisabled,
  tiptapCommands,
} from '../helpers';
import { buttonsHeadings } from '../helpers/constants';
import clsx from 'clsx';

/**
 * @callback TDRteButtonOnClickProp
 * @param {React.MouseEvent} evt
 * @param {import('../helpers').TDRteCommand} directCb Прямая команда редактора
 *   для текущего имени команды
 * @param {import('@tiptap/core').Editor | null} editor
 */

/**
 * @typedef TDRteButtonProps
 * @property {'direct' | 'cb'} [mode] - In `direct` mode click on button calls
 *   the corresponding command from {@link tiptapCommands}
 *
 *   - In `cb` mode click on button only runs your cb.
 *
 * @property {string} name RTE command name(object key name) from const
 *   {@link COMMANDS_NAMES}
 * @property {TDRteButtonOnClickProp} [onClick]
 * @property {import('@tiptap/core').Editor | null} editor
 * @property {boolean} inFocusWithin
 * @property {string} className
 */

/** @param {React.PropsWithChildren<TDRteButtonProps>} props */
export function RteButton({
  children,
  editor,
  name,
  inFocusWithin,
  className,
  onClick,
  mode = 'direct',
}) {
  const handleClick = useCallback(
    (/** @type {React.MouseEvent} */ evt) => {
      const directCb = tiptapCommands[name];

      if (mode === 'direct') {
        directCb(editor);
      } else {
        onClick?.(evt, directCb, editor);
      }
    },
    [onClick, mode, name, editor]
  );

  const isSelected = checkIsCommandActive(name, editor);
  const isFocused = editor?.isFocused || inFocusWithin;
  const classes = clsx(
    'rte__button',
    isFocused && isSelected && 'selected',
    className
  );
  const isDisabled = checkIsCommandDisabled(name, editor);

  return (
    <Tooltip title={buttonsHeadings[name]}>
      <span>
        <IconButton
          onClick={handleClick}
          className={classes}
          size="small"
          disabled={isDisabled}
        >
          {children || name}
        </IconButton>
      </span>
    </Tooltip>
  );
}
