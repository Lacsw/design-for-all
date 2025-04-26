import { Link } from 'react-router-dom';
import { adminHash, listRangeOptions } from 'utils/constants';
import './AdminApplicationsNav.css';
import { DropdownAmount } from 'components';
import { useTranslation } from 'react-i18next';
import { ADMIN } from 'utils/translationKeys';

export default function AdminApplicationsNav({ hash, setPagination }) {
  const { t } = useTranslation();
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
            {t(ADMIN.APPLICATIONS_NAVBAR.CREATES)}
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
            {t(ADMIN.APPLICATIONS_NAVBAR.UPDATES)}
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
            {t(ADMIN.APPLICATIONS_NAVBAR.ACCOUNTS)}
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
            {t(ADMIN.APPLICATIONS_NAVBAR.CLOSED)}
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
