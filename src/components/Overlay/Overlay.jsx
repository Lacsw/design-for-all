import './Overlay.css';

export default function Overlay({ onClick, customClass = '' }) {
  return <div className={`overlay ${customClass}`} onClick={onClick} />;
}
