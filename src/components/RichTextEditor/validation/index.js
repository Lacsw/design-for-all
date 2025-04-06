// @ts-check
import { checkEmptiness } from './validators/empty';
import { checkEmptySymbols } from './validators/emptySymbols';

// if (validationsOptions?.kinds?.trim) {
//     const result = trim({ editor: editor as Editor, from, to, htmlString });
//     if (result.validated) {
//         editor.commands.setContent(
//             result.validated,
//             /* не создаёт ещё одно событие "update" */
//             false,
//             // TODO задавать режимом валидации
//             // allow many spaces between words
//             { preserveWhitespace: "full" }
//         );
//     }
// }

// // Restore cursor position (#1)
// // !!!Восстановление позиции курсора нужно только при вызовах editor.commands.setContent
// const newFrom = Math.min(from, editor.state.doc.content.size);
// const newTo = Math.min(to, editor.state.doc.content.size);
// const textSelection = new TextSelection(editor.state.doc.resolve(newFrom), editor.state.doc.resolve(newTo));
// editor.view.dispatch(editor.state.tr.setSelection(textSelection));

// // Get the cursor position before changes are made by validation
// const { from, to } = editor.state.selection;

/**
 * @param {import('./types').TValidationOptions} options
 * @param {import('@tiptap/core').Editor} editor
 * @returns {import('./types').TValidateResult}
 */
export const validate = (options, editor) => {
  const kinds = options.kinds;
  /** @type {import('./types').TValidationKinds[]} */
  const disturbedRules = [];

  if (kinds.empty) {
    const result = checkEmptiness(editor);
    if (!result.isValid) {
      disturbedRules.push('empty');
    }
  }

  if (kinds.emptySymbols) {
    const result = checkEmptySymbols(editor);
    if (!result.isValid) {
      disturbedRules.push('emptySymbols');
    }
  }

  return {
    validity: {
      isValid: disturbedRules.length === 0,
    },
    content: editor.getHTML(),
  };
};
