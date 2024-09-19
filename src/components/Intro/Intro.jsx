import { useSelector } from 'react-redux';
import { getCurrentTheme } from 'store/selectors';
import './Intro.css';
import { useEffect, useRef } from 'react';

const slogan =
  'Единственная, самая большая,/структурированная и свободная/энциклопедия по дизайну в IT.';

export default function Intro() {
  const theme = useSelector(getCurrentTheme);
  const typeRef = useRef(null);

  useEffect(() => {
    const letters = slogan.split('');
    let i = 0;
    let timer = setInterval(() => {
      if (letters[i] === '/') {
        typeRef.current.innerHTML += '<br>'; // чтобы буквы сразу печатались с новой строки
      } else typeRef.current.innerHTML += letters[i];
      i++;
      if (i === letters.length) clearInterval(timer);
    }, 20);
  }, [typeRef]);

  return (
    <div className={'intro ' + theme}>
      <div className="intro__container">
        <h1 className="intro__title">Design for all</h1>
        <p className="intro__subtitle" ref={typeRef}></p>
      </div>
    </div>
  );
}
