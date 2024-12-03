import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { ImageReactRTE } from './ImageReactRTE';
import { COMMANDS_NAMES } from 'components/RichTextEditor/helpers/constants';

export const CustomImageExtension = Node.create({
  draggable: true,
  name: COMMANDS_NAMES.img,
  group: 'block',
  content: 'inline*',
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
  renderHTML({ HTMLAttributes }) {
    return [COMMANDS_NAMES.img, mergeAttributes(HTMLAttributes), 0];
  },
  addNodeView() {
    return ReactNodeViewRenderer(ImageReactRTE, {
      as: 'figure',
    });
  },
});
