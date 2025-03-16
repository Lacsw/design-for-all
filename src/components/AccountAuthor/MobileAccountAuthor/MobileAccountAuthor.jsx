import './MobileAccountAuthor.css';
import { useSelector } from 'react-redux';

import { getCurrentTheme } from 'store/selectors';
import Button from 'components/Button/Button';
import mobileAccountImgLight from 'images/account/mobile/mobile-account-img-light.svg';
import mobileAccountImgDark from 'images/account/mobile/mobile-account-img-dark.svg';

export default function MobileAccountAuthor({ handleLogout }) {
  const theme = useSelector(getCurrentTheme);

  return (
    <div className="mobile-account-author">
      <div className="mobile-account-author__content">
        <img
          src={theme === 'dark' ? mobileAccountImgDark : mobileAccountImgLight}
          alt=""
        />
        <p className="mobile-account-author__text">
          Доступ в личный кабинет только с fullscreen
        </p>
        <Button
          onClick={handleLogout}
          extraClass="mobile-account-author__button"
        >
          Выйти
        </Button>
      </div>
    </div>
  );
}