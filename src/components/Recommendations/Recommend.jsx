import defaultImage from '../../images/article/recommend.png';
import './Recommend.css';

const Recommend = ({ imageUrl, title }) => {
  return (
    <div className="recommend">
      <img
        src={!imageUrl?.includes('blabla') && defaultImage} // в будущем изменить условие на imageUrl || defaultImage
        alt="Превью статьи"
        className="recommend__image"
      />
      <h4 className="recommend__title">
        {title?.slice(0, 40) || 'Заголовок отсутствует'}
      </h4>
    </div>
  );
};

export default Recommend;
