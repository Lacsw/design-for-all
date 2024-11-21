import {
  Profile,
  Account,
  AdminCreateUser,
  AccountAdminNavbar,
  NotFound,
} from 'components';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getCurrentUser } from 'store/selectors';
import { adminHash } from 'utils/constants';

export default function AccountAdmin({ hash, resetSection }) {
  const user = useSelector(getCurrentUser);
  const [, setSearchParams] = useSearchParams();
  const isAdmin = user?.role === 'admin' || user?.role === 'super_admin';

  useEffect(() => {
    !user && setSearchParams({ 'modal-auth': 'login' });
  }, [user, setSearchParams]);

  return isAdmin ? (
    <Account navBar={<AccountAdminNavbar />}>
      {hash === adminHash.create && <AdminCreateUser />}
      {hash === adminHash.profile && <Profile resetSection={resetSection} />}
    </Account>
  ) : user ? (
    <NotFound resetSection={resetSection} role={'админ'} />
  ) : null;
}
