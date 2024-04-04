import './Error.css';

function Error({ data, extraClass }) {
  return <h2 className={`error ${extraClass ?? ''}`}>{data}</h2>;
}

export default Error;
