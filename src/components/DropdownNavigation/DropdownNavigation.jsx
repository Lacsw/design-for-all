import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './DropdownNavigation.css';

export default function DropdownNavigation({
  options,
  titleIcon,
  title,
  align = 'bottom',
  showName,
  theme,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div
      className={`dropdown-navigation dropdown-navigation--${align}`}
      onMouseEnter={() => setIsDropdownOpen(true)}
      onMouseLeave={() => setIsDropdownOpen(false)}
    >
      <button className="dropdown-navigation__btn">
        <img
          src={titleIcon}
          alt={title}
          className="dropdown-navigation__icon"
        />
      </button>

      {isDropdownOpen && options.length > 1 && (
        <div className="dropdown-navigation__container">
          {showName && (
            <ul className="dropdown-navigation__items dropdown-navigation__text-items">
              {options.map((option, i) => (
                <li key={i} className="dropdown-navigation__text-item">
                  {option.link ? (
                    <NavLink
                      to={option.link}
                      className="dropdown-navigation__links"
                    >
                      <span className="dropdown-navigation__item-text">
                        {option.name}
                      </span>
                    </NavLink>
                  ) : (
                    <button
                      onClick={option.onClick}
                      className="dropdown-navigation__btns"
                    >
                      <span className="dropdown-navigation__item-text">
                        {option.name}
                      </span>
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
          <ul className="dropdown-navigation__items dropdown-navigation__icon-items">
            {options.map((option, i) => (
              <li key={i} className="dropdown-navigation__icon-item">
                {option.link ? (
                  <NavLink
                    to={option.link}
                    className="dropdown-navigation__links"
                  >
                    <img
                      src={
                        option.src.dark && option.src.light
                          ? theme === 'dark'
                            ? option.src.dark
                            : option.src.light
                          : option.src
                      }
                      alt={option.name}
                      className="dropdown-navigation__item-img"
                    />
                  </NavLink>
                ) : (
                  <button
                    onClick={option.onClick}
                    className="dropdown-navigation__btns"
                  >
                    <img
                      src={
                        option.src.dark && option.src.light
                          ? theme === 'dark'
                            ? option.src.dark
                            : option.src.light
                          : option.src
                      }
                      alt={option.name}
                      className="dropdown-navigation__item-img"
                    />
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
