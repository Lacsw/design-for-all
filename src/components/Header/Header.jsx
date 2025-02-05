import './Header.css';

import {
  MainMenu,
  // LanguageDropdown,
  // CurrencyDropdown,
  // UserDropdown,
  SearchInput,
} from 'components';
import { Link } from 'react-router-dom';
import logo from 'images/logo.svg';
import dropdownIconWhite from 'images/navigation/dropdown-icon-white.svg';
import dropdownIconBlack from 'images/navigation/dropdown-icon-black.svg';
import logoBlack from 'images/logo-black.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentTheme } from 'store/selectors';
import { setTheme } from 'store/middlewares';
import { navigationOptionsList } from 'utils/constants';

export default function Header() {
  const dispatch = useDispatch();
  const theme = useSelector(getCurrentTheme);

  const toggleTheme = () => {
    dispatch(setTheme(theme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="logo-link">
          <img
            src={theme === 'dark' ? logo : logoBlack}
            alt="Логотип"
            className="header__logo"
          />
        </Link>
        <ul className="header__navigation">
          <li>
            <SearchInput />
          </li>
          <li>
            <MainMenu
              options={navigationOptionsList}
              titleIcon={
                theme === 'light' ? dropdownIconBlack : dropdownIconWhite
              }
              toggleTheme={toggleTheme}
              theme={theme}
            />
          </li>
          {/* <li>
            <LanguageDropdown />
          </li>
          <li>
            <CurrencyDropdown />
          </li>
          <li>
            <UserDropdown />
          </li> */}
        </ul>
      </div>
    </header>
  );
}
