import './ArticleHeader.css';
import flag from 'images/flag-icon.svg';
import changeIcon from 'images/change-icon.svg';

export default function ArticleHeader({ title, timeCreate, timeUpdate }) {
  return (
    <>
      <div className="article-header">
        <h2 className="article-header__title">{title}</h2>
        <div className="article-header__icon-container">
          <button type="button" className="article-header__button">
            {' '}
            <img
              src={flag}
              alt="Флаг"
              className="article-header__button-image"
            />
          </button>
          <button type="button" className="article-header__button">
            {' '}
            <img src={changeIcon} alt="Иконка редактирования" />
          </button>
        </div>
      </div>
      <div className="article-header__timing-container">
        <p className="article-header__timing">Опубликовано {timeCreate}</p>
        <p className="article-header__timing">Обновлено {timeUpdate}</p>
      </div>
    </>
  );
}
