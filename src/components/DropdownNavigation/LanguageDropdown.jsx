import { useTranslation } from 'react-i18next';
import DropdownNavigation from './DropdownNavigation';
import { useLanguageSync } from 'utils/hooks/useLanguageSync';

export default function LanguageDropdown({ options, title, theme }) {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguageSync();

  const langSrc = options.find((item) => item.id === language)?.src;
  const filteredOptions = options.filter((item) => item.id !== language);

  const handleOptionClick = (option) => {
    setLanguage(option);
  };

  const updatedOptions = filteredOptions.map((option) => ({
    ...option,
    name: t(option.translationKey),
    onClick: () => handleOptionClick(option.id),
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
