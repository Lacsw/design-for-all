import { useSelector } from 'react-redux';
import './SocialsBar.css';

import { socialIcons } from 'utils/constants';
import plusBigIcon from 'images/author/plus-icon.svg';

export default function SocialsBar() {
  const { currentUser } = useSelector((state) => state.user);

  const renderSocialMedia = () => {
    return Object.entries(currentUser.social_media).map(
      ([key, value], index) => (
        <a key={index} href={value} target="_blank" rel="noreferrer">
          <img
            src={socialIcons[key]}
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
      <button className="socials-bar-btn">
        <img src={plusBigIcon} alt="Иконка добавить" />
      </button>
    </div>
  );
}
