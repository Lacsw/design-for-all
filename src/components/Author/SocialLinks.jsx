import { useSelector } from 'react-redux';
import { getCurrentTheme } from 'store/selectors';
import { socialIcons } from 'utils/constants';
import { getSocialHref } from 'utils/socials';

const SocialLinks = ({ socialData, cut }) => {
  const theme = useSelector(getCurrentTheme);
  const socialList = cut
    ? Object.entries(socialData).slice(0, 4)
    : Object.entries(socialData);
  return (
    <>
      {socialList.map(([name, url]) => (
        <a
          key={name}
          href={getSocialHref(name, url)}
          target="_blank"
          rel="noreferrer"
          className="social-link"
        >
          <img
            src={
              socialIcons[name]?.[theme] ||
              socialIcons[name] ||
              socialIcons['default'][theme]
            }
            alt={name}
            className="author__social"
          />
        </a>
      ))}
    </>
  );
};

export default SocialLinks;
