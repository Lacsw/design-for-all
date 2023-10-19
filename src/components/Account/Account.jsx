import './Account.css';
import Author from '../Author/Author';
import Header from '../Header/Header';

export default function Account({ children, navBar }) {
	return (
		<section className="account">
			<Header />
			<div className="account__container">
				<div className="account__author-and-navbar">
					<Author isAuthorAccount={true} />
					{navBar}
				</div>
				{children}
			</div>
		</section>
	);
}
