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
  ARTICLE_TYPE: {
    CREATED: 'common_article_type_created', // Создание
    UPDATED: 'common_article_type_updated', // Обновление
    CREATED_LANG: 'common_article_type_created_lang', // Перевод
  },
  LANGUAGE: {
    RU: 'common_language_ru', // Русский
    EN: 'common_language_en', // Английский
    ZH: 'common_language_zh', // Китайский
    ES: 'common_language_es', // Испанский
  },
  CURRENCY: {
    USD: 'common_currency_usd', // USD
  },

  MODAL: {
    CONFIRM_BUTTON: 'common_modal_confirm_button', // Подтвердить
    CANCEL_BUTTON: 'common_modal_cancel_button', // Отменить
  },

  LOADER: {
    LOADING_TEXT: 'common_loader_loading_text', // Текст для загрузки
  },
  IMAGE_FALLBACK_TEXT: 'common_image_fallback_text', // Альтернативный текст для изображения заглушки
  VALIDATION: {
    INCORRECT: 'common_validation_incorrect',
    EMAIL_MESSAGE: 'common_validation_email_message',
    NAME_MESSAGE: 'common_validation_name_message',
    PASSWORD_MESSAGE: 'common_validation_password_message',
  },
};

// Ключи для хедера
export const HEADER = {
  LOGO: {
    ALT: 'header_logo_alt', // Логотип
  },
  MAIN_MENU: {
    TITLE: 'header_main_menu_title', // Главное меню
    HOME: 'header_main_menu_home', // Главная
    UPDATES: 'header_main_menu_updates',
    WEB: 'header_main_menu_web_apps', // Веб-приложения
    DESKTOP: 'header_main_menu_desktop_apps', // Десктоп-приложения
    MOBILE: 'header_main_menu_mobile_apps', // Мобильные приложения
    ARTICLES: 'header_main_menu_articles', // Статьи
    MANUAL: 'header_main_menu_manual', // Руководства
    COLLAPSE: 'header_main_menu_collapse', // Свернуть
  },
  LANGUAGE: {
    TITLE: 'header_language_title', // Язык
  },
  CURRENCY: {
    TITLE: 'header_currency_title', // Валюта
  },
  DONATION_MODAL: {
    TITLE: 'header_donation_modal_title', // Пожертвования
    TEXT: 'header_donation_modal_text', // Пожертвования
    KOFI: 'header_donation_modal_kofi', // Ko-fi
    DONATTY: 'header_donation_modal_donatty', // Donatty
    DONATION_ALERTS: 'header_donation_modal_donation_alerts', // DonationAlerts
  },
  USER: {
    TITLE: 'header_user_title', // Пользователь
    PROFILE: 'header_user_profile', // Профиль
    LOGOUT: 'header_user_logout', // Выйти
    WRITE_ARTICLE: 'header_user_write_article', // Написать статью
    PUBLICATIONS: 'header_user_publications', // Публикации
    REQUESTS: 'header_user_requests', // Запросы
    CREATE_USER: 'header_user_create_user', // Создать пользователя
  },
  SEARCH: {
    PLACEHOLDER: 'header_search_placeholder', // Поиск статей...
    RESET_BUTTON: 'header_search_reset_button', // Кнопка сброса
    LOADING: 'header_search_loading', // Загрузка...
    ICON_ALT: 'header_search_icon_alt', // Иконка поиска
    ERROR: {
      NO_RESULTS: 'header_search_error_no_results', // По вашему запросу ничего не найдено. Попробуйте изменить поисковый запрос.
      NETWORK: 'header_search_error_network', // Ошибка сети. Пожалуйста, попробуйте снова позже.
      SERVER: 'header_search_error_server', // Ошибка сервера. Пожалуйста, попробуйте снова позже.
      UNKNOWN: 'header_search_error_unknown', // При выполнении поиска произошла ошибка. Пожалуйста, попробуйте снова позже.
    },
  },
  MOBILE_TREES: {
    ICON_ALT: 'header_mobile_trees_icon_alt', // Иконка открытия мобильного дерева статей
  },
};

// Ключи для футера
export const FOOTER = {
  // Основные страницы
  NAV: {
    TITLE: 'footer_nav_title', // Заголовок для основных страниц
    HOME: 'footer_nav_home', // Главная
    UPDATES: 'footer_nav_updates', // Обновления
    WEB_APPS: 'footer_nav_web_apps', // Веб-приложения
    DESKTOP_APPS: 'footer_nav_desktop_apps', // Десктоп-приложения
    MOBILE_APPS: 'footer_nav_mobile_apps', // Мобильные приложения
    ARTICLES: 'footer_nav_articles', // Статьи
    MANUALS: 'footer_nav_manuals', // Руководства
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

// Ключи для страницы 404
export const NOT_FOUND = {
  PAGE_NOT_EXISTS: 'not_found_page_not_exists', // Страница не существует
  ROLE_PAGE_MESSAGE: 'not_found_role_page_message', //Это страница для {{role}}ов. У вашего аккаунта другая роль.
  BACK_BUTTON: 'not_found_back_button', // Назад
  HOME_BUTTON: 'not_found_home_button', // На главную
  ALT_404: 'not_found_alt_404', // 404
};

// Ключи для страницы статьи 404
export const NOT_FOUND_ARTICLE = {
  ARTICLE_NOT_CREATED: 'not_found_article_not_created', // Данная статья ещё не создана.
  CREATE_BUTTON: 'not_found_article_create_button', // Создать
  ALT_404: 'not_found_article_alt_404', // 404
};

// Главная страница
// Ключи для интро
export const INTRO = {
  TITLE: 'intro_title', // Design for all
  SUBTITLE_MOBILE: 'intro_subtitle_mobile', // Единственная, самая большая,/структурированная и свободная энциклопедия/по дизайну в IT.
  SUBTITLE_DESKTOP: 'intro_subtitle_desktop', //Единственная, самая большая,/структурированная и свободная/энциклопедия по дизайну в IT.
};

// Ключи для навигационной панели
export const MAIN_NAVBAR = {
  GO_TO: 'main_navbar_go_to', // Перейти
};

// Обновления
export const UPDATES = {
  TITLE: 'updates_title', // Обновления
  ARTICLE_TYPE: {
    NEW: 'updates_article_type_new', // Новая статья
    TRANSLATED: 'updates_article_type_translated', // Перевод статьи
  },
  NO_MORE_UPDATES: 'updates_no_more_updates', // Вы просмотрели все обновления!
  ERROR_MESSAGE: 'updates_error_message', // Ошибка при загрузке обновлений. Пожалуйста, попробуйте снова позже.
  RETRY_BUTTON: 'updates_retry_button', // Повторить
};

// Auth Modal
export const AUTH = {
  LOGIN: 'auth_login', // Авторизация
  SIGNUP: 'auth_signup', // Регистрация

  FILL_ALL_FIELDS: 'auth_fill_all_fields', // Пожалуйста, заполните все поля
  LOGIN_LABEL: 'auth_login_label', // Логин
  LOGIN_PLACEHOLDER: 'auth_login_placeholder', // Логин
  PASSWORD_LABEL: 'auth_password_label', // Пароль
  PASSWORD_PLACEHOLDER: 'auth_password_placeholder', // Пароль
  LOGIN_BUTTON: 'auth_login_button', // Войти
  LOGIN_BUTTON_ARIA: 'auth_login_button_aria', // Кнопка входа

  EMAIL_LABEL: 'auth_email_label', // Email
  EMAIL_PLACEHOLDER: 'auth_email_placeholder', // example@domain.com
  PROJECTS_LABEL: 'auth_projects_label', // Ссылки на ваши проекты
  PROJECTS_PLACEHOLDER: 'auth_projects_placeholder', // https://example.com/my-project
  ADD_PROJECT_ALT: 'auth_add_project_alt', // Добавить проект
  CAPTCHA_LABEL: 'auth_captcha_label', // Капча
  EMAIL_EXISTS: 'auth_email_exists', // Указанная почта уже есть в системе.
  PROJECT_EXISTS: 'auth_project_exists', // Ссылка на проект была прислана ранее.
  CHANGE_DATA: 'auth_change_data', // Измените данные и попробуйте снова.
  CAPTCHA_ERROR: 'auth_captcha_error', // Возможно, ошибка в капче. Решите новую.
  POLITICS_TEXT: 'auth_politics_text', // Нажимая кнопку «Зарегистрироваться» вы:
  GIVE_PERMISSION: 'auth_give_permission', // Даете право на обработку
  PERSONAL_DATA: 'auth_personal_data', // персональных данных,
  AGREE_WITH: 'auth_agree_with', // Соглашаетесь с
  TERMS_OF_SERVICE: 'auth_terms_of_service', // пользовательским соглашениемя
  SIGNUP_BUTTON: 'auth_signup_button', // Регистрация
  SIGNUP_BUTTON_ARIA: 'auth_signup_button_aria', // Кнопка регистрации
  SUCCESS_TITLE: 'auth_success_title', // Заявка отправлена!
  SUCCESS_MESSAGE: 'auth_success_message', // Заявка на регистрацию аккаунта отправлена.
  SUCCESS_DESCRIPTION: 'auth_success_description', // Компетенции каждого автора проверяются администраторами вручную по предоставленным ссылкам на проекты.
  SUCCESS_WARNING: 'auth_success_warning', // Неопытные участники не могут стать авторами
  NOTIFICATION_MESSAGE: 'auth_notification_message', //После одобрения или отклонения заявки вы получите уведомление на email
};

export const CATALOG = {
  SIDE_BAR: {
    SEARCH_INPUT: {
      NO_RESULTS: 'catalog_sidebar_search_input_no_results', // Ничего не найдено
    },
  },
  HEADER: {
    PUBLISHED: 'catalog_header_published', // Опубликовано
    UPDATED: 'catalog_header_updated', // Обновлено
  },

  AUTHOR: {
    SOCIALS_TEXT: 'catalog_author_socials_text', // Здесь будут контакты автора
    AVATAR_ALT: 'catalog_author_avatar_alt', // Аватар
    SHOW_ALL: 'catalog_author_show_all', // Показать все
    HIDE_ALL: 'catalog_author_hide_all', // Скрыть
  },

  ARTICLE: {
    BLANK: {
      SEARCH_TREE: 'catalog_article_blank_search_tree', // Воспользуйтесь {{tree}} или {{header}} статей
      TREE: 'catalog_article_blank_search_tree_tree', // поиском по дереву
      HEADER: 'catalog_article_blank_search_tree_header', // поиском по заголовкам
    },
    IMAGE: {
      ALT: 'catalog_article_image_alt', // Превью статьи
      FALLBACK_ALT: 'catalog_article_image_fallback_alt', // Заглушка для картинки статьи
    },
    TITLE: 'catalog_article_title', // Заголовок статьи

    RECOMMENDATIONS: {
      TITLE: 'catalog_article_recommendations_title', // Рекомендации авторов
    },
  },
  REVIEWERS: {
    AVATAR_ALT: 'catalog_reviewers_avatar_alt', // Аватар рецензента
    TITLE: 'catalog_reviewers_title', // Рецензенты
    SEE_MORE: 'catalog_reviewers_see_more', // Показать больше
    SEE_LESS: 'catalog_reviewers_see_less', // Показать меньше
    PROPOSE_CHANGES_LINK: 'catalog_reviewers_propose_changes_link', //Предложите правки
    PROPOSE_CHANGES_TEXT: 'catalog_reviewers_propose_changes_text', // Тчтобы стать рецензентом
  },
};

export const CREATION = {
  ORIGINAL_ARTICLE_TITLE: 'creation_original_article_title', // Оригинальная статья

  VIEW_ARTICLE: {
    UPDATED_TITLE: 'creation_view_article_updated_title', // Обновление статьи
    CREATED_LANG_TITLE: 'creation_view_article_created_lang_title', // Перевод статьи
    CREATED_TITLE: 'creation_view_article_created_title', // Создание новой статьи

    LANGUAGE_TITLE: 'creation_view_article_language_title', // Язык
    MAIN_CATEGORY_TITLE: 'creation_view_article_main_category_title', // Основная категория
    SUB_CATEGORY_TITLE: 'creation_view_article_sub_category_title', // Подкатегория
    IMAGE_TITLE: 'creation_view_article_image_title', // Картинка статьи
    IMAGE_ALT: 'creation_view_article_image_alt', // Картинка статьи
    IMAGE_FALLBACK_ALT: 'creation_view_article_image_fallback_alt', // Заглушка для картинки статьи
    ARTICLE_TITLE: 'creation_view_article_article_title', // Заголовок статьи
    DESCRIPTION_TITLE: 'creation_view_article_description_title', // Контент статьи
    RECOMMENDATIONS_TITLE: 'creation_view_article_recommendations_title', // Рекомендации авторов
    RECOMMENDATIONS_EMPTY: 'creation_view_article_recommendations_empty', // Отсутствуют
  },

  NEW_ARTICLE: {
    CREATED_TITLE: 'creation_new_article_created_title', // Создание новой статьи
    UPDATED_TITLE: 'creation_new_article_updated_title', //Внесение правок
    CREATED_LANG_TITLE: 'creation_new_article_created_lang_title', // Перевод статьи
    LANG_TITLE: 'creation_new_article_lang_title', // Язык
    MAIN_CATEGORY_TITLE: 'creation_new_article_main_category_title', // Основная категория
    SUB_CATEGORY_TITLE: 'creation_new_article_sub_category_title', // Подкатегория
    CHECK_SUB_CATEGORY_HINT_LINK: 'creation_new_article_sub_category_hint_link', //существующей статьи
    SUB_CATEGORY_PLACEHOLDER: 'creation_new_article_sub_category_placeholder', // страна/город/улица/дом
    IMAGE_TITLE: 'creation_new_article_image_title', // Картинка статьи
    IMAGE_ALT: 'creation_new_article_image_alt', // Ваша картинка
    IMAGE_FALLBACK_ALT: 'creation_new_article_image_fallback_alt', // Заглушка для картинки статьи
    ARTICLE_TITLE: 'creation_new_article_article_title', // Заголовок статьи
    TITLE_PLACEHOLDER: 'creation_new_article_title_placeholder', // Карточка товара в маркетплейсе
    CONTENT_TITLE: 'creation_new_article_content_title', // Заголовок для контента
    RECOMMENDATIONS_TITLE: 'creation_new_article_recommendations_title', //  Рекомендации авторов
    RECOMMENDATIONS_ADD_BTN_ALT:
      'creation_new_article_recommendations_add_btn_alt', // Иконка добавления рекомендации
    RECOMMENDATIONS_ADD_BTN_TITLE:
      'creation_new_article_recommendations_add_btn_title', // Добавить
    RECOMMENDATIONS_EDIT_BTN_ALT:
      'creation_new_article_recommendations_edit_btn_alt', // Изменить рекомендацию
    RECOMMENDATIONS_DELETE_BTN_ALT:
      'creation_new_article_recommendations_delete_btn_alt', // Удалить рекомендацию
    MODAL_RECOMMENDATIONS: {
      CHANGE_BTN_TITLE:
        'creation_new_article_modal_recommendations_change_btn_title', // Заменить рекомендацию
      ADD_BTN_TITLE: 'creation_new_article_modal_recommendations_add_btn_title', // Добавить рекомендацию
      IMAGE_TITLE: 'creation_new_article_modal_recommendations_image_title', // Ссылка на картинку
      INPUT_IMAGE_PLACEHOLDER:
        'creation_new_article_modal_recommendations_input_image_placeholder', // https://site.com/image.jpg
    },
    MODAL_ATTENTION: {
      TEXT: 'creation_new_article_modal_attention_text', // "=Последние изменения не сохранены, сохранить в черновик?
    },
    DROPDOWN: {
      SELECT: 'creation_new_article_dropdown_select',
    },
    SUB_CATEGORY: {
      OCCUPIED: 'creation_new_article_sub_category_occupied',
      UPDATE_HINT: 'creation_new_article_sub_category_update_hint',
      OCCUPIED_WITH_HINT:
        'creation_new_article_sub_category_occupied_with_hint',
      INVALID_REQUEST: 'creation_new_article_sub_category_invalid_request',
      AUTH_REQUIRED: 'creation_new_article_sub_category_auth_required',
      CHECK_ERROR: 'creation_new_article_sub_category_check_error',
    },
  },
  RECOMMENDATION: {
    BASE_ERROR: 'creation_recommendation_base_error',
    FULL_ERROR: 'creation_recommendation_full_error',
    FETCH_ERROR: 'creation_recommendation_fetch_error',
    DOUBLE_ERROR: 'creation_recommendation_double_error',
    LANG_ERROR: 'creation_recommendation_lang_error',
    SELF_ERROR: 'creation_recommendation_self_error',
    CHECKING: 'creation_recommendation_checking',
    EXISTS: 'creation_recommendation_exists',
    ENTER_URL: 'creation_recommendation_enter_url',
    PLACEHOLDER: 'creation_recommendation_placeholder',
  },
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
    PLACEHOLDER: 'author_mobile_placeholder',
    LOGOUT_BUTTON: 'author_mobile_logout_button',
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
    PARTIALLY_REJECTED: 'author_table_partially_rejected', // Частично отклонено
  },
};

// Ключи для навбара админа
export const ADMIN = {
  TOOLTIP: {
    EDIT: 'admin_tooltip_edit', //Редактировать
    VIEW: 'admin_tooltip_view', //Просмотреть
    DRAFT: 'admin_tooltip_draft', //В черновик
    DELETE: 'admin_tooltip_delete', //Удалить
    REASON: 'admin_tooltip_reason', //Причина
  },

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

  ARTICLE_DECISION: {
    ORIGINAL_ARTICLE_TITLE: 'admin_article_decision_original_article_title', // Оригинал статьи
    UPDATED_TITLE: 'admin_article_decision_updated_title', // Обновление статьи
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

  MODAL_REASONS: {
    SUB_CATEGORY: 'admin_modal_reasons_sub_category', // Подкатегория
    TITLE: 'admin_modal_reasons_title', // Заголовок
    IMAGE: 'admin_modal_reasons_image', // Картинка
    DESCRIPTION: 'admin_modal_reasons_description', // Контент
    RECOMMENDATIONS: 'admin_modal_reasons_recommendations', // Рекомендации
    DENY: 'admin_modal_reasons_deny', // Красный крестик
    APPROVE: 'admin_modal_reasons_approve', // Зелёная галочка
  },
};

// Ключи для статьи

export const CHECK_FIELDS = {
  LANGUAGE_TITLE: 'check_fields_language_title',
  SUB_CATEGORY_TITLE: 'check_fields_sub_category_title',
  IMAGE_TITLE: 'check_fields_image_title',
  ARTICLE_TITLE: 'check_fields_article_title',
  DESCRIPTION_TITLE: 'check_fields_description_title',
  RECOMMENDATIONS_TITLE: 'check_fields_recommendations_title',
  IMAGE_ALT: 'check_fields_image_alt',
  IMAGE_FALLBACK_ALT: 'check_fields_image_fallback_alt',
};

export const DROPDOWN = {
  AMOUNT: {
    ARROW_ALT: 'dropdown_amount_arrow_alt', // Альтернативный текст для стрелки
  },
};

export const PROFILE = {
  FIO_LABEL: 'profile_fio_label', // Лейбл для ФИО
  SOCIAL_LABEL: 'profile_social_label', // Лейбл для социальных сетей
  LOGIN_LABEL: 'profile_login_label', // Лейбл для логина
  PASSWORD_LABEL: 'profile_password_label', // Лейбл для пароля

  INPUT_EDITABLE: {
    PLACEHOLDER: 'profile_input_editable_placeholder', // Плейсхолдер для ввода email
    EDIT_ICON_ALT: 'profile_input_editable_edit_icon_alt', // Альтернативный текст для кнопки редактирования
  },
  SAVE_BTN_LABEL: 'profile_save_btn_label', // Лейбл для кнопки сохранить
  CANCEL_BTN_LABEL: 'profile_cancel_btn_label', // Лейбл для кнопки отменить

  MODAL: {
    FIO_TITLE: 'profile_modal_fio_title', // Заголовок для модального окна ФИО
    FIO_PLACEHOLDER: 'profile_modal_fio_placeholder', // Плейсхолдер для ввода ФИО
    EDIT_SOCIAL_TITLE: 'profile_modal_edit_social_title', // Заголовок для модального окна социальных сетей
    ADD_SOCIAL_TITLE: 'profile_modal_add_social_title', // Заголовок для модального окна добавления социальных сетей
    IMAGE_TITLE: 'profile_modal_image_title', // Заголовок для модального окна изображения
    INPUT_IMAGE_PLACEHOLDER: 'profile_modal_input_image_placeholder', // Плейсхолдер для ввода изображения
    LOGIN_TITLE: 'profile_modal_login_title', // Заголовок для модального окна логина
    PASSWORD_TITLE: 'profile_modal_password_title', // Заголовок для модального окна пароля
    TITLE: 'profile_modal_title', // Заголовок для модального окна
    OLD_TITLE: 'profile_modal_old_title', // Заголовок для модального окна старого значения
    NEW_TITLE: 'profile_modal_new_title', // Заголовок для модального окна нового значения
    SOCIALS_ERROR: 'profile_modal_socials_error', // Сообщение об ошибке для социальных сетей
    SOCIALS_ERROR_LENGTH: 'profile_modal_socials_error_length', // Сообщение об ошибке для социальных сетей
    SOCIALS_PHONE_TITLE: 'profile_modal_socials_phone_title', // Заголовок для модального окна телефон
    SOCIALS_EMAIL_TITLE: 'profile_modal_socials_email_title', // Заголовок для модального окна email
    SOCIALS_SOCIALS_TITLE: 'profile_modal_socials_socials_title', // Заголовок для модального окна социальные сети
    SOCIALS_PHONE_PLACEHOLDER: 'profile_modal_socials_phone_placeholder', // Плейсхолдер для ввода телефон
    SOCIALS_EMAIL_PLACEHOLDER: 'profile_modal_socials_email_placeholder', // Плейсхолдер для ввода email
    SOCIALS_PLACEHOLDER: 'profile_modal_socials_placeholder', // Плейсхолдер для ввода социальные сети
    SOCIALS_TITLE: 'profile_modal_socials_title', // Заголовок для модального окна социальные сети
  },
  SOCIAL_BAR: {
    ADD_ICON_ALT: 'profile_social_bar_add_icon_alt', // Альтернативный текст для кнопки добавления социальных сетей
  },
};

export const USER = {
  SOCIALS_MISSING: 'user_socials_missing', // Текст для отсутствия социальных сетей
  SEE_MORE: 'user_see_more', // Текст для показа всех социальных сетей
  SEE_LESS: 'user_see_less', // Текст для скрытия социальных сетей
};

export const SEARCH_INPUT = {
  PLACEHOLDER: 'search_input_placeholder', // Поиск...
  RESET_BUTTON: 'search_input_reset_button', // Кнопка сброса
  ICON_ALT: 'search_input_icon_alt', // Иконка поиска
};

export const RTE = {
  BUTTON: {
    PARAGRAPH: 'rte_button_paragraph',
    HEADING1: 'rte_button_heading1',
    HEADING2: 'rte_button_heading2',
    HEADING3: 'rte_button_heading3',
    HEADING4: 'rte_button_heading4',
    HEADING5: 'rte_button_heading5',
    HEADING6: 'rte_button_heading6',
    ITALIC: 'rte_button_italic',
    BOLD: 'rte_button_bold',
    UNDERLINE: 'rte_button_underline',
    CODE: 'rte_button_code',
    CODE_BLOCK: 'rte_button_code_block',
    ALIGN_LEFT: 'rte_button_align_left',
    ALIGN_CENTER: 'rte_button_align_center',
    ALIGN_RIGHT: 'rte_button_align_right',
    ALIGN_JUSTIFY: 'rte_button_align_justify',
    BULLET_LIST: 'rte_button_bullet_list',
    ORDERED_LIST: 'rte_button_ordered_list',
    SUBSCRIPT: 'rte_button_subscript',
    SUPERSCRIPT: 'rte_button_superscript',
    IMAGE: 'rte_button_image',
    LINK: 'rte_button_link',
  },
  PLACEHOLDER: 'rte_placeholder', // Плейсхолдер для редактора
  IMAGE: {
    ERRORS: {
      FILE_SIZE: 'rte_image_errors_file_size', // Вес файла больше 23 Мб
      FILE_TYPE: 'rte_image_errors_file_type', // Неверный формат файла
      NO_IMAGE_ON_URL: 'rte_image_errors_no_image_on_url', // Не удалось получить изображение по указанной ссылке
      BROKEN_URL: 'rte_image_errors_broken_url', // Неккоректный URL-адрес
      FILE_READING: 'rte_image_errors_file_reading', // Ошибка при чтении файла
      ON_HOSTING_LOADING: 'rte_image_errors_on_hosting_loading', // Не удалось загрузить файл на хостинг
      FROM_LINK_LOADING: 'rte_image_errors_from_link_loading', // Не удалось загрузить файл по указанной ссылке
    },
  },
  IMAGE_MODAL: {
    TITLE: 'rte_image_modal_title', //  Добавить изображение
    TYPOGRAPHY: 'rte_image_modal_input_placeholder', //   Укажите ссылку или выберите/перетащите файл
    INPUT_PLACEHOLDER: 'rte_image_modal_input_placeholder', // Адрес изображения
  },
};
