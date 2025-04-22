import { useTranslation } from 'react-i18next';
import DropdownNavigation from './DropdownNavigation';
import { useLanguageSync } from 'utils/hooks/useLanguageSync';
import { HEADER } from 'utils/translationKeys';

export default function LanguageDropdown({ options, title, theme }) {
  const { language, setLanguage } = useLanguageSync();
  const { t } = useTranslation();

  const langSrc = options.find((item) => item.name === language)?.src;
  const filteredOptions = options.filter((item) => item.name !== language);

  const handleOptionClick = (option) => {
    setLanguage(option);
  };

  const updatedOptions = filteredOptions.map((option) => ({
    ...option,
    name: t(`header_language_${option.name.toLowerCase()}`),
    onClick: () => handleOptionClick(option.name),
  }));

  return (
    <DropdownNavigation
      id="language-menu"
      options={updatedOptions}
      titleIcon={langSrc}
      title={t(HEADER.LANGUAGE.TITLE)}
      theme={theme}
      sizeIcon="m"
      customBottomPadding="bottom-padding"
    />
  );
}
