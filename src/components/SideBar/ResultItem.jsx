import { Link } from 'react-router-dom';
import { useRef, useEffect } from 'react';

export default function ResultItem({ language, item }) {
  const textRef = useRef(null);
  useEffect(() => {
    if (textRef.current) {
      textRef.current.innerHTML = item.marked.join('/');
    }
  });
  return (
    <li className="sidebar__item">
      <Link
        to={'/' + language + '/' + item.uuid}
        className="sidebar__link"
        ref={textRef}
      />
    </li>
  );
}
