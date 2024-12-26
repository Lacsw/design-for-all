import { useState } from 'react';
import { Svg } from 'components';
import './DropdownIcons.css';

const DropdownIcons = ({ wide, mainIcon, list, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownClass = wide
    ? 'dropdown-icons dropdown-icons_wide'
    : 'dropdown-icons';

  return (
    <div
      className={dropdownClass}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <ul className="dropdown-icons__list">
        <li className="dropdown-icons__item">
          <Svg icon={mainIcon} />
        </li>
        {isOpen &&
          list.map((item) => (
            <li
              className="dropdown-icons__item dropdown-icons__item_bg"
              key={item.name}
              onClick={() => onClick(item.name)}
            >
              <Svg icon={item.url} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default DropdownIcons;
