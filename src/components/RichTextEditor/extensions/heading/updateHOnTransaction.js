// @ts-check
import { customHeadingNodeName } from './constants';

/**
 * @param {import('@tiptap/react').EditorEvents['transaction']} props
 * @returns {void}
 */
export const updateHOnTransaction = ({ editor, transaction }) => {
  /** @type {import('@tiptap/pm/state').TextSelection} */
  // @ts-ignore
  const selection = transaction.selection;
  const { $cursor } = selection;

  if ($cursor && $cursor.parent.type.name === customHeadingNodeName) {
    const text = $cursor.parent.textContent;
    const level = $cursor.parent.attrs.level;
    const dataSet = $cursor.parent.attrs.dataSet;
    const curSubHeader = $cursor.parent.attrs.dataSet?.[`subHeaders${level}`];

    if (dataSet !== null && dataSet !== undefined && curSubHeader !== text) {
      editor.commands.updateAttributes(customHeadingNodeName, {
        dataSet: {
          [`subHeaders${level}`]: text,
        },
      });
    }
  }
};
