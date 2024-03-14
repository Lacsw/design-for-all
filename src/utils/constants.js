import arrowBackBlack from 'images/navigation/arrow-back-icon-black.svg';
import articleBlack from 'images/navigation/article-icon-black.svg';
import desktopBlack from 'images/navigation/desktop-icon-black.svg';
import mainBlack from 'images/navigation/main-icon-black.svg';
import manualBlack from 'images/navigation/manual-icon-black.svg';
import mobileBlack from 'images/navigation/mobile-icon-black.svg';
import themeBlack from 'images/navigation/theme-icon-black.svg';
import updatesBlack from 'images/navigation/updates-icon-black.svg';
import webBlack from 'images/navigation/web-icon-black.svg';
import exitBlack from 'images/navigation/exit-icon-black.svg';
import newArticleBlack from 'images/navigation/new-article-icon-black.svg';
import profileBlack from 'images/navigation/profile-icon-black.svg';
import ruFlag from 'images/flag-icon.svg';
import chFlag from 'images/ch-flag-icon.svg';
import enFlag from 'images/en-flag-icon.svg';
import spaFlag from 'images/spa-flag-icon.svg';
import usdIcon from 'images/dollar-icon.svg';
//socials
import telegram from 'images/socials/telegram-icon.svg';
import behance from 'images/socials/behance-icon.svg';
import facebook from 'images/socials/facebook-icon.svg';
import instagram from 'images/socials/instagram-icon.svg';
import twitter from 'images/socials/twitter-icon.svg';
import vk from 'images/socials/vk-icon.svg';
import dribble from 'images/socials/dribble-icon.svg';
import youtube from 'images/socials/youtube-icon.svg';

export const langSelectOptions = [
  { label: 'Русский', value: 'ru' },
  { label: 'Английский', value: 'en' },
  { label: 'Китайский', value: 'chs' },
  { label: 'Испанский', value: 'esp' },
];

export const categorySelectOptions = [
  { label: 'Десктоп', value: 'desktop' },
  { label: 'Мобильные', value: 'mobile' },
  { label: 'Веб', value: 'web' },
];

export const userRoleSelectOptions = [
  { label: 'Супер админ', value: 'super_admin' },
  { label: 'Админ', value: 'admin' },
  { label: 'Ментор', value: 'mentor' },
  { label: 'Участник', value: 'user' },
];

export const accessLvlSelectOptions = [
  { label: 'T', value: '0' },
  { label: 'F', value: '1' },
  { label: 'O', value: '2' },
];

export const listRangeOptions = [
  { label: '20', value: '20' },
  { label: '30', value: '30' },
  { label: '40', value: '40' },
  { label: '50', value: '50' },
  { label: '100', value: '100' },
];

export const authorArticlesTabs = [
  { name: 'Подтверждено', value: 'approve' },
  { name: 'Черновик', value: 'drafted' },
  { name: 'Предложено', value: 'offered' },
  { name: 'Отклонено', value: 'rejected' },
  { name: 'Удалено', value: 'deleted' },
];

export const navigationOptionsList = [
  { name: 'Главная', src: mainBlack, link: '/' },
  { name: 'Обновления', src: updatesBlack, link: '/' },
  { name: 'Веб приложения', src: webBlack, link: '/' },
  { name: 'Десктоп приложения', src: desktopBlack, link: '/' },
  { name: 'Мобильные приложения', src: mobileBlack, link: '/' },
  { name: 'Статьи', src: articleBlack, link: '/articles' },
  { name: 'Руководства', src: manualBlack, link: '/' },
  { name: 'Светлая тема', src: themeBlack, link: '/' },
  { name: 'Свернуть', src: arrowBackBlack, link: '/' },
];

export const accountNavigationList = [
  {
    name: 'Написать статью',
    src: newArticleBlack,
    link: '/author/new-article',
  },
  { name: 'Публикации', src: articleBlack, link: '/author/articles' },
  { name: 'Профиль', src: profileBlack, link: '/author/profile' },
  { name: 'Выйти', src: exitBlack, link: '/' },
];

export const currencyList = [{ name: 'USD', src: usdIcon }];

export const languageList = [
  { name: 'RU', src: ruFlag },
  { name: 'CH', src: chFlag },
  { name: 'EN', src: enFlag },
  { name: 'SPA', src: spaFlag },
];

// SOCIALS //

export const socialIcons = {
  telegram,
  behance,
  dribble,
  youtube,
  twitter,
  vk,
  facebook,
  instagram,
};
