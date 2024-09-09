import React, { useEffect, useState } from 'react';
import { mainNavigationOptionsList } from 'utils/constants';
import { Intro, MainNavigationBar, MainSlider } from 'components';
import './Main.css';

export default function Main() {
  const [activeTab, setActiveTab] = useState({
    name: 'Обновления',
    index: 0,
  });

  const handleActiveTab = ({ name, index }) => {
    setActiveTab({ name, index });
  };

  useEffect(() => document.querySelector('.main-wrapper').scrollTo(0, 0), []);

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
