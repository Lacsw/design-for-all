import ListItem from '@tiptap/extension-list-item';

/**
 * Переопределяем расширение, т.к у стандартного "Схема" запрещает установку
 * стилей
 *
 * @see https://tiptap.dev/docs/editor/extensions/custom-extensions/extend-existing#extend-existing-attributes
 * @see https://tiptap.dev/docs/editor/core-concepts/schema - что такое "Схема"
 */
export const ListItemCustom = ListItem.extend({
  addAttributes() {
    return {
      style: {
        default: null,
      },
      class: {
        default: null,
      },
    };
  },
});
