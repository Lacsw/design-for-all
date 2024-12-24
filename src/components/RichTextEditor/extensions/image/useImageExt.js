import { useCallback, useState } from 'react';

export const useImageExt = (editor) => {
  const [imgModalOpen, setImgModalOpen] = useState(false);
  const [directCb, setDirectCb] = useState(() => () => undefined);

  function handleImgModalClose() {
    setImgModalOpen(false);
  }

  function handleImgInserting(payload) {
    console.log('handleImgInserting', payload, editor, directCb);
    directCb(editor, payload);
  }

  const handleAddImgBtnClick = useCallback((evt, directCb, editor) => {
    console.log('handleAddImgBtnClick', evt, directCb, editor);
    setDirectCb(directCb);
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
