import { useState } from 'react';
import DropdownNavigation from './DropdownNavigation';
import { useIsMobile } from 'utils/hooks/useIsMobile';

import siginInIcon from 'images/siginin-icon.svg';
import siginInIconWhite from 'images/siginin-icon_white.svg';
import profileBlack from 'images/navigation/profile-icon-black.svg';
import profileWhite from 'images/navigation/profile-icon-white.svg';

export default function MainMenu({
  options = [],
  titleIcon,
  title,
  toggleTheme,
  theme,
  currentUser,
  openAuthModal,
}) {
  const [showName, setShowName] = useState(true);
  const isMobile = useIsMobile();

  const toggleShowName = () => setShowName((prev) => !prev);

  // Обновляем опции согласно исходной логике
  let updatedOptions = options.map((option) => {
    if (option.id === 'themeToggle') {
      return {
        ...option,
        name: theme === 'dark' ? 'Светлая тема' : 'Темная тема',
        onClick: toggleTheme,
      };
    }
    if (option.id === 'collapse') {
      return {
        ...option,
        onClick: toggleShowName,
      };
    }
    return option;
  });

  // Для мобильной версия
  if (isMobile) {
    if (!currentUser) {
      // Пользователь не авторизован - кнопка "Авторизация"
      updatedOptions = [
        ...updatedOptions,
        {
          id: 'login',
          name: 'Авторизация',
          src: { light: siginInIconWhite, dark: siginInIcon },
          onClick: openAuthModal,
          closeOnClick: true,
        },
      ];
    } else {
      // Пользователь авторизован – ссылка на профиль
      updatedOptions = [
        ...updatedOptions,
        {
          id: 'profile',
          name: 'Профиль',
          src: { light: profileWhite, dark: profileBlack },
          link: '/#/author/profile',
        },
      ];
    }
  }

  return (
    <DropdownNavigation
      options={updatedOptions}
      titleIcon={titleIcon}
      title={title}
      showName={showName}
      theme={theme}
      // Передать дополнительные пропсы, если требуется
    />
  );
}
