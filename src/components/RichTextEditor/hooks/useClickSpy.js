// @ts-check

import { useEffect, useState } from 'react';

/** @type {AddEventListenerOptions} */
// const handlerParams = {
//   capture: true,
// };

/**
 * @typedef TClickSpyProps
 * @type {object}
 * @property {import('@tiptap/core').Editor | null} editor
 */

/**
 * @typedef TClickSpyReturning
 * @type {object}
 * @property {boolean} isCtrlPressed Нажат ли контрл
 * @property {boolean} isMMBPressed Нажата ли средняя кнопка мыши
 */

/**
 * @param {TClickSpyProps} props
 * @returns {TClickSpyReturning}
 */
export const useClickSpy = ({ editor }) => {
  const [isCtrlPressed, setIsContrlPressed] = useState(false);
  const [isMMBPressed, setIsMMBPressed] = useState(false);

  useEffect(() => {
    if (!editor) {
      return;
    }

    /** @param {MouseEvent} event */
    const handleClick = (event) => {
      if (event.button === 1) {
        setIsMMBPressed(true);
      }
    };

    /** @param {MouseEvent} event */
    const handleMouseUp = (event) => {
      setIsMMBPressed(false);
    };

    /** @param {KeyboardEvent} event */
    const handleKeyDown = (event) => {
      if (event.ctrlKey) {
        setIsContrlPressed(true);
      }
    };

    /** @param {KeyboardEvent} event */
    const handleKeyUp = (event) => {
      if (event.key === 'Control') {
        setIsContrlPressed(false);
      }
    };

    const editorElement = editor.view.dom;

    editorElement.addEventListener('mousedown', handleClick);
    editorElement.addEventListener('mouseup', handleMouseUp);

    editorElement.addEventListener('keydown', handleKeyDown);
    editorElement.addEventListener('keyup', handleKeyUp);

    return () => {
      editorElement.removeEventListener('mousedown', handleClick);
      editorElement.removeEventListener('mouseup', handleMouseUp);

      editorElement.removeEventListener('keydown', handleKeyDown);
      editorElement.removeEventListener('keyup', handleKeyUp);
    };
  }, [editor]);

  return { isMMBPressed, isCtrlPressed };
};
