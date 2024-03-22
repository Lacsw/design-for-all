import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './DropdownNavigation.css';
import ArrowBackIcon from 'components/icons/ArrowBackIcon/ArrowBackIcon';

export default function DropdownNavigation({
  options,
  type,
  titleIcon,
  title,
  size,
  sizeItem,
  padding,
}) {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const handleOptionClick = (option) => {
    const currentOption = options.filter((i) => i.name === option);
    setSelectedOption(...currentOption);
  };

  const isClassName = (className) => {
    const newClass = className;
    if (
      padding === 's' &&
      className !== 'dropdown-navigation__title-icon-white'
    ) {
      return newClass + ` ${className}_padding_s`;
    }
    if (size === 'm' && title !== 'Редактировать') {
      return newClass + ` ${className}_size_m`;
    }
    if (size === 'm' && title === 'Редактировать') {
      if (className === 'dropdown-navigation__title-icon-white') {
        return newClass + ` ${className}_size_m`;
      }
      if (
        className === 'dropdown-navigation__image' &&
        selectedOption.name === 'menu'
      ) {
        return newClass + ` ${className}_size_xs`;
      }
      if (
        className === 'dropdown-navigation__image' &&
        selectedOption.name !== 'menu'
      ) {
        return newClass + ` ${className}_size_m`;
      }
      if (className === 'dropdown-navigation__menu-list') {
        return newClass + ` ${className}_size_m`;
      }
    }
    if (
      sizeItem === 's' &&
      className !== 'dropdown-navigation__title-icon-white'
    ) {
      return newClass + ` ${className}_sizeItem_s`;
    }
    if (options.length === 1) {
      return newClass + ` ${className}_disabled`;
    }
    return newClass;
  };

  return (
    <div
      className="dropdown-navigation"
      onMouseEnter={() => setIsDropdownOpen(true)}
      onMouseLeave={() => {
        setIsDropdownOpen(false);
        setIsSideMenuOpen(false);
      }}
    >
      <div className={isClassName('dropdown-navigation__title-icon-white')}>
        {type === 'dropdownWithLinks' ? (
          <img
            src={titleIcon}
            alt={title}
            className="dropdown-navigation__title-image"
          />
        ) : (
          <img
            src={selectedOption.src}
            alt={selectedOption.name}
            className={isClassName('dropdown-navigation__image')}
          />
        )}
      </div>

      {isDropdownOpen && options.length !== 1 ? (
        <>
          <ul className={isClassName('dropdown-navigation__menu-list')}>
            {type === 'dropdownWithLinks' &&
              options.map((option, i) => (
                <li
                  key={i}
                  onMouseEnter={() => {
                    setIsSideMenuOpen(true);
                  }}
                >
                  {option.name === 'Свернуть' ? (
                    <div
                      className="dropdown-navigation__wrap-container"
                      onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
                    >
                      <ArrowBackIcon isOpen={isSideMenuOpen} />
                    </div>
                  ) : (
                    <NavLink to={option.link}>
                      <img src={option.src} alt={option.name} />
                    </NavLink>
                  )}
                </li>
              ))}
            {type !== 'dropdownWithLinks' &&
              options
                .filter((option) => option !== selectedOption)
                .map((option, i) => (
                  <li key={i}>
                    <img
                      className={isClassName(
                        'dropdown-navigation__menu-list-item'
                      )}
                      src={option.src}
                      alt={option.name}
                      onClick={() => handleOptionClick(option.name)}
                    />
                  </li>
                ))}
          </ul>
          {isSideMenuOpen ? (
            <ul className="dropdown-navigation__sidebar">
              {options.map((option, i) => (
                <li key={i} className="dropdown-navigation__sidebar-list-item">
                  {option.name}
                </li>
              ))}
            </ul>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
