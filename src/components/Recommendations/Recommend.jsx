import defaultImage from '../../images/article/recommend.png';
import './Recommend.css';

const Recommend = ({ imageUrl, title }) => {
  return (
    <div className="recommend">
      <img
        src={!imageUrl || imageUrl.includes('test_') ? defaultImage : imageUrl}
        alt="Превью статьи"
        className="recommend__image"
        onError={evt => evt.target.src = defaultImage}
      />
      <h4 className="recommend__title">
        {title?.slice(0, 40) || 'Заголовок отсутствует'}
      </h4>
    </div>
  );
};

export default Recommend;
