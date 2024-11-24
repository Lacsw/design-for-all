import ImageRTE from '@tiptap/extension-image';
import clsx from 'clsx';

export const ImageCustom = ImageRTE.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      class: {
        default: 'justify',
      },
    };
  },
  renderHTML({ HTMLAttributes }) {
    console.log('HTMLAttributes', HTMLAttributes);
    console.log('this', this);
    return [
      'div',
      { class: clsx(this.options.HTMLAttributes.class, HTMLAttributes.class) },
      ['img', { ...HTMLAttributes, class: null }, 0],
    ];
  },
});
