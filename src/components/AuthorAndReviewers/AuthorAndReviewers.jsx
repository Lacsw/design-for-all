import './AuthorAndReviewers.css';
import Author from '../Author/Author';
import Reviewers from '../Reviewers/Reviewers';

export default function AuthorAndReviewers() {
	return (
		<div className="author-and-reviewers">
			<Author />
			<Reviewers />
		</div>
	);
}
