import './Intro.css';
import { useEffect, useRef } from 'react';
import { useIsMobile } from 'utils/hooks/useIsMobile';
import { useTranslation } from 'react-i18next';
import { INTRO } from 'utils/translationKeys';

export default function Intro() {
  const { t } = useTranslation();
  const typeRef = useRef(null);
  const isMobile = useIsMobile();

  const slogan = isMobile
    ? t(INTRO.SUBTITLE_MOBILE)
    : t(INTRO.SUBTITLE_DESKTOP);

  useEffect(() => {
    // При каждом изменении слогана сбрасываем содержимое и запускаем анимацию заново
    if (typeRef.current) {
      typeRef.current.innerHTML = '';
    }
    const letters = slogan.split('');
    let i = 0;
    const timer = setInterval(() => {
      if (letters[i] === '/') {
        typeRef.current.innerHTML += '<br>'; // чтобы буквы сразу печатались с новой строки
      } else {
        typeRef.current.innerHTML += letters[i];
      }
      i++;
      if (i === letters.length) {
        clearInterval(timer);
      }
    }, 20);
    return () => clearInterval(timer);
  }, [slogan]);

  return (
    <div className="intro__container">
      <h1 className="intro__title">{t(INTRO.TITLE)}</h1>
      <p className="intro__subtitle" ref={typeRef}>
        {slogan}
      </p>
    </div>
  );
}
