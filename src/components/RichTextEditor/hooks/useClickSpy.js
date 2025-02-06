// @ts-check

import { useEffect } from 'react';

/** @type {AddEventListenerOptions} */
const handlerParams = {
  capture: true,
};

/** @param {import('@tiptap/core').Editor | null} editor */
export const useClickSpy = (editor) => {
  useEffect(() => {
    if (!editor) {
      return;
    }

    // /** @param {MouseEvent} event */
    // const handleClickOnLink = (event) => {
    //   event.preventDefault();
    //   event.stopImmediatePropagation();
    //   console.log('LIIIINK', event);
    // };

    /** @param {MouseEvent} event */
    const handleClick = (event) => {
      console.log('first', event);
      /** @type {EventTarget & HTMLElement} */
      // @ts-ignore
      const target = event.target;

      if (target.tagName === 'A') {
        console.log('!!!!!    target.tagName', target.tagName);
        event.preventDefault();
        /** @type {EventTarget & HTMLLinkElement} */
        // @ts-ignore
        const targetLink = target;

        // targetLink.hasL = true;

        // targetLink.addEventListener('click', handleClickOnLink, true);
      }
    };

    const editorElement = editor.view.dom;
    editorElement.addEventListener('click', handleClick);

    return () => {
      editorElement.removeEventListener('click', handleClick);
    };
  }, [editor]);
};
