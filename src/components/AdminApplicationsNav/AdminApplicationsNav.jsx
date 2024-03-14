import { Link } from 'react-router-dom';
import './AdminApplicationsNav.css';

export default function AdminApplicationsNav() {
  return (
    <nav className="admin-applications-nav">
      <ul className="admin-applications-nav__list">
        <li>
          <Link
            to="/"
            className="admin-applications-nav__item admin-applications-nav__item_active"
          >
            Создание
          </Link>
        </li>
        <li>
          <Link to="/" className="admin-applications-nav__item">
            Обновление
          </Link>
        </li>
        <li>
          <Link to="/" className="admin-applications-nav__item">
            Аккаунты
          </Link>
        </li>
      </ul>
      <Link to="/" className="admin-applications-nav__more">
        20
      </Link>
    </nav>
  );
}
