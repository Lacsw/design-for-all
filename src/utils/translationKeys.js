// Общие ключи
export const COMMON = {
  THEME: {
    LIGHT: 'common_theme_light', // Светлая тема
    DARK: 'common_theme_dark', // Темная тема
  },
  AUTH: {
    LOGIN: 'common_auth_login', // Авторизация
    LOGOUT: 'common_auth_logout', // Выйти
    PROFILE: 'common_auth_profile', // Профиль
  },
  ROLES: {
    SUPER_ADMIN: 'common_roles_super_admin', // Супер админ
    ADMIN: 'common_roles_admin', // Админ
    AUTHOR: 'common_roles_author', // Автор
    USER: 'common_roles_user', // Участник
  },
  ARTICLE_STATUS: {
    APPROVED: 'common_article_status_approved', // Подтверждено
    DRAFT: 'common_article_status_draft', // Черновик
    OFFERED: 'common_article_status_offered', // Предложено
    REJECTED: 'common_article_status_rejected', // Отклонено
    DELETED: 'common_article_status_deleted', // Удалено
  },
};

// Ключи для страницы 404
export const NOT_FOUND = {
  PAGE_NOT_EXISTS: 'not_found_page_not_exists', // Страница не существует
  ROLE_PAGE_MESSAGE: 'not_found_role_page_message', // Сообщение для роли
  BACK_BUTTON: 'not_found_back_button', // Кнопка назад
  HOME_BUTTON: 'not_found_home_button', // Кнопка на главную
  ALT_404: 'not_found_alt_404', // 404
};

// Ключи для страницы статьи 404
export const NOT_FOUND_ARTICLE = {
  ARTICLE_NOT_CREATED: 'not_found_article_not_created', // Статья не создана
  CREATE_BUTTON: 'not_found_article_create_button', // Создать
  ALT_404: 'not_found_article_alt_404', // 404
};

// Ключи для хедера
export const HEADER = {
  LOGO: {
    ALT: 'header_logo_alt', // Альтернативный текст для логотипа
  },
  MAIN_MENU: {
    TITLE: 'header_main_menu_title', // Заголовок для главного меню
    HOME: 'header_main_menu_home',
    UPDATES: 'header_main_menu_updates',
    WEB_APPS: 'header_main_menu_web_apps', // Веб-приложения
    DESKTOP_APPS: 'header_main_menu_desktop_apps', // Десктоп-приложения
    MOBILE_APPS: 'header_main_menu_mobile_apps', // Мобильные приложения
    ARTICLES: 'header_main_menu_articles', // Статьи
    GUIDES: 'header_main_menu_guides', // Руководства
    COLLAPSE: 'header_main_menu_collapse', // Свернуть
  },
  LANGUAGE: {
    TITLE: 'header_language_title', // Заголовок для языка
    RU: 'header_language_ru', // Русский
    EN: 'header_language_en', // Английский
    ZH: 'header_language_zh', // Китайский
    ES: 'header_language_es', // Испанский
  },
  CURRENCY: {
    TITLE: 'header_currency_title', // Заголовок для валюты
    USD: 'header_currency_usd',
  },
  USER: {
    TITLE: 'header_user_title', // Заголовок для пользователя
    PROFILE: 'header_user_profile', // Профиль
    LOGOUT: 'header_user_logout', // Выйти
    WRITE_ARTICLE: 'header_user_write_article', // Написать статью
    PUBLICATIONS: 'header_user_publications', // Публикации
  },
  ADMIN: {
    REQUESTS: 'header_admin_requests', // Запросы
    CREATE_USER: 'header_admin_create_user', // Создать пользователя
  },
  SEARCH: {
    PLACEHOLDER: 'header_search_placeholder', // Плейсхолдер для поиска
    RESET_BUTTON: 'header_search_reset_button', // Кнопка сброса
    LOADING: 'header_search_loading', // Загрузка
    ICON: 'header_search_icon', // Иконка для поиска
    ERROR: {
      NO_RESULTS: 'header_search_error_no_results', // Нет результатов
      NETWORK: 'header_search_error_network', // Сеть
      SERVER: 'header_search_error_server', // Сервер
      UNKNOWN: 'header_search_error_unknown', // Неизвестно
    },
  },
  MOBILE_TREES: {
    ICON: 'header_mobile_trees_icon', // Иконка для мобильных деревьев
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
  LOGIN: 'auth_login', // Авторизация
  SIGNUP: 'auth_signup', // Регистрация
  LOGIN_BUTTON: 'auth_login_button', // Кнопка авторизации
  LOGIN_BUTTON_ARIA: 'auth_login_button_aria', // Аria-атрибут для кнопки авторизации
  LOGIN_LABEL: 'auth_login_label', // Лейбл для поля ввода логина
  LOGIN_PLACEHOLDER: 'auth_login_placeholder', // Плейсхолдер для поля ввода логина
  PASSWORD_LABEL: 'auth_password_label', // Лейбл для поля ввода пароля
  PASSWORD_PLACEHOLDER: 'auth_password_placeholder', // Плейсхолдер для поля ввода пароля
  FILL_ALL_FIELDS: 'auth_fill_all_fields', // Заполнить все поля
  EMAIL_LABEL: 'auth_email_label', // Лейбл для поля ввода email
  EMAIL_PLACEHOLDER: 'auth_email_placeholder', // Плейсхолдер для поля ввода email
  PROJECTS_LABEL: 'auth_projects_label', // Лейбл для поля ввода проектов
  PROJECTS_PLACEHOLDER: 'auth_projects_placeholder', // Плейсхолдер для поля ввода проектов
  ADD_PROJECT_ALT: 'auth_add_project_alt', // Альтернативный текст для кнопки добавления проекта
  CAPTCHA_LABEL: 'auth_captcha_label', // Лейбл для поля ввода капчи
  EMAIL_EXISTS: 'auth_email_exists', // Email уже существует
  PROJECT_EXISTS: 'auth_project_exists', // Проект уже существует
  CHANGE_DATA: 'auth_change_data', // Изменить данные
  CAPTCHA_ERROR: 'auth_captcha_error', // Ошибка капчи
  POLITICS_TEXT: 'auth_politics_text', // Текст политики
  PERSONAL_DATA: 'auth_personal_data', // Персональные данные
  TERMS_OF_SERVICE: 'auth_terms_of_service', // Условия использования
  SIGNUP_BUTTON: 'auth_signup_button', // Кнопка регистрации
  SIGNUP_BUTTON_ARIA: 'auth_signup_button_aria', // Аria-атрибут для кнопки регистрации
  SUCCESS_TITLE: 'auth_success_title', // Заголовок для успешной регистрации
  SUCCESS_MESSAGE: 'auth_success_message', // Сообщение для успешной регистрации
  SUCCESS_DESCRIPTION: 'auth_success_description', // Описание для успешной регистрации
  SUCCESS_WARNING: 'auth_success_warning', // Предупреждение для успешной регистрации
  GIVE_PERMISSION: 'auth_give_permission', // Дать разрешение
  AGREE_WITH: 'auth_agree_with', // Согласиться с
  NOTIFICATION_MESSAGE: 'auth_notification_message', // Сообщение для уведомления
};

// Главная страница
// Ключи для интро
export const INTRO = {
  TITLE: 'intro_title', // Заголовок для интро
  SUBTITLE_MOBILE: 'intro_subtitle_mobile', // Подзаголовок для мобильных устройств
  SUBTITLE_DESKTOP: 'intro_subtitle_desktop', // Подзаголовок для десктопных устройств
};

// Ключи для навигационной панели
export const MAIN_NAVBAR = {
  GO_TO: 'main_navbar_go_to', // Перейти
};

// Обновления
export const UPDATES = {
  TITLE: 'updates_title', // Заголовок для обновлений
  ARTICLE_TYPE: {
    NEW: 'updates_article_type_new', // Новый
    TRANSLATED: 'updates_article_type_translated', // Переведенный
  },
  NO_MORE_UPDATES: 'updates_no_more_updates', // Нет больше обновлений
  ERROR_MESSAGE: 'updates_error_message', // Сообщение об ошибке
  RETRY_BUTTON: 'updates_retry_button', // Кнопка повторить
};

// Ключи для футера
export const FOOTER = {
  // Основные страницы
  MAIN_PAGES: {
    TITLE: 'footer_main_pages_title', // Заголовок для основных страниц
    HOME: 'footer_main_pages_home', // Главная
    UPDATES: 'footer_main_pages_updates', // Обновления
    WEB_APPS: 'footer_main_pages_web_apps', // Веб-приложения
    DESKTOP_APPS: 'footer_main_pages_desktop_apps', // Десктоп-приложения
    MOBILE_APPS: 'footer_main_pages_mobile_apps', // Мобильные приложения
    ARTICLES: 'footer_main_pages_articles', // Статьи
    GUIDES: 'footer_main_pages_guides', // Руководства
  },

  // Контакты
  CONTACTS: {
    TITLE: 'footer_contacts_title', // Заголовок для контактов
  },

  // Правовая информация
  LEGAL: {
    TITLE: 'footer_legal_title', // Заголовок для правовой информации
    TERMS: 'footer_legal_terms', // Условия использования
    PRIVACY: 'footer_legal_privacy', // Политика конфиденциальности
  },

  // Социальные сети
  SOCIALS: {
    TITLE: 'footer_socials_title', // Заголовок для социальных сетей
    TELEGRAM_ALT: 'footer_socials_telegram_alt', // Альтернативный текст для Telegram
    INSTAGRAM_ALT: 'footer_socials_instagram_alt', // Альтернативный текст для Instagram
    FACEBOOK_ALT: 'footer_socials_facebook_alt', // Альтернативный текст для Facebook
    VK_ALT: 'footer_socials_vk_alt', // Альтернативный текст для VK
    PINTEREST_ALT: 'footer_socials_pinterest_alt', // Альтернативный текст для Pinterest
    X_ALT: 'footer_socials_x_alt', // Альтернативный текст для X
  },

  // Копирайт
  COPYRIGHT: 'footer_copyright', // Копирайт
};

export const AUTHOR = {
  // Ключи для навбара автора
  NAVBAR: {
    WRITE_ARTICLE: 'author_navbar_write_article', // Написать статью
    PUBLICATIONS: 'author_navbar_publications', // Публикации
    PROFILE: 'author_navbar_profile', // Профиль
    LOGOUT: 'author_navbar_logout', // Выйти
  },

  MOBILE: {
    PLACEHOLDER: 'author_mobile_placeholder', // Плейсхолдер для мобильного аккаунта
  },

  NEW_ARTICLE: {
    NAVBAR: {
      PUBLISH: 'author_new_article_navbar_publish', // Опубликовать
      SAVE_DRAFT: 'author_new_article_navbar_save_draft', // Сохранить в черновик
      BACK: 'author_new_article_navbar_back', // Вернуться
      CANCEL: 'author_new_article_navbar_cancel', // Отменить
      ATTENTION: 'author_new_article_navbar_attention', // Внимание!
    },
  },
  TABLE: {
    HEADER_TYPE: 'author_table_header_type', // Тип
    HEADER_LANGUAGE: 'author_table_header_language', // Язык
    HEADER_CREATED: 'author_table_header_created', // Создано
    HEADER_CATEGORY: 'author_table_header_category', // Категория
    HEADER_SUBCATEGORY: 'author_table_header_subcategory', // Подкатегория
    HEADER_TITLE: 'author_table_header_title', // Заголовок
    EMPTY_CATEGORY: 'author_table_empty_category', // Статьи в данной категории отсутствуют
    DELETE_TITLE: 'author_table_delete_title', // Точно удалить?
    REASON_TITLE: 'author_table_reason_title', // Причина
  },
};

// Ключи для навбара админа
export const ADMIN = {
  NAVBAR: {
    REQUESTS: 'admin_navbar_requests', // Запросы
    CREATE_USER: 'admin_navbar_create_user', // Создать пользователя
    PROFILE: 'admin_navbar_profile', // Профиль
    LOGOUT: 'admin_navbar_logout', // Выйти
  },

  NEW_AUTHOR_NAVBAR: {
    STATUS: 'admin_new_author_navbar_status', // Статус
    STATUS_APPROVED: 'admin_new_author_navbar_status_approved', // Статус подтверждено
    STATUS_REJECTED: 'admin_new_author_navbar_status_rejected', // Статус отклонено
    APPROVED_ALT: 'admin_new_author_navbar_approved_alt', // Альтернативный текст для подтверждено
    APPROVE_BUTTON: 'admin_new_author_navbar_approve_button', // Кнопка подтвердить
    REJECT_ALT: 'admin_new_author_navbar_reject_alt', // Альтернативный текст для отклонено
    REJECT_BUTTON: 'admin_new_author_navbar_reject_button', // Кнопка отклонить
    BACK_ALT: 'admin_new_author_navbar_back_alt', // Альтернативный текст для стрелка назад
    BACK_BUTTON: 'admin_new_author_navbar_back_button', // Кнопка назад
    REASON_TITLE: 'admin_new_author_navbar_reason_title', // Заголовок для причины
    GIVE_REASON_TITLE: 'admin_new_author_navbar_give_reason_title', // Заголовок для указания причины
    REJECT_REASON_PLACEHOLDER:
      'admin_new_author_navbar_reject_reason_placeholder', // Плейсхолдер для причины отклонено
    REJECT_STATUS: 'admin_new_author_navbar_reject_status', // Статус отклонено
    APPROVE_STATUS: 'admin_new_author_navbar_approve_status', // Статус подтверждено
    DECISION: {
      TEXT: 'admin_new_author_navbar_decision_text',
      REJECTED: 'admin_new_author_navbar_decision_rejected',
      APPROVED: 'admin_new_author_navbar_decision_approved',
    },
    REJECT_REASON_TITLE: 'admin_new_author_navbar_reject_reason_title', // Заголовок для причины отклонено
    ARTICLE_LINK_TITLE: 'admin_new_author_navbar_article_link_title', // Заголовок для ссылки на статью
  },

  APPLICATIONS_NAVBAR: {
    CREATES: 'admin_new_author_applications_navbar_creates', // Создание
    UPDATES: 'admin_new_author_applications_navbar_updates', // Обновление
    ACCOUNTS: 'admin_new_author_applications_navbar_accounts', // Аккаунты
    CLOSED: 'admin_new_author_applications_navbar_closed', // Закрытые
  },

  CREATE_USER: {
    EMAIL_INPUT_LABEL: 'admin_create_user_email_input_label', // Лейбл для поля ввода email
    ROLE_INPUT_LABEL: 'admin_create_user_role_input_label', // Лейбл для поля ввода роли
    ROLE_INPUT_PLACEHOLDER: 'admin_create_user_role_input_placeholder', // Плейсхолдер для поля ввода роли
    ACCESS_LVL_INPUT_LABEL: 'admin_create_user_access_lvl_input_label', // Лейбл для поля ввода уровня доступа
    ACCESS_LVL_INPUT_PLACEHOLDER:
      'admin_create_user_access_lvl_input_placeholder', // Плейсхолдер для поля ввода уровня доступа
    SAVE_BUTTON: 'admin_create_user_save_button', // Кнопка сохранить
    CANCEL_BUTTON: 'admin_create_user_cancel_button', // Кнопка отменить
    MODAL_EMAIL_TITLE: 'admin_create_user_modal_email_title', // Заголовок для модального окна email
    MODAL_SUCCESS_TITLE: 'admin_create_user_modal_success_title', // Заголовок для модального окна успешного создания пользователя
    MODAL_SUCCESS_DESCRIPTION: 'admin_create_user_modal_success_description', // Описание для модального окна успешного создания пользователя
  },

  REASON_FIELDS: {
    SUB_CATEGORY: 'admin_new_author_reason_fields_sub_category',
    TITLE: 'admin_new_author_reason_fields_title',
    IMAGE: 'admin_new_author_reason_fields_image',
    DESCRIPTION: 'admin_new_author_reason_fields_description',
    RECOMMENDATIONS: 'admin_new_author_reason_fields_recommendations',
    ICONS: {
      REJECT: 'admin_new_author_reason_fields_icon_reject',
      APPROVE: 'admin_new_author_reason_fields_icon_approve',
    },
  },

  TABLE: {
    HEADER_TYPE: 'admin_table_header_type', // Тип
    HEADER_CATEGORY: 'admin_table_header_category', // Категория
    HEADER_STATUS: 'admin_table_header_status', // Статус
    HEADER_LANGUAGE: 'admin_table_header_language', // Язык
    HEADER_CREATED: 'admin_table_header_created', // Создано
    HEADER_CLOSED: 'admin_table_header_closed', // Закрыто
    HEADER_RESULT: 'admin_table_header_result', // Результат
    CLOSED: 'admin_table_closed', // Закрыто
    OPEN: 'admin_table_open', // Открыто
    IN_WORK: 'admin_table_in_work', // В работе
    NO_REQUESTS: 'admin_table_no_requests', // Нет запросов
  },

  ACCOUNT_DECISION: {
    TITLE: 'admin_account_decision_title', // Заголовок для заявки регистрации автора
    SUBTITLE: 'admin_account_decision_subtitle', // Подзаголовок для заявки регистрации автора
    INSTRUCTION_TITLE: 'admin_account_decision_instruction_title', // Заголовок для инструкции по проверке квалификации автора
    INSTRUCTION_ITEM_1: 'admin_account_decision_instruction_item_1', // Пункт инструкции по проверке квалификации автора
    INSTRUCTION_ITEM_1_LINK: 'admin_account_decision_instruction_item_1_link', // Ссылка для инструкции по проверке квалификации автора
    INSTRUCTION_ITEM_2: 'admin_account_decision_instruction_item_2', // Пункт инструкции по проверке квалификации автора
    INSTRUCTION_ITEM_3: 'admin_account_decision_instruction_item_3', // Пункт инструкции по проверке квалификации автора
    INSTRUCTION_ITEM_4: 'admin_account_decision_instruction_item_4', // Пункт инструкции по проверке квалификации автора
    INSTRUCTION_ITEM_5: 'admin_account_decision_instruction_item_5', // Пункт инструкции по проверке квалификации автора
    INSTRUCTION_ITEM_6: 'admin_account_decision_instruction_item_6', // Пункт инструкции по проверке квалификации автора
    INSTRUCTION_ITEM_7: 'admin_account_decision_instruction_item_7', // Пункт инструкции по проверке квалификации автора
  },
};

// Ключи для статьи
export const ARTICLE = {
  HEADER: {
    PUBLISHED: 'article_header_published', // Опубликовано
    UPDATED: 'article_header_updated', // Обновлено
  },
  AUTHOR: {
    SOCIALS_TEXT: 'article_author_socials_text', // Текст для социальных сетей
    AVATAR_ALT: 'article_author_avatar_alt', // Альтернативный текст для аватара
  },
  BLANK: {
    SEARCH_TREE: 'article_blank_search_tree', // Воспользуйтесь поиском по дереву или поиском по заголовкам статей
  },
  IMAGE: {
    ALT: 'article_image_alt', // Альтернативный текст для изображения
    FALLBACK_ALT: 'article_image_fallback_alt', // Альтернативный текст для изображения заглушки
  },
  TITLE: 'article_title', // Заголовок статьи
  RECOMMENDATIONS: {
    TITLE: 'article_recommendations_title', // Заголовок рекомендаций
  },

};

export const CHECK_FIELDS = {
  IMAGE_TITLE: 'check_fields_image_title', // Заголовок для изображения
  ARTICLE_TITLE: 'check_fields_article_title', // Заголовок для статьи
  DESCRIPTION_TITLE: 'check_fields_description_title', // Заголовок для описания
  RECOMMENDATIONS_TITLE: 'check_fields_recommendations_title', // Заголовок для рекомендаций  
  IMAGE_ALT: 'check_fields_image_alt', // Альтернативный текст для изображения
  IMAGE_FALLBACK_ALT: 'check_fields_image_fallback_alt', // Альтернативный текст для изображения заглушки
};

export const CREATION = {
  ORIGINAL_ARTICLE_TITLE: 'creation_original_article_title', // Заголовок для оригинальной статьи
};

export const VIEW_ARTICLE = {
  UPDATED_TITLE: 'view_article_updated_title', // Заголовок для обновления
  CREATED_LANG_TITLE: 'view_article_created_lang_title', // Заголовок для создания перевода
  CREATED_TITLE: 'view_article_created_title', // Заголовок для создания статьи 
  LANGUAGE_TITLE: 'view_article_language_title', // Заголовок для языка
  MAIN_CATEGORY_TITLE: 'view_article_main_category_title', // Заголовок для основной категории
  SUB_CATEGORY_TITLE: 'view_article_sub_category_title', // Заголовок для подкатегории
  IMAGE_TITLE: 'view_article_image_title', // Заголовок для изображения
  ARTICLE_TITLE: 'view_article_article_title', // Заголовок для статьи
  DESCRIPTION_TITLE: 'view_article_description_title', // Заголовок для описания
  RECOMMENDATIONS_TITLE: 'view_article_recommendations_title', // Заголовок для рекомендаций
  RECOMMENDATIONS_EMPTY: 'view_article_recommendations_empty', // Текст для рекомендаций
  IMAGE_ALT: 'view_article_image_alt', // Альтернативный текст для изображения
  IMAGE_FALLBACK_ALT: 'view_article_image_fallback_alt', // Альтернативный текст для изображения заглушки
};
