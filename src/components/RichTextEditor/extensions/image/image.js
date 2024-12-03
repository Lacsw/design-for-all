import ImageRTE from '@tiptap/extension-image';
import clsx from 'clsx';
import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { ImageReactRTE } from './ImageReactRTE';
import { COMMANDS_NAMES } from 'components/RichTextEditor/helpers/constants';

export const CustomImageExtension = Node.create({
  //   addAttributes() {
  //     return {
  //       ...this.parent?.(),
  //       class: {
  //         default: 'justify',
  //       },
  //     };
  //   },
  //   renderHTML({ HTMLAttributes }) {
  //     console.log('HTMLAttributes', HTMLAttributes);
  //     console.log('this', this);
  //     return [
  //       'div',
  //       {
  //         class: clsx(this.options.HTMLAttributes.class, HTMLAttributes.class),
  //       },
  //       ['img', { ...HTMLAttributes, class: null }, 0],
  //     ];
  //   },
  // });
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
      contentDOMElementTag: 'figure',
    });
  },
});
