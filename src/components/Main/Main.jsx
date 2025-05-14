import { useState, useEffect } from 'react';
import { mainNavigationOptionsList } from 'utils/constants';
import { Intro, MainNavigationBar, MainSlider } from 'components';
import './Main.css';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentTheme } from 'store/slices/theme';
import { setCurrentSection } from 'store/slices/catalog/slice';
import logo from 'images/logo.svg';
import logoBlack from 'images/logo-black.svg';
import { useIsMobile } from 'utils/hooks/useIsMobile';

export default function Main() {
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const theme = useSelector(getCurrentTheme);
  
  const [activeTab, setActiveTab] = useState({
    name: mainNavigationOptionsList[0].id,
    index: 0,
  });
  
  useEffect(() => {
    setActiveTab({
      name: mainNavigationOptionsList[0].id,
      index: 0,
    });
    dispatch(setCurrentSection(mainNavigationOptionsList[0].link));
  }, [dispatch]);

  const handleActiveTab = ({ name, index }) => {
    setActiveTab({ name, index });
  };

  return (
    <>
      {isMobile && (
        <div className="main-mobile-logo__container">
          <img
            src={theme === 'dark' ? logo : logoBlack}
            alt="Логотип"
            className="main-mobile-logo"
          />
        </div>
      )}
      <div className={'main__intro-nav-bar ' + theme}>
        <Intro noWrapper />
        <MainNavigationBar
          navLinksList={mainNavigationOptionsList}
          onClick={handleActiveTab}
          activeTab={activeTab}
        />
      </div>

      <div className="main__content">
        <MainSlider index={activeTab.index} />
      </div>
    </>
  );
}
