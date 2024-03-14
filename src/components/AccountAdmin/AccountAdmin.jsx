import { Route, Routes } from 'react-router-dom';

import {
  AdminApplicationsNav,
  AuthorArticlesList,
  Profile,
  Account,
  AdminApplicationNewAuthor,
  AdminCreateUser,
  AccountAdminNavbar,
} from 'components';

export default function AccountAdmin() {
  const navBar = <AccountAdminNavbar />;

  return (
    <Account navBar={navBar}>
      <Routes>
        <Route
          path="/applications"
          element={
            <div className="account-author__articles">
              <AdminApplicationsNav />
              <AuthorArticlesList />
            </div>
          }
        />
        <Route
          path="/applications/new-author"
          element={<AdminApplicationNewAuthor />}
        />
        <Route path="/create-user" element={<AdminCreateUser />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Account>
  );
}
