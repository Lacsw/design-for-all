import './Error.css';

function Error({ message, extraClass }) {
  return <h2 className={`error ${extraClass ?? ''}`}>{message}</h2>;
}

export default Error;
