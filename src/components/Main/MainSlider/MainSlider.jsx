import { DesktopSlide, SlideIframe } from 'components';
import './MainSlider.css';
import { useSelector } from 'react-redux';
import { getLanguage } from 'store/selectors';

export default function MainSlider({ index }) {
  const lang = useSelector(getLanguage);

  const slideList = [
    <DesktopSlide updates />,
    <SlideIframe lang={lang} category="web" />,
    <SlideIframe lang={lang} category="desktop" />,
    <SlideIframe lang={lang} category="mobile" />,
    <SlideIframe lang={lang} category="articles" />,
    <SlideIframe lang={lang} category="manual" />,
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
