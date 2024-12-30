import articleBlack from 'images/navigation/article-icon-black.svg';
import articleWhite from 'images/navigation/article-icon-white.svg';
import desktopBlack from 'images/navigation/desktop-icon-black.svg';
import desktopWhite from 'images/navigation/desktop-icon-white.svg';
import mainBlack from 'images/navigation/main-icon-black.svg';
import manualBlack from 'images/navigation/manual-icon-black.svg';
import manualWhite from 'images/navigation/manual-icon-white.svg';
import mobileBlack from 'images/navigation/mobile-icon-black.svg';
import mobileWhite from 'images/navigation/mobile-icon-white.svg';
import themeBlack from 'images/navigation/theme-icon-black.svg';
import updatesBlack from 'images/navigation/updates-icon-black.svg';
import updatesWhite from 'images/navigation/updates-icon-white.svg';
import webBlack from 'images/navigation/web-icon-black.svg';
import webWhite from 'images/navigation/web-icon-white.svg';
import exitBlack from 'images/navigation/exit-icon-black.svg';
import newArticleBlack from 'images/navigation/new-article-icon-black.svg';
import profileBlack from 'images/navigation/profile-icon-black.svg';
import ruFlag from 'images/flag-icon.svg';
import chFlag from 'images/ch-flag-icon.svg';
import enFlag from 'images/en-flag-icon.svg';
import spaFlag from 'images/spa-flag-icon.svg';
import usdIcon from 'images/dollar-icon.svg';
import usdIconWhite from 'images/dollar-icon_white.svg';
import changeIconB from 'images/change-icon-black.svg';
import changeIconW from 'images/change-icon.svg';
import dotsIconB from 'images/dots-icon-white.svg';
import dotsIconW from 'images/dots-icon.svg';
import translateIconB from 'images/translate-icon_black.svg';
import translateIconW from 'images/translate-icon_white.svg';
import createUser from 'images/admin/create-user.svg';
//socials
import telegram from 'images/socials/telegram-icon.svg';
import behance from 'images/socials/behance-icon.svg';
import facebook from 'images/socials/facebook-icon.svg';
import instagram from 'images/socials/instagram-icon.svg';
import twitter from 'images/socials/twitter-icon.svg';
import vk from 'images/socials/vk-icon.svg';
import dribbble from 'images/socials/dribbble-icon.svg';
import youtube from 'images/socials/youtube-icon.svg';
import pinterest from 'images/socials/pinterest-icon.svg';
import whatsapp from 'images/socials/whatsapp-icon.svg';
import xBlack from 'images/socials/x-icon_black.svg';
import xWhite from 'images/socials/x-icon_white.svg';
//AuthorArticlesList buttons
import editIconB from 'images/account/edit-icon_black.svg';
import editIconW from 'images/account/edit-icon_white.svg';
import viewIconB from 'images/account/view-icon_black.svg';
import viewIconW from 'images/account/view-icon_white.svg';
import draftIconB from 'images/account/draft-icon_black.svg';
import draftIconW from 'images/account/draft-icon_white.svg';
import deleteIconB from 'images/account/delete-icon_black.svg';
import deleteIconW from 'images/account/delete-icon_white.svg';
import reasonIconB from 'images/account/reason-icon_black.svg';
import reasonIconW from 'images/account/reason-icon_white.svg';

export const langSelectOptions = [
  { label: 'Русский', value: 'ru' },
  { label: 'Английский', value: 'en' },
  { label: 'Китайский', value: 'zh' },
  { label: 'Испанский', value: 'es' },
];

export const categorySelectOptions = [
  { label: 'десктоп', value: 'десктоп' },
  { label: 'телефон', value: 'телефон' },
  { label: 'веб', value: 'веб' },
  { label: 'руководство', value: 'руководство' },
];

export const userRoleSelectOptions = [
  { label: 'Супер админ', value: 'super_admin' },
  { label: 'Админ', value: 'admin' },
  { label: 'Автор', value: 'mentor' },
  { label: 'Участник', value: 'user', disabled: true },
];

export const accessLvlSelectOptions = [
  { label: 'T', value: 1 },
  { label: 'F', value: 2 },
  { label: 'O', value: 3 },
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
  { name: 'Статьи', src: articleBlack, link: '/' },
  { name: 'Руководства', src: manualBlack, link: '/' },
  { name: 'Светлая тема', src: themeBlack, link: '/' },
  { name: 'Свернуть' },
];

export const mainNavigationOptionsList = [
  { name: 'Обновления', dark: updatesBlack, light: updatesWhite, link: '' },
  { name: 'Веб приложения', dark: webBlack, light: webWhite, link: 'web' },
  {
    name: 'Десктоп приложения',
    dark: desktopBlack,
    light: desktopWhite,
    link: 'desktop',
  },
  {
    name: 'Мобильные приложения',
    dark: mobileBlack,
    light: mobileWhite,
    link: 'mobile',
  },
  {
    name: 'Статьи',
    dark: articleBlack,
    light: articleWhite,
    link: '',
  },
  {
    name: 'Руководства',
    dark: manualBlack,
    light: manualWhite,
    link: 'manual',
  },
];

export const accountNavigationList = [
  {
    name: 'Написать статью',
    src: newArticleBlack,
    link: '/#/author/new-article',
  },
  { name: 'Публикации', src: articleBlack, link: '/#/author/articles' },
  { name: 'Профиль', src: profileBlack, link: '/#/author/profile' },
  { name: 'Выйти', src: exitBlack, link: '/' },
];

export const adminNavList = [
  {
    name: 'Заявки',
    src: articleBlack,
    link: '/#/admin/creates',
  },
  {
    name: 'Создать пользователя',
    src: createUser,
    link: '/#/admin/create-user',
  },
  {
    name: 'Профиль',
    src: profileBlack,
    link: '/#/admin/profile',
  },
  {
    name: 'Выйти',
    src: exitBlack,
    link: '/',
  },
];

export const currencyList = [
  { name: 'USD', dark: usdIcon, light: usdIconWhite },
];

export const languageList = [
  { name: 'ru', src: ruFlag },
  { name: 'zh', src: chFlag },
  { name: 'en', src: enFlag },
  { name: 'es', src: spaFlag },
];

export const editList = [
  { name: 'menu', dark: dotsIconW, light: dotsIconB },
  { name: 'correct', dark: changeIconB, light: changeIconW },
  {
    name: 'translate',
    dark: translateIconB,
    light: translateIconW,
  },
];

export const hashPaths = {
  newArticle: '#/author/new-article',
  profile: '#/author/profile',
  articles: '#/author/articles',
  approve: '#/author/articles/approve',
  drafted: '#/author/articles/drafted',
  offered: '#/author/articles/offered',
  rejected: '#/author/articles/rejected',
  deleted: '#/author/articles/deleted',
};

export const adminHash = {
  requests: ['#/admin/creates', '#/admin/updates', '#/admin/accounts'],
  decisions: [
    '#/admin/creates/decision',
    '#/admin/updates/decision',
    '#/admin/accounts/decision',
  ],
  user: '#/admin/create-user',
  profile: '#/admin/profile',
  creates: '#/admin/creates',
  createsD: '#/admin/creates/decision',
  updates: '#/admin/updates',
  updatesD: '#/admin/updates/decision',
  accounts: '#/admin/accounts',
  accountsD: '#/admin/accounts/decision',
};
// SOCIALS //

export const socialIcons = {
  telegram,
  behance,
  dribbble,
  youtube,
  twitter,
  vk,
  facebook,
  instagram,
  pinterest,
  whatsapp,
  x: { light: xBlack, dark: xWhite },
};

const editButton = {
  name: 'edit',
  dark: editIconB,
  light: editIconW,
};

const viewButton = {
  name: 'view',
  dark: viewIconB,
  light: viewIconW,
};

const draftButton = {
  name: 'draft',
  dark: draftIconB,
  light: draftIconW,
};

const deleteButton = {
  name: 'delete',
  dark: deleteIconB,
  light: deleteIconW,
};

const reasonButton = {
  name: 'reason',
  dark: reasonIconB,
  light: reasonIconW,
};

export const tableButtons = {
  approve: [viewButton, draftButton, reasonButton],
  drafted: [editButton, deleteButton, null],
  offered: [viewButton, null, null],
  rejected: [viewButton, draftButton, reasonButton],
  deleted: [reasonButton, null, null],
};
