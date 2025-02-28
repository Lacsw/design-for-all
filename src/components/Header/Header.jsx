import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';

import './Header.css';
import {
  MainMenu,
  LanguageDropdown,
  CurrencyDropdown,
  SearchInput,
  AuthModal,
  UserDropdown,
  LoginButton,
} from 'components';

import { getCurrentTheme, getCurrentUser } from 'store/selectors';
import { setTheme } from 'store/middlewares';

import {
  accountNavigationList,
  adminNavList,
  currencyList,
  languageList,
  navigationOptionsList,
} from 'utils/constants';

import logo from 'images/logo.svg';
import dropdownIconWhite from 'images/navigation/dropdown-icon-white.svg';
import dropdownIconBlack from 'images/navigation/dropdown-icon-black.svg';
import logoBlack from 'images/logo-black.svg';
import { useSessionTimeout } from 'utils/hooks/useSessionTimeout';
import authApi from 'utils/api/auth'; // если выход реализован через API
import { signOut } from 'store/slices';

export default function Header({ resetSection }) {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const theme = useSelector(getCurrentTheme);

  const currentUser = useSelector(getCurrentUser);
  const isAdmin =
    currentUser?.role === 'super_admin' || currentUser?.role === 'admin';

  // Условие, при котором срабатывать таймаут:
  const shouldTimeout = isAdmin;

  // Функция, которая вызывается по истечении таймаута.
  const handleTimeout = async (dispatch) => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
    dispatch(signOut());
    // После выхода вызывается окно авторизации.
    openAuthModal();
  };

  // Хук для установки
  useSessionTimeout({
    timeout: 3600000, // 1 час
    shouldTimeout,
    onTimeout: handleTimeout,
  });

  const [authModal, setAuthModal] = useState({ isOpen: false, mode: null });

  /* в шапке сайта при клике на иконку входа по ум. открывается
  авторизация, а не регистрация */

  const openAuthModal = () => {
    setSearchParams({ 'modal-auth': 'login' });
  };

  const handleModalChange = (mode = null) => {
    setAuthModal({ isOpen: Boolean(mode), mode });
    if (mode) {
      setSearchParams({ 'modal-auth': mode });
    } else {
      setSearchParams({});
    }
  };

  useEffect(() => {
    const modalMode = searchParams.get('modal-auth');
    if (modalMode === 'login' || modalMode === 'signUp') {
      setAuthModal({ isOpen: true, mode: modalMode });
    } else {
      setAuthModal({ isOpen: false, mode: null });
    }
  }, [searchParams]);

  useEffect(() => {
    dispatch(setTheme(theme));
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
          <li className="header__navigation-item_mobile-third">
            <SearchInput />
          </li>
          <li className="header__navigation-item_mobile-last">
            <MainMenu
              options={navigationOptionsList}
              titleIcon={
                theme === 'light' ? dropdownIconBlack : dropdownIconWhite
              }
              toggleTheme={toggleTheme}
              theme={theme}
              title="Меню"
              currentUser={currentUser}
              openAuthModal={openAuthModal}
            
            />
          </li>
          <li className="header__navigation-item_mobile-first">
            <LanguageDropdown
              options={languageList}
              theme={theme}
              title="Язык"
            />
          </li>
          <li className="header__navigation-item_mobile-second">
            <CurrencyDropdown
              options={currencyList}
              theme={theme}
              title="Валюта"
            />
          </li>
          <li className="hide-on-mobile">
            {!currentUser ? (
              <LoginButton openAuthModal={openAuthModal} />
            ) : (
              <UserDropdown
                resetSection={resetSection}
                options={isAdmin ? adminNavList : accountNavigationList}
                titleIcon={
                  theme === 'light' ? dropdownIconBlack : dropdownIconWhite
                }
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
        isOpen={authModal.isOpen}
        onChange={handleModalChange}
        modalMode={authModal.mode}
      />
    </header>
  );
}
