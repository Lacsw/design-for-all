import { IconButton, Tooltip } from '@mui/material';
import React, { useCallback } from 'react';
import { buttonsHeadings, commandsNames } from '../helpers';

const tiptapCommands = {
  [commandsNames.italic](editor) {
    editor?.chain().focus().toggleItalic().run();
  },
  [commandsNames.bold]: (editor) => editor?.chain().focus().toggleBold().run(),
  [commandsNames.underline]: (editor) =>
    editor?.chain().focus().toggleUnderline().run(),
  [commandsNames.code]: (editor) => editor?.chain().focus().toggleCode().run(),
  [commandsNames.codeBlock]: (editor) =>
    editor?.chain().focus().toggleCodeBlock().run(),
  [commandsNames.left]: (editor) =>
    editor?.chain().focus().setTextAlign('left').run(),
  [commandsNames.center]: (editor) =>
    editor?.chain().focus().setTextAlign('center').run(),
  [commandsNames.right]: (editor) =>
    editor?.chain().focus().setTextAlign('right').run(),
  [commandsNames.justify]: (editor) =>
    editor?.chain().focus().setTextAlign('justify').run(),
  [commandsNames.bulletList]: (editor) =>
    editor?.chain().focus().toggleBulletList().run(),
  [commandsNames.orderedList]: (editor) =>
    editor?.chain().focus().toggleOrderedList().run(),
  [commandsNames.subscript]: (editor) =>
    editor?.chain().focus().toggleSubscript().run(),
  [commandsNames.superscript]: (editor) =>
    editor?.chain().focus().toggleSuperscript().run(),
};

/*const StyledIconButton = withStyles((theme) => {
    const currentType = theme.palette.type;
    return createStyles({
        root: {
            width: "24px",
            height: "24px",
            padding: 3,
            "&.selected": {
                color: theme.palette.text.primary,
                border: `1px solid ${theme.palette.basic[currentType === ThemeStyle.dark ? 0 : 9999]}`
            }
        },
        label: {
            "& svg": {
                width: 18,
                height: 18
            }
        }
    });
})(IconButton);*/

export function RteButton({ children, editor, name, inFocusWithin }) {
  let attribute;
  switch (name) {
    case commandsNames.left:
    case commandsNames.center:
    case commandsNames.right:
    case commandsNames.justify:
      attribute = { textAlign: name };
      break;
    default:
      attribute = name;
      break;
  }
  const onClick = useCallback(
    () => tiptapCommands[name](editor),
    [name, editor]
  );
  const isSelected = editor?.isActive(attribute);
  const isFocused = editor?.isFocused || inFocusWithin;
  return (
    <Tooltip title={buttonsHeadings[name]} className="rte__button">
      <IconButton
        onClick={onClick}
        className={`${isFocused && isSelected ? 'selected' : ''}`}
      >
        {children || name}
      </IconButton>
    </Tooltip>
  );
}
