// @ts-check
import { TextSelection } from '@tiptap/pm/state';

/**
 * Валидация на наличие пробелов в НАЧАЛЕ редактора
 *
 * Изменяет контент! Не просто проверяет
 *
 * @type {import('./types').TTrimValidator}
 */
export function checkTrim({ editor, from, to, content }) {
  // TODO Реализовать проверку концевых пробелов
  const firstSpaceIndex = content.indexOf(' ');
  const strBeforeFirstSpace = content.slice(0, firstSpaceIndex);
  /** Пробел вводится в начало редактора? */
  // TODO Неверная регулярка, хоть обрезка и работает
  const isBegin = /^((<.+>)+(<\/.+>)*)+$/.test(strBeforeFirstSpace);

  let validated = '';
  if (isBegin) {
    let spaceCounter = 0;

    for (let i = firstSpaceIndex; i < content.length; i++) {
      if (content[i] === ' ') {
        spaceCounter++;
      } else if (/[^ ]/.test(content[i])) {
        break;
      }
    }

    validated =
      content.slice(0, firstSpaceIndex) +
      content.slice(firstSpaceIndex + spaceCounter);

    // Restore cursor position
    const newFrom = Math.min(from, editor.state.doc.content.size);
    const newTo = Math.min(to, editor.state.doc.content.size);
    const textSelection = new TextSelection(
      editor.state.doc.resolve(newFrom - 1),
      editor.state.doc.resolve(newTo - 1)
    );
    return {
      isValid: isBegin,
      validated,
      textSelection,
    };
  } else {
    return {
      isValid: true, // ?????
      validated: '',
      textSelection: null,
    };
  }
}
