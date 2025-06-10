import { useCallback, useEffect, useRef, useState } from 'react';
import {  useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
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
import { useTranslation, Trans } from 'react-i18next';
import { CATALOG } from 'utils/translationKeys';
import { getLanguage } from 'store/slices/user';
import tutorialRu from 'videos/tutorial_ru.mp4';
import tutorialEn from 'videos/tutorial_en.mp4';
import tutorialEs from 'videos/tutorial_es.mp4';
import tutorialZh from 'videos/tutorial_zh.mp4';
import { useInteractiveManager } from 'utils/contexts/InteractiveManagerContext';
import { useIsMobile } from 'utils/hooks/useIsMobile';

const tutorialVideos = {
  ru: tutorialRu,
  en: tutorialEn,
  es: tutorialEs,
  zh: tutorialZh
};

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

  const { t } = useTranslation();
  const { lang, articleId } = useParams();
  const language = useSelector(getLanguage);
  const article = useSelector(selectArticle);
  const error = useSelector(selectError);
  const loading = useSelector(selectLoading);
  const articleRef = useRef(null);
  const { openComponent} = useInteractiveManager();
  const isMobile = useIsMobile();

  const isBlank = !lang;
  const isError = Boolean(error || articleId === 'no-article');


  const headerElRef = useRef(/** @type {HTMLElement | null} */(null));
  
  useEffect(() => {
    headerElRef.current = document.querySelector('div#root header.header');
  }, []);

  const [navigatorFlag, setNavigatorFlag] = useState(false);
  const handleEditorCreation = useCallback((editor) => {
    setNavigatorFlag((prev) => !prev);
  }, []);

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

  return isBlank ? (
    <div className="blank">
      <p className="blank__text">
        <Trans
          i18nKey={CATALOG.ARTICLE.BLANK.SEARCH_TREE}
          components={{
            tree: <button className="blank__link" onClick={handleTreeSearch} />,
            header: <button className="blank__link" onClick={handleHeaderSearch} />
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
        <source
          src={tutorialVideos[language] || tutorialRu}
          type="video/mp4"
        />
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
