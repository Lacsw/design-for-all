import './AuthorArticlesNav.css';
import { Link } from 'react-router-dom';
import { DropdownAmount } from 'components';
import { listRangeOptions, authorArticlesTabs } from 'utils/constants';
import { useTranslation } from 'react-i18next';

export default function AuthorArticlesNav({
  handlePagination,
  selected,
  onChange,
}) {
  const { t } = useTranslation();
  
  return (
    <nav className="author-articles-nav">
      <ul className="author-articles-nav__list">
        {authorArticlesTabs.map((tab) => (
          <li key={tab.value}>
            <Link
              to={`/#/author/articles/${tab.value}`}
              className={`author-articles-nav__item ${
                selected === tab.value ? 'author-articles-nav__item_active' : ''
              }`}
              onClick={() => onChange(tab.value)}
            >
              {t(tab.name)}
            </Link>
          </li>
        ))}
      </ul>
      <DropdownAmount
        className="author-articles-nav__more"
        id="list-range"
        name="list range"
        options={listRangeOptions}
        handlePagination={handlePagination}
      />
    </nav>
  );
}
