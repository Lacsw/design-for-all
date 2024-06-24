import { checkEmptiness } from './empty';
import { checkEmptySymbols } from './emptySybmols';

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

// // TODO вынести в хелпер
// // Restore cursor position (#1)
// // !!!Восстановление позиции курсора нужно только при вызовах editor.commands.setContent
// const newFrom = Math.min(from, editor.state.doc.content.size);
// const newTo = Math.min(to, editor.state.doc.content.size);
// const textSelection = new TextSelection(editor.state.doc.resolve(newFrom), editor.state.doc.resolve(newTo));
// editor.view.dispatch(editor.state.tr.setSelection(textSelection));

// // Get the cursor position before changes are made by validation
// const { from, to } = editor.state.selection;

export const validate = (options, editor) => {
  const kinds = options.kinds;
  const disturbedRules = [];

  if (kinds.required) {
    const result = checkEmptiness(editor);
    if (!result.isValid) {
      disturbedRules.push('required');
    }
  }

  if (kinds.onlySpaces) {
    const result = checkEmptySymbols(editor);
    if (!result.isValid) {
      disturbedRules.push('onlySpaces');
    }
  }

  return {
    validity: {
      isValid: disturbedRules.length === 0,
    },
    content: editor.getHTML(),
  };
};
