// Общие ключи
export const COMMON = {
  THEME: {
    LIGHT: 'common_theme_light',
    DARK: 'common_theme_dark',
  },
  AUTH: {
    LOGIN: 'common_auth_login',
    LOGOUT: 'common_auth_logout',
    PROFILE: 'common_auth_profile',
  },
  ROLES: {
    SUPER_ADMIN: 'common_roles_super_admin',
    ADMIN: 'common_roles_admin',
    AUTHOR: 'common_roles_author',
    USER: 'common_roles_user',
  },
  ARTICLE_STATUS: {
    APPROVED: 'common_article_status_approved',
    DRAFT: 'common_article_status_draft',
    OFFERED: 'common_article_status_offered',
    REJECTED: 'common_article_status_rejected',
    DELETED: 'common_article_status_deleted',
  },
};

// Ключи для хедера
export const HEADER = {
  LOGO: {
    ALT: 'header_logo_alt',
  },
  MAIN_MENU: {
    TITLE: 'header_main_menu_title',
    HOME: 'header_main_menu_home',
    UPDATES: 'header_main_menu_updates',
    WEB_APPS: 'header_main_menu_web_apps',
    DESKTOP_APPS: 'header_main_menu_desktop_apps',
    MOBILE_APPS: 'header_main_menu_mobile_apps',
    ARTICLES: 'header_main_menu_articles',
    GUIDES: 'header_main_menu_guides',
    COLLAPSE: 'header_main_menu_collapse',
  },
  LANGUAGE: {
    TITLE: 'header_language_title',
    RU: 'header_language_ru',
    EN: 'header_language_en',
    ZH: 'header_language_zh',
    ES: 'header_language_es',
  },
  CURRENCY: {
    TITLE: 'header_currency_title',
    USD: 'header_currency_usd',
  },
  USER: {
    TITLE: 'header_user_title',
    PROFILE: 'header_user_profile',
    LOGOUT: 'header_user_logout',
    WRITE_ARTICLE: 'header_user_write_article',
    PUBLICATIONS: 'header_user_publications',
  },
  ADMIN: {
    REQUESTS: 'header_admin_requests',
    CREATE_USER: 'header_admin_create_user',
  },
  SEARCH: {
    PLACEHOLDER: 'header_search_placeholder',
    RESET_BUTTON: 'header_search_reset_button',
    LOADING: 'header_search_loading',
    ICON: 'header_search_icon',
    ERROR: {
      NO_RESULTS: 'header_search_error_no_results',
      NETWORK: 'header_search_error_network',
      SERVER: 'header_search_error_server',
      UNKNOWN: 'header_search_error_unknown',
    },
  },
  MOBILE_TREES: {
    ICON: 'header_mobile_trees_icon',
  },

  EDIT: {
    TOOLTIP: 'header_edit_tooltip', // Подсказка для кнопки редактирования
  },
  VIEW: {
    TOOLTIP: 'header_view_tooltip', // Подсказка для кнопки просмотра
  },
  DRAFT: {
    TOOLTIP: 'header_draft_tooltip', // Подсказка для кнопки перемещения в черновик
  },
  DELETE: {
    TOOLTIP: 'header_delete_tooltip', // Подсказка для кнопки удаления
  },
  REASON: {
    TOOLTIP: 'header_reason_tooltip', // Подсказка для кнопки указания причины
  },
};

// Auth Modal
export const AUTH = {
  LOGIN: 'auth_login',
  SIGNUP: 'auth_signup',
  LOGIN_BUTTON: 'auth_login_button',
  LOGIN_BUTTON_ARIA: 'auth_login_button_aria',
  LOGIN_LABEL: 'auth_login_label',
  LOGIN_PLACEHOLDER: 'auth_login_placeholder',
  PASSWORD_LABEL: 'auth_password_label',
  PASSWORD_PLACEHOLDER: 'auth_password_placeholder',
  FILL_ALL_FIELDS: 'auth_fill_all_fields',
  EMAIL_LABEL: 'auth_email_label',
  EMAIL_PLACEHOLDER: 'auth_email_placeholder',
  PROJECTS_LABEL: 'auth_projects_label',
  PROJECTS_PLACEHOLDER: 'auth_projects_placeholder',
  ADD_PROJECT_ALT: 'auth_add_project_alt',
  CAPTCHA_LABEL: 'auth_captcha_label',
  CAPTCHA_PLACEHOLDER: 'auth_captcha_placeholder',
  EMAIL_EXISTS: 'auth_email_exists',
  PROJECT_EXISTS: 'auth_project_exists',
  CHANGE_DATA: 'auth_change_data',
  CAPTCHA_ERROR: 'auth_captcha_error',
  POLITICS_TEXT: 'auth_politics_text',
  PERSONAL_DATA: 'auth_personal_data',
  TERMS_OF_SERVICE: 'auth_terms_of_service',
  SIGNUP_BUTTON: 'auth_signup_button',
  SIGNUP_BUTTON_ARIA: 'auth_signup_button_aria',
  SUCCESS_TITLE: 'auth_success_title',
  SUCCESS_MESSAGE: 'auth_success_message',
  SUCCESS_DESCRIPTION: 'auth_success_description',
  SUCCESS_WARNING: 'auth_success_warning',
  GIVE_PERMISSION: 'auth_give_permission',
  AGREE_WITH: 'auth_agree_with',
  NOTIFICATION_MESSAGE: 'auth_notification_message',
};

// Ключи для интро
export const INTRO = {
  TITLE: 'intro_title',
  SUBTITLE_MOBILE: 'intro_subtitle_mobile',
  SUBTITLE_DESKTOP: 'intro_subtitle_desktop',
};

// Ключи для навигационной панели
export const NAVBAR = {
  GO_TO: 'navbar_go_to',
};

// Обновления
export const UPDATES = {
  TITLE: 'updates_title',
  ARTICLE_TYPE: {
    NEW: 'updates_article_type_new',
    TRANSLATED: 'updates_article_type_translated',
  },
  NO_MORE_UPDATES: 'updates_no_more_updates',
  ERROR_MESSAGE: 'updates_error_message',
  RETRY_BUTTON: 'updates_retry_button',
};

// Ключи для футера
export const FOOTER = {
  // Основные страницы
  MAIN_PAGES: {
    TITLE: 'footer_main_pages_title',
    HOME: 'footer_main_pages_home',
    UPDATES: 'footer_main_pages_updates',
    WEB_APPS: 'footer_main_pages_web_apps',
    DESKTOP_APPS: 'footer_main_pages_desktop_apps',
    MOBILE_APPS: 'footer_main_pages_mobile_apps',
    ARTICLES: 'footer_main_pages_articles',
    GUIDES: 'footer_main_pages_guides',
  },

  // Контакты
  CONTACTS: {
    TITLE: 'footer_contacts_title',
  },

  // Правовая информация
  LEGAL: {
    TITLE: 'footer_legal_title',
    TERMS: 'footer_legal_terms',
    PRIVACY: 'footer_legal_privacy',
  },

  // Социальные сети
  SOCIALS: {
    TITLE: 'footer_socials_title',
    TELEGRAM_ALT: 'footer_socials_telegram_alt',
    INSTAGRAM_ALT: 'footer_socials_instagram_alt',
    FACEBOOK_ALT: 'footer_socials_facebook_alt',
    VK_ALT: 'footer_socials_vk_alt',
    PINTEREST_ALT: 'footer_socials_pinterest_alt',
    X_ALT: 'footer_socials_x_alt',
  },

  // Копирайт
  COPYRIGHT: 'footer_copyright',
};

// Ключи для навбара автора
export const AUTHOR_NAVBAR = {
  WRITE_ARTICLE: 'author_navbar_write_article',
  PUBLICATIONS: 'author_navbar_publications',
  PROFILE: 'author_navbar_profile',
  LOGOUT: 'author_navbar_logout',
};

// Ключи для навбара админа
export const ADMIN_NAVBAR = {
  REQUESTS: 'admin_navbar_requests',
  CREATE_USER: 'admin_navbar_create_user',
  PROFILE: 'admin_navbar_profile',
  LOGOUT: 'admin_navbar_logout',
};
