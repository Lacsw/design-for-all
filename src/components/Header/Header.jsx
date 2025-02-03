import {
  MainMenu,
  LanguageDropdown,
  CurrencyDropdown,
  UserDropdown,
  SearchInput,
} from 'components';
import { Link } from 'react-router-dom';
import logo from 'images/logo.svg';

import logoBlack from 'images/logo-black.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentTheme } from 'store/selectors';
import { setTheme } from 'store/middlewares';
import dotsIcon from 'images/dropdowns/three-dots.svg';
import { navigationOptionsList } from 'utils/constants';


export default function Header() {
  const dispatch = useDispatch();
  const theme = useSelector(getCurrentTheme);

  const toggleTheme = () => {
    dispatch(setTheme(theme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo-link">
          <img
            src={theme === 'dark' ? logo : logoBlack}
            alt="Логотип"
            className="header__logo"
          />
        </Link>
        <button onClick={toggleTheme}>Тема</button>
        <ul className="header__icons-container">
          <li>
            <SearchInput />
          </li>
          <li>
            <MainMenu options={navigationOptionsList} titleIcon={dotsIcon}/>
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
