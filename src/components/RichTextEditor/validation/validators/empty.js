// @ts-check

/**
 * Валидация на пустоту редактора
 *
 * @type {import('./types').TValidator}
 */
export function checkEmptiness(editor) {
  const text = editor.getText();
  let isEmpty = false;
  if (/^(\s)+$/.test(text) || !text) {
    isEmpty = true;
  }
  return {
    validated: editor.getHTML(),
    isValid: !isEmpty,
  };
}
