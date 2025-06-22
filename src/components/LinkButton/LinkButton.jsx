/* eslint-disable @typescript-eslint/no-unused-vars */
import { NavLink } from 'react-router-dom';

import './LinkButton.css';

export default function LinkButton({ children, to, icon, activeIcon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `link-button ${isActive ? 'link-button_active' : ''}`
      }
    >
      {({ isActive, isPending }) => (
        <>
          <img src={isActive ? activeIcon : icon} alt="Иконка" />
          {children}
        </>
      )}
    </NavLink>
  );
}
