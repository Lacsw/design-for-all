import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInSuccess, signOut } from 'store/slices/user';

const LOGOUT_EVENT = 'app:logout';

// Хук для синхронизации состояния аутентификации пользователя между вкладками
export const useSyncTabs = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const processingRef = useRef(false);

  useEffect(() => {
    const handleStorageChange = (e) => {
      // Проверяем, не обрабатывается ли уже событие
      if (processingRef.current) return;

      // Проверяем, изменился ли ключ 'persist:root'
      if (e.key === 'persist:root') {
        try {
          // Парсим новое состояние из localStorage
          const newState = JSON.parse(e.newValue);
          const userState = JSON.parse(newState.user);

          // Если есть данные пользователя, обновляем состояние
          if (userState.currentUser) {
            // Если текущий пользователь не совпадает с новым, выполняем вход
            if (
              !currentUser ||
              currentUser.uuid !== userState.currentUser.uuid
            ) {
              dispatch(signInSuccess(userState.currentUser));
            }
          } else if (currentUser) {
            // Если данных пользователя нет, но пользователь был авторизован выполняем выход
            processingRef.current = true; // Устанавливаем флаг обработки
            dispatch(signOut()); // Выполняем выход
            setTimeout(() => {
              processingRef.current = false;
            }, 100); // Сбрасываем флаг обработки через 100 мс
          }
        } catch (error) {
          console.error('Error parsing storage data:', error); // Обрабатываем ошибку парсинга данных
        }
      }
    };

    // Обработчик кастомного события выхода
    const handleLogout = () => {
      if (processingRef.current) return; // Проверяем, не обрабатывается ли уже событие
      if (currentUser) {
        processingRef.current = true; // Устанавливаем флаг обработки
        dispatch(signOut()); // Выполняем выход
        setTimeout(() => {
          processingRef.current = false; // Сбрасываем флаг обработки через 100 мс
        }, 100);
      }
    };

    window.addEventListener('storage', handleStorageChange); // Добавляем обработчик события изменения localStorage
    window.addEventListener(LOGOUT_EVENT, handleLogout); // Добавляем обработчик события выхода

    return () => {
      window.removeEventListener('storage', handleStorageChange); // Удаляем обработчик события изменения localStorage
      window.removeEventListener(LOGOUT_EVENT, handleLogout); // Удаляем обработчик события выхода
    };
  }, [dispatch, currentUser]);
};

// Экспортируем функцию для отправки события выхода
export const broadcastLogout = () => {
  window.dispatchEvent(new Event(LOGOUT_EVENT));
};
