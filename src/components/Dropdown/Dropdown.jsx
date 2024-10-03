import { useEffect, useState } from 'react';
import './Dropdown.css';

import arrow from 'images/author/arrow.svg';
import largeArrow from 'images/admin/arrow-large.svg';

export default function Dropdown({
  id,
  name,
  options,
  title,
  large,
  onChange,
}) {
  const [selectedOption, setSelectedOption] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    let opt = options.find((item) => item.value === title)?.label;
    setSelectedOption(opt || title);
  }, [options, title]);

  const handleOptionClick = (option) => {
    setSelectedOption(option.label);
    setIsDropdownOpen(false);
    onChange(id, option.value);
  };

  return (
    <div
      className={`dropdown ${large && 'dropdown__large'}`}
      id={id}
      name={name}
      onMouseEnter={() => setIsDropdownOpen(true)}
      onMouseLeave={() => setIsDropdownOpen(false)}
    >
      <div className="dropdown__title">
        {selectedOption}
        <img
          className="dropdown__image"
          src={large ? largeArrow : arrow}
          alt="стрелка"
        />
      </div>

      {isDropdownOpen && (
        <ul className="dropdown__list">
          {options.map((option) => (
            <li
              key={option.value}
              value={option.value}
              className="dropdown__item"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
