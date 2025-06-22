// @ts-check
import { useCallback, useEffect, useRef, useState } from 'react';
import { targetHeadings } from '../constants';

/** @type {import('./types').TUseArtNavigator} */
export const useArticleNavigator = ({ editorContainerRef }) => {
  /** Элемент <header /> - шапка сайта. */
  const headerElRef =
    /** @type {React.MutableRefObject<HTMLElement | null>} */ (useRef(null));

  // флаг принудительного рендера
  const [navigatorFlag, setNavigatorFlag] = useState(false);

  const numberateHeadings = useCallback(() => {
    if (editorContainerRef.current) {
      const selector = targetHeadings.map((i) => 'h' + i).join(',');
      const nodesList = editorContainerRef.current.querySelectorAll(selector);
      const headingList = Array.from(nodesList);
      headingList.forEach((el, idx) => {
        el.setAttribute('data-idx', String(idx));
      });
    }
  }, [editorContainerRef]);

  /** @type {import('components/RichTextEditor/types').TRteOnRealCreateProp} */
  const handleEditorCreation = useCallback(
    (_editor) => {
      numberateHeadings();
      setNavigatorFlag((prev) => !prev);
    },
    [numberateHeadings]
  );

  const handleEditorUpdate = useCallback(() => {
    numberateHeadings();
  }, [numberateHeadings]);

  useEffect(() => {
    headerElRef.current = document.querySelector('div#root header.header');
  }, []);

  return {
    navigatorFlag,
    headerElRef,
    handleEditorCreation,
    handleEditorUpdate,
  };
};
