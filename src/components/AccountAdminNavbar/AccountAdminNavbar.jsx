import { useLocation } from 'react-router-dom';

import AdminNavbar from './AdminNavbar/AdminNavbar';
import AdminAppNewAuthorNavbar from './AdminAppNewAuthorNavbar/AdminAppNewAuthorNavbar';

export default function AccountAdminNavbar() {
	const location = useLocation();

	return (
		<>
			{location.pathname === '/admin/applications/new-author' ? (
				<AdminAppNewAuthorNavbar />
			) : (
				<AdminNavbar />
			)}
		</>
	);
}
