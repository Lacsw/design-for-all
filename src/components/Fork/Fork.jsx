import { useLocation, useParams } from 'react-router-dom';
import {
  Main,
  Catalog,
  AccountAuthor,
  AccountAdmin,
  NotFound,
} from 'components';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectTitles } from 'store/slices/article/slice';
import UpdatesPage from 'components/Updates/UpdatesPage';
import { getLanguage } from 'store/slices/user';
import ProtectedHashRoute from '../ProtectedHashRoute/ProtectedHashRoute';
import { useRouteType } from 'utils/hooks/useRouteType';

const Fork = () => {
  const location = useLocation();
  const { articleId } = useParams();
  const titles = useSelector(selectTitles);
  const language = useSelector(getLanguage);

  // проверка типа маршрута
  const {
    isAdminRoute,
    isAuthorRoute,
    isUpdatesRoute,
    isCatalogRoute,
    isMainRoute,
  } = useRouteType(location, titles, language, articleId);

  // при переходе на другую страницу скролл наверх
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', //для плавного скролла
    });
  }, [location.key]);

  if (isAdminRoute) {
    return (
      <ProtectedHashRoute requiredRoles={['admin', 'super_admin']}>
        <AccountAdmin hash={location.hash} />
      </ProtectedHashRoute>
    );
  }

  if (isAuthorRoute) {
    return (
      <ProtectedHashRoute requiredRole="mentor">
        <AccountAuthor hash={location.hash} />
      </ProtectedHashRoute>
    );
  }

  if (isUpdatesRoute) {
    return <UpdatesPage />;
  }

  if (isCatalogRoute) {
    return <Catalog />;
  }

  if (isMainRoute) {
    return <Main />;
  }

  return <NotFound />; // если не совпадает ни один из маршрутов, возвращаем страницу 404
};

export default Fork;
