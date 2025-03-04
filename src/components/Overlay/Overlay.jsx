import './Overlay.css';

export default function Overlay({ onClick, customClass = '', children, zIndex }) {
  return (
    <div className={`overlay ${customClass}`} onClick={onClick} style={{ zIndex }}   >
      <div
      className="overlay__content" onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}
