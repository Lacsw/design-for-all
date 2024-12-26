import { useCallback, useState } from 'react';

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

  const handleAddImgBtnClick = useCallback((evt, directCb, editor) => {
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
