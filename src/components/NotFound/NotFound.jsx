import './NotFound.css';
import notFound404Svg from '../../images/404.svg';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="not-found">
      <img src={notFound404Svg} className="not-found__status-code" />
      <h2 className="not-found__text">Страница не существует</h2>
      <div className="not-found__actions-container">
        <Link to={-1} className="button button_type_bright not-found__button">
          Назад
        </Link>
        <Link to="/" className="button button_type_bright not-found__button">
          На главную
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
