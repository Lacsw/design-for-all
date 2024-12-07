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
} from 'components';

import authorApi from 'utils/api/author';
import { hashPaths } from 'utils/constants';
import { useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';

const authorTabs = ['approve', 'drafted', 'offered', 'rejected', 'deleted'];

export default function AccountAuthor({ hash, resetSection }) {
  const navigate = useNavigate();
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
    if (!isValid || user && !access) return;
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

  return access ? (
    <Account navBar={<NavBar onChange={setTab} />}>
      {hash === hashPaths.newArticle ? (
        <Creation />
      ) : hash === hashPaths.profile ? (
        <Profile resetSection={resetSection} />
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
  ) : !isValid ? (
    <NotFound resetSection={resetSection} />
  ) : user ? (
    <NotFound resetSection={resetSection} role={'автор'} />
  ) : null;
}
