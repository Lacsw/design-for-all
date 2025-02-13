import articleBlack from 'images/navigation/article-icon-black.svg';
import articleWhite from 'images/navigation/article-icon-white.svg';
import desktopBlack from 'images/navigation/desktop-icon-black.svg';
import desktopWhite from 'images/navigation/desktop-icon-white.svg';
import mainBlack from 'images/navigation/main-icon-black.svg';
import mainWhite from 'images/navigation/main-icon-white.svg';
import manualBlack from 'images/navigation/manual-icon-black.svg';
import manualWhite from 'images/navigation/manual-icon-white.svg';
import mobileBlack from 'images/navigation/mobile-icon-black.svg';
import mobileWhite from 'images/navigation/mobile-icon-white.svg';
import themeBlack from 'images/navigation/theme-icon-black.svg';
import themeWhite from 'images/navigation/theme-icon-white.svg';
import arrowBackWhite from 'images/navigation/arrow-back-icon-white.svg';
import arrowBackBlack from 'images/navigation/arrow-back-icon-black.svg';

import updatesBlack from 'images/navigation/updates-icon-black.svg';
import updatesWhite from 'images/navigation/updates-icon-white.svg';
import webBlack from 'images/navigation/web-icon-black.svg';
import webWhite from 'images/navigation/web-icon-white.svg';
import exitBlack from 'images/navigation/exit-icon-black.svg';
import exitWhite from 'images/navigation/exit-icon-white.svg';
import newArticleBlack from 'images/navigation/new-article-icon-black.svg';
import newArticleWhite from 'images/navigation/new-article-icon-white.svg';

import profileBlack from 'images/navigation/profile-icon-black.svg';
import profileWhite from 'images/navigation/profile-icon-white.svg';
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
import createUserWhite from 'images/admin/create-user-white.svg';
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
  {
    id: 'home',
    name: 'Главная',
    src: { light: mainWhite, dark: mainBlack },
    link: '/',
  },
  {
    id: 'updates',
    name: 'Обновления',
    src: { light: updatesWhite, dark: updatesBlack },
    link: '/',
  },
  {
    id: 'web',
    name: 'Веб приложения',
    src: { light: webWhite, dark: webBlack },
    link: '/',
  },
  {
    id: 'desktop',
    name: 'Десктоп приложения',
    src: { light: desktopWhite, dark: desktopBlack },
    link: '/',
  },
  {
    id: 'mobile',
    name: 'Мобильные приложения',
    src: { light: mobileWhite, dark: mobileBlack },
    link: '/',
  },
  {
    id: 'articles',
    name: 'Статьи',
    src: { light: articleWhite, dark: articleBlack },
    link: '/',
  },
  {
    id: 'manuals',
    name: 'Руководства',
    src: { light: manualWhite, dark: manualBlack },
    link: '/',
  },
  {
    id: 'themeToggle',
    name: 'Светлая тема',
    src: { light: themeBlack, dark: themeWhite },
  },
  {
    id: 'collapse',
    name: 'Свернуть',
    src: { light: arrowBackWhite, dark: arrowBackBlack },
  },
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
    id: 'writeArticle',
    name: 'Написать статью',
    src: { light: newArticleWhite, dark: newArticleBlack },
    link: '/#/author/new-article',
  },
  {
    id: 'publications',
    name: 'Публикации',
    src: { light: articleWhite, dark: articleBlack },
    link: '/#/author/articles',
  },
  {
    id: 'profile',
    name: 'Профиль',
    src: { light: profileWhite, dark: profileBlack },
    link: '/#/author/profile',
  },
  {
    id: 'logout',
    name: 'Выйти',
    src: { light: exitWhite, dark: exitBlack },
  },
];

export const adminNavList = [
  {
    id: 'requests',
    name: 'Заявки',
    src: { light: articleWhite, dark: articleBlack },
    link: '/#/admin/creates',
  },
  {
    id: 'createUser',
    name: 'Создать пользователя',
    src: { light: createUserWhite, dark: createUser },
    link: '/#/admin/create-user',
  },
  {
    id: 'profile',
    name: 'Профиль',
    src: { light: profileWhite, dark: profileBlack },
    link: '/#/admin/profile',
  },
  {
    id: 'logout',
    name: 'Выйти',
    src: { light: exitWhite, dark: exitBlack },
 
  },
];

export const currencyList = [
  { id: 'USD', name: 'USD', src: { light: usdIconWhite, dark: usdIcon } },
];

export const languageList = [
  { id: 'ru', name: 'ru', src: ruFlag },
  { id: 'zh', name: 'zh', src: chFlag },
  { id: 'en', name: 'en', src: enFlag },
  { id: 'es', name: 'es', src: spaFlag },
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
  requests: [
    '#/admin/creates',
    '#/admin/updates',
    '#/admin/accounts',
    '#/admin/closed',
  ],
  decisions: [
    '#/admin/creates/decision',
    '#/admin/updates/decision',
    '#/admin/accounts/decision',
    '#/admin/closed/view',
  ],
  user: '#/admin/create-user',
  profile: '#/admin/profile',
  creates: '#/admin/creates',
  createsD: '#/admin/creates/decision',
  updates: '#/admin/updates',
  updatesD: '#/admin/updates/decision',
  accounts: '#/admin/accounts',
  accountsD: '#/admin/accounts/decision',
  closed: '#/admin/closed',
  closedV: '#/admin/closed/view',
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

export const editButton = {
  name: 'edit',
  dark: editIconB,
  light: editIconW,
};

export const viewButton = {
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
