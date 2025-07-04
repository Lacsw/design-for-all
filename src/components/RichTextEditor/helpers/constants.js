import { RTE } from 'utils/translationKeys';

/** Имена команд, большинство назначены библиотекой Tiptap */
export const COMMANDS_NAMES = {
  paragraph: 'paragraph',
  heading1: 'heading1',
  heading2: 'heading2',
  heading3: 'heading3',
  heading4: 'heading4',
  // heading5: 'heading5',
  // heading6: 'heading6',
  headingCustom: 'headingCustom',
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
  img: 'imageCustom', // custom command
  link: 'link',
};

/** Человеческие названия команд на русском языке */
export const buttonsHeadings = {
  [COMMANDS_NAMES.paragraph]: RTE.BUTTON.PARAGRAPH,
  [COMMANDS_NAMES.heading1]: RTE.BUTTON.HEADING1,
  [COMMANDS_NAMES.heading2]: RTE.BUTTON.HEADING2,
  [COMMANDS_NAMES.heading3]: RTE.BUTTON.HEADING3,
  [COMMANDS_NAMES.heading4]: RTE.BUTTON.HEADING4,
  // [COMMANDS_NAMES.heading5]: RTE.BUTTON.HEADING5,
  // [COMMANDS_NAMES.heading6]: RTE.BUTTON.HEADING6,
  [COMMANDS_NAMES.italic]: RTE.BUTTON.ITALIC,
  [COMMANDS_NAMES.bold]: RTE.BUTTON.BOLD,
  [COMMANDS_NAMES.underline]: RTE.BUTTON.UNDERLINE,
  [COMMANDS_NAMES.code]: RTE.BUTTON.CODE,
  [COMMANDS_NAMES.codeBlock]: RTE.BUTTON.CODE_BLOCK,
  [COMMANDS_NAMES.left]: RTE.BUTTON.ALIGN_LEFT,
  [COMMANDS_NAMES.center]: RTE.BUTTON.ALIGN_CENTER,
  [COMMANDS_NAMES.right]: RTE.BUTTON.ALIGN_RIGHT,
  [COMMANDS_NAMES.justify]: RTE.BUTTON.ALIGN_JUSTIFY,
  [COMMANDS_NAMES.bulletList]: RTE.BUTTON.BULLET_LIST,
  [COMMANDS_NAMES.orderedList]: RTE.BUTTON.ORDERED_LIST,
  [COMMANDS_NAMES.subscript]: RTE.BUTTON.SUBSCRIPT,
  [COMMANDS_NAMES.superscript]: RTE.BUTTON.SUPERSCRIPT,
  [COMMANDS_NAMES.img]: RTE.BUTTON.IMAGE,
  [COMMANDS_NAMES.link]: RTE.BUTTON.LINK,
};

/**
 * @typedef TAllowedHeadingLevels
 * @type {1 | 2 | 3 | 4}
 */

/** @type {TAllowedHeadingLevels} */
export const allowedHeadingLevels = [1, 2, 3, 4];

export const cbStub = () => {};
