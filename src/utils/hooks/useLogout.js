import { useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import authApi from 'utils/api/auth';
import { signOut } from 'store/slices/user';
// import {selectIsOpen } from 'store/slices/catalog/slice';
import { broadcastLogout } from './useSyncTabs';
import { adminHash, hashPaths } from 'utils/constants';

/**
 * Хук для унифицированного выхода из системы
 * Очищает состояние, выходит на сервере и перенаправляет на главную страницу только если пользователь на защищенных маршрутах
 *
 * @returns {Function} - Функция для выхода из системы
 */
export function useLogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // const isCatalogOpen = useSelector(selectIsOpen);
  const logoutInProgress = useRef(false);

  return useCallback(async () => {
    // Предотвращаем повторные запросы на выход
    if (logoutInProgress.current) return;
    logoutInProgress.current = true;

    // Проверяем, находится ли пользователь на защищенном маршруте
    const currentHash = location.hash;
    const isAdminRoute = Object.values(adminHash).some(path => 
      typeof path === 'string' ? currentHash === path : path.includes(currentHash)
    );
    const isAuthorRoute = Object.values(hashPaths).includes(currentHash);
    const isProtectedRoute = isAdminRoute || isAuthorRoute;

    // // Очищаем UI только если не в каталоге
    // if (!isCatalogOpen) {
    //   dispatch(setCurrentSection(''));
    // }
    
    dispatch(signOut());

    // Синхронизируем с другими вкладками
    broadcastLogout();

    try {
      // Затем пытаемся выйти на сервере
      await authApi.logout();
    } catch (err) {
      // Если ошибка 401, значит токен уже недействителен
      console.error('Ошибка при выходе:', err);
    } finally {
      // Перенаправляем на главную только если пользователь на защищенном маршруте
      if (isProtectedRoute) {
        navigate('/');
        window.location.hash = '';
      }

      // Сбрасываем флаг после небольшой задержки
      setTimeout(() => {
        logoutInProgress.current = false;
      }, 1000);
    }
  }, [dispatch, navigate, location]);
}
