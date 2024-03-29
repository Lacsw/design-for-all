import { useLocation } from 'react-router-dom';

import { AdminNavbar, AdminAppNewAuthorNavbar } from 'components';

export default function AccountAdminNavbar() {
  const location = useLocation();

  return (
    <>
      {location.pathname === '/admin/applications/new-author' ? (
        <AdminAppNewAuthorNavbar />
      ) : (
        <AdminNavbar />
      )}
    </>
  );
}
