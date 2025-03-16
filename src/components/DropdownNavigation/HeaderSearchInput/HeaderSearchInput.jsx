import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentTheme } from 'store/selectors';
import Overlay from 'components/Overlay/Overlay';
import closeBtn from 'images/close-btn.svg';
import closeBtnBlack from 'images/close-btn_black.svg';
import loupe from 'images/loupe-icon.svg';
import loupeLight from 'images/loupe-icon_white.svg';
import './HeaderSearchInput.css';
import { useInteractiveManager } from 'utils/contexts/InteractiveManagerContext';

export default function HeaderSearchInput({
  id,
  onChange,
  isMobileVisible = false,
}) {
  const inputRef = useRef();
  const theme = useSelector(getCurrentTheme);
  const { activeComponent, openComponent, closeComponent } =
    useInteractiveManager();

  // Компонент открыт, если его id совпадает с активным
  const isShown = activeComponent === id;

  useEffect(() => {
    if (isShown && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isShown]);

  const handleLoupeClick = () => {
    openComponent(id);

  };

  const handleCloseClick = () => {
    closeComponent(id);
  
  };

  return (
    <>
      {isShown && (
        <>
          {isMobileVisible && (
            <Overlay
              onClick={handleCloseClick}
              customClass="overlay__mobile-search"
            />
          )}
          <div className="header-search-input active">
            <input
              className="header-search-input__field"
              ref={inputRef}
              onChange={onChange}
            />
            <button
              className="header-search-input__close-btn"
              onClick={handleCloseClick}
            >
              <img
                src={theme === 'light' ? closeBtnBlack : closeBtn}
                alt="Кнопка сброса"
              />
            </button>
          </div>
        </>
      )}
      <button
        className={`header-search-input__loupe ${
          isShown && !isMobileVisible ? 'header-search-input-hide' : ''
        }`}
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
