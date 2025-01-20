// @ts-check
import { Node } from '@tiptap/core';
import { customHeadingNodeName } from './constants';

const defaultLevels = [1, 2, 3, 4, 5, 6];

export const VanillaHeadingExtension = Node.create({
  name: 'heading',
  group: 'block',
  content: 'block',
  defining: true,

  addAttributes() {
    return {
      level: {
        default: this.options.levels?.[0] || 1,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'h1,h2,h3,h4,h5,h6',
        context: customHeadingNodeName,
        getAttrs(node) {
          const level = Number(node.tagName.charAt(1));
          return { level };
        },
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const levels = this.options.levels || defaultLevels;
    const maxLevel = levels.at(-1);
    /** @type {number} */
    let level = node.attrs.level;
    /* ограничение может не сработать, но это не из-за ошибки в коде, а из-за того,
        что при выделении контента в постороннем источнике было не полностью захвачена нода заголовка */
    while (level > maxLevel) {
      level = level - 1;
    }
    const hTag = `h${level}`;

    return [hTag, 0];
  },
});
