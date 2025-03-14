import { NavLink } from 'react-router-dom';
import Overlay from 'components/Overlay/Overlay';
import './DropdownNavigation.css';
import { useInteractiveManager } from 'utils/contexts/InteractiveManagerContext';

export default function DropdownNavigation({
  id,
  options,
  titleIcon,
  title,
  align = 'bottom',
  showName,
  theme,
  sizeIcon,
  customBottomPadding,
}) {
  const { activeComponent, openComponent, closeComponent } =
    useInteractiveManager();
  const isOpen = activeComponent === id;

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
    closeComponent(id);
  };

  const handleMouseEnter = () => openComponent(id);
  const handleMouseLeave = () => closeComponent(id);

  const handleToggle = () => {
    if (isOpen) {
      closeComponent(id);
    } else {
      openComponent(id);
    }
  };

  return (
    <div
      className={`dropdown-navigation dropdown-navigation--${align}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="dropdown-navigation__btn" onClick={handleToggle}>
        <img
          src={titleIcon}
          alt={title}
          className={`dropdown-navigation__item-img dropdown-navigation__item-img_${sizeIcon}`}
        />
      </button>
      {options && options.length > 1 && (
        <div
          className={`dropdown-navigation__container ${isOpen ? 'show' : ''}`}
        >
          <Overlay
            onClick={() => closeComponent(id)}
            customClass="overlay__header"
          />
          {showName && (
            <ul
              className={`dropdown-navigation__items dropdown-navigation__text-items ${
                isOpen ? 'show' : ''
              }`}
            >
              {options.map((option, i) => (
                <li key={i} className="dropdown-navigation__text-item">
                  {option.link ? (
                    <NavLink
                      to={option.link}
                      className="dropdown-navigation__links"
                      onClick={() => handleOptionClick(option)}
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
                    onClick={() => handleOptionClick(option)}
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
