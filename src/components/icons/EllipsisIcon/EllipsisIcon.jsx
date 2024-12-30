import React from 'react';
import './EllipsisIcon.css';

function EllipsisIcon({ width = 14, height = 13, extraClass = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      className={`ellipsis-icon ${extraClass}`}
    >
      <circle cx="2" cy="6.5" r="1.5" fill="inherit" />
      <circle cx="7" cy="6.5" r="1.5" fill="inherit" />
      <circle cx="12" cy="6.5" r="1.5" fill="inherit" />
    </svg>
  );
}

export default EllipsisIcon;
