import { useLocation, useParams } from 'react-router-dom';
import { Main, Catalog, AccountAuthor, AccountAdmin, NotFound } from 'components';
import { adminHash, hashPaths } from 'utils/constants';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectTitles } from 'store/slices/article/slice';
import UpdatesPage from 'components/Updates/UpdatesPage';
import { getLanguage } from 'store/slices/user';
import ProtectedHashRoute from '../ProtectedHashRoute/ProtectedHashRoute';

const Fork = () => {
  const location = useLocation();
  const { articleId } = useParams();
  const titles = useSelector(selectTitles);
  const language = useSelector(getLanguage);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.key]);

  const rawHash = location.hash ? location.hash.replace(/^#\/?/, '') : '';
  const validKeys = Object.keys(titles?.[language] || {});

  if (Object.values(adminHash).includes(location.hash)) {
    return (
      <ProtectedHashRoute requiredRoles={['admin', 'super_admin']}>
        <AccountAdmin hash={location.hash} />
      </ProtectedHashRoute>
    );
  }

  if (rawHash === 'updates') {
    return <UpdatesPage />;
  }

  if (rawHash === 'articles') {
    return <NotFound />;
  }

  if (articleId || (rawHash && validKeys.includes(rawHash))) {
    return <Catalog section={articleId ? articleId : rawHash} />;
  }

  if (Object.values(hashPaths).includes(location.hash)) {
    return (
      <ProtectedHashRoute requiredRole="mentor">
        <AccountAuthor hash={location.hash} />
      </ProtectedHashRoute>
    );
  }

  if (location.pathname === '/' && !location.hash) {
    return <Main />;
  }

  // Для всех остальных случаев показываем 404
  return <NotFound />;

};

export default Fork;
