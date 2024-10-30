import './ViewArticle.css';
import Recommend from 'components/Recommendations/Recommend';
import { useLocation } from 'react-router-dom';
import { langSelectOptions } from 'utils/constants';

function createTitle(type) {
  if (type === 'updated') return 'Внесение правок';
  if (type === 'created_lang') return 'Перевод статьи';
  return 'Создание новой статьи';
}

export default function ViewArticle({ original, title, rejectFields }) {
  const location = useLocation();
  const lang = langSelectOptions.find(
    (item) => item.value === original.lang
  )?.label;
  const mainTitle = createTitle(location.state?.type);
  const isUpdate =
    location.state?.type === 'updated' ||
    location.state?.type === 'created_lang';
  return (
    <section className="view-article">
      <h2 className="view-article__title">{title || mainTitle}</h2>
      <div>
        <div className="view-article__label">
          <span className="view-article__sub-title">Язык</span>
          <div className="view-article__dropdown">
            <div className="view-article__text">{lang}</div>
          </div>
        </div>

        {!isUpdate && (
          <div className="view-article__label">
            <span className="view-article__sub-title">Основная категория</span>
            <div className="view-article__dropdown">
              <div className="view-article__text">{original.main_category}</div>
            </div>
          </div>
        )}

        <div className={`${
            rejectFields?.includes('sub_category') ? 'rejected ' : ''
          }view-article__label`}>
          <span className="view-article__sub-title">Подкатегория</span>
          <span className="view-article__input">{original.sub_category}</span>
        </div>

        <div className={`${
            rejectFields?.includes('image') ? 'rejected ' : ''
          }view-article__label`}>
          <span className="view-article__sub-title">Картинка статьи</span>
          {original.image && (
            <img
              className="view-article__img"
              src={original.image}
              alt="Картинка статьи"
            />
          )}
        </div>

        <div className={`${
            rejectFields?.includes('title') ? 'rejected ' : ''
          }view-article__label`}>
          <span className="view-article__sub-title">Заголовок статьи</span>
          <span className="view-article__input view-article__input_article-header">
            {original.title}
          </span>
        </div>

        <div className={`${
            rejectFields?.includes('description') ? 'rejected ' : ''
          }view-article__label`}>
          <span className="view-article__sub-title">Контент статьи</span>
          <p className="view-article__input view-article__input_article-content">
            {original.description}
          </p>
        </div>
        {original.recommend_from_creator && (
          <div className={`${
            rejectFields?.includes('recommend_from_creator') ? 'rejected ' : ''
          }view-article__label`}>
            <span className="view-article__sub-title">
              Рекомендации авторов
            </span>
            <div className="view-article__recommendations">
              <ul className="recommendations__list">
                {original.recommend_from_creator.map((item) => (
                  <li className="recommendations__item" key={item.uuid}>
                    <Recommend imageUrl={item.image} title={item.title} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
