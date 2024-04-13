import { useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';

import './NotFoundArticle.css';
import { Button } from 'components';
import notFound404Svg from 'images/404.svg';
import { getCurrentUser } from 'store/selectors';

function NotFoundArcticle() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentUser = useSelector(getCurrentUser);

  const openModal = (evt) => {
    if (evt.target.textContent === 'Войти') {
      setSearchParams({ 'modal-auth': 'login' });
    } else {
      setSearchParams({ 'modal-auth': 'signUp' });
    }
  };

  return (
    <section className="not-found-article">
      <img src={notFound404Svg} className="not-found-article__status-code" />
      <h2 className="not-found-article__text">Данная статья ещё не создана.</h2>
      {currentUser ? (
        <Link
          to="/author/new-article"
          className="button button_type_bright not-found-article__button"
        >
          Создать
        </Link>
      ) : (
        <div className="not-found-article__actions-container">
          <Button
            type="button"
            theme="bright"
            extraClass="not-found-article__button"
            onClick={openModal}
          >
            Войти
          </Button>
          <Button
            type="button"
            theme="bright"
            extraClass="not-found-article__button"
            onClick={openModal}
          >
            Регистрация
          </Button>
        </div>
      )}
    </section>
  );
}

export default NotFoundArcticle;
