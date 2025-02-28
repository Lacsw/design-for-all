import { useCallback } from 'react';
import './MobileAccountAuthor.css';
import { useDispatch, useSelector } from 'react-redux';
import authApi from 'utils/api/auth';
import { signInSuccess } from 'store/slices';
import { getCurrentTheme, getCurrentUser } from 'store/selectors';
import Button from 'components/Button/Button';
import mobileAccountImgLight from 'images/account/mobile/mobile-account-img-light.svg';
import mobileAccountImgDark from 'images/account/mobile/mobile-account-img-dark.svg';

export default function MobileAccountAuthor({ hash, resetSection }) {
  const dispatch = useDispatch();
  const theme = useSelector(getCurrentTheme);

  const handleLogout = useCallback(async () => {
    try {
      await authApi.logout();
      resetSection();
      dispatch(signInSuccess(null));
    } catch (err) {
      console.error('Ошибка при выходе:', err);
    }
  }, [dispatch, resetSection]);

  if (!getCurrentUser) return null;

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
