import { IconButton, Tooltip } from '@mui/material';
import React, { useCallback } from 'react';
import { buttonsHeadings, COMMANDS_NAMES } from '../helpers';
import { lastActiveNodes } from '../helpers/lastActive';

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
  [COMMANDS_NAMES.left]: (editor) => {
    if (editor?.isActive('listItem')) {
      return editor
        ?.chain()
        .focus()
        .updateAttributes('listItem', { class: null })
        .setTextAlign('left')
        .run();
    } else {
      return editor?.chain().focus().setTextAlign('left').run();
    }
  },
  [COMMANDS_NAMES.center]: (editor) => {
    // editor &&
    // console.log(lastActiveNodes(editor.state, [{ type: 'orderedList' }]));

    if (editor?.isActive('listItem')) {
      return (
        editor
          .chain()
          .focus()
          .updateAttributes('listItem', {
            class: 'center',
          })
          /* установит атрибут style="text-align: ..." для дочернего тега <p>.
            Это не влияет на выравнивание текста, т.к. ширина блока <p> выставлена по контенту,
            но команда необходима, чтобы редактор обновил свой стейт о примененных стилях к данной ноде
            (чтобы правильно подсветить кнопки активных команд/стилей в панели с кнопками) */
          .setTextAlign('center')
          .run()
      );
    } else {
      return editor?.chain().focus().setTextAlign('center').run();
    }
  },
  [COMMANDS_NAMES.right]: (editor) => {
    if (editor?.isActive('listItem')) {
      return editor
        ?.chain()
        .focus()
        .updateAttributes('listItem', { class: 'right' })
        .setTextAlign('right')
        .run();
    } else {
      return editor?.chain().focus().setTextAlign('right').run();
    }
  },
  [COMMANDS_NAMES.justify]: (editor) => {
    if (editor?.isActive('listItem')) {
      return editor
        ?.chain()
        .focus()
        .updateAttributes('listItem', { class: 'justify' })
        .setTextAlign('justify')
        .run();
    } else {
      return editor?.chain().focus().setTextAlign('justify').run();
    }
  },
  [COMMANDS_NAMES.bulletList]: (editor) =>
    editor?.chain().focus().toggleBulletList().run(),
  [COMMANDS_NAMES.orderedList]: (editor) =>
    editor?.chain().focus().toggleOrderedList().run(),
  [COMMANDS_NAMES.subscript]: (editor) =>
    editor?.chain().focus().toggleSubscript().run(),
  [COMMANDS_NAMES.superscript]: (editor) =>
    editor?.chain().focus().toggleSuperscript().run(),
};

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

  const handleClick = useCallback(
    () => tiptapCommands[name](editor),
    [name, editor]
  );

  const isSelected = editor?.isActive(attribute);
  const isFocused = editor?.isFocused || inFocusWithin;
  const classes = [
    'rte__button',
    isFocused && isSelected ? 'selected' : '',
    className,
  ];

  return (
    <Tooltip title={buttonsHeadings[name]}>
      <IconButton
        onClick={handleClick}
        className={classes.join(' ')}
        size="small"
      >
        {children || name}
      </IconButton>
    </Tooltip>
  );
}
