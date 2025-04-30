import DropdownNavigation from './DropdownNavigation';

export default function CurrencyDropdown({ options, theme, title }) {
  const currency = 'USD';
  const currencySrc = options.find((item) => item.id === currency)?.src[theme];

  return (
    <DropdownNavigation
      id="currency-menu"
      options={options}
      titleIcon={currencySrc}
      title={title}
      sizeIcon="s"
    />
  );
}
