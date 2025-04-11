import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInSuccess, signInFailure } from 'store/slices/user';
import authorApi from '../api/author';
import { useLocation, useSearchParams } from 'react-router-dom';

export const useAuthCheck = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const location = useLocation();
  const [, setSearchParams] = useSearchParams();
  const checkInProgress = useRef(false);

  useEffect(() => {
    const checkAuth = async () => {
      // Предотвращаем повторные запросы, пока предыдущий не завершен
      if (checkInProgress.current) return;
      checkInProgress.current = true;

      try {
        // Проверяем наличие токена в куках
        const response = await fetch('/api/check-auth', {
          credentials: 'include',
        });

        if (response.ok) {
          // Если токен валидный, но нет данных пользователя, запрашиваем их
          if (!currentUser) {
            const userData = await authorApi.profileAuthor();
            dispatch(signInSuccess(userData));
          }
        } else {
          // Если токен невалидный, очищаем состояние
          dispatch(signInFailure('Session expired'));
          dispatch(signInSuccess(null));

          // Если текущий хеш требует авторизации, перенаправляем на логин
          if (
            location.hash &&
            (location.hash.includes('/author/') ||
              location.hash.includes('/admin/'))
          ) {
            const returnUrl = encodeURIComponent(
              location.pathname + location.hash
            );
            setSearchParams({ 'modal-auth': 'login', returnUrl });
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
        dispatch(signInFailure('Authentication error'));
        dispatch(signInSuccess(null));
      } finally {
        checkInProgress.current = false;
      }
    };

    // Запускаем проверку только если нет пользователя
    if (!currentUser) {
      checkAuth();
    }
  }, [dispatch, currentUser, location, setSearchParams]);
};
