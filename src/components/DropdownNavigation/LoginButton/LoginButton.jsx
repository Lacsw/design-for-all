import './LoginButton.css';

import { useSelector } from 'react-redux';
import { getCurrentTheme } from 'store/slices/theme';
import siginInIcon from 'images/siginin-icon.svg';
import siginInIconWhite from 'images/siginin-icon_white.svg';
import { useTranslation } from 'react-i18next';
import { COMMON } from 'utils/translationKeys';

export default function LoginButton({ openAuthModal }) {
  const theme = useSelector(getCurrentTheme);
  const { t } = useTranslation();

  return (
    <button onClick={openAuthModal} className="logout-button">
      <img
        src={theme === 'dark' ? siginInIcon : siginInIconWhite}
        alt={t(COMMON.AUTH.LOGIN)}
        className="logout-button__img"
      />
    </button>
  );
}
