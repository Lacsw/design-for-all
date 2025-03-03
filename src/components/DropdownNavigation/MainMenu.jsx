import { useState } from 'react';
import DropdownNavigation from './DropdownNavigation';
import { useIsMobile } from 'utils/hooks/useIsMobile';

import siginInIconMobile from 'images/navigation/siginin-icon-mobile.svg';
import siginInIconWhiteMobile from 'images/navigation/siginin-icon_white-mobile.svg';
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
          src: { light: siginInIconWhiteMobile, dark: siginInIconMobile },
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
          src: currentUser.avatar
            ? currentUser.avatar
            : { light: profileWhite, dark: profileBlack },
          link: '/#/author/profile',
        },
      ];
    }

    const collapseIndex = updatedOptions.findIndex(
      (item) => item.id === 'collapse'
    );
    if (collapseIndex !== -1) {
      const [collapseItem] = updatedOptions.splice(collapseIndex, 1);
      updatedOptions.unshift(collapseItem); //вставляем collapse первым
    }

    const themeToggleIndex = updatedOptions.findIndex(
      (item) => item.id === 'themeToggle'
    );
    if (themeToggleIndex !== -1) {
      const [themeToggleItem] = updatedOptions.splice(themeToggleIndex, 1);
      updatedOptions.push(themeToggleItem); // вставляем themeToggle последним
    }
  }

  return (
    <DropdownNavigation
      options={updatedOptions}
      titleIcon={titleIcon}
      title={title}
      showName={showName}
      theme={theme}
    />
  );
}
