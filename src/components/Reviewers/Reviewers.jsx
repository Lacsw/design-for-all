import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectArticle } from 'store/slices/articleSlice';
import avatar from 'images/reviewers/avatar.svg';
import './Reviewers.css';

export default function Reviewers() {
  const { reviews } = useSelector(selectArticle);
  const [isOpen, setIsOpen] = useState(false);
  const shownList = isOpen ? reviews : reviews.slice(0, 5);

  const renderReviews = (shownList) => {
    return shownList.map((item) => (
      <a
        key={item.uuid}
        href="/"
        target="_blank"
        rel="noreferrer"
        className="reviewers__link"
      >
        <img
          src={item.avatar || avatar}
          alt="Аватар рецензента"
          className="reviewers__avatar"
        />
      </a>
    ));
  };

  return (
    <div className="reviewers">
      <p className="reviewers__title">Рецензенты</p>
      {reviews.length !== 0 ? (
        <>
          <div className="reviewers__icon-container">
            {renderReviews(shownList)}
          </div>
          {reviews.length > 4 && (
            <p
              className={
                isOpen
                  ? 'reviewers__see-more reviewers__see-more_opened'
                  : 'reviewers__see-more'
              }
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? 'Скрыть' : 'Показать все'}
            </p>
          )}
        </>
      ) : (
        <p className="reviewers__text">
          <Link to="#">Предложите правки</Link>, чтобы стать рецензентом
        </p>
      )}
    </div>
  );
}
