import React from 'react';
import Modal from '../Modal/Modal';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getCurrentTheme } from 'store/slices/theme';
import kofiLogo from '../../images/donationPlarform/kofi_symbol.svg';
import donationAlertsLogo from '../../images/donationPlarform/da_alert.svg';
import donattyLogo from '../../images/donationPlarform/donatty_mark_white.svg';
import './DonationModal.css';

const DonationModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const theme = useSelector(getCurrentTheme);

  const openKofi = () => {
    window.open('https://ko-fi.com/V7V2P5K17', '_blank');
  };
  
  const openDonatty = () => {
    window.open('https://donatty.com/dfa', '_blank');
  };
  
  const openDonationAlerts = () => {
    window.open('https://www.donationalerts.com/r/design_for_all', '_blank');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('Пожертвования')}
      onConfirm={null}
      large
    >
      <div className={`donation-container ${theme}`}>
        <div className="donation-cards">
          <div className="donation-card" onClick={openKofi}>
            <div className="donation-logo">
              <img 
                src={kofiLogo} 
                alt="Ko-fi" 
                className="donation-logo-img" 
              />
            </div>
            <span className="donation-text">Ko-fi</span>
          </div>
          
          <div className="donation-card" onClick={openDonatty}>
            <div className="donation-logo">
              <img 
                src={donattyLogo} 
                alt="Donatty" 
                className="donation-logo-img" 
              />
            </div>
            <span className="donation-text">Donatty</span>
          </div>
          
          <div className="donation-card" onClick={openDonationAlerts}>
            <div className="donation-logo">
              <img 
                src={donationAlertsLogo} 
                alt="DonationAlerts" 
                className="donation-logo-img" 
              />
            </div>
            <span className="donation-text">DonationAlerts</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DonationModal; 