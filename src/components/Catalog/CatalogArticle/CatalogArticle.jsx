import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchArticle,
  selectArticle,
  selectError,
  selectLoading,
} from 'store/slices/article';
import {
  NotFoundArticle,
  ArticleHeader,
  AuthorAndReviewers,
  Recommendations,
  RichTextEditor,
  ArticleNavigator,
  ImageWithFallback,
} from 'components';
import './CatalogArticle.css';
import './withNavigator.css';
import { useTranslation } from 'react-i18next';
import { ARTICLE } from 'utils/translationKeys';

/** @type {import('components/ArticleNavigator/types').IScrollableElParams} */
const scrollableElParams = {
  selector: 'html',
  searchMode: 'root',
  flag: true,
  intersectionMargin: '-115px 0px 0px 0px',
};
const targetHeadings = [1, 2, 3];

/** @type {import('components/ArticleNavigator/types').IArticleNavigatorProps['slotProps']} */
const artNavSlotProps = {
  bar: {
    id: 'catalog-article__navigator-bar',
  },
  modal: {
    id: 'catalog-article__navigator-modal',
  },
};

export default function CatalogArticle() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { lang, articleId } = useParams();

  const article = useSelector(selectArticle);
  const error = useSelector(selectError);
  const loading = useSelector(selectLoading);
  const articleRef = useRef(null);

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

  // useEffect(() => document.querySelector('.main-wrapper').scrollTo(0, 0)); // зачем?

  const headerElRef = useRef(/** @type {HTMLElement | null} */ (null));
  useEffect(() => {
    headerElRef.current = document.querySelector('div#root header.header');
  }, []);

  const [navigatorFlag, setNavigatorFlag] = useState(false);
  const handleEditorCreation = useCallback((editor) => {
    setNavigatorFlag((prev) => !prev);
  }, []);

  return isBlank ? (
    <div className="blank">
      {t(ARTICLE.BLANK.SEARCH_TREE)}
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

        <div ref={articleRef} className="article__main">
          <ImageWithFallback
            src={article.publication.image}
            alt={t(ARTICLE.IMAGE.ALT)}
            className="article__image"
            fallbackClassName="article__image-placeholder"
            fallbackAlt={t(ARTICLE.IMAGE.FALLBACK_ALT)}
          />

          <div className="article__editor-container">
            <ArticleNavigator
              flag={navigatorFlag}
              // parentSelector="body"
              targetRef={articleRef}
              targetSelector=".tiptap.ProseMirror"
              scrollableElParams={scrollableElParams}
              targetHeadings={targetHeadings}
              onOpen={(params) => {
                const header = headerElRef.current;
                if (!header) {
                  return;
                }
                header.style.setProperty('--scroll-w', params.barWidth + 'px');
                header.classList.add('article-navigator_expanded');
              }}
              onClose={(params) => {
                headerElRef.current?.classList.remove(
                  'article-navigator_expanded'
                );
              }}
              slotProps={artNavSlotProps}
            />

            <RichTextEditor
              className="rte__article"
              initialValue={article.publication.description}
              readOnly={true}
              onRealCreate={handleEditorCreation}
            />
          </div>
        </div>
        <Recommendations list={article.recommend} />
      </div>
      <AuthorAndReviewers />
    </>
  );
}
