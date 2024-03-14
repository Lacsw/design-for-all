import './AuthorArticlesNav.css';
import { DropdownAmount } from 'components';
import { listRangeOptions, authorArticlesTabs } from 'utils/constants';

export default function AuthorArticlesNav({
  handlePagination,
  selected,
  onChange,
}) {
  return (
    <nav className="author-articles-nav">
      <ul className="author-articles-nav__list">
        {authorArticlesTabs.map((tab) => (
          <li key={tab.value}>
            <button
              className={`author-articles-nav__item ${
                selected === tab.value ? 'author-articles-nav__item_active' : ''
              }`}
              onClick={() => onChange(tab.value)}
            >
              {tab.name}
            </button>
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
