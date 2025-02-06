import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

/**
 * Универсальный хук для автоматического завершения сессии.
 *
 * @param {object} params
 * @param {number} params.timeout - время таймаута в миллисекундах.
 * @param {boolean} params.shouldTimeout - условие, при котором таймаут активен.
 * @param {Function} params.onTimeout - функция, которая вызывается по истечении
 *   таймаута.
 * @param {string[]} [params.events] - список событий, сбрасывающих таймер.
 */

export const useSessionTimeout = ({
  timeout = 3600000,
  shouldTimeout = false,
  onTimeout,
  events = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'],
}) => {
  const dispatch = useDispatch();
  const timerRef = useRef(null);

  useEffect(() => {
    if (!shouldTimeout) return;

    const resetTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(async () => {
        if (typeof onTimeout === 'function') {
          await onTimeout(dispatch);
        }
      }, timeout);
    };

    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [shouldTimeout, timeout, onTimeout, dispatch, events]);
};
