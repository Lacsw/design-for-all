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
      
        <AdminCreateUser />
      
    </Account>
  );
}
