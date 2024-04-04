import './NotFoundArticle.css';
import notFound404Svg from '../../../images/404.svg';
import { useSelector } from 'react-redux';
import { getCurrentUser } from 'store/selectors';
import { Link } from 'react-router-dom';

function NotFoundArcticle() {
  const currentUser = useSelector(getCurrentUser);

  return (
    <section className="not-found-article">
      <img src={notFound404Svg} className="not-found-article__status-code" />
      <h2 className="not-found-article__text">Данная статья ещё не создана.</h2>
      {currentUser ? (
        <Link
          to="/articles/create"
          className="button button_type_bright not-found-article__button"
        >
          Создать
        </Link>
      ) : (
        <div className="not-found-article__actions-container">
          <Link
            to="/login"
            className="button button_type_bright not-found-article__button"
          >
            Войти
          </Link>
          <Link
            to="/registration"
            className="button button_type_bright not-found-article__button"
          >
            Регистрация
          </Link>
        </div>
      )}
    </section>
  );
}

export default NotFoundArcticle;
