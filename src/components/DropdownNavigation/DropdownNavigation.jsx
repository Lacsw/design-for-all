import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './DropdownNavigation.css';
import { useIsMobile } from 'utils/hooks/useIsMobile';
import Overlay from 'components/Overlay/Overlay';

export default function DropdownNavigation({
  options,
  titleIcon,
  title,
  align = 'bottom',
  showName,
  theme,
  sizeIcon,
  customBottomPadding,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isMobile = useIsMobile();

  const shouldRenderDropdown = options && options.length > 1;

  const getIconSrc = (option) => {
    if (typeof option.src === 'object' && option.src !== null) {
      return theme === 'dark' ? option.src.dark : option.src.light;
    }
    return option.src;
  };

  const handleOptionClick = (option) => {
    if (option.onClick) {
      option.onClick();
    }
    if (isMobile && option.closeOnClick) {
      setIsDropdownOpen(false);
    }
  };

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
          className={`dropdown-navigation__item-img dropdown-navigation__item-img_${sizeIcon}`}
        />
      </button>

      {shouldRenderDropdown && (
        <div
          className={`dropdown-navigation__container ${
            isDropdownOpen ? 'show' : ''
          }`}
        >
          <Overlay
            onClick={() => setIsDropdownOpen(false)}
            customClass="overlay__header"
          />
          {showName && (
            <ul
              className={`dropdown-navigation__items dropdown-navigation__text-items ${
                isDropdownOpen ? 'show' : ''
              }`}
            >
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
                      onClick={() => handleOptionClick(option)}
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

          <ul
            className={`dropdown-navigation__items dropdown-navigation__icon-items dropdown-navigation__icon-items_${customBottomPadding}`}
          >
            {options.map((option, i) => (
              <li key={i} className="dropdown-navigation__icon-item">
                {option.link ? (
                  <NavLink
                    to={option.link}
                    className="dropdown-navigation__links"
                  >
                    <img
                      src={getIconSrc(option)}
                      alt={option.name}
                      className="dropdown-navigation__item-img"
                    />
                  </NavLink>
                ) : (
                  <button
                    onClick={() => handleOptionClick(option)}
                    className="dropdown-navigation__btns"
                  >
                    <img
                      src={getIconSrc(option)}
                      alt={option.name}
                      className={`dropdown-navigation__item-img dropdown-navigation__item-img_${sizeIcon}`}
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
