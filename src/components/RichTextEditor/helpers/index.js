// @ts-check
import { customHeadingNodeName } from '../extensions/heading/constants';
import { customImgNodeName } from '../extensions/image/constants';
import { COMMANDS_NAMES } from './constants';

/**
 * @callback TDRteCommand
 * @param {import('@tiptap/core').Editor | null} editor
 * @param {any} [otherParams]
 * @returns {boolean}
 */

/**
 * @typedef TDTiptapCommands
 * @type {{ [key: string]: TDRteCommand }}
 */

// #region tiptapCommands
/** @type {TDTiptapCommands} */
// @ts-ignore
export const tiptapCommands = {
  [COMMANDS_NAMES.paragraph]: (editor) => {
    editor?.chain().focus().setParagraph().run();
  },

  // #region headings
  [COMMANDS_NAMES.heading1]: (editor) => {
    // @ts-ignore
    editor?.chain().focus().toggleHeading({ level: 1 }).run();
    // editor?.chain().focus().command().setNode;
  },
  [COMMANDS_NAMES.heading2]: (editor) => {
    // @ts-ignore
    editor?.chain().focus().toggleHeading({ level: 2 }).run();
  },
  [COMMANDS_NAMES.heading3]: (editor) => {
    // @ts-ignore
    editor?.chain().focus().toggleHeading({ level: 3 }).run();
  },
  [COMMANDS_NAMES.heading4]: (editor) => {
    // @ts-ignore
    editor?.chain().focus().toggleHeading({ level: 4 }).run();
  },
  // [COMMANDS_NAMES.heading5]: (editor) => {
  //   // @ts-ignore
  //   editor?.chain().focus().toggleHeading({ level: 5 }).run();
  // },
  // [COMMANDS_NAMES.heading6]: (editor) => {
  //   // @ts-ignore
  //   editor?.chain().focus().toggleHeading({ level: 6 }).run();
  // },
  // #endregion headings

  [COMMANDS_NAMES.italic]: (editor) => {
    editor?.chain().focus().toggleItalic().run();
  },
  [COMMANDS_NAMES.bold]: (editor) => editor?.chain().focus().toggleBold().run(),
  [COMMANDS_NAMES.underline]: (editor) =>
    // @ts-ignore
    editor?.chain().focus().toggleUnderline().run(),

  [COMMANDS_NAMES.code]: (editor) => editor?.chain().focus().toggleCode().run(),
  [COMMANDS_NAMES.codeBlock]: (editor) =>
    editor?.chain().focus().toggleCodeBlock().run(),

  // #region text aligning
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
        .updateAttributes(COMMANDS_NAMES.img, { class: 'center' })
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
  // #endregion text aligning

  // #region ETC
  [COMMANDS_NAMES.bulletList]: (editor) =>
    editor?.chain().focus().toggleBulletList().run(),
  [COMMANDS_NAMES.orderedList]: (editor) =>
    editor?.chain().focus().toggleOrderedList().run(),

  [COMMANDS_NAMES.subscript]: (editor) =>
    // @ts-ignore
    editor?.chain().focus().toggleSubscript().run(),
  [COMMANDS_NAMES.superscript]: (editor) =>
    // @ts-ignore
    editor?.chain().focus().toggleSuperscript().run(),
  // #endregion ETC

  // #region insert img
  [COMMANDS_NAMES.img]: (editor, url) => {
    if (!editor || !url || editor?.isActive(COMMANDS_NAMES.img)) {
      return;
    }

    editor
      .chain()
      .insertContentAt(editor.state.selection.head, {
        type: customImgNodeName,
        attrs: {
          src: url,
        },
      })
      .focus(editor.state.selection.head + 1)
      .run();
  },
  // #endregion insert img

  [COMMANDS_NAMES.link]: (editor) => {
    if (!editor) {
      return;
    }

    editor
      .chain()
      .toggleLink({
        href: 'https://example.com',
      })
      .focus()
      .run();
  },
};
// #endregion tiptapCommands

// #region checkIsCommandActive
/**
 * @param {string} commandName - RTE command name(key name) from const
 *   {@link COMMANDS_NAMES}
 * @param {import('@tiptap/core').Editor | null} editor
 * @returns {boolean}
 */
export function checkIsCommandActive(commandName, editor) {
  if (!editor) {
    return false;
  }

  let needAnotherCheck = false;
  let anotherCheck;
  let commandParams;

  switch (commandName) {
    case COMMANDS_NAMES.left: {
      /** @type {HTMLElement | null} */
      const node =
        // @ts-ignore
        editor.view?.domObserver?.currentSelection?.focusNode?.parentNode;

      const textAlign = node?.style.textAlign;

      if (
        textAlign === 'start' ||
        (node?.tagName === 'P' && !textAlign) /*||
        (!textAlign &&
          !editor.isActive(COMMANDS_NAMES.img) &&
          !editor.isActive('link'))
      */
      ) {
        return true;
      }

      if (node?.tagName === 'A') {
        commandParams = [{ textAlign: commandName }];
        break;
      } else {
        return false;
      }
    }
    case COMMANDS_NAMES.center:
    case COMMANDS_NAMES.right:
    case COMMANDS_NAMES.justify:
      if (editor.isActive(COMMANDS_NAMES.img)) {
        needAnotherCheck = true;

        anotherCheck = (name) => {
          if (name === COMMANDS_NAMES.justify) {
            return Boolean(
              // @ts-ignore
              editor.view.lastSelectedViewDesc.dom
                .querySelector('div')
                ?.classList.contains('justify')
            );
          } else if (name === COMMANDS_NAMES.center) {
            return Boolean(
              // @ts-ignore
              editor.view.lastSelectedViewDesc.dom
                .querySelector('div')
                ?.classList.contains('center')
            );
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
      commandParams = [
        customHeadingNodeName,
        { level: Number(commandName.at(-1)) },
      ];
      break;
    default:
      commandParams = [commandName];
      break;
  }

  let res;
  if (needAnotherCheck) {
    res = anotherCheck(commandName);
  } else {
    // @ts-ignore
    res = editor.isActive(...commandParams);
  }
  return res;
}

const commandNamesForchecks = [
  COMMANDS_NAMES.img,
  COMMANDS_NAMES.code,
  COMMANDS_NAMES.codeBlock,
];
// #endregion checkIsCommandActive

// #region isDisabledMap
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
// #endregion isDisabledMap

// #region checkIsCommandDisabled
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
// #endregion checkIsCommandDisabled

// #region extractNodeText
/**
 * @param {HTMLElement} node
 * @returns {string}
 */
export function extractHTMLNodeText(node) {
  return node.innerText;
}
// #endregion extractNodeText

// #region extractNodeText
/**
 * @param {import('prosemirror-model/dist').Node} node
 * @returns {string}
 */
export function extractNodeText(node) {
  /** @type {string[]} */
  const res = [];

  node.content.forEach((childNode) => {
    if (childNode.type.name === 'text') {
      res.push(childNode.text);
    } else if (childNode.type.name === 'hardBreak') {
      res.push('\n');
    }
  });

  return res.join('');
}
// #endregion extractNodeText
