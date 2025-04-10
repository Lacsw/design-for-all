import { useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import authApi from 'utils/api/auth';
import { signOut } from 'store/slices';
import { broadcastLogout } from './useSyncTabs';

/**
 * Хук для унифицированного выхода из системы
 * @param {object} options - Опции для выхода
 * @param {Function} [options.resetSection] - Функция для сброса секции
 * @param {Function} [options.onSuccess] - Callback, вызываемый после успешного выхода
 * @param {string} [options.redirectTo] - URL для редиректа после выхода
 * @returns {Function} - Функция для выхода из системы
 */
export function useLogout({ resetSection, onSuccess, redirectTo } = {}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutInProgress = useRef(false);

  return useCallback(async () => {
    // Предотвращаем повторные запросы на выход
    if (logoutInProgress.current) return;
    logoutInProgress.current = true;

    // Сразу очищаем UI для предотвращения моргания
    if (resetSection) {
      resetSection();
    }
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
      // Выполняем дополнительные действия после выхода
      if (onSuccess) {
        onSuccess();
      }
      
      // Если указан URL для редиректа, перенаправляем
      if (redirectTo) {
        navigate(redirectTo);
      }

      // Сбрасываем флаг после небольшой задержки
      setTimeout(() => {
        logoutInProgress.current = false;
      }, 1000);
    }
  }, [dispatch, navigate, resetSection, onSuccess, redirectTo]);
} 