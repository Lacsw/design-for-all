import { DesktopSlide, DesktopSlideIframe } from 'components';
import './MainSlider.css';
import { useSelector } from 'react-redux';
import { getLanguage } from 'store/selectors';

export default function MainSlider({ index }) {
  const lang = useSelector(getLanguage);

  const slideList = [
    <DesktopSlide updates />,
    <DesktopSlideIframe lang={lang} category="web" />,
    <DesktopSlideIframe lang={lang} category="desktop" />,
    <DesktopSlideIframe lang={lang} category="mobile" />,
    <DesktopSlideIframe lang={lang} category="articles" />,
    <DesktopSlideIframe lang={lang} category="manuals" />,
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
