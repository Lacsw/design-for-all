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
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getCurrentUser } from 'store/slices/user';
import { adminHash } from 'utils/constants';
import { useLogout } from 'utils/hooks/useLogout';
import { COMMON } from 'utils/translationKeys';
import { useTranslation } from 'react-i18next';
import { setCurrentSection } from 'store/slices/catalog/slice';


export default function AccountAdmin({ hash }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleLogout = useLogout();
  const user = useSelector(getCurrentUser);
  const [, setSearchParams] = useSearchParams();
  const isAdmin = user?.role === 'admin' || user?.role === 'super_admin';
  const resetSection = () => {
    dispatch(setCurrentSection(''));
  };

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
    <NotFound resetSection={resetSection} role={t(COMMON.ROLES.ADMIN)} />
  ) : null;
}
