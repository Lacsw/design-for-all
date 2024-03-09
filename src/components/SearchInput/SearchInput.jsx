import { useEffect, useRef, useState } from 'react';

import './SearchInput.css';
import closeBtn from 'images/close-btn.svg';
import loupe from 'images/loupe-icon.svg';

export default function SearchInput() {
  const [isShown, setIsShown] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    if (isShown) {
      inputRef.current.focus();
    }
  }, [isShown]);

  const handleLoupeClick = () => {
    setIsShown(true);
  };

  const handleCloseClick = () => {
    setIsShown(false);
  };

  return (
    <>
      {isShown ? (
        <div className="search-input">
          <input className="search-input__field" ref={inputRef}></input>
          <button
            className="search-input__close-btn"
            onClick={handleCloseClick}
          >
            <img src={closeBtn} alt="Кнопа сброса" />
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
