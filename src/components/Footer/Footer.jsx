import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.css';
import telegramIcon from 'images/socials/telegram-icon.svg';
import instagramIcon from 'images/socials/instagram-icon.svg';
import facebookIcon from 'images/socials/facebook-icon.svg';
import vkIcon from 'images/socials/vk-icon.svg';
import pinterestIcon from 'images/socials/pinterest-icon.svg';
import twitterIcon from 'images/socials/twitter-icon.svg';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__list-container">
          <h2 className="footer__title">Основные страницы</h2>
          <ul className="footer__list">
            <li>
              <Link to="/" className="footer__link">
                Главная
              </Link>
            </li>
            <li>
              <Link to="/updates" className="footer__link">
                Обновления
              </Link>
            </li>
            <li>
              <Link to="/articles/web" className="footer__link">
                Веб приложения
              </Link>
            </li>
            <li>
              <Link to="/articles/desktop" className="footer__link">
                Десктоп приложения
              </Link>
            </li>
            <li>
              <Link to="/articles/mobiles" className="footer__link">
                Мобильные приложения
              </Link>
            </li>
            <li>
              <Link to="/articles" className="footer__link">
                Статьи
              </Link>
            </li>
            <li>
              <Link to="/guides" className="footer__link">
                Руководства
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer__list-container">
          <h2 className="footer__title">Контакты</h2>
          <ul className="footer__list">
            <li>
              <Link to="/" className="footer__link">
                example@mail.com
              </Link>
            </li>
            <li>
              <Link to="/" className="footer__link">
                support@mail.com
              </Link>
            </li>
            <li>
              <Link to="/" className="footer__link">
                marketing@mail.com
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer__list-container">
          <h2 className="footer__title">Правовая информация</h2>
          <ul className="footer__list">
            <li>
              <Link to="/" className="footer__link">
                Пользовательское соглашение
              </Link>
            </li>
            <li>
              <Link to="/" className="footer__link">
                Пользовательское соглашение
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer__list-container footer__list-container_socials">
          <h2 className="footer__title">Мы в соц. сетях</h2>
          <ul className="footer__list footer__list_socials">
            <li>
              <Link
                to="https://t.me/dfa_design_for_all"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__link"
              >
                <img src={telegramIcon} alt="Иконка телеграмм" />
              </Link>
            </li>
            <li>
              <Link
                to="https://www.instagram.com/dfa_service/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__link"
              >
                <img src={instagramIcon} alt="Иконка инстаграмм" />
              </Link>
            </li>
            <li>
              <Link
                to="https://www.facebook.com/profile.php?id=100095689982022"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__link"
              >
                <img src={facebookIcon} alt="Иконка фейсбука" />
              </Link>
            </li>
            <li>
              <Link
                to="https://vk.com/design_for_all_pub"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__link"
              >
                <img src={vkIcon} alt="Иконка вконтакте" />
              </Link>
            </li>
            <li>
              <Link
                to="https://ru.pinterest.com/dfaservicemedia/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__link"
              >
                <img src={pinterestIcon} alt="Иконка пинтерест" />
              </Link>
            </li>
            <li>
              <Link
                to="https://twitter.com/Ivan1983759"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__link"
              >
                <img src={twitterIcon} alt="Иконка твиттера" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="footer__copyright">
        Copyright ©{new Date().getFullYear()} All rights reserved | DFA |
        Design for all
      </p>
    </footer>
  );
}
