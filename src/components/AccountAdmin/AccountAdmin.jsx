import {
  Profile,
  Account,
  AdminCreateUser,
  AccountAdminNavbar,
  NotFound,
} from 'components';
import AdminRequests from 'components/AdminRequests/AdminRequests';
import Decisions from 'components/Decisions/Decisions';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getCurrentUser } from 'store/selectors';
import { adminHash } from 'utils/constants';
import { useLogout } from 'utils/hooks/useLogout';

export default function AccountAdmin({ hash, resetSection }) {
  const user = useSelector(getCurrentUser);
  const [, setSearchParams] = useSearchParams();
  const isAdmin = user?.role === 'admin' || user?.role === 'super_admin';

  const handleLogout = useLogout({ 
    resetSection,
    redirectTo: '/'
  });

  useEffect(() => {
    !user && setSearchParams({ 'modal-auth': 'login' });
  }, [user, setSearchParams]);

  return isAdmin ? (
    <Account navBar={<AccountAdminNavbar hash={hash} logout={handleLogout} />}>
      {hash === adminHash.user && <AdminCreateUser />}
      {hash === adminHash.profile && <Profile resetSection={resetSection} />}
      {adminHash.requests.includes(hash) && <AdminRequests hash={hash} />}
      {adminHash.decisions.includes(hash) && <Decisions />}
    </Account>
  ) : user ? (
    <NotFound resetSection={resetSection} role={'админ'} />
  ) : null;
}
