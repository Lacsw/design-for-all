import { useSelector } from 'react-redux';
import { getCurrentTheme } from 'store/selectors';
import './Intro.css';

export default function Intro() {
  const theme = useSelector(getCurrentTheme);
  return (
    <div className={'intro ' + theme}>
      <div className="intro__container">
        <h1 className="intro__title">Design for all</h1>
        <p className="intro__subtitle">
          Единственная, самая большая, структурированная и свободная
          энциклопедия по дизайну в IT.
        </p>
      </div>
    </div>
  );
}
