import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectArticle } from 'store/slices/article';
import avatar from 'images/admin/avatar_default.svg';
import './Reviewers.css';
import ModalAuthor from 'components/Author/ModalAuthor';
import { useTranslation } from 'react-i18next';
import { ARTICLE, USER } from 'utils/translationKeys';

export default function Reviewers() {
  const { lang, articleId } = useParams();
  const { reviews } = useSelector(selectArticle);
  const [isOpen, setIsOpen] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [reviewer, setReviewer] = useState({});
  const shownList = isOpen ? reviews : reviews.slice(0, 5);
  const { t } = useTranslation();
  const renderReviews = (shownList) => {
    return shownList.map((item) => (
      <img
        key={item.uuid}
        src={item.avatar || avatar}
        alt={t(ARTICLE.REVIEWERS.AVATAR_ALT)}
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
      <p className="reviewers__title">{t(ARTICLE.REVIEWERS.TITLE)}</p>
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
              {isOpen ? t(USER.SEE_LESS) : t(USER.SEE_MORE)}
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
            {t(ARTICLE.REVIEWERS.PROPOSE_CHANGES)}
          </Link>
         {t(ARTICLE.REVIEWERS.PROPOSE_CHANGES_TEXT)}
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
