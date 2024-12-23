import { useCallback, useState } from 'react';

export const useImageExt = () => {
  const [imgModalOpen, setImgModalOpen] = useState(false);

  function handleImgModalClose() {
    setImgModalOpen(false);
  }

  function handleImgInserting() {}

  const handleAddImgBtnClick = useCallback((evt) => {
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
