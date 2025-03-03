import { useIsMobile } from 'utils/hooks/useIsMobile';
import './AuthorAndReviewers.css';
import { Author, Overlay, Reviewers } from 'components';
import { useState } from 'react';
import { selectArticle } from 'store/slices/articleSlice';
import { useSelector } from 'react-redux';

export default function AuthorAndReviewers() {
  const { reviews } = useSelector(selectArticle);
  const isMobile = useIsMobile();
  const [showReviewers, setShowReviewers] = useState(false);
  const toggleReviewers = () => {
    setShowReviewers((prev) => !prev);
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
      {showReviewers && <Overlay onClick={toggleReviewers} />}
      <div className="author-and-reviewers" onClick={toggleReviewers}>
        <Author showReviewers={showReviewers} />
        {showReviewers && reviews.length !== 0 && <Reviewers />}
        <span className="author-and-reviewers__decoration"></span>
      </div>
    </>
  );
}
