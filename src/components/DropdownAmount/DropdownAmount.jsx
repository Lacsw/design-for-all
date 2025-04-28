import { useEffect, useState } from 'react';
import './DropdownAmount.css';

import arrow from 'images/author/arrow.svg';
import { useTranslation } from 'react-i18next';
import { DROPDOWN } from 'utils/translationKeys';

export default function DropdownAmount({
  id,
  name,
  options,
  handlePagination,
}) {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState('20');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    handlePagination(selectedOption);
  }, [selectedOption, handlePagination]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  return (
    <div
      className={`dropdown`}
      id={id}
      name={name}
      onMouseEnter={() => setIsDropdownOpen(true)}
      onMouseLeave={() => setIsDropdownOpen(false)}
    >
      <div className="dropdown-amount__title">
        {selectedOption}
        <img className="dropdown__image" src={arrow} alt={t(DROPDOWN.AMOUNT.ARROW_ALT)} />
      </div>

      {isDropdownOpen && (
        <ul className="dropdown-amount__list">
          {options.map((option) => (
            <li
              key={option.value}
              value={option.value}
              className={`dropdown-amount__item ${
                option.value === selectedOption &&
                'dropdown-amount__item_active'
              }`}
              onClick={() => {
                handleOptionClick(option.label);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
