// @ts-check
import { setImgForShow } from 'store/slices/article';
import { store } from '../../../store';
import { findLinkInParents, goThroughLink } from '../extensions/link/helpers';
import { isActive /*isMarkActive*/ } from '@tiptap/core';

let spaceCount = 0;

/** @type {import('@tiptap/core').EditorOptions['editorProps']} */
export const editorProps = {
  handleClickOn(view, pos, node, nodePos, event, _direct) {
    /** - @type {EventTarget & HTMLElement} */
    // @ts-ignore
    const target = event.target;

    if (target instanceof HTMLImageElement && target.src) {
      store.dispatch(setImgForShow(target.src));
    }

    if (view.editable) {
      /**
       * @type {EventTarget & HTMLElement} Может быть как реальной ссылкой, так
       *   и стилизующим тегом или др. кастомной маркой стиля.
       */
      // @ts-ignore
      const target = event.target;

      const isLink = target.tagName === 'A' || isActive(view.state, 'link');
      const linkEl = isLink
        ? findLinkInParents(target, 5, 'rte__editor')
        : null;

      /*
          Добиваемся поведения: в режиме редактирования клики на ссылку не вызовут перехода.
          Но клик через MMB или ctrl+LMB переход сработает.
        */
      if (isLink && !event.ctrlKey && event.button !== 1) {
        event.preventDefault();
        return true;
      }

      if (isLink && event.button === 1 && linkEl) {
        goThroughLink({
          href: linkEl.getAttribute('href') || '',
          target: linkEl.getAttribute('target') || '',
          rel: linkEl.getAttribute('rel') || '',
        });
      }
    }
  },

  handleKeyDown(view, event) {
    const { state } = view;
    const { selection } = state;
    const { from, to } = selection;

    if (event.key === ' ') {
      const isLink = state.doc.rangeHasMark(
        from - 1,
        to,
        state.schema.marks.link
      );

      // const nextIsLink = state.doc.rangeHasMark(
      //   from,
      //   to + 1,
      //   state.schema.marks.link
      // );
      // console.log(isLink, nextIsLink);

      if (isLink) {
        spaceCount++;

        if (spaceCount === 2) {
          event.preventDefault();

          const tr = view.state.tr;
          const textNode = state.schema.text(' ');
          tr.replaceWith(to - 1, to, textNode);
          view.dispatch(tr);

          spaceCount = 0;
          return true;
        }
      } else {
        spaceCount = 0;
      }
    } else {
      spaceCount = 0;
    }

    return false;
  },
};
