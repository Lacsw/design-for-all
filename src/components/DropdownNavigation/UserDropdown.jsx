import { useTranslation } from 'react-i18next';
import DropdownNavigation from './DropdownNavigation';
import { useLogout } from 'utils/hooks/useLogout';
import { COMMON, HEADER } from 'utils/translationKeys';

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
  const { t } = useTranslation();

  if (!currentUser) return null;

  const enhancedOptions = options.map((option) => {
    const translatedOption = {
      ...option,
      name: t(option.name),
    };

    if (translatedOption.name === t(COMMON.AUTH.LOGOUT)) {
      return { ...translatedOption, onClick: handleLogout };
    }
    if (translatedOption.name === t(COMMON.AUTH.PROFILE)) {
      return { ...translatedOption, name: t(COMMON.AUTH.PROFILE) };
    }
    return translatedOption;
  });

  return (
    <DropdownNavigation
      id="user-menu"
      options={enhancedOptions}
      titleIcon={currentUser.avatar || titleIcon}
      type={type}
      title={t(HEADER.USER.TITLE)}
      resetSection={resetSection}
      theme={theme}
      showName={true}
    />
  );
}
