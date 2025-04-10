import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getCurrentUser } from 'store/selectors';
import { useAuthCheck } from 'utils/hooks/useAuthCheck';

export default function ProtectedHashRoute({ children, requiredRole }) {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentUser = useSelector(getCurrentUser);
  const previousUserRef = useRef(currentUser);
  
  // Используем хук для проверки авторизации
  useAuthCheck();

  useEffect(() => {
    // Пропускаем первый рендер и обработку, если пользователь не изменился
    if (previousUserRef.current === currentUser) {
      return;
    }
    previousUserRef.current = currentUser;

    // Проверяем авторизацию и роль пользователя
    if (!currentUser) {
      // Сохраняем текущий хеш для редиректа после авторизации
      const returnUrl = encodeURIComponent(location.pathname + location.hash);
      setSearchParams({ 'modal-auth': 'login', returnUrl });
      return;
    }

    if (requiredRole && currentUser.role !== requiredRole) {
      // Если у пользователя нет нужной роли, перенаправляем на главную
      // и очищаем returnUrl, чтобы не было цикла редиректов
      const params = new URLSearchParams(searchParams);
      params.delete('returnUrl');
      setSearchParams(params);
      window.location.href = '/';
      return;
    }
  }, [currentUser, location, setSearchParams, requiredRole, searchParams]);

  // Если пользователь авторизован и имеет нужную роль, показываем защищенный контент
  if (currentUser && (!requiredRole || currentUser.role === requiredRole)) {
    return children;
  }

  return null;
} 