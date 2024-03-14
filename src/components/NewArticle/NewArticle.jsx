import { useState } from 'react';
import './NewArticle.css';
import plus from 'images/plus-icon.svg';
import { langSelectOptions, categorySelectOptions } from 'utils/constants';
import { Dropdown, ModalRecommendation } from 'components';

export default function NewArticle() {
  // const [value, changeValue] = useState('');
  const [isShownAddRec, setIsShownAddRec] = useState(false);

  const toggleRecommendation = () => {
    setIsShownAddRec(!isShownAddRec);
  };

  return (
    <section className="new-article">
      <div className="new-article__container">
        <h2 className="new-article__title">Создание новой статьи</h2>
        <form action="">
          <label className="new-article__label" htmlFor="lang">
            <span className="new-aritcle__sub-title">Язык</span>
            <Dropdown
              id={'lang'}
              name={'lang'}
              options={langSelectOptions}
              title="Выбор"
            />
          </label>

          <label className="new-article__label" htmlFor="category">
            <span className="new-aritcle__sub-title">Основная категория</span>
            <Dropdown
              id={'category'}
              name={'category'}
              options={categorySelectOptions}
              title="Выбор"
            />
          </label>

          <label className="new-article__label" htmlFor="sub-category">
            <span className="new-aritcle__sub-title">Подкатегория</span>
            <input
              type="text"
              name="sub-category"
              id="sub-category"
              value="component/active elements/button/"
              className="new-article__input"
              size={32}
            />
          </label>

          <label className="new-article__label" htmlFor="ref-category">
            <span className="new-aritcle__sub-title">Уточнение категории</span>
            <input
              type="text"
              name="ref-category"
              id="ref-category"
              value=".../button"
              size={8}
              // size={Math.min(Math.max(value.length, 2), 20)}
              // value={value}
              // onChange={(event) => {
              // 	changeValue(event.target.value);
              // }}
              className="new-article__input"
            />
          </label>

          <label className="new-article__label" htmlFor="main-image">
            <span className="new-aritcle__sub-title">Картинка статьи</span>
            <input
              type="file"
              name="main-image"
              id="main-image"
              className="new-article__main-image"
            />
          </label>

          <label className="new-article__label" htmlFor="article-header">
            <span className="new-aritcle__sub-title">Заголовок статьи</span>
            <input
              type="text"
              name="article-title"
              id="article-title"
              className="new-article__input new-article__input_article-header"
              placeholder="Карточка товара в маркетплейсе"
            />
          </label>

          <label className="new-article__label" htmlFor="article-content">
            <span className="new-aritcle__sub-title">Контент статьи</span>
            <textarea
              type="text"
              name="article-content"
              id="article-content"
              className="new-article__input new-article__input_article-content"
              placeholder="Введите текст статьи"
            />
          </label>

          <label className="new-article__label" htmlFor="recommendations">
            <span className="new-aritcle__sub-title">Рекомендации авторов</span>
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
            </div>
          </label>
        </form>
      </div>
      <ModalRecommendation
        isOpen={isShownAddRec}
        onClose={toggleRecommendation}
        title={'Добавить рекомендацию'}
      />
    </section>
  );
}
