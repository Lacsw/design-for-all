import { useState } from 'react';
import DropdownNavigation from './DropdownNavigation';

export default function MainMenu({
  options = [],
  titleIcon,
  title,
  toggleTheme,
  theme,
}) {
  const [showName, setShowName] = useState(true);

  const toggleShowName = () => setShowName((prev) => !prev);

  const updatedOptions = options.map((option) => {
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
