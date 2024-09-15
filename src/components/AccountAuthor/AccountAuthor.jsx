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
import { useSearchParams } from 'react-router-dom';

export default function AccountAuthor({ hash, resetSection }) {
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
    if (isValid && !user) {
      setSearchParams({ 'modal-auth': 'login' });
    } else {
      authorApi
        .getArticles({ pagination: pagination, status: tab })
        .then((articles) => {
          setArticles(articles.success);
          setIsLoading(true);
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    }
  }, [pagination, tab, isValid, user, setSearchParams]);

  return access ? (
    <Account navBar={<NavBar />}>
      {hash === hashPaths.newArticle && <NewArticle />}
      {hash === hashPaths.articles && (
        <div className="account-author__articles">
          <AuthorArticlesNav
            handlePagination={setPagination}
            selected={tab}
            onChange={setTab}
          />
          {!isLoading && <AuthorArticlesList articles={articles} />}
        </div>
      )}
      {hash === hashPaths.profile && <Profile />}
    </Account>
  ) : isValid ? null : (
    <NotFound resetSection={resetSection} />
  );
}
