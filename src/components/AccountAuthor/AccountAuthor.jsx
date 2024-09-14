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
  NoAccess,
} from 'components';

import authorApi from 'utils/api/author';
import { hashPaths } from 'utils/constants';
import { useSelector } from 'react-redux';

export default function AccountAuthor({ hash, resetSection }) {
  const user = useSelector((state) => state.user.currentUser);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState('20');
  const [tab, setTab] = useState('approve');
  const isValid = Object.values(hashPaths).includes(hash);
  const access = isValid && user;
  const NavBar =
    hash === hashPaths.newArticle ? NewArticleNavbar : AuthorNavbar;

  useEffect(() => {
    authorApi
      .getArticles({ pagination: pagination, status: tab })
      .then((articles) => {
        setArticles(articles.success);
        setIsLoading(true);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [pagination, tab]);

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
  ) : isValid ? (
    <NoAccess />
  ) : (
    <NotFound resetSection={resetSection}/>
  );
}
