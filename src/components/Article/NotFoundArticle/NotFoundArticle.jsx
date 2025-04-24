import { useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './NotFoundArticle.css';
import { Button } from 'components';
import notFound404Svg from 'images/404.svg';
import { getCurrentUser } from 'store/slices/user';
import { NOT_FOUND_ARTICLE, AUTH } from 'utils/translationKeys';

function NotFoundArcticle() {
  const [, setSearchParams] = useSearchParams();
  const currentUser = useSelector(getCurrentUser);
  const { t } = useTranslation();

  const openModal = (evt) => {
    if (evt.target.textContent === t(AUTH.LOGIN_BUTTON)) {
      setSearchParams({ 'modal-auth': 'login' });
    } else {
      setSearchParams({ 'modal-auth': 'signUp' });
    }
  };

  return (
    <section className="not-found-article">
      <img
        src={notFound404Svg}
        className="not-found-article__status-code"
        alt={t(NOT_FOUND_ARTICLE.ALT_404)}
      />
      <h2 className="not-found-article__text">{t(NOT_FOUND_ARTICLE.ARTICLE_NOT_CREATED)}</h2>
      {currentUser ? (
        <Link
          to="/#/author/new-article"
          className="button button_type_bright not-found-article__button"
        >
          {t(NOT_FOUND_ARTICLE.CREATE_BUTTON)}
        </Link>
      ) : (
        <div className="not-found-article__actions-container">
          <Button
            type="button"
            theme="bright"
            extraClass="not-found-article__button"
            onClick={openModal}
          >
            {t(AUTH.LOGIN_BUTTON)}
          </Button>
          <Button
            type="button"
            theme="bright"
            extraClass="not-found-article__button"
            onClick={openModal}
          >
            {t(AUTH.SIGNUP_BUTTON)}
          </Button>
        </div>
      )}
    </section>
  );
}

export default NotFoundArcticle;
