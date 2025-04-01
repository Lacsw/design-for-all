import { useSelector } from 'react-redux';
import './SocialsBar.css';
import { socialIcons } from 'utils/constants';
import plusBigIcon from 'images/author/plus-icon.svg';
import { getCurrentTheme } from 'store/selectors';

export default function SocialsBar({ onOpen, socialMediaList }) {
  const theme = useSelector(getCurrentTheme);
  const shownList = Object.entries(socialMediaList);

  const renderSocialMedia = () => {
    return shownList.map((item, index) => (
      <a key={item[1] + index} href={item[1]} target="_blank" rel="noreferrer">
        <img
          src={
            socialIcons[item[0]]?.[theme] ||
            socialIcons[item[0]] ||
            socialIcons['default'][theme]
          }
          alt={item[0]}
          className="socials-bar-btn"
        />
      </a>
    ));
  };

  return (
    <div className="socials-bar">
      {renderSocialMedia()}
      <button type="button" className="socials-bar-btn" onClick={onOpen}>
        <img src={plusBigIcon} alt="Иконка добавить" />
      </button>
    </div>
  );
}
