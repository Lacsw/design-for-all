// @ts-check
import { Node } from '@tiptap/core';
import {
  customHeadingNodeClass,
  customHeadingNodeName,
  hMeta,
} from './constants';
import clsx from 'clsx';

export const CustomHeadingExtension = Node.create({
  name: customHeadingNodeName,
  group: 'block',
  content: 'inline*',
  draggable: false,
  defining: true,
  // marks: '',

  addAttributes() {
    return {
      class: {
        default: customHeadingNodeClass,
      },
      level: {
        default: 0,
      },
    };
  },

  parseHTML() {
    console.log('heading parseHTML', { this: this });
    return [
      {
        tag: `div.${customHeadingNodeClass}`,
        getAttrs(node) {
          console.log('getAttrs doc|section/h', { node });
          const level = Number(
            node.querySelector('h1,h2,h3,h4,h5,h6').tagName.charAt(1)
          );
          return { level };
        },
      },
      {
        tag: `h1,h2,h3,h4,h5,h6`,
        context: 'doc|section/',
        getAttrs(node) {
          console.log('getAttrs doc|section/h', { node });
          const level = Number(node.tagName.charAt(1));
          return { level };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes, node }) {
    console.log('CustomHeadingExtension renderHTML', { HTMLAttributes, node });
    const level = HTMLAttributes.level;
    return [
      'div',
      {
        class: clsx(this.options.HTMLAttributes?.class, customHeadingNodeClass),
      },
      // level ? [`h${level}`, [hMeta.tag, 0]] : 0,
      [`h${level}`, [hMeta.tag, 0]],
    ];
  },

  /** @type {import('@tiptap/core').NodeConfig['addCommands']} */
  addCommands() {
    return {
      // @ts-ignore
      insertCustomHeading:
        (/** @type {import('./types').TJDHeadingCommand} */ options) =>
        (/** @type {import('@tiptap/core').CommandProps} */ props) => {
          console.log('insertCustomHeading', {
            attributes: options,
            props,
            this: this,
          });
          if (!this.options.levels.includes(options.level)) {
            return false;
          }

          return props.commands.insertContent({
            type: customHeadingNodeName,
            attrs: options,
          });
        },
      // toggleCustomHeading:
      //   (attributes) =>
      //   ({ commands }) => {
      //     if (!this.options.levels.includes(attributes.level)) {
      //       return false;
      //     }

      //     return commands.toggleNode(this.name, 'paragraph', attributes);
      //   },
    };
  },
});
