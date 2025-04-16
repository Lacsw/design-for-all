import { useTranslation } from 'react-i18next';
import DropdownNavigation from './DropdownNavigation';
import { HEADER } from 'utils/constants/translationKeys';

export default function CurrencyDropdown({ options, theme, title }) {
  const { t } = useTranslation();
  const language = 'USD';
  const currencySrc = options.find((item) => item.id === language)?.src[theme];

  return (
    <DropdownNavigation
      id="currency-menu"
      options={options}
      titleIcon={currencySrc}
      title={t(HEADER.CURRENCY.TITLE)}
      sizeIcon="s"
    />
  );
}
