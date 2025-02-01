// @ts-check
import { Node, textblockTypeInputRule } from '@tiptap/core';
import { defaultLevels, customHeadingNodeName } from './constants';
import clsx from 'clsx';
import {
  // extractHTMLNodeText,
  extractNodeText,
} from 'components/RichTextEditor/helpers';
import { updateHOnTransaction } from './updateHOnTransaction';

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
        default: '',
      },
      level: {
        default: 0,
      },
      dataSet: {
        subHeaders1: '',
        subHeaders2: '',
        subHeaders3: '',
        subHeaders4: '',
        subHeaders5: '',
        subHeaders6: '',
      },
      textAlign: {
        default: 'left',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: `h1,h2,h3,h4,h5,h6`,
        getAttrs(node) {
          const level = Number(node.tagName.charAt(1));

          const dataSet = {
            // [`subHeaders${level}`]: extractHTMLNodeText(node),
          };

          const aligning = node.style.textAlign;

          return {
            level,
            dataSet,
            textAlign: aligning,
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes, node }) {
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

    const aligning = HTMLAttributes.textAlign;
    const style =
      aligning && aligning !== 'left' ? `text-align: ${aligning}` : null;

    return [
      hTag,
      {
        class: clsx(this.options.HTMLAttributes?.class),
        [`data-sub-headers-${level}`]: extractNodeText(node),
        style,
      },
      0,
    ];
  },

  /** @type {import('@tiptap/core').NodeConfig['addCommands']} */
  addCommands() {
    return {
      setHeading:
        (/** @type {import('./types').TJDHeadingCommand} */ options) =>
        (/** @type {import('@tiptap/core').CommandProps} */ props) => {
          if (!this.options.levels.includes(options.level)) {
            return false;
          }

          return props.commands.setNode(this.name, options);
        },
      toggleHeading: (options) => (props) => {
        if (!this.options.levels.includes(options.level)) {
          return false;
        }

        return props.commands.toggleNode(this.name, 'paragraph', options);
      },
    };
  },

  addKeyboardShortcuts() {
    return this.options.levels.reduce(
      (items, level) => ({
        ...items,
        ...{
          [`Mod-Alt-${level}`]: () =>
            this.editor.commands.toggleHeading({ level }),
        },
      }),
      {}
    );
  },

  addInputRules() {
    return this.options.levels.map((level) => {
      return textblockTypeInputRule({
        find: new RegExp(`^(#{1,${level}})\\s$`),
        type: this.type,
        getAttributes: {
          level,
        },
      });
    });
  },

  onTransaction: updateHOnTransaction,
});
