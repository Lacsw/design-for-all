import { useLocation } from 'react-router-dom';

import NewArticleNavbar from './NewArticleNavbar/NewArticleNavbar';
import AuthorNavbar from './AuthorNavbar/AuthorNavbar';

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
