import React, { useState } from 'react';
import { mainNavigationOptionsList } from 'utils/constants';
import { Intro, MainNavigationBar, MainSlider } from 'components';
import './Main.css';
import { useSelector } from 'react-redux';
import { getCurrentTheme } from 'store/selectors';

export default function Main({ setSection }) {
  const theme = useSelector(getCurrentTheme);
  const [activeTab, setActiveTab] = useState({
    name: 'Обновления',
    index: 0,
  });

  const handleActiveTab = ({ name, index }) => {
    setActiveTab({ name, index });
  };

  return (
    <>
      <div className={'main__intro-nav-bar ' + theme}>
        <Intro noWrapper />
        <MainNavigationBar
          navLinksList={mainNavigationOptionsList}
          onClick={handleActiveTab}
          activeTab={activeTab}
          setSection={setSection}
        />
        {/* <div className="beauty" /> */}
      </div>

      <div className="main__content">
        <MainSlider index={activeTab.index} />
      </div>
    </>
  );
}
