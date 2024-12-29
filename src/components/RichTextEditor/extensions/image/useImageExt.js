import { Editor } from '@tiptap/react';
import { COMMANDS_NAMES } from 'components/RichTextEditor/helpers/constants';
import { useCallback, useState } from 'react';

/** @param {Editor} editor */
export const useImageExt = (editor) => {
  const [imgModalOpen, setImgModalOpen] = useState(false);
  const [directCb, setDirectCb] = useState();

  function handleImgModalClose() {
    setImgModalOpen(false);
  }

  function handleImgInserting(payload) {
    directCb(editor, payload);
    handleImgModalClose();
    editor.chain().focus().run();
  }

  /** @type {import('components/RichTextEditor/components/RteButton').TDRteButtonOnClickProp} */
  const handleAddImgBtnClick = useCallback((evt, directCb, editor) => {
    if (editor?.isActive(COMMANDS_NAMES.img)) {
      editor.chain().focus().run();
      return;
    }

    setDirectCb(() => directCb);
    setImgModalOpen(true);
  }, []);

  return {
    imgModalOpen,
    setImgModalOpen,
    handleAddImgBtnClick,
    handleImgInserting,
    handleImgModalClose,
  };
};
