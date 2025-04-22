import UpdateCard from './UpdateCard';
import { useEffect, useRef, useCallback, useMemo } from 'react';
import { fetchUpdates, selectUpdates, selectUpdatesError } from 'store/slices/article';
import { useSelector, useDispatch } from 'react-redux';
import debounce from 'utils/helpers/debounce';
import './Updates.css';
import { useTranslation } from 'react-i18next';
import { UPDATES } from 'utils/translationKeys';
import Button from 'components/Button/Button';

// Презентационный компонент
const UpdatesList = ({ updates, onScroll, slideRef, currentPage }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { error, canRetry, isEndReached } = useSelector(selectUpdatesError);

  return (
    <section className="updates-slide" ref={slideRef}>
      <h2 className="updates-slide__title">{t(UPDATES.TITLE)}</h2>
      {updates.loading && <span className="preloader" />}

      <ul className="updates-slide__list">
        {updates.cards.map((item, index) => (
          <UpdateCard
            update={item}
            key={`${(item.what_update || item.what_create) + item.lang}-${index}`}
          />
        ))}
      </ul>
      {error && (
        <div className="error-message">
          {t(UPDATES.ERROR_MESSAGE)}
          {canRetry && (
            <Button
              onClick={() => dispatch(fetchUpdates(currentPage))}
              extraClass="updates-retry-button"
            >
              {t(UPDATES.RETRY_BUTTON)}
            </Button>
          )}
        </div>
      )}
      {isEndReached && updates.cards.length > 0 && (
        <div className="updates-end-message">
          {t(UPDATES.NO_MORE_UPDATES)}
        </div>
      )}
    </section>
  );
};

// Компонент-контейнер
export default function Updates({ section }) {
  const slideRef = useRef(null);
  const page = useRef(1);
  const updates = useSelector(selectUpdates);
  const dispatch = useDispatch();
  const { isEndReached, error } = useSelector(selectUpdatesError);

  // Сброс страницы при монтировании или изменении секции
  useEffect(() => {
    page.current = 1;
    const shouldFetch = Date.now() - updates.fetchTime > 30000 || !updates.fetchTime;
    if (shouldFetch) {
      dispatch(fetchUpdates(1));
    }
  }, [section, dispatch, updates.fetchTime]);

  const handleScroll = useCallback(
    (evt) => {
      if (
        evt.target.scrollHeight -
        (evt.target.scrollTop + evt.target.offsetHeight) <
        100 &&
        !updates.loading &&
        !isEndReached &&
        !error // Не загружаем следующую страницу, если есть ошибка
      ) {
        page.current++;
        dispatch(fetchUpdates(page.current));
      }
    },
    [updates.loading, isEndReached, dispatch, error]
  );

  const debouncedScroll = useMemo(
    () => debounce(handleScroll, 200),
    [handleScroll]
  );

  useEffect(() => {
    const slide = slideRef.current;
    if (!slide) return;

    slide.addEventListener('scroll', debouncedScroll);
    return () => slide.removeEventListener('scroll', debouncedScroll);
  }, [debouncedScroll]);

  return (
    <UpdatesList
      updates={updates}
      onScroll={debouncedScroll}
      slideRef={slideRef}
      currentPage={page.current}
    />
  );
}
