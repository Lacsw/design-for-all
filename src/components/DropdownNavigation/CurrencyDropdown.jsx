import React, { useState } from 'react';
import DropdownNavigation from './DropdownNavigation';
import DonationModal from '../DonationModal/DonationModal';

export default function CurrencyDropdown({ options, theme, title }) {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const currency = 'USD';
  const currencySrc = options.find((item) => item.id === currency)?.src[theme];

  const handleClick = (e) => {
    e.stopPropagation();
    setIsDonationModalOpen(true);
  };

  return (
    <>
      <div onClick={handleClick}>
        <DropdownNavigation
          id="currency-menu"
          options={options}
          titleIcon={currencySrc}
          title={title}
          sizeIcon="s"
        />
      </div>
      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
      />
    </>
  );
}
