import { Link } from 'react-router-dom';
import { adminHash, listRangeOptions } from 'utils/constants';
import './AdminApplicationsNav.css';
import { DropdownAmount } from 'components';

export default function AdminApplicationsNav({ hash, setPagination }) {
  return (
    <nav className="admin-applications-nav">
      <ul className="admin-applications-nav__list">
        <li>
          <Link
            to={adminHash.creates}
            className={`admin-applications-nav__item${
              hash === adminHash.creates
                ? ' admin-applications-nav__item_active'
                : ''
            }`}
          >
            Создание
          </Link>
        </li>
        <li>
          <Link
            to={adminHash.updates}
            className={`admin-applications-nav__item${
              hash === adminHash.updates
                ? ' admin-applications-nav__item_active'
                : ''
            }`}
          >
            Обновление
          </Link>
        </li>
        <li>
          <Link
            to={adminHash.accounts}
            className={`admin-applications-nav__item${
              hash === adminHash.accounts
                ? ' admin-applications-nav__item_active'
                : ''
            }`}
          >
            Аккаунты
          </Link>
        </li>
        <li>
          <Link
            to={adminHash.closed}
            className={`admin-applications-nav__item${
              hash === adminHash.closed
                ? ' admin-applications-nav__item_active'
                : ''
            }`}
          >
            Закрытые
          </Link>
        </li>
      </ul>
      <DropdownAmount
        className="author-articles-nav__more"
        id="list-range"
        name="list range"
        options={listRangeOptions}
        handlePagination={setPagination}
      />
    </nav>
  );
}
