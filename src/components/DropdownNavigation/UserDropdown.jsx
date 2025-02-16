import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import DropdownNavigation from './DropdownNavigation';
import { signInSuccess } from 'store/slices';
import authApi from 'utils/api/auth';

export default function UserDropdown({
  resetSection,
  options,
  type,
  title,
  currentUser,
  theme,
  titleIcon,
}) {
  const dispatch = useDispatch();

  // Обработчик для выхода из аккаунта
  const handleLogout = useCallback(async () => {
    try {
      await authApi.logout();
      resetSection();
      dispatch(signInSuccess(null));
    } catch (err) {
      console.error('Ошибка при выходе:', err);
    }
  }, [dispatch, resetSection]);

  if (!currentUser) return null;

  const enhancedOptions = options.map((option) =>
    option.name === 'Выйти' ? { ...option, onClick: handleLogout } : option
  );

  return (
    <DropdownNavigation
      options={enhancedOptions}
      titleIcon={currentUser.avatar || titleIcon}
      type={type}
      title={title}
      resetSection={resetSection}
      theme={theme}
      showName={true}
    />
  );
}
