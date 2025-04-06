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
};

/** Человеческие названия команд на русском языке */
export const buttonsHeadings = {
  [COMMANDS_NAMES.paragraph]: 'Обычный текст',
  [COMMANDS_NAMES.heading1]: 'Заголовок 1',
  [COMMANDS_NAMES.heading2]: 'Заголовок 2',
  [COMMANDS_NAMES.heading3]: 'Заголовок 3',
  [COMMANDS_NAMES.heading4]: 'Заголовок 4',
  // [COMMANDS_NAMES.heading5]: 'Заголовок 5',
  // [COMMANDS_NAMES.heading6]: 'Заголовок 6',
  [COMMANDS_NAMES.italic]: 'Курсив',
  [COMMANDS_NAMES.bold]: 'Жирный',
  [COMMANDS_NAMES.underline]: 'Подчеркивание',
  [COMMANDS_NAMES.code]: 'Код',
  [COMMANDS_NAMES.codeBlock]: 'Блок кода',
  [COMMANDS_NAMES.left]: 'Выровнять по левому краю',
  [COMMANDS_NAMES.center]: 'Выровнять по центру',
  [COMMANDS_NAMES.right]: 'Выровнять по правому краю',
  [COMMANDS_NAMES.justify]: 'Выровнять по ширине',
  [COMMANDS_NAMES.bulletList]: 'Маркированный список',
  [COMMANDS_NAMES.orderedList]: 'Нумерованный список',
  [COMMANDS_NAMES.subscript]: 'Нижний индекс',
  [COMMANDS_NAMES.superscript]: 'Верхний индекс',
  [COMMANDS_NAMES.img]: 'Вставить изображение',
};

/**
 * @typedef TAllowedHeadingLevels
 * @type {1 | 2 | 3 | 4}
 */

/** @type {TAllowedHeadingLevels} */
export const allowedHeadingLevels = [1, 2, 3, 4];
