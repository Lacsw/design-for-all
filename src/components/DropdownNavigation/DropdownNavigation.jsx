import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function DropdownNavigation({ options, titleIcon, title, align = 'bottom', showName }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div
      className={`dropdown-navigation dropdown-navigation--${align}`}
      onMouseEnter={() => setIsDropdownOpen(true)}
      onMouseLeave={() => setIsDropdownOpen(false)}
    >
      <button className="dropdown-navigation__btn">
        <img src={titleIcon} alt={title} className="dropdown-navigation__icon" />
      </button>

      {isDropdownOpen && options.length > 1 && (
        <ul className="dropdown-navigation__menu">
          {options.map((option, i) => (
            <li key={i} className="dropdown-navigation__item">
              {option.link ? (
                <NavLink to={option.link} className="dropdown-navigation__link">
                  <img src={option.src} alt={option.name} />
                  {showName && <span>{option.name}</span>}
                </NavLink>
              ) : (
                <button onClick={option.onClick} className="dropdown-navigation__btn">
                  <img src={option.src} alt={option.name} />
                  {showName && <span>{option.name}</span>}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
