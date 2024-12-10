import { COMMANDS_NAMES } from './constants';

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
    } else if (editor?.isActive(COMMANDS_NAMES.img)) {
      return editor
        ?.chain()
        .focus()
        .updateAttributes(COMMANDS_NAMES.img, { class: null })
        .run();
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
    } else if (editor?.isActive(COMMANDS_NAMES.img)) {
      return editor
        ?.chain()
        .focus()
        .updateAttributes(COMMANDS_NAMES.img, { class: 'justify' })
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
  [COMMANDS_NAMES.img]: (editor) => {
    // const url = window.prompt('URL');
    const urls = [
      'https://i.pinimg.com/200x/d5/2a/01/d52a01b1eacc48b5c60ff1a0a8426e6c.jpg',
      'https://i.pinimg.com/236x/97/76/64/9776647cac22dc41086cfa6815f62a5c--cat-face-cat-eyes.jpg?nii=t',
      'https://www.meme-arsenal.com/memes/92c3bf3588af96e7533d85284f32c4cd.jpg',
      'https://i.pinimg.com/236x/3b/b8/8e/3bb88e56069511c14034285c081a7d22.jpg',
      'https://cs14.pikabu.ru/avatars/4124/x4124556-176449567.png',
    ];
    const idx = Math.round(Math.random() * (urls.length - 1));

    editor
      ?.chain()
      .insertContentAt(editor.state.selection.head, {
        type: COMMANDS_NAMES.img,
        attrs: {
          src: urls[idx],
        },
      })
      .focus()
      .run();
  },
};

/**
 * @param {string} commandName - Rte command name from const
 *   {@link COMMANDS_NAMES}
 * @returns {boolean}
 */
export function checkIsCommandActive(commandName, editor) {
  let needAnotherCheck = false;
  let anotherCheck;
  let commandParams;

  switch (commandName) {
    case COMMANDS_NAMES.left:
    case COMMANDS_NAMES.center:
    case COMMANDS_NAMES.right:
    case COMMANDS_NAMES.justify:
      if (editor?.isActive(COMMANDS_NAMES.img)) {
        needAnotherCheck = true;
        anotherCheck = (name) => {
          if (name === COMMANDS_NAMES.justify) {
            return editor.view.lastSelectedViewDesc.dom
              .querySelector('div')
              .classList.contains('justify');
          } else if (name === COMMANDS_NAMES.center) {
            return !editor.view.lastSelectedViewDesc.dom
              .querySelector('div')
              .classList.contains('justify');
          } else {
            return false;
          }
        };
      } else {
        commandParams = [{ textAlign: commandName }];
      }
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

  let res;
  if (needAnotherCheck) {
    res = anotherCheck(commandName);
  } else {
    res = editor?.isActive(...commandParams);
  }
  return res;
}

const commandNamesForchecks = [
  COMMANDS_NAMES.img,
  COMMANDS_NAMES.code,
  COMMANDS_NAMES.codeBlock,
];

/**
 * Ключ - имя команды, которая уже применена в данный момент.\
 * Значение - функция, принимающая имя команды и говорящая, должна ли она быть
 * недоступна.
 */
const isDisabledMap = {
  [COMMANDS_NAMES.img]: (commandName) => {
    if (
      commandName === COMMANDS_NAMES.center ||
      commandName === COMMANDS_NAMES.justify ||
      commandName === COMMANDS_NAMES.img
    ) {
      return false;
    } else {
      return true;
    }
  },
  [COMMANDS_NAMES.code]: (commandName) => {
    if (
      commandName === COMMANDS_NAMES.italic ||
      commandName === COMMANDS_NAMES.bold
    ) {
      return true;
    } else {
      return false;
    }
  },
  [COMMANDS_NAMES.codeBlock]: (commandName) => {
    if (
      commandName === COMMANDS_NAMES.italic ||
      commandName === COMMANDS_NAMES.bold ||
      commandName === COMMANDS_NAMES.left ||
      commandName === COMMANDS_NAMES.center ||
      commandName === COMMANDS_NAMES.right ||
      commandName === COMMANDS_NAMES.justify
    ) {
      return true;
    } else {
      return false;
    }
  },
};

/**
 * Проверить, должна ли команда быть недоступной для выбранной на данный момент
 * ноды RTE.\
 * Для корректной работы функции в редакторе должна быть активна лишь одна
 * команда из списка {@link commandNamesForchecks}.
 */
export function checkIsCommandDisabled(commandName, editor) {
  let alreadyActiveCommand;
  // найдет лишь ПЕРВОЕ совпадение, потому в описании функции указано ограничение
  commandNamesForchecks.find((name) => {
    const res = checkIsCommandActive(name, editor);
    if (res) {
      alreadyActiveCommand = name;
    }
    return res;
  });

  const checkerFn = isDisabledMap[alreadyActiveCommand];
  const res = checkerFn ? checkerFn(commandName) : false;

  return res;
}
