export default function ArrowBackIcon({ isOpen }) {
  const className = isOpen
    ? 'dropdown-navigation__hide-button'
    : 'dropdown-navigation__hide-button_closed';

  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        x="1"
        y="1"
        width="32"
        height="32"
        rx="17"
        fill={
          !isOpen
            ? '#161616'
            : '#fff'
        }
        stroke="#161616"
        strokeWidth="2"
      />
      <path
        d="M15.2505 12L10.0005 17M10.0005 17L15.2505 22M10.0005 17H24.0005"
        stroke={
          !isOpen
            ? '#fff'
            : '#242424'
        }
        strokeWidth="1.36364"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
