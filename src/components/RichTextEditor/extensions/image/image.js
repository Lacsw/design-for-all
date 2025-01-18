import { ReactNodeViewRenderer } from '@tiptap/react';
import { ImageReactRTE } from './ImageReactRTE';
import { COMMANDS_NAMES } from 'components/RichTextEditor/helpers/constants';
import ImgTiptap from '@tiptap/extension-image';
import clsx from 'clsx';
import { defaultAligningClass } from './constants';
import { getAligningClass } from './helpers';

export const CustomImageExtension = ImgTiptap.extend({
  draggable: true,
  name: COMMANDS_NAMES.img,
  group: 'block',

  addAttributes() {
    return {
      class: {
        default: defaultAligningClass,
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
        getAttrs: (node) => {
          const aligningClass = getAligningClass(node.classList);

          return {
            class: aligningClass,
          };
        },
      },
      {
        tag: 'img',
        getAttrs: (node) => {
          const classList = node.classList;
          const aligningClass = getAligningClass(classList);

          return {
            src: node.src,
            class: aligningClass,
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes, node }) {
    return [
      COMMANDS_NAMES.img,
      {
        src: HTMLAttributes.src,
        class: clsx(this.options.HTMLAttributes.class, HTMLAttributes.class),
      },
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageReactRTE, {
      as: 'figure',
    });
  },
});
