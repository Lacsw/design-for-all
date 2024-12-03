import { Link, useLocation } from 'react-router-dom';

import './LinkButton.css';

export default function HashButton({ children, to, icon, activeIcon }) {
  const { hash } = useLocation();
  return (
    <Link
      to={to}
      className={`hash-button ${to !== '/' && hash.includes(to) ? 'hash-button_active' : ''}`}
    >
      <img src={hash === to ? activeIcon : icon} alt="Иконка" />
      {children}
    </Link>
  );
}
