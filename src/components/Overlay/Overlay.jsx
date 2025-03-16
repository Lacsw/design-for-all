import { useRef } from 'react';
import './Overlay.css';

export default function Overlay({
  onClick,
  customClass = '',
  children,
  zIndex,
  hoverDelay = 800, // задержка в мс
  disableHover = false, // если true, не использовать логику ховера
}) {
  const timerRef = useRef(null);

  const handleMouseEnter = () => {
    if (!disableHover && hoverDelay > 0) {
      timerRef.current = setTimeout(() => {
        onClick && onClick();
      }, hoverDelay);
    }
  };

  const handleMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  return (
    <div
      className={`overlay ${customClass}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ zIndex }}
    >
      {children && (
        <div className="overlay__content" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      )}
    </div>
  );
}
