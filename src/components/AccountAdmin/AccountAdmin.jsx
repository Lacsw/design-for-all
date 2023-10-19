import { Route, Routes } from 'react-router-dom';

import AdminApplicationsNav from '../AdminApplicationsNav/AdminApplicationsNav';
import AuthorArticlesList from '../AuthorArticlesList/AuthorArticlesList';
import Profile from '../Profile/Profile';
import Account from '../Account/Account';
import AdminApplicationNewAuthor from '../AdminApplicationNewAuthor/AdminApplicationNewAuthor';
import AdminCreateUser from '../AdminCreateUser/AdminCreateUser';
import AccountAdminNavbar from '../AccountAdminNavbar/AccountAdminNavbar';

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
