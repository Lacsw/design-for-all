import { useLocation } from 'react-router-dom';

import { NewArticleNavbar, AuthorNavbar } from 'components';

export default function AccountAuthorNavbar() {
  const location = useLocation();

  return (
    <>
      {location.pathname === '/author/new-article' ? (
        <NewArticleNavbar />
      ) : (
        <AuthorNavbar />
      )}
    </>
  );
}
