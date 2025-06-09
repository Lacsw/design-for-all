// @ts-check
// import { TextSelection } from '@tiptap/pm/state';

/** @param {import('@tiptap/react').EditorEvents['selectionUpdate']} params */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const onSelectionUpdate = ({ editor, transaction }) => {
  // console.log('selectionUpdate');
  //   //   const { state } = editor.view;
  //   //   const { from, to } = state.selection;
  //   //   // Находим все марки в текущем выделении
  //   //   const marks = state.doc.rangeHasMark(from, to, 'link');
  //   //   console.log('marks', marks);
  //   const { selection } = editor.state;
  //   const { from, to } = selection;
  //   // Проверяем, что выделение является текстовым (каретка)
  //   if (!(selection instanceof TextSelection)) {
  //     return null;
  //   }
  //   // Получаем самую глубокую ноду в позиции каретки
  //   const resolvedPos = editor.state.doc.resolve(from);
  //   const node = resolvedPos.nodeAfter || resolvedPos.nodeBefore;
  //   // Получаем все марки в текущей позиции
  //   const marks = resolvedPos.marks();
  //   const res = {
  //     node, // Самая глубокая нода
  //     marks, // Марки в текущей позиции
  //   };
  //   //   const pos = editor.state.doc.content.findDiffStart(node);
  //   const res2 = editor.view.nodeDOM(selection.$cursor.pos);
  //   console.log('res2', res2);
};
