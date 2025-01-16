/**
 * Валидация на контент, состоящий только из символов пустого места (пробелы,
 * табуляции, etc)
 */
export function checkEmptySymbols(editor) {
  const htmlString = editor.getHTML();
  let isValid;
  if (/^((<.+>)(\s)+(<\/.+>))+$/.test(htmlString)) {
    isValid = false;
  } else {
    isValid = true;
  }
  return {
    validated: htmlString,
    isValid,
  };
}
