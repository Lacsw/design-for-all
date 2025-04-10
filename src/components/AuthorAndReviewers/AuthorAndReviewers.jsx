import { useIsMobile } from 'utils/hooks/useIsMobile';
import './AuthorAndReviewers.css';
import { Author, Overlay, Reviewers } from 'components';
import { useSelector } from 'react-redux';
import { selectArticle } from 'store/slices/article/slice';
import { useInteractiveManager } from 'utils/contexts/InteractiveManagerContext';

export default function AuthorAndReviewers() {
  const { reviews } = useSelector(selectArticle);
  const isMobile = useIsMobile();
  const { activeComponent, openComponent, closeComponent } =
    useInteractiveManager();
  const isOpen = activeComponent === 'authorAndReviewers';

  const toggleReviewers = () => {
    if (isOpen) {
      closeComponent('authorAndReviewers');
    } else {
      openComponent('authorAndReviewers');
    }
  };

  if (!isMobile) {
    return (
      <div className="author-and-reviewers">
        <Author />
        <Reviewers />
      </div>
    );
  }

  return (
    <>
      {isOpen && <Overlay onClick={toggleReviewers} />}
      <div className="author-and-reviewers" onClick={toggleReviewers}>
        <Author showReviewers={isOpen} />
        {isOpen && reviews.length !== 0 && <Reviewers />}
        <span className="author-and-reviewers__decoration"></span>
      </div>
    </>
  );
}
