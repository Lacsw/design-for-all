import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getLanguage, getCurrentTheme } from 'store/selectors';
import { changeLanguage, signInSuccess } from 'store/slices';
import './DropdownNavigation.css';
import ArrowBackIcon from 'components/icons/ArrowBackIcon/ArrowBackIcon';
import authApi from 'utils/api/auth';

export default function DropdownNavigation({
  options,
  type,
  titleIcon,
  title,
  size,
  sizeItem,
  paddingBottom,
  gap,
  resetSection,
}) {
  const [selectedOption] = useState(options[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const language = useSelector(getLanguage);
  const theme = useSelector(getCurrentTheme);
  const langSrc = options.find((item) => item.name === language)?.src;

  async function handleLogout() {
    authApi
      .logout()
      .then(() => {
        resetSection();
        dispatch(signInSuccess(null));
      })
      .catch((err) => console.log(err));
  }

  const handleOptionClick = (option) => {
    dispatch(changeLanguage(option));
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
            src={langSrc || selectedOption[theme] || selectedOption.src}
            alt={langSrc ? language : selectedOption.name}
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
                  ) : option.name === 'Выйти' ? (
                    <NavLink to={option.link} onClick={handleLogout}>
                      <img src={option.src} alt={option.name} />
                    </NavLink>
                  ) : (
                    <NavLink
                      to={option.link}
                      className={
                        window.location.hash === '#/author/new-article' &&
                        option.name === 'Написать статью'
                          ? 'hash_link'
                          : ''
                      }
                    >
                      <img src={option.src} alt={option.name} />
                    </NavLink>
                  )}
                </li>
              ))}
            {!type &&
              options
                .filter((option) => option.name !== language)
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
                      src={option[theme]}
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
