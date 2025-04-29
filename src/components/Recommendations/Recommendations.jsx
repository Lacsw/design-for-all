import { Link } from 'react-router-dom';
import Recommend from './Recommend';
import './Recommendations.css';
import { useTranslation } from 'react-i18next';
import { ARTICLE } from 'utils/translationKeys';

const Recommendations = ({ list }) => {
  const { t } = useTranslation();
  return (
    !!list.length && (
      <article className="recommendations">
        <h3 className="recommendations__title">{t(ARTICLE.RECOMMENDATIONS.TITLE)}</h3>
        <ul className="recommendations__list">
          {list.map((item) => (
            <li className="recommendations__item" key={item.uuid}>
              <Link
                to={`../${item.uuid}`}
                relative="path"
                className="recommendations__link"
                target="_blank"
              >
                <Recommend imageUrl={item.image} title={item.title} />
              </Link>
            </li>
          ))}
        </ul>
      </article>
    )
  );
};

export default Recommendations;
