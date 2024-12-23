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
 * @typedef TDRteButtonProps
 * @type {object}
 * @property {'direct' | 'cb'} [mode=direct] - In `direct` mode click on button
 *   calls the corresponding command from {@link tiptapCommands}
 *
 *   - In `cb` mode click on button only runs your cb. Default is `direct`
 */

/** @param {TDRteButtonProps} props */
export function RteButton({
  children,
  editor,
  name, // rte command name from const COMMANDS_NAMES
  inFocusWithin,
  className,
  onClick,
  mode = 'direct',
}) {
  const handleClick = useCallback(
    (evt) => {
      onClick?.(evt);
      if (mode === 'direct') {
        tiptapCommands[name](editor);
      }
    },
    [name, editor, onClick]
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
