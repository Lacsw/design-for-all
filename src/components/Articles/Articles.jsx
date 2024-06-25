import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './Articles.css';
import {
  Header,
  SideBar,
  Article,
  AuthorAndReviewers,
  NotFoundArticle,
  Footer,
  Loader,
  Error,
} from 'components';
import TranslationArticle from 'components/Article/TranslationArticle/TranslationArticle';
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
        console.log('err', err);
      })
      .finally(() => setIsLoading(false));
  }, [lang, articleId]);

  return (
    <>
      <Header />
      <div className="articles__container">
        <SideBar />

        {error ? (
          <Error message="Произошла ошибка при загрузке статьи" />
        ) : isLoading !== false ? (
          <Loader />
        ) : article.author ? (
          <TranslationArticle />
        ) : (
          <NotFoundArticle />
        )}

        <AuthorAndReviewers />
      </div>
      <Footer />
    </>
  );
}
