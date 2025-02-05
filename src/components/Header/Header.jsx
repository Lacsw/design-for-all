import './Header.css';
import { Link, useSearchParams } from 'react-router-dom';
import {
  MainMenu,
  LanguageDropdown,
  CurrencyDropdown,
  SearchInput,
  AuthModal,
} from 'components';

import logo from 'images/logo.svg';
import dropdownIconWhite from 'images/navigation/dropdown-icon-white.svg';
import dropdownIconBlack from 'images/navigation/dropdown-icon-black.svg';
import logoBlack from 'images/logo-black.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentTheme, getCurrentUser } from 'store/selectors';
import { setTheme } from 'store/middlewares';
import {
  accountNavigationList,
  adminNavList,
  currencyList,
  languageList,
  navigationOptionsList,
} from 'utils/constants';
import { useCallback, useEffect, useState } from 'react';
import LogoutButton from 'components/DropdownNavigation/LogoutButton/LogoutButton';
import UserDropdown from 'components/DropdownNavigation/UserDropdown';
import accountDefaultIcon from 'images/admin/avatar_default.svg';


export default function Header({ resetSection }) {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const theme = useSelector(getCurrentTheme);

  const currentUser = useSelector(getCurrentUser);
  const isAdmin =
    currentUser?.role === 'super_admin' || currentUser?.role === 'admin';
  /* в шапке сайта при клике на иконку входа по ум. открывается
  авторизация, а не регистрация */

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState(false);

  const openAuthModal = () => {
    setSearchParams({ 'modal-auth': 'login' });
  };

  function setModalParams(mode = false) {
    setAuthModalMode(mode);
    if (mode) {
      setSearchParams({ 'modal-auth': mode });
    } else {
      setSearchParams({});
    }
  }

  useEffect(() => {
    const authModalMode = searchParams.get('modal-auth');
    if (authModalMode && authModalMode === 'login') {
      setAuthModalMode(authModalMode);
      setIsAuthModalOpen(true);
    } else if (authModalMode && authModalMode === 'signUp') {
      setAuthModalMode(authModalMode);
      setIsAuthModalOpen(true);
    } else {
      setIsAuthModalOpen(false);
    }
  }, [searchParams]);
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
          <li>
            <CurrencyDropdown
              options={currencyList}
              theme={theme}
              title="Валюта"
            />
          </li>
          <li>
            {!currentUser ? (
              <LogoutButton openAuthModal={openAuthModal} />
            ) : (
              <UserDropdown
                resetSection={resetSection}
                options={isAdmin ? adminNavList : accountNavigationList}
                titleIcon={ theme === 'light' ? dropdownIconBlack : dropdownIconWhite}
                type="dropdownWithLinks"
                title="Профиль"
                currentUser={currentUser}
                theme={theme}
              />
            )}
          </li>
        </ul>
      </div>
      <AuthModal
        isOpen={isAuthModalOpen}
        onChange={setModalParams}
        modalMode={authModalMode}
      />
    </header>
  );
}
