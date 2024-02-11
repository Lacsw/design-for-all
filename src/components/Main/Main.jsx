import React from 'react';

import './Main.css';
import listIcon from '../../images/main/list-icon.svg';
import webIcon from '../../images/main/web-icon.svg';
import desktopActiveIcon from '../../images/main/desktop-active-icon.svg';
import mobileIcon from '../../images/main/mobile-icon.svg';
import articlesIcon from '../../images/main/acticles-icon.svg';
import contactIcon from '../../images/main/contact-icon.svg';
import slideImg from '../../images/main/slide-img.png';

import Header from '../Header/Header';
import Intro from '../Intro/Intro';
import Footer from '../Footer/Footer';
import { NavLink } from 'react-router-dom';
import AuthModal from '../AuthModal/AuthModal';

export default function Main() {
  return (
    <>
      <Header />
      <Intro />
      <ul className="main-nav">
        <li className="main-nav__item">
          <NavLink to="/" className="main-nav__btn">
            <img src={listIcon} alt="navigation" />
          </NavLink>
        </li>
        <li className="main-nav__item">
          <NavLink to="/web" className="main-nav__btn">
            <img src={webIcon} alt="web" />
          </NavLink>
        </li>
        <li className="main-nav__item">
          <NavLink to="/desktop" className="main-nav__btn">
            <img src={desktopActiveIcon} alt="desktop" />
          </NavLink>
        </li>
        <li className="main-nav__item">
          <NavLink to="/mobile" className="main-nav__btn">
            <img src={mobileIcon} alt="desktop" />
          </NavLink>
        </li>
        <li className="main-nav__item">
          <NavLink to="/articles" className="main-nav__btn">
            <img src={articlesIcon} alt="desktop" />
          </NavLink>
        </li>
        <li className="main-nav__item">
          <NavLink to="/contact" className="main-nav__btn">
            <img src={contactIcon} alt="desktop" />
          </NavLink>
        </li>
      </ul>
      <div className="main__content">
        <div className="main__slide">
          <h2 className="main__title">Веб-приложения</h2>
          <p className="main__text">
            Давно выяснено, что при оценке дизайна и композиции читаемый текст
            мешает сосредоточиться. Lorem Ipsum используют потому, что тот
            обеспечивает более или менее стандартное заполнение шаблона, а также
            реальное распределение букв и пробелов в абзацах, которое не
            получается при простой дубликации "Здесь ваш текст.. Здесь ваш
            текст.. Здесь ваш текст.." Многие программы электронной вёрстки и
            редакторы HTML используют Lorem Ipsum в качестве текста по
            умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу
            показывает, как много веб-страниц всё ещё дожидаются своего
            настоящего рождения. За прошедшие годы текст Lorem Ipsum получил
            много версий. Некоторые версии появились по ошибке, некоторые -
            намеренно (например, юмористические варианты).
            <br />
            <br />
            Классический текст Lorem Ipsum, используемый с XVI века Давно
            выяснено, что при оценке дизайна и композиции читаемый текст мешает
            сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает
            более или менее стандартное заполнение шаблона, а также реальное
            распределение букв и пробелов в абзацах, которое не получается при
            простой vдубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш
            текст.." <br />
            <br /> Многие программы электронной вёрстки и редакторы HTML
            используют Lorem Ipsum в качестве текста по умолчанию, так что поиск
            по ключевым словам "lorem ipsum" сразу показывает, как много
            веб-страниц всё ещё дожидаются своего настоящего рождения. За
            прошедшие годы текст Lorem Ipsum получил много версий. Некоторые
            версии появились по ошибке, некоторые - намеренно (например,
            юмористические варианты).
            <br />
            Классический текст Lorem Ipsum, используемый с XVI века
          </p>
          <img className="main__slide-img" src={slideImg} alt="main" />
          <p className="main__text">
            Давно выяснено, что при оценке дизайна и композиции читаемый текст
            мешает сосредоточиться. Lorem Ipsum используют потому, что тот
            обеспечивает более или менее стандартное заполнение шаблона, а также
            реальное распределение букв и пробелов в абзацах, которое не
            получается при простой дубликации "Здесь ваш текст.. Здесь ваш
            текст.. Здесь ваш текст.." Многие программы электронной вёрстки и
            редакторы HTML используют Lorem Ipsum в качестве текста по
            умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу
            показывает, как много веб-страниц всё ещё дожидаются своего
            настоящего рождения. За прошедшие годы текст Lorem Ipsum получил
            много версий. Некоторые версии появились по ошибке, некоторые -
            намеренно (например, юмористические варианты).Классический текст
            Lorem Ipsum, используемый с XVI века Давно выяснено, что при оценке
            дизайна и композиции читаемый текст мешает сосредоточиться. Lorem
            Ipsum используют потому, что тот обеспечивает более или менее
            стандартное заполнение шаблона, а также реальное распределение букв
            и пробелов в абзацах, которое не получается при простой vдубликации
            "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие
            программы электронной вёрстки и редакторы HTML используют Lorem
            Ipsum в качестве текста по умолчанию, так что поиск по ключевым
            словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё
            дожидаются своего настоящего рождения. За прошедшие годы текст Lorem
            Ipsum получил много версий. Некоторые версии появились по ошибке,
            некоторые - намеренно (например, юмористические
            варианты).Классический текст Lorem Ipsum, используемый с XVI века
          </p>
        </div>
      </div>
      <Footer />
      <AuthModal isOpen={true} />
    </>
  );
}
