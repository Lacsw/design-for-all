// @ts-check
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
        getAttrs: (
          /**
           * @type {HTMLUnknownElement} - нода самого ProseMirror, ВНЕ рамок\
           *   custom-html-tag(имена которых с дефисом, shadowDOM и т.д.).\
           *   У этой ноды атрибуты как в .addAttributes(), node.tagName ===
           *   this.name (uppercase) и т.д.
           */ node
        ) => {
          const aligningClass = getAligningClass(node.classList);

          // console.log(
          //   '%c getAttrs ',
          //   'background:rgb(66, 219, 79); color:rgb(0, 0, 0)',
          //   { node },
          //   aligningClass
          // );

          return {
            // @ts-ignore
            src: node.src,
            class: aligningClass,
          };
        },
      },
      {
        tag: 'img',
        /**
         * если вокруг вставляемой картинки есть обёртки из тегов(не наши
         * обёртки, а при копировании с других сайтов), то контекст правила не
         * даст ему сработать, потому ЗАкомментил
         */
        // context: 'doc|section/',
        getAttrs: (/** @type {HTMLImageElement} */ node) => {
          const aligningClass = getAligningClass(node.classList);

          // console.log(
          //   '%c getAttrs raw image !!! ',
          //   'background:rgb(225, 240, 25); color:rgb(0, 0, 0)',
          //   node,
          //   aligningClass
          // );

          return {
            src: node.src,
            class: aligningClass,
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes, node }) {
    const aligningClass = getAligningClass(HTMLAttributes.class);

    // console.log(
    //   '%c toHTML ',
    //   'background:rgb(219, 66, 66); color:rgb(255, 255, 255)',
    //   {
    //     HTMLAttributes,
    //     attrs: node.attrs,
    //     options: this.options,
    //   }
    // );

    return [
      COMMANDS_NAMES.img,
      {
        src: HTMLAttributes.src,
        class: clsx(this.options.HTMLAttributes.class, aligningClass),
      },
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageReactRTE, {
      as: 'figure',
    });
  },
});
