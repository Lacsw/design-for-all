import './MobileTreesВutton.css';

import { useDispatch, useSelector } from 'react-redux';
import { getCurrentTheme } from 'store/selectors';
import mobileTreesIcon from 'images/navigation/mobile-trees-icon.svg';
import mobileTreesIconWhite from 'images/navigation/mobile-trees-icon_white.svg';
import { selectIsMobileSidebarOpen, setIsMobileSidebarOpen } from 'store/slices/articleSlice';

export default function MobileTreesВutton() {
  const theme = useSelector(getCurrentTheme);
  const dispatch = useDispatch();
  const isMobileSidebarOpen = useSelector(selectIsMobileSidebarOpen);


  const handleClick = () => {
    dispatch(setIsMobileSidebarOpen(!isMobileSidebarOpen));
  };

  return (
    <button onClick={handleClick} className="mobile-trees">
      <img
        src={theme === 'dark' ? mobileTreesIcon : mobileTreesIconWhite}
        alt="Войти"
        className="mobile-trees__img"
      />
    </button>
  );
}
