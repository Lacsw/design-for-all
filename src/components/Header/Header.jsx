import React from 'react';
import './Header.css';
import logo from '../../images/logo.svg';
import loupe from '../../images/loupe-icon.svg';
import list from '../../images/list-icon.svg';
import flag from '../../images/flag-icon.svg';
import dollar from '../../images/dollar-icon.svg';
import account from '../../images/account-icon.svg';
import { NavLink } from 'react-router-dom';

export default function Header({ onProfileClick }) {
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
            <NavLink to="/articles">
              <button className="header__icon-background">
                <img src={list} alt="Иконка списка" className="header__icon" />
              </button>
            </NavLink>
          </li>

          <li>
            <button className="header__icon-background">
              <img src={flag} alt="Иконка флага" className="header__icon" />
            </button>
          </li>

          <li>
            <button className="header__icon-background">
              <img src={dollar} alt="Иконка доллара" className="header__icon" />
            </button>
          </li>

          <li>
            <button
              className="header__icon-background"
              onClick={onProfileClick}
            >
              <img
                src={account}
                alt="Иконка аккаунта"
                className="header__icon"
              />
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
