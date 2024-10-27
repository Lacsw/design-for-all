import React, { useEffect, useState } from 'react';
import { MenuItem, Select, Icon } from '@mui/material';
import TitleIcon from '@mui/icons-material/Title';
import clsx from 'clsx';
import {
  COMMANDS_NAMES,
  isCommandActive,
  tiptapCommands,
} from 'components/RichTextEditor/helpers';

const commandsForSelector = [
  COMMANDS_NAMES.paragraph,
  COMMANDS_NAMES.heading2,
  COMMANDS_NAMES.heading3,
  COMMANDS_NAMES.heading4,
  COMMANDS_NAMES.heading1,
];

function getCurrentTypeOfText(editor) {
  const result = commandsForSelector.find((commandName) => {
    return isCommandActive(commandName, editor);
  });

  return result || COMMANDS_NAMES.paragraph;
}

/** Selector for choosing type of text: simple text or headings. */
export const TextTypeSelector = ({ editor, className, flag }) => {
  const [textKind, setTextKind] = useState(() => getCurrentTypeOfText(editor));

  const handleTextKindChange = (event) => {
    const commandName = event.target.value;
    setTextKind(commandName);
    tiptapCommands[commandName](editor);
  };

  useEffect(() => {
    if (editor) {
      const res = getCurrentTypeOfText(editor);
      setTextKind(res);
    }
  }, [flag, editor]);

  return (
    <Select
      className={clsx('rte__selector', 'rte__selector_text-kind', className)}
      value={textKind}
      onChange={handleTextKindChange}
    >
      <MenuItem value={COMMANDS_NAMES.paragraph}>
        <TitleIcon />
      </MenuItem>

      <MenuItem value={COMMANDS_NAMES.heading1}>
        <Icon className="font-icon">H1</Icon>
      </MenuItem>

      <MenuItem value={COMMANDS_NAMES.heading2}>
        <Icon className="font-icon">H2</Icon>
      </MenuItem>

      <MenuItem value={COMMANDS_NAMES.heading3}>
        <Icon className="font-icon">H3</Icon>
      </MenuItem>

      <MenuItem value={COMMANDS_NAMES.heading4}>
        <Icon className="font-icon">H4</Icon>
      </MenuItem>
    </Select>
  );
};
