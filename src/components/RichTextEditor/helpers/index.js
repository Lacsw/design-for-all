/** Имена команд, назначены библиотекой Tiptap */
export const COMMANDS_NAMES = {
  paragraph: 'paragraph',
  heading1: 'heading1',
  heading2: 'heading2',
  heading3: 'heading3',
  heading4: 'heading4',
  // heading5: 'heading5',
  // heading6: 'heading6',
  italic: 'italic',
  bold: 'bold',
  underline: 'underline',
  code: 'code',
  codeBlock: 'codeBlock',
  left: 'left',
  center: 'center',
  right: 'right',
  justify: 'justify',
  bulletList: 'bulletList',
  orderedList: 'orderedList',
  subscript: 'subscript',
  superscript: 'superscript',
};

export const tiptapCommands = {
  [COMMANDS_NAMES.paragraph]: (editor) => {
    editor?.chain().focus().setParagraph().run();
  },

  [COMMANDS_NAMES.heading1]: (editor) => {
    editor?.chain().focus().toggleHeading({ level: 1 }).run();
  },
  [COMMANDS_NAMES.heading2]: (editor) => {
    editor?.chain().focus().toggleHeading({ level: 2 }).run();
  },
  [COMMANDS_NAMES.heading3]: (editor) => {
    editor?.chain().focus().toggleHeading({ level: 3 }).run();
  },
  [COMMANDS_NAMES.heading4]: (editor) => {
    editor?.chain().focus().toggleHeading({ level: 4 }).run();
  },
  // [COMMANDS_NAMES.heading5]: (editor) => {
  //   editor?.chain().focus().toggleHeading({ level: 5 }).run();
  // },
  // [COMMANDS_NAMES.heading6]: (editor) => {
  //   editor?.chain().focus().toggleHeading({ level: 6 }).run();
  // },

  [COMMANDS_NAMES.italic]: (editor) => {
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

/** Человеческие названия команд на русском языке */
export const buttonsHeadings = {
  paragraph: 'Обычный текст',
  heading1: 'Заголовок 1',
  heading2: 'Заголовок 2',
  heading3: 'Заголовок 3',
  heading4: 'Заголовок 4',
  // heading5: 'Заголовок 5',
  // heading6: 'Заголовок 6',
  italic: 'Курсив',
  bold: 'Жирный',
  underline: 'Подчеркивание',
  code: 'Код',
  codeBlock: 'Блок кода',
  left: 'Выровнять по левому краю',
  center: 'Выровнять по центру',
  right: 'Выровнять по правому краю',
  justify: 'Выровнять по ширине',
  bulletList: 'Маркированный список',
  orderedList: 'Нумерованный список',
  subscript: 'Нижний индекс',
  superscript: 'Верхний индекс',
};

/**
 * @param {string} commandName - Rte command name from const COMMANDS_NAMES
 * @returns {boolean}
 */
export function isCommandActive(commandName, editor) {
  let commandParams;

  switch (commandName) {
    case COMMANDS_NAMES.left:
    case COMMANDS_NAMES.center:
    case COMMANDS_NAMES.right:
    case COMMANDS_NAMES.justify:
      commandParams = [{ textAlign: commandName }];
      break;
    case COMMANDS_NAMES.heading1:
    case COMMANDS_NAMES.heading2:
    case COMMANDS_NAMES.heading3:
    case COMMANDS_NAMES.heading4:
      // case COMMANDS_NAMES.heading5:
      // case COMMANDS_NAMES.heading6:
      commandParams = ['heading', { level: Number(commandName.at(-1)) }];
      break;
    default:
      commandParams = [commandName];
      break;
  }

  const res = editor?.isActive(...commandParams);
  return res;
}
