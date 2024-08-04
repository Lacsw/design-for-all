import React from 'react';
import { DesktopSlide } from 'components';
import './MainSlider.css';

export default function MainSlider({ index }) {
  const slideList = [
    <DesktopSlide />,
    <DesktopSlide />,
    <DesktopSlide />,
    <DesktopSlide />,
    <DesktopSlide />,
    <DesktopSlide />,
  ];

  return (
    <div className="main-slider">
      {index > 0 && (
        <div className="main-slider__prev-slide">{slideList[index - 1]}</div>
      )}
      <div className="main-slider__main-slide">{slideList[index]}</div>
      {index < 5 && (
        <div className="main-slider__next-slide">{slideList[index + 1]}</div>
      )}
    </div>
  );
}
