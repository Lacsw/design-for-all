import UpdateCard from './UpdateCard';
import { useEffect } from 'react';
import { fetchUpdates, selectUpdates } from 'store/slices/articleSlice';
import { useSelector, useDispatch } from 'react-redux';
import './Updates.css';

export default function Updates() {
  const updates = useSelector(selectUpdates);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUpdates());
  }, [dispatch]);
  return (
    <section className="updates-slide">
      <h2 className="updates-slide__title">Обновления</h2>
      {updates.loading && <span className="preloader" />}
      {updates.error && updates.error}
      {updates.cards && (
        <ul className="updates-slide__list">
          {updates.cards.map((item) => (
            <UpdateCard update={item} key={item.uuid} />
          ))}
        </ul>
      )}
    </section>
  );
}
