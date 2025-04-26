import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './NotFound.css';
import notFound404Svg from 'images/404.svg';
import { NOT_FOUND } from 'utils/translationKeys';

function NotFound({ resetSection, role }) {
  const { t } = useTranslation();

  return (
    <section className="not-found">
      {!role && (
        <img
          src={notFound404Svg}
          className="not-found__status-code"
          alt={t(NOT_FOUND.ALT_404)}
        />
      )}
      <h2 className="not-found__text">
        {role
          ? t(NOT_FOUND.ROLE_PAGE_MESSAGE, { role })
          : t(NOT_FOUND.PAGE_NOT_EXISTS)}
      </h2>
      <div className="not-found__actions-container">
        <Link to={-1} className="button button_type_bright not-found__button">
          {t(NOT_FOUND.BACK_BUTTON)}
        </Link>
        <Link
          to="/"
          className="button button_type_bright not-found__button"
          onClick={resetSection}
        >
          {t(NOT_FOUND.HOME_BUTTON)}
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
