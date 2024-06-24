/** Валидация на пустоту редактора */
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
