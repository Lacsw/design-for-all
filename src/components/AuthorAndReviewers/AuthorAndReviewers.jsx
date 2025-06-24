import { useIsMobile } from 'utils/hooks/useIsMobile';
import './AuthorAndReviewers.css';
import { Author, Overlay, Reviewers } from 'components';
import { useSelector } from 'react-redux';
import { selectArticle } from 'store/slices/article';
import { useInteractiveManager } from 'utils/contexts/InteractiveManagerContext';
import { AUTHOR_AND_REVIEWERS_TOGGLING_EVT_NAME } from './const';

export default function AuthorAndReviewers() {
  const { reviews } = useSelector(selectArticle);
  const isMobile = useIsMobile();
  const { activeComponent, openComponent, closeComponent } =
    useInteractiveManager();
  const isOpen = activeComponent === 'authorAndReviewers';

  const toggleReviewers = () => {
    if (isOpen) {
      window.dispatchEvent(
        new CustomEvent(AUTHOR_AND_REVIEWERS_TOGGLING_EVT_NAME, {
          bubbles: true,
          detail: { open: false },
        })
      );
      setTimeout(() => {
        closeComponent('authorAndReviewers');
      }, 300);
    } else {
      window.dispatchEvent(
        new CustomEvent(AUTHOR_AND_REVIEWERS_TOGGLING_EVT_NAME, {
          bubbles: true,
          detail: { open: true },
        })
      );
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
