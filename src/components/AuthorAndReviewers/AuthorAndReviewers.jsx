import './AuthorAndReviewers.css';
import { Author, Reviewers } from 'components';

export default function AuthorAndReviewers() {
  return (
    <div className="author-and-reviewers">
      <Author />
      <Reviewers />
    </div>
  );
}
