import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import './AccountAuthor.css';
import {
  AuthorArticlesNav,
  AuthorArticlesList,
  NewArticle,
  Profile,
  Account,
  AccountAuthorNavbar,
} from 'components';

import authorApi from 'utils/api/author';

export default function AccountAuthor() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState('20');
  const [tab, setTab] = useState('approve');

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

  return (
    <Account navBar={<AccountAuthorNavbar />}>
      <Routes>
        <Route
          path="/articles"
          element={
            <div className="account-author__articles">
              <AuthorArticlesNav
                handlePagination={setPagination}
                selected={tab}
                onChange={setTab}
              />
              {!isLoading && <AuthorArticlesList articles={articles} />}
            </div>
          }
        />
        <Route path="/new-article" element={<NewArticle />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Account>
  );
}
