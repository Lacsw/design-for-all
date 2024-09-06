import { Link } from 'react-router-dom';
import Recommend from './Recommend';
import './Recommendations.css';

const Recommendations = ({ list }) => {
  return !!list.length && (
    <article className="recommendations">
      <h3 className="recommendations__title">Рекомендации авторов</h3>
      <ul className="recommendations__list">
        {list.map((item) => (
          <li className="recommendations__item" key={item.uuid}>
            <Link
              to={`../${item.uuid}`}
              relative="path"
              className="recommendations__link"
            >
              <Recommend imageUrl={item.image} title={item.title} />
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default Recommendations;
