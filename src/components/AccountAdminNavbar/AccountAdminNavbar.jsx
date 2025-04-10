import { AdminNavbar, AdminAppNewAuthorNavbar } from 'components';
import { adminHash } from 'utils/constants';

export default function AccountAdminNavbar({ hash, logout }) {
  return (
    <>
      {adminHash.decisions.includes(hash) ? (
        <AdminAppNewAuthorNavbar />
      ) : (
        <AdminNavbar logout={logout} />
      )}
    </>
  );
}
