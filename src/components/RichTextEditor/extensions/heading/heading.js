// @ts-check
import { Node } from '@tiptap/core';
import {
  DATA_KEY,
  headingCustomNodeClassName,
  headingCustomNodeName,
} from './constants';
import clsx from 'clsx';
// import HeadingExtension from '@tiptap/extension-heading';

export const CustomHeadingExtension = Node.create({
  name: headingCustomNodeName,
  group: 'block',
  content: 'inline*',
  draggable: false,
  defining: true,
  // marks: '',

  addAttributes() {
    return {
      level: {
        default: this.options.levels?.[0] || 1,
      },
      class: {
        default: headingCustomNodeClassName,
      },
      dataKey: {
        default: DATA_KEY,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: `div.${headingCustomNodeClassName}`,
        getAttrs(node) {
          const level = Number(
            node.querySelector('h1,h2,h3,h4,h5,h6').tagName.charAt(1)
          );
          return { level };
        },
      },
      {
        tag: `h1,h2,h3,h4,h5,h6`,
        getAttrs(node) {
          const level = Number(node.tagName.charAt(1));
          return { level };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes, node }) {
    /** @type {number[]} */
    const levels = this.options.levels;
    const maxLevel = levels.at(-1);
    /** @type {number} */
    let level = node.attrs.level;
    /* ограничение может не сработать, но это не из-за ошибки в коде, а из-за того,
    что при выделении контента в постороннем источнике было не полностью захвачена нода заголовка */
    while (level > maxLevel) {
      level = level - 1;
    }
    const hTag = `h${level}`;

    return [
      'div',
      {
        class: clsx(
          this.options.HTMLAttributes.class,
          headingCustomNodeClassName
        ),
        'data-key': node.attrs.dataKey,
      },
      [hTag, 0],
    ];
  },

  // @ts-ignore
  addCommands() {
    return {
      setCustomHeading:
        (attributes) =>
        ({ commands }) => {
          if (!this.options.levels.includes(attributes.level)) {
            return false;
          }

          return commands.setNode(this.name, attributes);
        },
      toggleCustomHeading:
        (attributes) =>
        ({ commands }) => {
          if (!this.options.levels.includes(attributes.level)) {
            return false;
          }

          return commands.toggleNode(this.name, 'paragraph', attributes);
        },
    };
  },
});
