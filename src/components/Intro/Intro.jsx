// import { useSelector } from 'react-redux';
// import { getCurrentTheme } from 'store/slices/theme';
import './Intro.css';
import { useEffect, useRef } from 'react';
import { useIsMobile } from 'utils/hooks/useIsMobile';
import { useTranslation } from 'react-i18next';
export default function Intro() {
  const { t } = useTranslation();
  const typeRef = useRef(null);
  const isMobile = useIsMobile();

  const slogan = isMobile
    ? 'Единственная, самая большая,/структурированная и свободная энциклопедия/по дизайну в IT.'
    : 'Единственная, самая большая,/структурированная и свободная/энциклопедия по дизайну в IT.';

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
      <h1 className="intro__title">{t('main_intro_title')}</h1>
      <p className="intro__subtitle" ref={typeRef}></p>
    </div>
  );
}
