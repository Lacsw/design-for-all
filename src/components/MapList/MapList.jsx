import { Link } from 'react-router-dom';
import './MapList.css';

export default function MapList() {
  return (
    <div className="map">
      <div className="map__container">
        <h2 className="map__title">Карта сайта</h2>
        <ul className="map__list">
          <li>
            <Link to="/" className="map__main-link">
              Главная
            </Link>
            <ol className="map__list-internal">
              <li>
                <Link to="/" className="map__link">
                  Десктоп-приложения
                </Link>
              </li>
              <li>
                <Link to="/" className="map__link">
                  Мобильные приложения
                </Link>
              </li>
              <li>
                <Link to="/" className="map__link">
                  Веб - приложения
                </Link>
              </li>
              <li>
                <Link to="/" className="map__link">
                  Статьи
                </Link>
              </li>
              <li>
                <Link to="/" className="map__link">
                  Обновления
                </Link>
              </li>
            </ol>
          </li>
          <li>
            <Link to="/" className="map__main-link">
              Руководства
            </Link>
            <ol className="map__list-internal">
              <li>
                {' '}
                <Link to="/" className="map__link">
                  Руководство по написанию статей
                </Link>
              </li>
              <li>
                {' '}
                <Link to="/" className="map__link">
                  Руководство по SEO для статей
                </Link>
              </li>
              <li>
                {' '}
                <Link to="/" className="map__link">
                  Политика конфидециальности
                </Link>
              </li>
              <li>
                {' '}
                <Link to="/" className="map__link">
                  Пользовательское соглашение
                </Link>
              </li>
            </ol>
          </li>
          <li>
            <Link to="/" className="map__main-link">
              Руководства
            </Link>
            <ol className="map__list-internal">
              <li>
                {' '}
                <Link to="/" className="map__link">
                  Руководство по написанию статей
                </Link>
              </li>
              <li>
                {' '}
                <Link to="/" className="map__link">
                  Руководство по SEO для статей
                </Link>
              </li>
              <li>
                {' '}
                <Link to="/" className="map__link">
                  Политика конфидециальности
                </Link>
              </li>
              <li>
                {' '}
                <Link to="/" className="map__link">
                  Пользовательское соглашение
                </Link>
              </li>
            </ol>
          </li>
          <li>
            <Link to="/" className="map__main-link">
              Личный кабинет автора
            </Link>
            <ol className="map__list-internal">
              <li>
                {' '}
                <Link to="/" className="map__link">
                  Профиль
                </Link>
              </li>
              <li>
                {' '}
                <Link to="/" className="map__link">
                  Написать статью
                </Link>
              </li>
              <li>
                {' '}
                <Link to="/" className="map__link">
                  Публикации
                </Link>
              </li>
            </ol>
          </li>
          <li>
            <Link to="/" className="map__main-link">
              Пожертвовать
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
