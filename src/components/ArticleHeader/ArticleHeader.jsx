import './ArticleHeader.css';
import { DropdownNavigation } from 'components';
import { editList } from 'utils/constants';
import DropdownLanguage from 'components/DropdownLanguage/DropdownLanguage';

export default function ArticleHeader({ title, timeCreate, timeUpdate }) {
  return (
    <>
      <div className="article-header">
        <h2 className="article-header__title">{title}</h2>
        <div className="article-header__icon-container">
          <DropdownLanguage />
          <button type="button" className="article-header__button">
            <DropdownNavigation
              options={editList}
              title="Редактировать"
              size="s"
              paddingBottom="1"
              gap="5"
              type="dropdownWithTools"
            />
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
