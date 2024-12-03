import UpdateCard from './UpdateCard';
import { useEffect, useRef } from 'react';
import { fetchUpdates, selectUpdates } from 'store/slices/articleSlice';
import { useSelector, useDispatch } from 'react-redux';
import debounce from 'utils/helpers/debounce';
import './Updates.css';

export default function Updates() {
  const slideRef = useRef(null);
  const page = useRef(1);
  const updates = useSelector(selectUpdates);
  const dispatch = useDispatch();

  useEffect(() => {
    Date.now() - updates.fetchTime > 30000 && !updates.loading && dispatch(fetchUpdates(1));
  }, [updates, dispatch]);

  useEffect(() => {
    const slide = slideRef.current;
    slide.addEventListener('scroll', scrollWithDelay);
    return () => slide.removeEventListener('scroll', scrollWithDelay);
  });

  function handleScroll(evt) {
    if (
      evt.target.scrollHeight -
        (evt.target.scrollTop + evt.target.offsetHeight) <
      100
    ) {
      page.current++;
      dispatch(fetchUpdates(page.current));
    }
  }

  const scrollWithDelay = debounce(handleScroll, 200);

  return (
    <section className="updates-slide" ref={slideRef}>
      <h2 className="updates-slide__title">Обновления</h2>
      {updates.loading && <span className="preloader" />}
      {updates.error && updates.error}
      <ul className="updates-slide__list">
        {updates.cards.map((item) => (
          <UpdateCard update={item} key={item.uuid} />
        ))}
      </ul>
    </section>
  );
}
