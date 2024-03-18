import './Guides.css';
import {
  Header,
  Footer,
  GuidesMenu,
  GuidesArticle,
  AuthorAndReviewers,
} from 'components';

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
