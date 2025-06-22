import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './Header.css';
import {
  MainMenu,
  LanguageDropdown,
  CurrencyDropdown,
  AuthModal,
  UserDropdown,
  LoginButton,
  MobileTreesButton,
  HeaderSearchInput,
} from 'components';

import { getCurrentUser } from 'store/slices/user';
import { getCurrentTheme, setTheme } from 'store/slices/theme';
import { selectCurrentCategory } from 'store/slices/catalog/slice';

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
import { useIsMobile } from 'utils/hooks/useIsMobile';
import { useLogout } from 'utils/hooks/useLogout';
import { HEADER } from 'utils/translationKeys';

export default function Header() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const theme = useSelector(getCurrentTheme);
  const isMobile = useIsMobile();
  const isCatalogOpen = useSelector(selectCurrentCategory);

  const currentUser = useSelector(getCurrentUser);
  const isAdmin =
    currentUser?.role === 'super_admin' || currentUser?.role === 'admin';
  // Условие, при котором срабатывать таймаут:
  const shouldTimeout = isAdmin;

  const handleLogout = useLogout();

  // Переопределяем функцию handleLogout для открытия окна авторизации
  const handleLogoutWithModal = () => {
    openAuthModal();
    handleLogout();
  };

  // Функция, которая вызывается по истечении таймаута
  const handleTimeout = async (_dispatch) => {
    handleLogoutWithModal();
  };

  // Хук для установки
  useSessionTimeout({
    timeout: 3600000, // 1 час
    shouldTimeout,
    onTimeout: handleTimeout,
  });

  const [authModal, setAuthModal] = useState({ isOpen: false, mode: null });

  //* в шапке сайта при клике на иконку входа по умолчанию открываетсяавторизация
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
        <Link to="/" className="logo-link">
          <img
            src={theme === 'dark' ? logo : logoBlack}
            alt={t(HEADER.LOGO.ALT)}
            className="header__logo"
          />
        </Link>
        <ul className="header__navigation">
          <li
            className={`header__navigation-item_mobile-third ${
              !isMobile ? 'header__search' : ''
            }`}
          >
            <HeaderSearchInput isMobileVisible={isMobile} id="headerSearch" />
          </li>
          {isMobile && isCatalogOpen && (
            <li className="header__navigation-item_mobile-fourth">
              <MobileTreesButton />
            </li>
          )}

          <li className="header__navigation-item_mobile-last">
            <MainMenu
              options={navigationOptionsList}
              titleIcon={
                theme === 'light' ? dropdownIconBlack : dropdownIconWhite
              }
              toggleTheme={toggleTheme}
              theme={theme}
              title={t(HEADER.MAIN_MENU.TITLE)}
              currentUser={currentUser}
              openAuthModal={openAuthModal}
            />
          </li>
          <li className="header__navigation-item_mobile-first">
            <LanguageDropdown
              options={languageList}
              theme={theme}
              title={t(HEADER.LANGUAGE.TITLE)}
            />
          </li>
          <li className="header__navigation-item_mobile-second">
            <CurrencyDropdown
              options={currencyList}
              theme={theme}
              title={t(HEADER.CURRENCY.TITLE)}
            />
          </li>
          <li className="hide-on-mobile">
            {!currentUser ? (
              <LoginButton openAuthModal={openAuthModal} />
            ) : (
              <UserDropdown
                options={isAdmin ? adminNavList : accountNavigationList}
                titleIcon={
                  theme === 'light' ? dropdownIconBlack : dropdownIconWhite
                }
                type="dropdownWithLinks"
                title={t(HEADER.USER.TITLE)}
                currentUser={currentUser}
                theme={theme}
              />
            )}
          </li>
        </ul>
      </div>

      {!currentUser && (
        <AuthModal
          isOpen={authModal.isOpen}
          onChange={handleModalChange}
          modalMode={authModal.mode}
        />
      )}
    </header>
  );
}
