import DropdownNavigation from './DropdownNavigation';
import { useLogout } from 'utils/hooks/useLogout';

export default function UserDropdown({
  resetSection,
  options,
  type,
  title,
  currentUser,
  theme,
  titleIcon,
}) {
  const handleLogout = useLogout({ resetSection });

  if (!currentUser) return null;

  const enhancedOptions = options.map((option) =>
    option.name === 'Выйти' ? { ...option, onClick: handleLogout } : option
  );

  return (
    <DropdownNavigation
      id="user-menu"
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
