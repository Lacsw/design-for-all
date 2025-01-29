import { useSelector } from 'react-redux';
import imgBlack from '../../images/error-image_black.jpg';
import imgWhite from '../../images/error-image_white.jpg';
import './Recommend.css';
import { getCurrentTheme } from 'store/selectors';

function cropTitle(title) {
  if (!title) return 'Заголовок отсутствует';
  if (title.length > 40) return title?.slice(0, 35) + '...';
  return title;
}

const Recommend = ({ imageUrl, title }) => {
  const theme = useSelector(getCurrentTheme);
  const defaultImage = theme === 'dark' ? imgBlack : imgWhite;

  return (
    <div className="recommend">
      <img
        key={theme}
        src={!imageUrl || imageUrl.includes('test_') ? defaultImage : imageUrl}
        alt="Превью статьи"
        className="recommend__image"
        onError={(evt) => (evt.target.src = defaultImage)}
      />
      <h4 className="recommend__title">{cropTitle(title)}</h4>
    </div>
  );
};

export default Recommend;
