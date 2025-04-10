import React, { useEffect, useRef } from 'react';
import { SlideIframe } from 'components';
import './MainSlider.css';
import { useSelector } from 'react-redux';
import { getLanguage } from 'store/slices/user';
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
  // 0.5 - смещение для стартовой анимации, "-" направление
  const animatedIndexRef = useRef(index - 0.5);
  // Реф для контейнера слайдов, чтобы иметь прямой доступ к DOM-элементам слайдов
  const containerRef = useRef(null);

  // Анимация слайдов
  useEffect(() => {
    let start = null;
    const duration = 500; // длительность анимации в мс
    const initialIndex = animatedIndexRef.current; // Начальное значение
    const delta = index - initialIndex; // Разница между целевым и начальным значением
    const oldMain = Math.round(initialIndex); // Фиксируем старый основной слайд
    const newMain = index; // новый основной слайд

    // Вызывается на каждом кадре анимации через requestAnimationFrame
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
            slides[i].style.opacity = '0';
            slides[i].style.pointerEvents = 'none';
          } else {
            slides[i].style.opacity = '1';
            slides[i].style.pointerEvents = 'auto';
            const translateX = diff * 40; // смещение по X в процентах
            const translateY = 50 * Math.min(Math.abs(diff), 1); // смещение по Y
            const scale = 0.4 + (1 - 0.4) * (1 - Math.abs(diff)); // масштаб
            const blur = 3.5 * Math.abs(diff); // степень размытия

            // Определяем z-index
            let zIndex = 1;
            if (i === newMain) {
              zIndex = 10;
            } else if (i === oldMain && newMain !== oldMain) {
              zIndex = 9;
            } else {
              zIndex = 1;
            }

            slides[i].style.transformOrigin = 'top center';
            slides[
              i
            ].style.transform = `translateX(${translateX}%) translateY(${translateY}px) scale(${scale})`;
            slides[i].style.filter = `blur(${blur}px)`;
            slides[i].style.zIndex = zIndex;
          }
          // Переключаем CSS-классы для плавного перехода mask, overflow и max-height
          if (i === newMain) {
            slides[i].classList.add('active-slide');
            slides[i].classList.remove('inactive-slide');
          } else {
            slides[i].classList.add('inactive-slide');
            slides[i].classList.remove('active-slide');
          }
        }
        // Обновляем высоту контейнера на основе активного слайда
        const activeSlide = containerRef.current.children[newMain];
        if (activeSlide) {
          containerRef.current.style.height = activeSlide.offsetHeight + 'px';
        }
      }
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  }, [index]);

  // ResizeObserver для отслеживания изменений размеров активного слайда
  useEffect(() => {
    let observer;
    const activeSlide = containerRef.current?.children[index];
    if (activeSlide && window.ResizeObserver) {
      observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const newHeight = entry.contentRect.height;
          if (containerRef.current) {
            containerRef.current.style.height = newHeight + 'px';
          }
        }
      });
      observer.observe(activeSlide);
    }
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [index]);

  return (
    <div className="main-slider" ref={containerRef}>
      {slideList.map((slide, i) => {
        const isActive = i === index;
        return (
          <div key={slide.key} className="main-slider__slide">
            <div className="main-slider__slide-content">
              {React.cloneElement(slide, { active: isActive })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
