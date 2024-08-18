import { useEffect, useRef, useState } from 'react';

import './SearchInput.css';
import closeBtn from 'images/close-btn.svg';
import loupe from 'images/loupe-icon.svg';

export default function SearchInput({ onChange, onSearch, onResults, onOpen }) {
  const [isShown, setIsShown] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    if (isShown) {
      inputRef.current.focus();
    }
  }, [isShown]);

  const handleLoupeClick = () => {
    setIsShown(true);
    onSearch(true);
    onOpen(false);
  };

  const handleCloseClick = () => {
    setIsShown(false);
    onSearch(false);
    onResults(null);
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
            <img src={closeBtn} alt="Кнопка сброса" />
          </button>
        </div>
      ) : (
        <button className="search-input__loupe" onClick={handleLoupeClick}>
          <img src={loupe} alt="Иконка лупы" className="header__icon" />
        </button>
      )}
    </>
  );
}
