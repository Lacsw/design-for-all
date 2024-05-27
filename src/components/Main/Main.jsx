import React, { useState } from 'react';
import './Main.css';
import { mainNavigationOptionsList } from '../../utils/constants';
import { Header, Footer, Intro, MainNavigationBar } from 'components';
import MainSlider from './MainSlider/MainSlider';

export default function Main() {
  const [activeTab, setActiveTab] = useState({
    name: 'Десктоп приложения',
    index: 2,
  });

  const handleActiveTab = ({ name, index }) => {
    setActiveTab({ name, index });
  };
console.log(activeTab)
  return (
    <>
      <Header />
      <Intro />
      <MainNavigationBar
        navLinksList={mainNavigationOptionsList}
        onClick={handleActiveTab}
        activeTab={activeTab}
      />
      <div className="main__content">
        <MainSlider index={activeTab.index} />
      </div>
      <Footer />
    </>
  );
}
