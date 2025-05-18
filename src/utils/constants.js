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
import emailBlack from 'images/socials/email-icon-black.svg';
import emailWhite from 'images/socials/email-icon-white.svg';
import phoneBlack from 'images/socials/phone-icon-black.svg';
import phoneWhite from 'images/socials/phone-icon-white.svg';
import telegram from 'images/socials/telegram-icon.svg';
import behance from 'images/socials/behance-icon.svg';
import facebook from 'images/socials/facebook-icon.svg';
import instagram from 'images/socials/instagram-icon.svg';
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
import rejectHintB from 'images/account/warining-icon_black.svg';
import rejectHintW from 'images/account/warining-icon_white.svg';

// Импортируем ключи переводов
import { HEADER, COMMON, ADMIN } from 'utils/translationKeys';

export const langSelectOptions = [
  { label: COMMON.LANGUAGE.RU, value: 'ru' },
  { label: COMMON.LANGUAGE.EN, value: 'en' },
  { label: COMMON.LANGUAGE.ZH, value: 'zh' },
  { label: COMMON.LANGUAGE.ES, value: 'es' },
];

export const userRoleSelectOptions = [
  { value: 'super_admin', translationKey: COMMON.ROLES.SUPER_ADMIN },
  { value: 'admin', translationKey: COMMON.ROLES.ADMIN },
  { value: 'mentor', translationKey: COMMON.ROLES.AUTHOR },
  { value: 'user', translationKey: COMMON.ROLES.USER },
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
  { name: COMMON.ARTICLE_STATUS.APPROVED, value: 'approve' },
  { name: COMMON.ARTICLE_STATUS.DRAFT, value: 'drafted' },
  { name: COMMON.ARTICLE_STATUS.OFFERED, value: 'offered' },
  { name: COMMON.ARTICLE_STATUS.REJECTED, value: 'rejected' },
  { name: COMMON.ARTICLE_STATUS.DELETED, value: 'deleted' },
];

export const navigationOptionsList = [
  {
    id: 'home',
    translationKey: HEADER.MAIN_MENU.HOME,
    src: { light: mainWhite, dark: mainBlack },
    link: '/',
  },
  {
    id: 'updates',
    translationKey: HEADER.MAIN_MENU.UPDATES,
    src: { light: updatesWhite, dark: updatesBlack },
    link: '/#/updates',
  },
  {
    id: 'web',
    translationKey: HEADER.MAIN_MENU.WEB,
    src: { light: webWhite, dark: webBlack },
    link: '/#/web',
  },
  {
    id: 'desktop',
    translationKey: HEADER.MAIN_MENU.DESKTOP,
    src: { light: desktopWhite, dark: desktopBlack },
    link: '/#/desktop',
  },
  {
    id: 'mobile',
    translationKey: HEADER.MAIN_MENU.MOBILE,
    src: { light: mobileWhite, dark: mobileBlack },
    link: '/#/mobile',
  },
  {
    id: 'articles',
    translationKey: HEADER.MAIN_MENU.ARTICLES,
    src: { light: articleWhite, dark: articleBlack },
    link: '/#/articles',
  },
  {
    id: 'manual',
    translationKey: HEADER.MAIN_MENU.MANUAL,
    src: { light: manualWhite, dark: manualBlack },
    link: '/#/manual',
  },
  {
    id: 'themeToggle',
    translationKey: COMMON.THEME,
    src: { light: themeBlack, dark: themeWhite },
  },
  {
    id: 'collapse',
    translationKey: HEADER.MAIN_MENU.COLLAPSE,
    src: { light: arrowBackWhite, dark: arrowBackBlack },
  },
];

export const mainCategory = [
  {
    lang: 'ru',
    category: {
      desktop: 'десктоп',
      web: 'веб',
      mobile: 'телефон',
      manual: 'руководства',
    },
  },
  {
    lang: 'en',
    category: {
      desktop: 'desktop',
      web: 'web',
      mobile: 'mobile',
      manual: 'manual',
    },
  },
  {
    lang: 'zh',
    category: {
      desktop: '桌面',
      web: '网络',
      mobile: '手机',
      manual: '指南篇',
    },
  },
  {
    lang: 'es',
    category: {
      desktop: 'escritorio',
      web: 'web',
      mobile: 'móvil',
      manual: 'guía',
    },
  },
];

export const mainNavigationOptionsList = [
  {
    id: 'updates',
    translationKey: HEADER.MAIN_MENU.UPDATES,
    dark: updatesBlack,
    light: updatesWhite,
    link: '/#/updates',
  },
  {
    id: 'web',
    translationKey: HEADER.MAIN_MENU.WEB_APPS,
    dark: webBlack,
    light: webWhite,
    link: '/#/web',
  },
  {
    id: 'desktop',
    translationKey: HEADER.MAIN_MENU.DESKTOP_APPS,
    dark: desktopBlack,
    light: desktopWhite,
    link: '/#/desktop',
  },
  {
    id: 'mobile',
    translationKey: HEADER.MAIN_MENU.MOBILE_APPS,
    dark: mobileBlack,
    light: mobileWhite,
    link: '/#/mobile',
  },
  {
    id: 'articles',
    translationKey: HEADER.MAIN_MENU.ARTICLES,
    dark: articleBlack,
    light: articleWhite,
    link: '/#/articles',
  },
  {
    id: 'manual',
    translationKey: HEADER.MAIN_MENU.MANUAL,
    dark: manualBlack,
    light: manualWhite,
    link: '/#/manual',
  },
];

export const accountNavigationList = [
  {
    id: 'writeArticle',
    translationKey: HEADER.USER.WRITE_ARTICLE,
    src: { light: newArticleWhite, dark: newArticleBlack },
    link: '/#/author/new-article',
  },
  {
    id: 'publications',
    translationKey: HEADER.USER.PUBLICATIONS,
    src: { light: articleWhite, dark: articleBlack },
    link: '/#/author/articles',
  },
  {
    id: 'profile',
    translationKey: HEADER.USER.PROFILE,
    src: { light: profileWhite, dark: profileBlack },
    link: '/#/author/profile',
  },
  {
    id: 'logout',
    translationKey: HEADER.USER.LOGOUT,
    src: { light: exitWhite, dark: exitBlack },
  },
];

export const adminNavList = [
  {
    id: 'requests',
    translationKey: HEADER.USER.REQUESTS,
    src: { light: articleWhite, dark: articleBlack },
    link: '/#/admin/creates',
  },
  {
    id: 'createUser',
    translationKey: HEADER.USER.CREATE_USER,
    src: { light: createUserWhite, dark: createUser },
    link: '/#/admin/create-user',
  },
  {
    id: 'profile',
    translationKey: HEADER.USER.PROFILE,
    src: { light: profileWhite, dark: profileBlack },
    link: '/#/admin/profile',
  },
  {
    id: 'logout',
    translationKey: HEADER.USER.LOGOUT,
    src: { light: exitWhite, dark: exitBlack },
  },
];

export const currencyList = [
  {
    id: 'USD',
    translationKey: COMMON.CURRENCY.USD,
    src: { light: usdIconWhite, dark: usdIcon },
  },
];

export const languageList = [
  { id: 'ru', translationKey: COMMON.LANGUAGE.RU, src: ruFlag },
  { id: 'zh', translationKey: COMMON.LANGUAGE.ZH, src: chFlag },
  { id: 'en', translationKey: COMMON.LANGUAGE.EN, src: enFlag },
  { id: 'es', translationKey: COMMON.LANGUAGE.ES, src: spaFlag },
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
  default: {
    light: webBlack,
    dark: webWhite,
  },
  email: { light: emailBlack, dark: emailWhite },
  phone: { light: phoneBlack, dark: phoneWhite },
  telegram,
  behance,
  dribbble,
  youtube,
  vk,
  facebook,
  instagram,
  pinterest,
  whatsapp,
  x: { light: xBlack, dark: xWhite },
};

export const editButton = {
  name: 'edit',
  tooltip: ADMIN.TOOLTIP.EDIT,
  dark: editIconB,
  light: editIconW,
};

export const viewButton = {
  name: 'view',
  tooltip: ADMIN.TOOLTIP.VIEW,
  dark: viewIconB,
  light: viewIconW,
};

const draftButton = {
  name: 'draft',
  tooltip: ADMIN.TOOLTIP.DRAFT,
  dark: draftIconB,
  light: draftIconW,
};

const deleteButton = {
  name: 'delete',
  tooltip: ADMIN.TOOLTIP.DELETE,
  dark: deleteIconB,
  light: deleteIconW,
};

const reasonButton = {
  name: 'reason',
  tooltip: ADMIN.TOOLTIP.REASON,
  dark: reasonIconB,
  light: reasonIconW,
};

export const rejectHint = {
  name: 'reject hint',
  dark: rejectHintW,
  light: rejectHintB,
};

export const tableButtons = {
  approve: [viewButton, draftButton, reasonButton],
  drafted: [editButton, deleteButton, null],
  offered: [viewButton, null, null],
  rejected: [viewButton, draftButton, reasonButton],
  deleted: [reasonButton, null, null],
};

// Допустимые секции для запросов к API
export const VALID_SECTIONS = ['web', 'desktop', 'mobile', 'manual'];

export const articleTypeOptions = [
  { value: 'created', translationKey: COMMON.ARTICLE_TYPE.CREATED },
  { value: 'updated', translationKey: COMMON.ARTICLE_TYPE.UPDATED },
  { value: 'created_lang', translationKey: COMMON.ARTICLE_TYPE.CREATED_LANG },
];
