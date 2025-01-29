// @ts-check
import { customHeadingNodeName } from './constants';

/**
 * @param {import('@tiptap/react').EditorEvents['transaction']} props
 * @returns {void}
 */
export const updateHOnTransaction = ({ editor, transaction }) => {
  const selection = transaction.selection;
  const { $anchor } = selection;

  if ($anchor.parent.type.name === customHeadingNodeName) {
    const text = $anchor.parent.textContent;
    const level = $anchor.parent.attrs.level;
    const curSubHeader = $anchor.parent.attrs.dataSet?.[`subHeaders${level}`];

    if (curSubHeader !== text) {
      editor.commands.updateAttributes(customHeadingNodeName, {
        dataSet: {
          [`subHeaders${level}`]: text,
        },
      });
    }
  }
};
