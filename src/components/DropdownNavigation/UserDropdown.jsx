import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const handleLogout = useLogout({ resetSection });
 

  if (!currentUser) return null;

  const enhancedOptions = options.map((option) => {
    const translatedOption = {
      ...option,
      name: t(option.translationKey),
    };

    if (translatedOption.id === "logout") {
      return { ...translatedOption, onClick: handleLogout };
    }
    if (translatedOption.id === "profile") {
      return { ...translatedOption };
    }
    return translatedOption;
  });

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
