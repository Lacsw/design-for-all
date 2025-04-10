import { RichTextEditor, ImageWithFallback } from 'components';
import Recommend from 'components/Recommendations/Recommend';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { langSelectOptions } from 'utils/constants';
import './CheckFields.css';
import RadioButtons from 'components/RadioButtons/RadioButtons';
import { useDispatch } from 'react-redux';
import { setDecision } from 'store/slices/user';

const possibleFields = [
  'sub_category',
  'image',
  'title',
  'description',
  'recommend_from_creator',
];

function getFields(offer) {
  const fields = Object.keys(offer).filter((key) =>
    possibleFields.includes(key)
  );
  const fieldsObject = fields.reduce((acc, field) => {
    acc[field] = '';
    return acc;
  }, {});
  return fieldsObject;
}

const CheckFields = ({ offer, title }) => {
  const dispatch = useDispatch();
  const [fields, setFields] = useState(getFields(offer));
  const lang = langSelectOptions.find(
    (item) => item.value === offer.lang
  )?.label;

  function handleChoice({ target }) {
    const { name, value } = target;
    const fieldsUpdate = { ...fields, [name]: value };
    setFields(fieldsUpdate);
    if (!Object.values(fieldsUpdate).some((field) => !field)) {
      dispatch(setDecision({ uuid: offer.uuid, fields: fieldsUpdate }));
    }
  }

  return (
    <section className="view-article">
      <h2 className="view-article__title">{title}</h2>
      <div>
        <div className="view-article__label">
          <span className="view-article__sub-title">Язык</span>
          <div className="view-article__dropdown">
            <div className="view-article__text">{lang}</div>
          </div>
        </div>

        {offer.sub_category && (
          <div className={`view-article__label`}>
            <div className="check-fields__sub-title">
              <RadioButtons name="sub_category" onChoice={handleChoice} />
              Подкатегория
            </div>
            <span className="view-article__input">{offer.sub_category}</span>
          </div>
        )}

        {offer.image && (
          <div className={`view-article__label`}>
            <div className="check-fields__sub-title">
              <RadioButtons name="image" onChoice={handleChoice} />
              Картинка статьи
            </div>
            <ImageWithFallback
              className="view-article__img"
              src={offer.image}
              alt="Картинка статьи"
              fallbackClassName="view-article__image-placeholder"
              fallbackAlt="Заглушка для статьи"
            />
          </div>
        )}

        {offer.title && (
          <div className={`view-article__label`}>
            <div className="check-fields__sub-title">
              <RadioButtons name="title" onChoice={handleChoice} />
              Заголовок статьи
            </div>
            <span className="view-article__input view-article__input_article-header">
              {offer.title}
            </span>
          </div>
        )}

        {offer.description && (
          <div className={`view-article__label`}>
            <div className="check-fields__sub-title">
              <RadioButtons name="description" onChoice={handleChoice} />
              Контент статьи
            </div>
            <RichTextEditor initialValue={offer.description} readOnly={true} />
          </div>
        )}

        {offer.recommend_from_creator && (
          <div className={`view-article__label`}>
            <div className="check-fields__sub-title">
              <RadioButtons
                name="recommend_from_creator"
                onChoice={handleChoice}
              />
              Рекомендации авторов
            </div>
            <div className="view-article__recommendations">
              <ul className="recommendations__list">
                {offer.recommend_from_creator.map((item) => (
                  <li className="recommendations__item" key={item.uuid}>
                    <Link
                      to={`${offer.lang}/${item.uuid}`}
                      className="recommendations__link"
                      target="_blank"
                    >
                      <Recommend imageUrl={item.image} title={item.title} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CheckFields;
