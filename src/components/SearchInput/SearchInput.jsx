import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentTheme } from 'store/slices/theme';
import { useTranslation } from 'react-i18next';
import { SEARCH_INPUT } from 'utils/translationKeys';
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
  const inputRef = useRef();
  const theme = useSelector(getCurrentTheme);
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  useEffect(() => {
    if (isInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInput]);

  const handleLoupeClick = () => {
    onSearch && onSearch(true);
    if (!isMobile) {
      onOpen && onOpen(false);
    }
  };

  const handleCloseClick = () => {
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
      <div className={`search-input ${!isInput && `hide`}`}>
        <input
          className="search-input__field"
          ref={inputRef}
          onChange={onChange}
          placeholder={t(SEARCH_INPUT.PLACEHOLDER)}
          aria-label={t(SEARCH_INPUT.PLACEHOLDER)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              handleCloseClick();
            }
          }}
        />
        <button
          className="search-input__close-btn"
          onClick={handleClearAndClose}
          aria-label={t(SEARCH_INPUT.RESET_BUTTON)}
        >
          <img
            src={theme === 'light' ? closeBtnBlack : closeBtn}
            alt={t(SEARCH_INPUT.RESET_BUTTON)}
          />
        </button>
      </div>
      {!isInput && (
        <button
          className="search-input__loupe"
          onClick={handleLoupeClick}
          aria-label={t(SEARCH_INPUT.ICON_ALT)}
        >
          <img
            src={theme === 'light' ? loupeLight : loupe}
            alt={t(SEARCH_INPUT.ICON_ALT)}
            className="header__icon"
          />
        </button>
      )}
    </>
  );
}
