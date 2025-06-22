// @ts-check
import { Box, Fade, IconButton, Modal, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearImgForShow, selectImgForShow } from 'store/slices/article';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { getImgByURL } from 'components/RichTextEditor/extensions/image/helpers';

const stubCb = () => null;

const StyledModal = styled(Modal)(() => {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '.container': {
      position: 'relative',

      '&:focus-visible': {
        outline: 'none',
      },
    },

    '.closing-btn': {
      position: 'absolute',
      top: '7px',
      right: '9px',
    },

    img: {
      borderRadius: '16px',
      width: '60vw',
      maxWidth: '1100px',
    },
  };
});

export const ImgShowingModal = () => {
  const dispatch = useDispatch();
  const imgForSHow = useSelector(selectImgForShow);

  const [dataUrl, setDataUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  console.log('dataUrl', dataUrl);

  useEffect(() => {
    if (imgForSHow) {
      getImgByURL({
        value: imgForSHow,
        setValue: stubCb,
        setIsLoading,
        setError: stubCb,
        onConfirm: setDataUrl,
      });
    }
  }, [imgForSHow]);

  const close = () => {
    dispatch(clearImgForShow());
  };

  return (
    <StyledModal open={!!dataUrl && imgForSHow} onClose={close}>
      <Fade in={imgForSHow}>
        <Box className="container">
          <IconButton className="closing-btn" onClick={close}>
            <CloseRoundedIcon />
          </IconButton>
          <img src={imgForSHow} alt="" />
        </Box>
      </Fade>
    </StyledModal>
  );
};
