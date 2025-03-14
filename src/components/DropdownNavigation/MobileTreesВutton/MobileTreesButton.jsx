import './MobileTreesButton.css';
import { useInteractiveManager } from 'utils/contexts/InteractiveManagerContext';
import { useSelector } from 'react-redux';
import { getCurrentTheme } from 'store/selectors';
import mobileTreesIcon from 'images/navigation/mobile-trees-icon.svg';
import mobileTreesIconWhite from 'images/navigation/mobile-trees-icon_white.svg';

export default function MobileTreesButton() {
  const theme = useSelector(getCurrentTheme);
  const { activeComponent, openComponent, closeComponent } = useInteractiveManager();
  const isMobileSidebarOpen = activeComponent === 'mobileSidebar';

  const handleClick = () => {
    if (isMobileSidebarOpen) {
      closeComponent('mobileSidebar');
    } else {
      openComponent('mobileSidebar');
    }
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
