import { useSelector } from 'react-redux';
import { getCurrentTheme } from 'store/selectors';
import './Intro.css';
import { useEffect, useRef } from 'react';
import { useIsMobile } from 'utils/hooks/useIsMobile';

export default function Intro() {
  const theme = useSelector(getCurrentTheme);
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
    <div className={'intro ' + theme}>
      <div className="intro__container">
        <h1 className="intro__title">Design for all</h1>
        <p className="intro__subtitle" ref={typeRef}></p>
      </div>
    </div>
  );
}
