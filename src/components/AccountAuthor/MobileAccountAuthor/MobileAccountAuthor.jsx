import './MobileAccountAuthor.css';
import { useSelector } from 'react-redux';

import { getCurrentTheme } from 'store/slices/theme';
import Button from 'components/Button/Button';
import mobileAccountImgLight from 'images/account/mobile/mobile-account-img-light.svg';
import mobileAccountImgDark from 'images/account/mobile/mobile-account-img-dark.svg';
import { AUTHOR } from 'utils/translationKeys';
import { useTranslation } from 'react-i18next';

export default function MobileAccountAuthor({ handleLogout }) {
  const { t } = useTranslation();
  const theme = useSelector(getCurrentTheme);

  return (
    <div className="mobile-account-author">
      <div className="mobile-account-author__content">
        <img
          src={theme === 'dark' ? mobileAccountImgDark : mobileAccountImgLight}
          alt=""
        />
        <p className="mobile-account-author__text">
          {t(AUTHOR.MOBILE.PLACEHOLDER)}
        </p>
        <Button
          onClick={handleLogout}
          extraClass="mobile-account-author__button"
        >
          {t(AUTHOR.MOBILE.LOGOUT_BUTTON)}
        </Button>
      </div>
    </div>
  );
}
