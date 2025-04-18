import { Link } from 'react-router-dom';
import './UpdateCard.css';
import { useDispatch } from 'react-redux';
import { setMainCategory, setShouldRemountTree } from 'store/slices/article';
import { UPDATES } from 'utils/translationKeys';
import { useTranslation } from 'react-i18next';

export default function UpdateCard({ update }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  
  return (
    <li className="update-card">
      <Link
        to={`/${update.lang}/${update.what_update || update.what_create}`}
        className="update-card__link"
        onClick={() => {
          dispatch(setMainCategory(update.main_category));
          dispatch(setShouldRemountTree(true));
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
              ? t(UPDATES.ARTICLE_TYPE.NEW)
              : update.type === 'created_lang'
              ? t(UPDATES.ARTICLE_TYPE.TRANSLATED)
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
