import React, { useState } from 'react';
import { mainNavigationOptionsList } from 'utils/constants';
import { Intro, MainNavigationBar, MainSlider } from 'components';
import './Main.css';

export default function Main() {
  const [activeTab, setActiveTab] = useState({
    name: 'Десктоп приложения',
    index: 2,
  });

  const handleActiveTab = ({ name, index }) => {
    setActiveTab({ name, index });
  };

  return (
    <>
      <Intro />
      <MainNavigationBar
        navLinksList={mainNavigationOptionsList}
        onClick={handleActiveTab}
        activeTab={activeTab}
      />
      <div className="main__content">
        <MainSlider index={activeTab.index} />
      </div>
    </>
  );
}
