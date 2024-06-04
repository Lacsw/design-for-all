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
  paddingBottom,
  gap,
}) {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const handleOptionClick = (option) => {
    const currentOption = options.filter((i) => i.name === option);
    setSelectedOption(...currentOption);
  };

  const isClassNameTitleWhite = (className) => {
    if (size) {
      return className + ` ${className}_size_${size}`;
    }
    if (options.length === 1) {
      return className + ` ${className}_disabled`;
    }
    return className;
  };

  const isClassNameNavigationImage = (className) => {
    if (selectedOption.name === 'menu') {
      return className + ` ${className}_sizeItem_xs`;
    }
    if (sizeItem) {
      return className + ` ${className}_sizeItem_${sizeItem}`;
    }
    return className;
  };

  const isClassNameList = (className) => {
    let newClass;
    if (paddingBottom) {
      newClass = className + ` ${className}_paddingBottom_${paddingBottom}`;
    }
    if (size && newClass !== undefined) {
      newClass = newClass + ` ${className}_size_${size}`;
    }
    if (gap && newClass !== undefined) {
      newClass = newClass + ` ${className}_gap_${gap}`;
    }
    if (newClass !== undefined) {
      return newClass;
    } else {
      return className;
    }
  };

  const isClassNameListItem = (className) => {
    if (sizeItem) {
      return className + ` ${className}_sizeItem_${sizeItem}`;
    }
    return className;
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
        className={isClassNameTitleWhite(
          'dropdown-navigation__title-icon-white'
        )}
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
            className={isClassNameNavigationImage('dropdown-navigation__image')}
          />
        )}
      </div>

      {isDropdownOpen && options.length !== 1 ? (
        <>
          <ul className={isClassNameList('dropdown-navigation__menu-list')}>
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
            {!type &&
              options
                .filter((option) => option !== selectedOption)
                .map((option, i) => (
                  <li key={i} className="dropdown-navigation__menu-item">
                    <img
                      className={isClassNameListItem(
                        'dropdown-navigation__menu-list-item'
                      )}
                      src={option.src}
                      alt={option.name}
                      onClick={() => handleOptionClick(option.name)}
                    />
                  </li>
                ))}
            {type === 'dropdownWithTools' &&
              options
                .filter((option) => option !== selectedOption)
                .map((option, i) => (
                  <li key={i} className="dropdown-navigation__menu-item">
                    <img
                      className={isClassNameListItem(
                        'dropdown-navigation__menu-list-item'
                      )}
                      src={option.src}
                      alt={option.name}
                      onClick={() => console.log(option.name)}
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
