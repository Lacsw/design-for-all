import { useState } from 'react';
import { useSelector } from 'react-redux';

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

export default function Header() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const toogleModal = () => {
    setIsAuthOpen(!isAuthOpen);
  };

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
            <DropdownNavigation
              options={navigationOptionsList}
              titleIcon={dropdownIconWhite}
              type="dropdownWithLinks"
              title="Меню"
            />
          </li>
          <li>
            <DropdownNavigation
              options={languageList}
              title="Язык"
              padding="s"
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
              <button className="header__icon-background" onClick={toogleModal}>
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
      <AuthModal isOpen={isAuthOpen} onClose={toogleModal} />
    </header>
  );
}
