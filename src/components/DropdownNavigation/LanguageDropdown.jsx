import DropdownNavigation from './DropdownNavigation';
import { useLanguageSync } from 'utils/hooks/useLanguageSync';

export default function LanguageDropdown({ options, title, theme }) {
  const { language, setLanguage } = useLanguageSync();

  const langSrc = options.find((item) => item.name === language)?.src;
  const filteredOptions = options.filter((item) => item.name !== language);

  const handleOptionClick = (option) => {
    setLanguage(option);
  };

  const updatedOptions = filteredOptions.map((option) => ({
    ...option,
    onClick: () => handleOptionClick(option.name),
  }));

  return (
    <DropdownNavigation
      id="language-menu"
      options={updatedOptions}
      titleIcon={langSrc}
      title={title}
      theme={theme}
      sizeIcon="m"
      customBottomPadding="bottom-padding"
    />
  );
}
