import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectArticle } from 'store/slices/article/slice';
import avatar from 'images/admin/avatar_default.svg';
import './Reviewers.css';
import ModalAuthor from 'components/Author/ModalAuthor';

export default function Reviewers() {
  const { lang, articleId } = useParams();
  const { reviews } = useSelector(selectArticle);
  const [isOpen, setIsOpen] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [reviewer, setReviewer] = useState({});
  const shownList = isOpen ? reviews : reviews.slice(0, 5);

  const renderReviews = (shownList) => {
    return shownList.map((item) => (
      <img
        key={item.uuid}
        src={item.avatar || avatar}
        alt="Аватар рецензента"
        className="reviewers__avatar"
        onClick={() => {
          setIsModal(true);
          setReviewer(item);
        }}
      />
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
          <Link
            to="/#/author/new-article"
            state={{
              name: 'correct',
              original: articleId,
              type: 'updated',
              lang,
            }}
          >
            Предложите правки
          </Link>
          , чтобы стать рецензентом
        </p>
      )}
      <ModalAuthor
        author={reviewer}
        isOpen={isModal}
        onClose={() => setIsModal(false)}
      />
    </div>
  );
}
