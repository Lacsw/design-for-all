import { Button } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';

import './Header.css';
import logo from 'images/logo.svg';
import logoBlack from 'images/logo-black.svg';
import accountDefaultIcon from 'images/account-icon.svg';
import siginInIcon from 'images/siginin-icon.svg';
import siginInIconWhite from 'images/siginin-icon_white.svg';
import dropdownIconWhite from 'images/navigation/dropdown-icon-white.svg';
import dropdownIconBlack from 'images/navigation/dropdown-icon-black.svg';
import {
  accountNavigationList,
  navigationOptionsList,
  adminNavList,
  languageList,
  currencyList,
} from 'utils/constants';
import { DropdownNavigation, AuthModal, SearchInput } from 'components';
import { getCurrentTheme, getCurrentUser } from 'store/selectors';
import { setTheme } from 'store/middlewares';

export default function Header({ resetSection }) {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const theme = useSelector(getCurrentTheme);

  const currentUser = useSelector(getCurrentUser);
  const isAdmin = currentUser?.role === 'super_admin' || currentUser?.role === 'admin';
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState(false);

  /* в шапке сайта при клике на иконку входа по ум. открывается
  авторизация, а не регистрация */
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
        <ul className="header__icons-container">
          <li>
            <SearchInput />
          </li>
          <li>
            <Button variant="contained" onClick={toggleTheme}>
              Смена темы. Текущая: {theme}
            </Button>
          </li>
          <li>
            <DropdownNavigation
              options={navigationOptionsList}
              titleIcon={
                theme === 'light' ? dropdownIconBlack : dropdownIconWhite
              }
              type="dropdownWithLinks"
              title="Меню"
            />
          </li>
          <li>
            <DropdownNavigation
              options={languageList}
              title="Язык"
              paddingBottom="5"
              size="m"
            />
          </li>
          <li>
            <DropdownNavigation
              options={currencyList}
              title="Валюта"
              sizeItem="s"
            />
          </li>
          <li>
            {!currentUser ? (
              <button
                className="header__icon-background"
                onClick={openAuthModal}
              >
                <img
                  src={theme === 'dark' ? siginInIcon : siginInIconWhite}
                  alt="войти"
                />
              </button>
            ) : (
              <DropdownNavigation
                options={isAdmin ? adminNavList : accountNavigationList}
                titleIcon={currentUser.avatar || accountDefaultIcon}
                type="dropdownWithLinks"
                title="Профиль"
                resetSection={resetSection}
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
