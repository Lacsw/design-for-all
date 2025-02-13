import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './Articles.css';
import {
  Article,
  AuthorAndReviewers,
  NotFoundArticle,
  Loader,
  Error,
} from 'components';
import authorApi from 'utils/api/author';

export default function Articles() {
  const { lang, articleId } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lang && !articleId) {
      setArticle({ author: 'template' });
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    authorApi
      .getArticleById({ lang, articleId })
      .then((data) => {
        setArticle(data);
      })
      .catch((err) => {
        setArticle({});
        setError(err.message);
        console.warn('err', err);
      })
      .finally(() => setIsLoading(false));
  }, [lang, articleId]);

  return (
    <>
      <div className="articles__container">
        <div />

        {error ? (
          <Error message="Произошла ошибка при загрузке статьи" />
        ) : isLoading !== false ? (
          <Loader />
        ) : article.author ? (
          <Article data={article} />
        ) : (
          <NotFoundArticle />
        )}

        <AuthorAndReviewers />
      </div>
    </>
  );
}
