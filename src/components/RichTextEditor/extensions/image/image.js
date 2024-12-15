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

  parseHTML(a, b, c) {
    console.log('CustomImageExtension parseHTML', { a, b, c });
    return [
      {
        tag: COMMANDS_NAMES.img,
      },
    ];
  },

  renderHTML(params, p2, p3) {
    console.log('renderHTML', params, p2, p3);
    return [COMMANDS_NAMES.img, mergeAttributes(params)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageReactRTE, {
      as: 'figure',
    });
  },
});
