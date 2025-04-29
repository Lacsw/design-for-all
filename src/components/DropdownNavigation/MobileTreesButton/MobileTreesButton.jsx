import './MobileTreesButton.css';
import { useInteractiveManager } from 'utils/contexts/InteractiveManagerContext';
import { useSelector } from 'react-redux';
import { getCurrentTheme } from 'store/slices/theme';
import mobileTreesIcon from 'images/navigation/mobile-trees-icon.svg';
import mobileTreesIconWhite from 'images/navigation/mobile-trees-icon_white.svg';
import { useTranslation } from 'react-i18next';
import { HEADER } from 'utils/translationKeys';

export default function MobileTreesButton() {
  const theme = useSelector(getCurrentTheme);
  const { t } = useTranslation();
  const { activeComponent, openComponent, closeComponent } =
    useInteractiveManager();
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
        alt={t(HEADER.MOBILE_TREES.ICON_ALT)}
        className="mobile-trees__img"
      />
    </button>
  );
}
