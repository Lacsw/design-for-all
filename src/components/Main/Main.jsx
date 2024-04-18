import React, { useState } from 'react';
import './Main.css';
import slideImg from 'images/main/slide-img.png';
import { mainNavigationOptionsList } from '../../utils/constants';
import { Header, Footer, Intro, MainNavigationBar } from 'components';
import MainSlide from './MainSlide/MainSlide';

export default function Main() {
  const [activeTab, setActiveTab] = useState('Десктоп приложения');
  const handleActiveTab = (name) => {
    setActiveTab(name);
  };
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
        <MainSlide />
      </div>
      <Footer />
    </>
  );
}
