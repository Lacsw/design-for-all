import './Hint.css';

function Hint({ children }) {
  return (
    <div className="hint">
      <div className="hint__children-container">{children}</div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M10 20L-2.03997e-06 7.94781e-07L20 -9.53674e-07L10 20Z"
          fill="#161616"
        />
      </svg>
    </div>
  );
}

export default Hint;
