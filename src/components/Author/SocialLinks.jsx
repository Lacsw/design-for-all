import { useSelector } from 'react-redux';
import { getCurrentTheme } from 'store/selectors';
import { socialIcons } from 'utils/constants';

const SocialLinks = ({ socialData, cut }) => {
  const theme = useSelector(getCurrentTheme);
  const socialList = cut
    ? Object.entries(socialData).slice(0, 4)
    : Object.entries(socialData);
  return (
    <>
      {socialList.map(([key, value]) => (
        <a
          key={key}
          href={value}
          target="_blank"
          rel="noreferrer"
          className="social-link"
        >
          <img
            src={
              socialIcons[key]?.[theme] ||
              socialIcons[key] ||
              socialIcons['default'][theme]
            }
            alt={key}
            className="author__social"
          />
        </a>
      ))}
    </>
  );
};

export default SocialLinks;
