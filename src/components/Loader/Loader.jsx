import './Loader.css';

function Loader({ extraClass }) {
  return <h2 className={`loader ${extraClass ?? ''}`}>Загрузка. . .</h2>;
}

export default Loader;
