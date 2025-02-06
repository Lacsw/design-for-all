import DropdownNavigation from './DropdownNavigation';

export default function CurrencyDropdown({ options, theme, title }) {
  const language = 'USD';
  const currencySrc = options.find((item) => item.name === language)?.src[
    theme
  ];

  return (
    <DropdownNavigation
      options={options}
      titleIcon={currencySrc}
      title={title}
      sizeIcon="s"
    />
  );
}
