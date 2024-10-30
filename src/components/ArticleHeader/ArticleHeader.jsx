import './ArticleHeader.css';
import DropdownLanguage from 'components/DropdownLanguage/DropdownLanguage';
import DropdownEdit from 'components/DropdownEdit/DropdownEdit';

export default function ArticleHeader({ title, timeCreate, timeUpdate }) {
  return (
    <>
      <div className="article-header">
        <h2 className="article-header__title">{title}</h2>
        <div className="article-header__icon-container">
          <DropdownLanguage />
          <DropdownEdit />
        </div>
      </div>
      <div className="article-header__timing-container">
        <p className="article-header__timing">Опубликовано {timeCreate}</p>
        <p className="article-header__timing">Обновлено {timeUpdate}</p>
      </div>
    </>
  );
}
