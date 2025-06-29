import { useEffect, useState } from 'react';
import './AccountAuthor.css';
import {
  AuthorArticlesNav,
  AuthorArticlesList,
  Profile,
  Account,
  NotFound,
  NewArticleNavbar,
  AuthorNavbar,
  Creation,
  MobileAccountAuthor,
} from 'components';

import authorApi from 'utils/api/author';
import { hashPaths } from 'utils/constants';
import { useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useIsMobile } from 'utils/hooks/useIsMobile';
import { useLogout } from 'utils/hooks/useLogout';

const authorTabs = ['approve', 'drafted', 'offered', 'rejected', 'deleted'];

export default function AccountAuthor({ hash }) {
  const navigate = useNavigate();
  const handleLogout = useLogout();
  const isMobile = useIsMobile();
  const user = useSelector((state) => state.user.currentUser);
  const [, setSearchParams] = useSearchParams();
  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState('20');
  const [tab, setTab] = useState(() => {
    const parts = hash.split('/');
    const end = parts[parts.length - 1];
    return authorTabs.includes(end) ? end : 'approve';
  });
  const isValid = Object.values(hashPaths).includes(hash);
  const access = isValid && user?.role === 'mentor';
  const NavBar =
    hash === hashPaths.newArticle ? NewArticleNavbar : AuthorNavbar;



  useEffect(() => {
    if (!isValid || (user && !access)) return;
    if (!access) {
      setSearchParams({ 'modal-auth': 'login' });
      return;
    }
    if (hash === hashPaths.articles) {
      navigate(hash + '/' + tab);
      return;
    }
    if (hash !== hashPaths.newArticle && hash !== hashPaths.profile) {
      authorApi
        .getArticles({ pagination: pagination, status: tab })
        .then(setArticles)
        .catch(() => setArticles([]));
    }
  }, [pagination, tab, isValid, access, user, setSearchParams, hash, navigate]);

  // Если hash недопустим, возвращаем NotFound
  if (!isValid) {
    return <NotFound />;
  }

  // Если пользователь существует, но не имеет доступа, тоже NotFound с ролью
  if (user && !access) {
    return <NotFound role="автор" />;
  }

  // Если доступ есть и устройство мобильное, возвращаем мобильную версию
  if (access && isMobile) {
    return <MobileAccountAuthor handleLogout={handleLogout} />;
  }

  // Если доступ есть и устройство не мобильное, возвращаем стандартный кабинет
  if (access && !isMobile) {
    return (
      <Account navBar={<NavBar onChange={setTab} logout={handleLogout} />}>
        {hash === hashPaths.newArticle ? (
          <Creation />
        ) : hash === hashPaths.profile ? (
          <Profile />
        ) : (
          <div className="account-author__articles">
            <AuthorArticlesNav
              handlePagination={setPagination}
              selected={tab}
              onChange={setTab}
            />
            <AuthorArticlesList
              articles={articles}
              section={tab}
              changeList={setArticles}
              pagination={pagination}
            />
          </div>
        )}
      </Account>
    );
  }

  return null;
}