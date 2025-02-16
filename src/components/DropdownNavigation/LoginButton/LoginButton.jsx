import './LoginButton.css';

import { useSelector } from 'react-redux';
import { getCurrentTheme } from 'store/selectors';
import siginInIcon from 'images/siginin-icon.svg';
import siginInIconWhite from 'images/siginin-icon_white.svg';

export default function LoginButton({ openAuthModal }) {
  const theme = useSelector(getCurrentTheme);

  return (
    <button onClick={openAuthModal} className="logout-button">
      <img
        src={theme === 'dark' ? siginInIcon : siginInIconWhite}
        alt="Войти"
        className="logout-button__img"
      />
    </button>
  );
}
