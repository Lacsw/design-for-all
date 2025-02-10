// @ts-check
import Link, { isAllowedUri } from '@tiptap/extension-link';
import { Plugin, PluginKey, TextSelection } from '@tiptap/pm/state';

export const CustomLinkExtension = Link.extend({
  renderHTML({ HTMLAttributes }) {
    // prevent XSS attacks
    if (
      !this.options.isAllowedUri(HTMLAttributes.href, {
        defaultValidate: (href) => !!isAllowedUri(href, this.options.protocols),
        protocols: this.options.protocols,
        defaultProtocol: this.options.defaultProtocol,
      })
    ) {
      // strip out the href
      return [
        'a',
        {
          ...this.options.HTMLAttributes, // prohibit differents attrs values on links from other sites
          href: '',
        },
        0,
      ];
    }

    return [
      'a',
      {
        ...this.options.HTMLAttributes, // prohibit differents attrs values on links from other sites
        href: HTMLAttributes.href,
      },
      0,
    ];
  },

  // addProseMirrorPlugins() {
  //   return [
  //     new Plugin({
  //       key: new PluginKey('eventHandler'),
  //       props: {
  //         handleKeyDown(view, pos, event) {
  //           const { state } = view;
  //           const { selection } = state;
  //           const { from, to } = selection;

  //           let spaceCount = 0;

  //           // Проверяем, что нажата клавиша "пробел"
  //           if (event.key === ' ') {
  //             // Проверяем, находится ли каретка внутри марки "link"
  //             const marksAtCursor = state.doc.rangeHasMark(
  //               from,
  //               to,
  //               state.schema.marks.link
  //             );

  //             if (marksAtCursor) {
  //               spaceCount++; // Увеличиваем счётчик

  //               // Если "пробел" нажат дважды
  //               if (spaceCount === 1) {
  //                 // Находим конец марки
  //                 const resolvedPos = state.doc.resolve(to);
  //                 const endOfMark = resolvedPos.end();

  //                 // Перемещаем каретку за пределы марки
  //                 view.dispatch(
  //                   view.state.tr.setSelection(
  //                     TextSelection.create(view.state.doc, endOfMark)
  //                   )
  //                 );

  //                 spaceCount = 0; // Сбрасываем счётчик
  //                 event.preventDefault(); // Отменяем стандартное поведение
  //                 return true; // Предотвращаем дальнейшую обработку
  //               }
  //             } else {
  //               spaceCount = 0; // Сбрасываем счётчик, если каретка вне марки
  //             }
  //           } else {
  //             spaceCount = 0; // Сбрасываем счётчик при нажатии других клавиш
  //           }

  //           return false; // Продолжаем стандартную обработку
  //         },
  //       },
  //     }),
  //   ];
  // },
});
