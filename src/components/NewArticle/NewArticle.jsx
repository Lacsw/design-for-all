import { useMemo, useState } from 'react';
import './NewArticle.css';
import plus from 'images/plus-icon.svg';
import { langSelectOptions } from 'utils/constants';
import { Dropdown, ModalRecommendation } from 'components';
import { useSelector, useDispatch } from 'react-redux';
import { changeDraft } from 'store/slices';
import { getDraft } from 'store/selectors';
import Recommend from 'components/Recommendations/Recommend';
import { selectTitles } from 'store/slices/articleSlice';

export default function NewArticle() {
  const draft = useSelector(getDraft);
  const categories = useSelector(selectTitles);
  const dispatch = useDispatch();
  const [isShownAddRec, setIsShownAddRec] = useState(false);

  const titlesList = useMemo(() => {
    if (!draft.lang) return [];
    const langTitles = categories[draft.lang];
    const titlesForDropdown = Object.values(langTitles).map((title) => ({
      value: title,
      label: title,
    }));
    return titlesForDropdown;
  }, [draft.lang, categories]);

  const toggleRecommendation = () => {
    setIsShownAddRec(!isShownAddRec);
  };

  function addFile({ target }) {
    const reader = new FileReader();
    if (target.files.length) {
      reader.onload = () => changeField('image', reader.result);
      reader.readAsDataURL(target.files[0]);
    }
  }

  function changeField(name, value) {
    dispatch(changeDraft({ name, value }));
  }

  return (
    <section className="new-article">
      <div className="new-article__container">
        <h2 className="new-article__title">Создание новой статьи</h2>
        <form action="">
          <label className="new-article__label">
            <span className="new-article__sub-title">Язык</span>
            <Dropdown
              id={'lang'}
              name={'lang'}
              options={langSelectOptions}
              title={draft.lang || 'Выбор'}
              onChange={changeField}
            />
          </label>

          <label
            className={`new-article__label${
              draft.lang ? '' : ' new-article__label_disabled'
            }`}
          >
            <span className="new-article__sub-title">Основная категория</span>
            <Dropdown
              id={'main_category'}
              name={'category'}
              options={titlesList}
              title={draft.main_category || 'Выбор'}
              onChange={changeField}
            />
          </label>

          <label
            className={`new-article__label${
              draft.main_category ? '' : ' new-article__label_disabled'
            }`}
          >
            <span className="new-article__sub-title">Подкатегория</span>
            <input
              disabled={!draft.main_category}
              type="text"
              name="sub_category"
              id="sub_category"
              className="new-article__input"
              size={32}
              value={draft.sub_category || 'страна/город/улица/дом'}
              onChange={(evt) => changeField('sub_category', evt.target.value)}
            />
          </label>

          <label className="new-article__label">
            <span className="new-article__sub-title">Картинка статьи</span>
            <input
              type="file"
              name="main-image"
              id="main-image"
              className="new-article__main-image"
              accept=".jpg, .png"
              onChange={addFile}
            />
            {draft.image && (
              <img
                className="new-article__img"
                src={draft.image}
                alt="Ваша картинка"
              />
            )}
          </label>

          <label className="new-article__label">
            <span className="new-article__sub-title">Заголовок статьи</span>
            <input
              type="text"
              name="article-title"
              id="article-title"
              className="new-article__input new-article__input_article-header"
              placeholder="Карточка товара в маркетплейсе"
              value={draft.title}
              onChange={(evt) => changeField('title', evt.target.value)}
            />
          </label>

          <label className="new-article__label">
            <span className="new-article__sub-title">Контент статьи</span>
            <textarea
              type="text"
              name="article-content"
              id="article-content"
              className="new-article__input new-article__input_article-content"
              placeholder="Введите текст статьи"
              value={draft.description}
              onChange={(evt) => changeField('description', evt.target.value)}
            />
          </label>

          <div className="new-article__label">
            <span className="new-article__sub-title">Рекомендации авторов</span>
            <div className="new-article__recommendations">
              <button
                className="new-article__recommendations-btn"
                type="button"
                onClick={toggleRecommendation}
              >
                <img src={plus} alt="Иконка добавления рекомендации" />
                <span className="new-article__recommendations-tip">
                  Добавить
                </span>
              </button>
              <ul className="recommendations__list">
                {draft.recommend_from_creator.map((item) => (
                  <li className="recommendations__item" key={item.id}>
                    <Recommend imageUrl={item.image} title={item.title} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </form>
      </div>
      <ModalRecommendation
        isOpen={isShownAddRec}
        onClose={toggleRecommendation}
        onSave={changeField}
        title={'Добавить рекомендацию'}
      />
    </section>
  );
}
