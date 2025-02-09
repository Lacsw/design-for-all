// @ts-check
import { goThroughLink } from '../extensions/link/helpers';

/** @type {import('@tiptap/core').EditorOptions['editorProps']} */
export const editorProps = {
  handleClickOn(view, pos, node, nodePos, event, direct) {
    if (view.editable) {
      /** @type {EventTarget & HTMLElement} */
      // @ts-ignore
      const target = event.target;

      const isLink = target.tagName === 'A';

      /*
          Добиваемся поведения: в режиме редактирования клики на ссылку не вызовут перехода.
          Но клик через MMB или ctrl+LMB переход сработает.
        */
      if (isLink && !event.ctrlKey && event.button !== 1) {
        event.preventDefault();
        return true;
      }

      if (isLink && event.button === 1) {
        goThroughLink({
          href: target.getAttribute('href'),
          target: target.getAttribute('target'),
          rel: target.getAttribute('rel'),
        });
      }
    }
  },
};
