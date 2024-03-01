import React, { useContext, useState } from 'react';
import './Header.css';
import logo from '../../images/logo.svg';
import loupe from '../../images/loupe-icon.svg';
import account from '../../images/account-icon.svg';
import siginInIcon from '../../images/siginin-icon.svg';
import DropdownNavigation from '../DropdownNavigation/DropdownNavigation';
import {
  accountNavigationList,
  navigationOptionsList,
  languageList,
  currencyList,
} from '../../utils/constants';
import dropdownIconWhite from '../../images/navigation/dropdown-icon-white.svg';
import { UserContext } from '../../contexts/UserContext';
import AuthModal from '../AuthModal/AuthModal';

export default function Header({ onLogin }) {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const user = useContext(UserContext);
  console.log(user);

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
            <DropdownNavigation options={languageList} title="Язык" />
          </li>
          <li>
            <DropdownNavigation options={currencyList} title="Валюта" />
          </li>
          <li>
            {!user ? (
              <button className="header__icon-background" onClick={toogleModal}>
                <img src={siginInIcon} alt="войти" />
              </button>
            ) : (
              <DropdownNavigation
                options={accountNavigationList}
                titleIcon={account}
                type="dropdownWithLinks"
                title="Профиль"
              />
            )}
          </li>
        </ul>
      </div>
      <AuthModal isOpen={isAuthOpen} onClose={toogleModal} onLogin={onLogin} />
    </header>
  );
}
