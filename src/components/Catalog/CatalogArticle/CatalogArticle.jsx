import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchArticle,
  selectArticle,
  selectError,
  selectLoading,
} from 'store/slices/articleSlice';
import {
  NotFoundArticle,
  ArticleHeader,
  AuthorAndReviewers,
  Recommendations,
  RichTextEditor,
} from 'components';
import './CatalogArticle.css';

export default function CatalogArticle() {
  const dispatch = useDispatch();
  const article = useSelector(selectArticle);
  const error = useSelector(selectError);
  const loading = useSelector(selectLoading);
  const { lang, articleId } = useParams();
  const needToFetch = Boolean(lang && articleId && articleId !== 'no-article');
  const isBlank = !lang;
  const isError = Boolean(error || articleId === 'no-article');
  const createDate = new Date(
    article?.publication.date_create * 1000
  ).toLocaleDateString();
  const updateDate = new Date(
    article?.publication.last_update * 1000
  ).toLocaleDateString();

  useEffect(() => {
    if (!needToFetch) return;
    dispatch(fetchArticle({ lang, articleId }));
  }, [lang, articleId, needToFetch, dispatch]);

  useEffect(() => document.querySelector('.main-wrapper').scrollTo(0, 0));

  return isBlank ? (
    <div className="blank">
      Воспользуйтесь поиском по дереву <br /> или поиском по заголовкам статей
    </div>
  ) : isError ? (
    <NotFoundArticle />
  ) : loading ? (
    <div className="blank">
      <span className="preloader" />
    </div>
  ) : (
    <>
      <div className="article">
        <ArticleHeader
          title={article.publication.title}
          timeCreate={createDate}
          timeUpdate={updateDate}
        />
        <div className="article__main">
          <img
            src={article.publication.image}
            alt="Превью статьи"
            className="article__image"
          />
          <RichTextEditor
            className="rte__article"
            initialValue={article.publication.description}
            readOnly={true}
          />
        </div>
        <Recommendations list={article.recommend} />
      </div>
      <AuthorAndReviewers />
    </>
  );
}
