import './Guides.css';
import Header from '../Header/Header';
import GuidesMenu from '../GuidesMenu/GuidesMenu';
import GuidesArticle from '../GuidesArticle/GuidesArticle';
import Footer from '../Footer/Footer';
import AuthorAndReviewers from '../AuthorAndReviewers/AuthorAndReviewers';

export default function Guides() {
	return (
		<div className="guides">
			<Header />
			<div className="guides__container">
				<GuidesMenu />
				<GuidesArticle />
				<AuthorAndReviewers />
			</div>
			<Footer />
		</div>
	);
}
