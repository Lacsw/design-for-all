import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { ImageReactRTE } from './ImageReactRTE';
import { COMMANDS_NAMES } from 'components/RichTextEditor/helpers/constants';

export const CustomImageExtension = Node.create({
  draggable: true,
  name: COMMANDS_NAMES.img,
  group: 'block',

  addAttributes() {
    return {
      class: {
        default: 'justify',
      },
      src: {
        default: '',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: COMMANDS_NAMES.img,
      },
    ];
  },

  renderHTML({ HTMLAttributes, node }) {
    return [COMMANDS_NAMES.img, mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageReactRTE, {
      as: 'figure',
    });
  },
});
