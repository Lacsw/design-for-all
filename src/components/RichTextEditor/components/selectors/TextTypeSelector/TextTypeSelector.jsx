import React, { memo, useEffect, useRef, useState } from 'react';
import { MenuItem, Select, Icon } from '@mui/material';
import clsx from 'clsx';
import {
  checkIsCommandActive,
  tiptapCommands,
} from 'components/RichTextEditor/helpers';
import { COMMANDS_NAMES } from 'components/RichTextEditor/helpers/constants';
import { iconButtonSizes } from 'styles/mui/overrides/components/iconButton';
import { closeModalEvt, openModalEvt } from 'utils/modals';

const commandsForSelector = [
  COMMANDS_NAMES.paragraph,
  COMMANDS_NAMES.heading2,
  COMMANDS_NAMES.heading3,
  COMMANDS_NAMES.heading4,
  COMMANDS_NAMES.heading1,
];

function getCurrentTypeOfText(editor) {
  const result = commandsForSelector.find((commandName) => {
    return checkIsCommandActive(commandName, editor);
  });

  return result || COMMANDS_NAMES.paragraph;
}

/** Selector for choosing type of text: simple text or headings. */
export const TextTypeSelector = memo(function TextTypeSelector({
  editor,
  className,
  menuClasses,
  flag,
  size = 'small',
}) {
  const ref = useRef(null);

  const [textKind, setTextKind] = useState(() => getCurrentTypeOfText(editor));
  const isDisabled = editor.isActive(COMMANDS_NAMES.img);

  const handleTextKindChange = (event) => {
    const commandName = event.target.value;
    if (commandName !== textKind) {
      tiptapCommands[commandName](editor);
    }
    setTextKind(commandName);
  };

  useEffect(() => {
    if (editor) {
      const res = getCurrentTypeOfText(editor);
      setTextKind(res);
    }
  }, [flag, editor]);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.setProperty('--size', iconButtonSizes.inPx(size));
      ref.current.style.setProperty(
        '--icon-size',
        iconButtonSizes.svg.inPx(size)
      );
    }
  }, [size, ref]);

  return (
    <Select
      disabled={isDisabled}
      ref={ref}
      className={clsx(
        'rte__selector',
        'rte__selector_text-kind',
        'inverted',
        `rte__selector_size_${size}`,
        className
      )}
      value={textKind}
      onOpen={() => {
        window.dispatchEvent(openModalEvt);
      }}
      onClose={() => {
        window.dispatchEvent(closeModalEvt);
      }}
      onChange={handleTextKindChange}
      MenuProps={{
        classes: {
          root: clsx('rte__selector-menu-root', size, menuClasses?.root),
          paper: clsx('rte__selector-menu-paper', menuClasses?.paper),
          list: clsx('rte__selector-menu-list', size, menuClasses?.list),
        },
      }}
    >
      <MenuItem key="mip" value={COMMANDS_NAMES.paragraph}>
        {/* <TitleIcon fontSize={size} /> */}
        <Icon fontSize={size}>T</Icon>
      </MenuItem>

      <MenuItem key="mih1" value={COMMANDS_NAMES.heading1}>
        <Icon fontSize={size}>H₁</Icon>
      </MenuItem>

      <MenuItem key="mih2" value={COMMANDS_NAMES.heading2}>
        <Icon fontSize={size}>H₂</Icon>
      </MenuItem>

      <MenuItem key="mih3" value={COMMANDS_NAMES.heading3}>
        <Icon fontSize={size}>H₃</Icon>
      </MenuItem>

      <MenuItem key="mih4" value={COMMANDS_NAMES.heading4}>
        <Icon fontSize={size}>H₄</Icon>
      </MenuItem>
    </Select>
  );
});
