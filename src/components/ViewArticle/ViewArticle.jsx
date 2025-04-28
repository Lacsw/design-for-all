import {
  RichTextEditor,
  ImageWithFallback,
} from 'components';
import './ViewArticle.css';
import Recommend from 'components/Recommendations/Recommend';
import { Link, useLocation } from 'react-router-dom';
import { langSelectOptions } from 'utils/constants';
import { useTranslation } from 'react-i18next';
import { VIEW_ARTICLE } from 'utils/translationKeys';

function createTitle(type, t) {
  if (type === 'updated') return t(VIEW_ARTICLE.UPDATED_TITLE);
  if (type === 'created_lang') return t(VIEW_ARTICLE.CREATED_LANG_TITLE);
  return t(VIEW_ARTICLE.CREATED_TITLE);
}

export default function ViewArticle({ original, title, rejectFields }) {
  const location = useLocation();
  const { t } = useTranslation();
  const langKey = langSelectOptions.find(
    (item) => item.value === original.lang
  )?.label;
  const lang = t(langKey);
  const mainTitle = createTitle(location.state?.type, t);
  const isUpdate =
    location.state?.type === 'updated' ||
    location.state?.type === 'created_lang';

  return (
    <section className="view-article">
      <h2 className="view-article__title">{title || mainTitle}</h2>
      <div>
        <div className="view-article__label">
          <span className="view-article__sub-title">{t(VIEW_ARTICLE.LANGUAGE_TITLE)}</span>
          <div className="view-article__dropdown">
            <div className="view-article__text">{lang}</div>
          </div>
        </div>

        {!isUpdate && (
          <div className="view-article__label">
            <span className="view-article__sub-title">{t(VIEW_ARTICLE.MAIN_CATEGORY_TITLE)}</span>
            <div className="view-article__dropdown">
              <div className="view-article__text">{original.main_category}</div>
            </div>
          </div>
        )}
        {original.sub_category && (
          <div
            className={`${rejectFields?.includes('sub_category') ? 'rejected ' : ''
              }view-article__label`}
          >
            <span className="view-article__sub-title">{t(VIEW_ARTICLE.SUB_CATEGORY_TITLE)}</span>
            <span className="view-article__input">{original.sub_category}</span>
          </div>
        )}
        {original.image && (
          <div
            className={`${rejectFields?.includes('image') ? 'rejected ' : ''
              }view-article__label`}
          >
            <span className="view-article__sub-title">{t(VIEW_ARTICLE.IMAGE_TITLE)}</span>
            <ImageWithFallback
              className="view-article__img"
              src={original.image}
              alt={t(VIEW_ARTICLE.IMAGE_ALT)}
              fallbackClassName="view-article__image-placeholder"
              fallbackAlt={t(VIEW_ARTICLE.IMAGE_FALLBACK_ALT)}
            />
          </div>
        )}
        {original.title && (
          <div
            className={`${rejectFields?.includes('title') ? 'rejected ' : ''
              }view-article__label`}
          >
            <span className="view-article__sub-title">{t(VIEW_ARTICLE.ARTICLE_TITLE)}</span>
            <span className="view-article__input view-article__input_article-header">
              {original.title}
            </span>
          </div>
        )}
        {original.description && (
          <div
            className={`${rejectFields?.includes('description') ? 'rejected ' : ''
              }view-article__label`}
          >
            <span className="view-article__sub-title">{t(VIEW_ARTICLE.DESCRIPTION_TITLE)}</span>
            <RichTextEditor
              initialValue={original.description}
              readOnly={true}
            />
          </div>
        )}

        {original.recommend_from_creator && (
          <div
            className={`${rejectFields?.includes('recommend_from_creator')
                ? 'rejected '
                : ''
              }view-article__label`}
          >
            <span className="view-article__sub-title">
              {t(VIEW_ARTICLE.RECOMMENDATIONS_TITLE)}
            </span>
            <div className="view-article__recommendations">
              {original.recommend_from_creator.length === 0 ? t(VIEW_ARTICLE.RECOMMENDATIONS_EMPTY) :
                <ul className="recommendations__list">
                  {original.recommend_from_creator.map((item) => (
                    <li className="recommendations__item" key={item.uuid}>
                      <Link
                        to={`${original.lang}/${item.uuid}`}
                        className="recommendations__link"
                        target="_blank"
                      >
                        <Recommend imageUrl={item.image} title={item.title} />
                      </Link>
                    </li>
                  ))}
                </ul>}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
