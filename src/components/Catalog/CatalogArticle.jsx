import './CatalogArticle.css';
import previewImage from 'images/article/preview.png';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchArticle, selectArticle, selectError, selectLoading } from 'store/slices/articleSlice';
import { useDispatch, useSelector } from 'react-redux';
import { NotFoundArticle, ArticleHeader, AuthorAndReviewers } from 'components';

export default function CatalogArticle() {
  const dispatch = useDispatch();
  const article = useSelector(selectArticle);
  const error = useSelector(selectError);
  const loading = useSelector(selectLoading);
  const { lang, articleId } = useParams();
  const needToFetch = Boolean(lang && articleId && articleId !== 'no-article');
  const isBlank = !lang;
  const isError = Boolean(error || articleId === 'no-article');

  useEffect(() => {
    if (!needToFetch) return;
    dispatch(fetchArticle({ lang, articleId }));
  }, [lang, articleId, needToFetch, dispatch]);

  return isBlank ?
    (<div className='blank'>Воспользуйтесь поиском по дереву <br /> или поиском по заголовкам статей</div>)
    : loading ? (<div className='blank'><span className='preloader' /></div>) : isError ? (<NotFoundArticle />)
      : (
        <>
          <div className="article">
            <ArticleHeader
              title={article.publication.title}
              timeCreate={new Date(article.publication.date_create).toLocaleDateString()}
              timeUpdate={new Date(article.publication.last_update).toLocaleDateString()}
            />
            <div className="article__main">
              <img src={previewImage} alt="превью" className="article__image" />
              <p className="article__text">
                {article.publication.description}
              </p>
            </div>
          </div>
          <AuthorAndReviewers />
        </>
      );
}