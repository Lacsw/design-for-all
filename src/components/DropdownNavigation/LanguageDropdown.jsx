import { useDispatch, useSelector } from 'react-redux';
import DropdownNavigation from './DropdownNavigation';
import { getLanguage } from 'store/selectors';
import { changeLanguage } from 'store/slices';

export default function LanguageDropdown({ options, title, theme }) {
  const dispatch = useDispatch();

  const language = useSelector(getLanguage);
  const langSrc = options.find((item) => item.name === language)?.src[theme];

  const handleOptionClick = (option) => {
    dispatch(changeLanguage(option));
  };

  const updatedOptions = options.map((option) => ({
    ...option,
    onClick: () => handleOptionClick(option.name),
  }));

  return (
    <DropdownNavigation
      options={updatedOptions}
      titleIcon={langSrc}
      title={title}
      theme={theme}
      sizeIcon="m"
      customBottomPadding="bottom-padding"
    />
  );
}
