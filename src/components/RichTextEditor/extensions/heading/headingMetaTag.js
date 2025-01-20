// @ts-check
import { Node } from '@tiptap/core';
import { hMeta } from './constants';

export const HeadingMetaTagExtension = Node.create({
  name: hMeta.nodeName,
  group: `${hMeta.group} block`,
  content: 'inline*',
  defining: true,

  parseHTML() {
    return [
      {
        tag: hMeta.tag,
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [hMeta.tag, 0];
  },
});
