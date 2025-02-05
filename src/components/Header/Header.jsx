import './Header.css';

import {
  MainMenu,
  LanguageDropdown,
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
import { languageList, navigationOptionsList } from 'utils/constants';
import { useCallback, useEffect } from 'react';

export default function Header({ resetSection }) {
  const dispatch = useDispatch();
  const theme = useSelector(getCurrentTheme);

  // Установка темы, сохранённой persist-ом, при загрузке сайта
  useEffect(() => {
    /* без этого условия, если тема и так начальная,
      то в setTheme будет попытка удалить несуществющий тег style */
    if (theme !== 'dark') {
      dispatch(setTheme(theme));
    }
  }, [dispatch, theme]);

  const toggleTheme = useCallback(() => {
    if (theme === 'dark') {
      dispatch(setTheme('light'));
    } else {
      dispatch(setTheme('dark'));
    }
  }, [theme, dispatch]);

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="logo-link" onClick={resetSection}>
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
              title="Меню"
            />
          </li>
          <li>
            <LanguageDropdown
              options={languageList}
              theme={theme}
              title="Язык"
            />
          </li>
          {/* <li>
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
