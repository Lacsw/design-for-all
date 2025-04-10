import { Link } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setShouldRemountTree, setMainCategory } from 'store/slices/articleSlice';

export default function ResultItem({ language, item, onClick }) {
  const dispatch = useDispatch();
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      textRef.current.innerHTML = item.marked.join('/');
    }
  });
  return (
    <li className="sidebar__item">
      <Link
        onClick={() => {
          dispatch(setMainCategory(item.main_category));
          dispatch(setShouldRemountTree(true));
          onClick();
        }}
        to={'/' + language + '/' + item.uuid}
        className="sidebar__link"
        ref={textRef}
      />
    </li>
  );
}
