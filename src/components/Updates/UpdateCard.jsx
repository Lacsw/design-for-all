import { Link } from 'react-router-dom';
import './UpdateCard.css';

export default function UpdateCard({ update }) {
  return (
    <li className="update-card">
      <Link
        to={`/${update.lang}/${update.what_update || update.what_create}`}
        className="update-card__link"
        onClick={() => {
          const titleEl = document.head.querySelector('title');
          if (titleEl) {
            titleEl.setAttribute('main_category', update.main_category);
          }
        }}
      >
        <div className="update-card__titles">
          <h3 className="update-card__section-name">{update.main_category}</h3>
          <span className="update-card__path">{update.sub_category}</span>
          <span className="update-card__others">{update.title}</span>
        </div>
        <div className="update-card__info">
          <span className="update-card__others">
            {update.type === 'created'
              ? 'Новая статья'
              : update.type === 'created_lang'
              ? 'Перевод статьи'
              : ''}
          </span>
          <span className="update-card__others">
            {update.time_action.split(' ')[0].split('-').reverse().join('.')}
          </span>
        </div>
      </Link>
    </li>
  );
}
