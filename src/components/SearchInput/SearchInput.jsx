import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentTheme } from 'store/selectors';

import './SearchInput.css';
import closeBtn from 'images/close-btn.svg';
import closeBtnBlack from 'images/close-btn_black.svg';
import loupe from 'images/loupe-icon.svg';
import loupeLight from 'images/loupe-icon_white.svg';

export default function SearchInput({ onChange, onSearch, onResults, onOpen }) {
  const [isShown, setIsShown] = useState(false);
  const inputRef = useRef();
  const theme = useSelector(getCurrentTheme);

  useEffect(() => {
    if (isShown) {
      inputRef.current.focus();
    }
  }, [isShown]);

  const handleLoupeClick = () => {
    setIsShown(true);
    onSearch && onSearch(true);
    onOpen && onOpen(false);
  };

  const handleCloseClick = () => {
    setIsShown(false);
    onSearch && onSearch(false);
    onResults && onResults(null);
  };

  return (
    <>
      {isShown ? (
        <div className="search-input">
          <input
            className="search-input__field"
            ref={inputRef}
            onChange={onChange}
          ></input>
          <button
            className="search-input__close-btn"
            onClick={handleCloseClick}
          >
            <img src={theme === 'light' ? closeBtnBlack : closeBtn} alt="Кнопка сброса" />
          </button>
        </div>
      ) : (
        <button className="search-input__loupe" onClick={handleLoupeClick}>
          <img src={theme === 'light' ? loupeLight : loupe} alt="Иконка лупы" className="header__icon" />
        </button>
      )}
    </>
  );
}
