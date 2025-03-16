import { Link, useLocation } from 'react-router-dom';

import './LinkButton.css';export default function HashButton({
  onClick,
  children,
  to,
  icon,
  activeIcon,
  kit,
}) {
  const { hash } = useLocation();
  const isMatch = kit?.includes(hash);
  return (
    <Link
      to={to}
      className={`hash-button ${
        isMatch || (to !== '/' && hash.includes(to)) ? 'hash-button_active' : ''
      }`}
      onClick={onClick}
    >
      <img src={hash === to || isMatch ? activeIcon : icon} alt="Иконка" />
      {children}
    </Link>
  );
}