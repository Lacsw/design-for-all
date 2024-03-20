import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './DropdownNavigation.css';
import ArrowBackIcon from '../icons/ArrowBackIcon';

export default function DropdownNavigation({
  options,
  type,
  titleIcon,
  title,
  size,
  sizeItem,
}) {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const handleOptionClick = (option) => {
    const currentOption = options.filter((i) => i.name === option);
    setSelectedOption(...currentOption);
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
      <div
        className={`dropdown-navigation__title-icon-white
       ${size === 'm' ? 'dropdown-navigation__title-icon-white_size_m' : ''}
       ${
         options.length === 1
           ? 'dropdown-navigation__title-icon-white_disabled'
           : ''
       }
       `}
      >
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
            className={`dropdown-navigation__image 
            ${
              size === 'm' || sizeItem === 'm'
                ? 'dropdown-navigation__image_size_m'
                : ''
            } `}
          />
        )}
      </div>

      {isDropdownOpen && options.length !== 1 ? (
        <>
          <ul
            className={`dropdown-navigation__menu-list 
          ${size === 'm' ? 'dropdown-navigation__menu-list_size_m' : ''}
          ${
            size === 'm-smallPadding'
              ? 'dropdown-navigation__menu-list_size_m-smallPadding'
              : ''
          }`}
          >
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
                      <ArrowBackIcon
                        className={
                          isSideMenuOpen
                            ? 'dropdown-navigation__hide-button'
                            : 'dropdown-navigation__hide-button_closed'
                        }
                      />
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
                      className={`dropdown-navigation__menu-list-item ${
                        sizeItem === 'm'
                          ? 'dropdown-navigation__menu-list-item_size_m'
                          : ''
                      }`}
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
