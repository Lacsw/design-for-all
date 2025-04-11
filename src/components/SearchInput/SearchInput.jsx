import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentTheme } from 'store/slices/theme';

import './SearchInput.css';
import closeBtn from 'images/close-btn.svg';
import closeBtnBlack from 'images/close-btn_black.svg';
import loupe from 'images/loupe-icon.svg';
import loupeLight from 'images/loupe-icon_white.svg';
import { useIsMobile } from 'utils/hooks/useIsMobile';

export default function SearchInput({
  isInput,
  onChange,
  onSearch,
  onResults,
  onOpen,
}) {
  const [isShown, setIsShown] = useState(false);
  const inputRef = useRef();
  const theme = useSelector(getCurrentTheme);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isShown) {
      inputRef.current.focus();
    }
  }, [isShown]);

  useEffect(() => {
    if (!isInput) {
      setIsShown(false);
    }
  }, [isInput]);

  const handleLoupeClick = () => {
    setIsShown(true);
    onSearch && onSearch(true);
    if (!isMobile) {
      onOpen && onOpen(false);
    }
  };

  const handleCloseClick = () => {
    setIsShown(false);
    onSearch && onSearch(false);
    onResults && onResults(null);
  };

  const handleClearAndClose = () => {
    if (inputRef.current && inputRef.current.value !== '') {
      inputRef.current.value = '';
      onResults && onResults(null);
      onChange && onChange({ target: { value: '' } });
      return;
    }

    handleCloseClick();
  };

  return (
    <>
      <div className={`search-input ${!isShown && `hide`}`}>
        <input
          className="search-input__field"
          ref={inputRef}
          onChange={onChange}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              handleCloseClick();
            }
          }}
        ></input>
        <button
          className="search-input__close-btn"
          onClick={handleClearAndClose}
        >
          <img
            src={theme === 'light' ? closeBtnBlack : closeBtn}
            alt="Кнопка сброса"
          />
        </button>
      </div>
      <button
        className={`search-input__loupe ${isShown && `hide`}`}
        onClick={isShown ? handleCloseClick : handleLoupeClick}
      >
        <img
          src={theme === 'light' ? loupeLight : loupe}
          alt="Иконка лупы"
          className="header__icon"
        />
      </button>
    </>
  );
}
