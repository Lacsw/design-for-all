import { useSelector } from 'react-redux';
import './SocialsBar.css';
import { socialIcons } from 'utils/constants';
import plusBigIcon from 'images/author/plus-icon.svg';
import { getCurrentTheme } from 'store/selectors';

export default function SocialsBar({ onOpen }) {
  const { currentUser } = useSelector((state) => state.user);
  const theme = useSelector(getCurrentTheme);

  const renderSocialMedia = () => {
    return Object.entries(currentUser.social_media).map(
      ([key, value], index) => (
        <a key={index} href={value} target="_blank" rel="noreferrer">
          <img
            src={
              (socialIcons[key] && socialIcons[key][theme]) ||
              socialIcons[key] ||
              socialIcons['default'][theme]
            }
            alt="Иконка"
            className="socials-bar-btn"
          />
        </a>
      )
    );
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
