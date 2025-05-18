import { useSelector } from 'react-redux';
import imgBlack from '../../images/error-image_black.jpg';
import imgWhite from '../../images/error-image_white.jpg';
import './Recommend.css';
import { getCurrentTheme } from 'store/slices/theme';
import { useTranslation } from 'react-i18next';
import { CATALOG } from 'utils/translationKeys';

const Recommend = ({ imageUrl, title }) => {
  const { t } = useTranslation();
  const theme = useSelector(getCurrentTheme);
  const defaultImage = theme === 'dark' ? imgBlack : imgWhite;

  const cropTitle = (title) => {
    if (!title) return t(CATALOG.ARTICLE.BLANK.TITLE);
    if (title.length > 40) return title?.slice(0, 35) + '...';
    return title;
  };

  return (
    <div className="recommend">
      <img
        key={theme}
        src={!imageUrl || imageUrl.includes('test_') ? defaultImage : imageUrl}
        alt={t(CATALOG.ARTICLE.IMAGE.ALT)}
        className="recommend__image"
        onError={(evt) => (evt.target.src = defaultImage)}
      />
      <h4 className="recommend__title">{cropTitle(title)}</h4>
    </div>
  );
};

export default Recommend;
