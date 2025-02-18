import { useEffect, useRef } from 'react';
import { SlideIframe } from 'components';
import './MainSlider.css';
import { useSelector } from 'react-redux';
import { getLanguage } from 'store/selectors';
import Updates from 'components/Updates/Updates';

export default function MainSlider({ index }) {
  const lang = useSelector(getLanguage);

  const slideList = [
    <Updates key="updates" />,
    <SlideIframe key="web" lang={lang} category="web" />,
    <SlideIframe key="desktop" lang={lang} category="desktop" />,
    <SlideIframe key="mobile" lang={lang} category="mobile" />,
    <SlideIframe key="articles" lang={lang} category="articles" />,
    <SlideIframe key="manual" lang={lang} category="manual" />,
  ];

  // Реф для хранения текущего анимированного индекса.
  // 0.5 - смещение для стартовой анимация,"-" направление
  const animatedIndexRef = useRef(index - 0.5);

  // Реф для контейнера слайдов, чтобы иметь прямой доступ к DOM-элементам слайдов
  const containerRef = useRef(null);

  useEffect(() => {
    let start = null;
    const duration = 500; // длительность анимаци в мс
    const initialIndex = animatedIndexRef.current; // Начальное значение
    const delta = index - initialIndex; // Разница между целевым и начальным значением
    const oldMain = Math.round(initialIndex); // Фиксируем старый основной слайд
    const newMain = index; // новый основной слайд

    // вызывается на каждом кадре анимации через requestAnimationFrame
    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const newIndex = initialIndex + delta * progress;
      animatedIndexRef.current = newIndex;

      if (containerRef.current) {
        const slides = containerRef.current.children;
        for (let i = 0; i < slides.length; i++) {
          const diff = i - newIndex;
          if (Math.abs(diff) > 1.5) {
            slides[i].style.display = 'none';
          } else {
            slides[i].style.display = '';
            const translateX = diff * 40; // смещение по X в процентах,  каждый шаг diff = 1 соответствует 40% от ширины
            const translateY = -200 * Math.min(Math.abs(diff), 1); // Смещение по Y: для активного слайда (diff ≈ 0) смещение по Y = 0 / для неактивных поднимаем вверх до -200px, интерполируя по Math.min(Math.abs(diff), 1)
            const scale = 0.4 + (1 - 0.4) * (1 - Math.abs(diff)); // Активный слайд (diff = 0) имеет scale = 1, соседние – scale = 0.4

            const blur = 5 * Math.abs(diff); //степень размытия: активный слайд без размытия, соседние – до 5px

            // Определяем z-index:
            let zIndex = 1;
            if (i === newMain) {
              zIndex = 10;
            } else if (i === oldMain && newMain !== oldMain) {
              zIndex = 9;
            } else {
              zIndex = 1;
            }

            // Применяем стили
            slides[
              i
            ].style.transform = `translateX(${translateX}%) translateY(${translateY}px) scale(${scale})`;
            slides[i].style.filter = `blur(${blur}px)`;
            slides[i].style.zIndex = zIndex;
          }
        }
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  }, [index]);

  return (
    <div className="main-slider" ref={containerRef}>
      {slideList.map((slide, i) => (
        <div key={slide.key} className="main-slider__slide">
          <div className="main-slider__slide-content">{slide}</div>
        </div>
      ))}
    </div>
  );
}
