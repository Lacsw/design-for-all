import { Node } from '@tiptap/core';
import { headingCustomNodeClassName, headingCustomNodeName } from './constants';
import { allowedHeadingLevels } from 'components/RichTextEditor/helpers/constants';

export const CustomHeadingExtension = Node.create({
  name: headingCustomNodeName,
  group: 'block',
  content: 'heading',
  draggable: true,
  defining: true,

  addAttributes() {
    return {
      level: {
        default: 0,
      },
      class: {
        default: '',
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
          const className = node.className;
          return { level, class: className };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes, node }) {
    const hTag = `h${node.attrs.level}`;
    return ['div', { class: HTMLAttributes.class }, [hTag, 0]];
  },

  addOptions() {
    return {
      levels: allowedHeadingLevels,
    };
  },
});
