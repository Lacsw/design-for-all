import { IconButton, Tooltip } from '@mui/material';
import React, { useCallback } from 'react';
import { buttonsHeadings, COMMANDS_NAMES } from '../helpers';

const tiptapCommands = {
  [COMMANDS_NAMES.italic](editor) {
    editor?.chain().focus().toggleItalic().run();
  },
  [COMMANDS_NAMES.bold]: (editor) => editor?.chain().focus().toggleBold().run(),
  [COMMANDS_NAMES.underline]: (editor) =>
    editor?.chain().focus().toggleUnderline().run(),
  [COMMANDS_NAMES.code]: (editor) => editor?.chain().focus().toggleCode().run(),
  [COMMANDS_NAMES.codeBlock]: (editor) =>
    editor?.chain().focus().toggleCodeBlock().run(),
  [COMMANDS_NAMES.left]: (editor) =>
    editor?.chain().focus().setTextAlign('left').run(),
  [COMMANDS_NAMES.center]: (editor) =>
    editor?.chain().focus().setTextAlign('center').run(),
  [COMMANDS_NAMES.right]: (editor) =>
    editor?.chain().focus().setTextAlign('right').run(),
  [COMMANDS_NAMES.justify]: (editor) =>
    editor?.chain().focus().setTextAlign('justify').run(),
  [COMMANDS_NAMES.bulletList]: (editor) =>
    editor?.chain().focus().toggleBulletList().run(),
  [COMMANDS_NAMES.orderedList]: (editor) =>
    editor?.chain().focus().toggleOrderedList().run(),
  [COMMANDS_NAMES.subscript]: (editor) =>
    editor?.chain().focus().toggleSubscript().run(),
  [COMMANDS_NAMES.superscript]: (editor) =>
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

export function RteButton({
  children,
  editor,
  name,
  inFocusWithin,
  className,
}) {
  let attribute;
  switch (name) {
    case COMMANDS_NAMES.left:
    case COMMANDS_NAMES.center:
    case COMMANDS_NAMES.right:
    case COMMANDS_NAMES.justify:
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
  const classes = [isFocused && isSelected ? 'selected' : '', className];

  return (
    <Tooltip title={buttonsHeadings[name]} className="rte__button">
      <IconButton onClick={onClick} className={classes.join(' ')} size="small">
        {children || name}
      </IconButton>
    </Tooltip>
  );
}
