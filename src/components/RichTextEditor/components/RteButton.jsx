import { IconButton, Tooltip } from '@mui/material';
import React, { useCallback } from 'react';
import { buttonsHeadings, isCommandActive, tiptapCommands } from '../helpers';
import clsx from 'clsx';

export function RteButton({
  children,
  editor,
  name, // rte command name from const COMMANDS_NAMES
  inFocusWithin,
  className,
}) {
  const handleClick = useCallback(
    () => tiptapCommands[name](editor),
    [name, editor]
  );

  const isSelected = isCommandActive(name, editor);
  const isFocused = editor?.isFocused || inFocusWithin;
  const classes = clsx(
    'rte__button',
    isFocused && isSelected && 'selected',
    className
  );

  return (
    <Tooltip title={buttonsHeadings[name]}>
      <IconButton onClick={handleClick} className={classes} size="small">
        {children || name}
      </IconButton>
    </Tooltip>
  );
}
