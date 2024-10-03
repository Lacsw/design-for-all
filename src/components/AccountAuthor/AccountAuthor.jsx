import { useEffect, useState } from 'react';
import './AccountAuthor.css';
import {
  AuthorArticlesNav,
  AuthorArticlesList,
  NewArticle,
  Profile,
  Account,
  NotFound,
  NewArticleNavbar,
  AuthorNavbar,
} from 'components';

import authorApi from 'utils/api/author';
import { hashPaths } from 'utils/constants';
import { useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function AccountAuthor({ hash, resetSection }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);
  const [, setSearchParams] = useSearchParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState('20');
  const [tab, setTab] = useState('approve');
  const isValid = Object.values(hashPaths).includes(hash);
  const access = isValid && user;
  const NavBar =
    hash === hashPaths.newArticle ? NewArticleNavbar : AuthorNavbar;

  useEffect(() => {
    if (!isValid) return;
    if (hash === hashPaths.articles) {
      navigate(hash + '/' + tab);
      return;
    }
    if (isValid && !user) {
      setSearchParams({ 'modal-auth': 'login' });
    } else {
      setIsLoading(true);
      authorApi
        .getArticles({ pagination: pagination, status: tab })
        .then(setArticles)
        .catch(() => setArticles([]))
        .finally(() => setIsLoading(false));
    }
  }, [pagination, tab, isValid, user, setSearchParams, hash, navigate]);

  return access ? (
    <Account navBar={<NavBar />}>
      {hash === hashPaths.newArticle ? (
        <NewArticle />
      ) : hash === hashPaths.profile ? (
        <Profile />
      ) : (
        <div className="account-author__articles">
          <AuthorArticlesNav
            handlePagination={setPagination}
            selected={tab}
            onChange={setTab}
          />
          {!isLoading && <AuthorArticlesList articles={articles} />}
        </div>
      )}
    </Account>
  ) : isValid ? null : (
    <NotFound resetSection={resetSection} />
  );
}
