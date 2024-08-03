import './Guides.css';
import { GuidesMenu, GuidesArticle, AuthorAndReviewers } from 'components';

export default function Guides() {
  return (
    <div className="guides__container">
      <GuidesMenu />
      <GuidesArticle />
      <AuthorAndReviewers />
    </div>
  );
}
