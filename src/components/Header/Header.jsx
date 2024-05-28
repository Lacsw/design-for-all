import { useCallback, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import './Header.css';
import logo from 'images/logo.svg';
import loupe from 'images/loupe-icon.svg';
import accountDefaultIcon from 'images/account-icon.svg';
import siginInIcon from 'images/siginin-icon.svg';
import dropdownIconWhite from 'images/navigation/dropdown-icon-white.svg';
import {
  accountNavigationList,
  navigationOptionsList,
  languageList,
  currencyList,
} from 'utils/constants';
import { DropdownNavigation, AuthModal } from 'components';
import { getCurrentUser } from 'store/selectors';
import { ThemeContext } from 'styles/ThemeContext';

export default function Header() {
  const { theme, setTheme } = useContext(ThemeContext);

  const currentUser = useSelector(getCurrentUser);
  const [searchParams, setSearchParams] = useSearchParams();

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState(false);

  /* в шапке сайта при клике на иконку входа по ум. открывается
  авторизация, а не регистрация */
  const openAuthModal = () => {
    setSearchParams({ 'modal-auth': 'login' });
  };

  const deleteAuthModalParams = () => {
    if (searchParams.has('modal-auth')) {
      searchParams.delete('modal-auth');
      setSearchParams(searchParams);
    }
  };

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

  // обработка кликов на табы внутри самой модалки авторизации
  useEffect(() => {
    /* если открыть модалку и перейти на другую страницу нашего
    сайта (напр. на логотип кликнуть), то поисковый параметр становится false */
    if (authModalMode !== false) {
      setSearchParams({ 'modal-auth': authModalMode });
    }
  }, [authModalMode]);

  const toggleTheme = useCallback(() => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }, [setTheme, theme]);

  return (
    <header className="header">
      <div className="header__container">
        <a href="/">
          <img src={logo} alt="Логотип" className="header__logo" />
        </a>
        <ul className="header__icons-container">
          <li>
            <button className="header__icon-background">
              <img src={loupe} alt="Иконка лупы" className="header__icon" />
            </button>
          </li>
          <li>
            <button onClick={toggleTheme}>Смена темы. Текущая: {theme}</button>
          </li>
          <li>
            <DropdownNavigation
              options={navigationOptionsList}
              titleIcon={dropdownIconWhite}
              type="dropdownWithLinks"
              title="Меню"
            />
          </li>
          <li>
            <DropdownNavigation options={languageList} title="Язык" />
          </li>
          <li>
            <DropdownNavigation options={currencyList} title="Валюта" />
          </li>
          <li>
            {!currentUser ? (
              <button
                className="header__icon-background"
                onClick={openAuthModal}
              >
                <img src={siginInIcon} alt="войти" />
              </button>
            ) : (
              <DropdownNavigation
                options={accountNavigationList}
                titleIcon={currentUser.avatar || accountDefaultIcon}
                type="dropdownWithLinks"
                title="Профиль"
              />
            )}
          </li>
        </ul>
      </div>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={deleteAuthModalParams}
        modalMode={authModalMode}
        setModalMode={setAuthModalMode}
      />
    </header>
  );
}
