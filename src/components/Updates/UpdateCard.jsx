import { Link } from 'react-router-dom';
import './UpdateCard.css';

export default function UpdateCard({ update }) {
  return (
    <li className="update-card">
      <Link to={`/${update.lang}/${update.uuid}`} className="update-card__link" >
        <div className="update-card__titles">
          <h3 className="update-card__section-name">{update.main_category}</h3>
          <span className="update-card__path">{update.sub_category}</span>
          <span className="update-card__others">{update.title}</span>
        </div>
        <div className="update-card__info">
          <span className="update-card__others">Перевод статьи</span>
          <span className="update-card__others">19.08.2024</span>
        </div>
      </Link>
    </li>
  );
}
