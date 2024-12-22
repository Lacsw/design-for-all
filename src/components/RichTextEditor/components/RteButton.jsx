import { IconButton, Tooltip } from '@mui/material';
import React, { useCallback } from 'react';
import {
  checkIsCommandActive,
  checkIsCommandDisabled,
  tiptapCommands,
} from '../helpers';
import { buttonsHeadings } from '../helpers/constants';
import clsx from 'clsx';

export function RteButton({
  children,
  editor,
  name, // rte command name from const COMMANDS_NAMES
  inFocusWithin,
  className,
}) {
  const handleClick = useCallback(
    (evt) => {
      tiptapCommands[name](editor);
    },
    [name, editor]
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
