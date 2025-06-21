import { useEffect, useRef, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  ArticleHeader,
  ArticleNavigator,
  AuthorAndReviewers,
  ImageWithFallback,
  NotFoundArticle,
  Recommendations,
  RichTextEditor,
} from 'components';

import { fetchArticle } from 'store/slices/article';
import { getLanguage } from 'store/slices/user';

import { useInteractiveManager } from 'utils/contexts/InteractiveManagerContext';
import { useIsMobile } from 'utils/hooks/useIsMobile';
import { CATALOG } from 'utils/translationKeys';
import tutorialEn from 'videos/tutorial_en.mp4';
import tutorialEs from 'videos/tutorial_es.mp4';
import tutorialRu from 'videos/tutorial_ru.mp4';
import tutorialZh from 'videos/tutorial_zh.mp4';

import './CatalogArticle.css';
import {
  artNavSlotProps,
  scrollableElParams,
  targetHeadings,
} from './constants';
import { useArticleNavigator } from './hooks/useArtNavigator';
import { ARTICLE, getMockedArticleContent } from './mocks';
import './withNavigator.css';

const tutorialVideos = {
  ru: tutorialRu,
  en: tutorialEn,
  es: tutorialEs,
  zh: tutorialZh,
};

export default function CatalogArticle() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { lang, articleId } = useParams();

  const language = useSelector(getLanguage);
  // const article = useSelector(selectArticle);
  const article = ARTICLE(getMockedArticleContent(7));
  // const error = useSelector(selectError);
  const error = false;
  // const loading = useSelector(selectLoading);
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 500);

  const articleRef = useRef(null);
  const editorContainerRef =
    /** @type {React.RefObject<HTMLDivElement | null>} */ (useRef(null));

  const { openComponent } = useInteractiveManager();
  const isMobile = useIsMobile();

  const needToFetch = Boolean(lang && articleId && articleId !== 'no-article');
  const isBlank = !lang;
  const isError = Boolean(error || articleId === 'no-article');

  const handleTreeSearch = () => {
    if (isMobile) {
      openComponent('mobileSidebar', { activateSearch: true });
    } else {
      openComponent('treeSearch');
    }
  };

  const handleHeaderSearch = () => {
    openComponent('headerSearch');
  };

  const {
    navigatorFlag,
    headerElRef,
    handleEditorUpdate,
    handleEditorCreation,
  } = useArticleNavigator({ editorContainerRef });

  // useEffect(() => document.querySelector('.main-wrapper').scrollTo(0, 0)); // зачем?

  useEffect(() => {
    if (!needToFetch) return;
    dispatch(fetchArticle({ lang, articleId }));
  }, [lang, articleId, needToFetch, dispatch]);

  return isBlank ? (
    <div className="blank">
      <p className="blank__text">
        <Trans
          i18nKey={CATALOG.ARTICLE.BLANK.SEARCH_TREE}
          components={{
            tree: <button className="blank__link" onClick={handleTreeSearch} />,
            header: (
              <button className="blank__link" onClick={handleHeaderSearch} />
            ),
          }}
        />
      </p>
      <video
        key={language}
        autoPlay
        muted
        playsInline
        loop
        preload="auto"
        width="100%"
        height="auto"
        style={{ maxWidth: '800px', margin: '0 auto', display: 'block' }}
      >
        <source src={tutorialVideos[language] || tutorialRu} type="video/mp4" />
      </video>
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
          timeCreate={article?.publication.date_create}
          timeUpdate={article?.publication.last_update}
        />

        <div ref={articleRef} className="article__main">
          <ImageWithFallback
            src={article.publication.image}
            alt={t(CATALOG.ARTICLE.IMAGE.ALT)}
            className="article__image"
            fallbackClassName="article__image-placeholder"
            fallbackAlt={t(CATALOG.ARTICLE.IMAGE.FALLBACK_ALT)}
          />

          <div className="article__editor-container" ref={editorContainerRef}>
            <ArticleNavigator
              flag={navigatorFlag}
              // parentSelector="body"
              targetRef={articleRef}
              targetSelector=".tiptap.ProseMirror"
              scrollableElParams={scrollableElParams}
              targetHeadings={targetHeadings}
              firstShowingOffset={0}
              lastShowingOffset={0}
              onOpen={(params) => {
                const header = headerElRef.current;
                if (!header) {
                  return;
                }
                header.style.setProperty('--scroll-w', params.barWidth + 'px');
                header.classList.add('article-navigator_expanded');
              }}
              onClose={(_params) => {
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
              onInput={handleEditorUpdate}
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
