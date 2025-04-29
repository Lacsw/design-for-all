import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './Footer.css';
import telegramIcon from 'images/socials/telegram-icon.svg';
import instagramIcon from 'images/socials/instagram-icon.svg';
import facebookIcon from 'images/socials/facebook-icon.svg';
import vkIcon from 'images/socials/vk-icon.svg';
import pinterestIcon from 'images/socials/pinterest-icon.svg';
import { useSelector } from 'react-redux';
import { getCurrentTheme } from 'store/slices/theme';
import xBlack from 'images/socials/x-icon_black.svg';
import xWhite from 'images/socials/x-icon_white.svg';
import { FOOTER } from 'utils/translationKeys';

export default function Footer() {
  const theme = useSelector(getCurrentTheme);
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__list-container">
          <h2 className="footer__title">{t(FOOTER.NAV.TITLE)}</h2>
          <ul className="footer__list">
            <li className="footer__list-item">
              <Link to="/" className="footer__link">
                {t(FOOTER.NAV.HOME)}
              </Link>
            </li>
            <li className="footer__list-item">
              <Link to="/#/updates" className="footer__link">
                {t(FOOTER.NAV.UPDATES)}
              </Link>
            </li>
            <li className="footer__list-item">
              <Link to="/#/web" className="footer__link">
                {t(FOOTER.NAV.WEB_APPS)}
              </Link>
            </li>
            <li className="footer__list-item">
              <Link to="/#/desktop" className="footer__link">
                {t(FOOTER.NAV.DESKTOP_APPS)}
              </Link>
            </li>
            <li className="footer__list-item">
              <Link to="/#/mobile" className="footer__link">
                {t(FOOTER.NAV.MOBILE_APPS)}
              </Link>
            </li>
            <li className="footer__list-item">
              <Link to="/#/articles" className="footer__link">
                {t(FOOTER.NAV.ARTICLES)}
              </Link>
            </li>
            <li className="footer__list-item">
              <Link to="/#/manual" className="footer__link">
                {t(FOOTER.NAV.MANUALS)}
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer__list-container">
          <h2 className="footer__title">{t(FOOTER.CONTACTS.TITLE)}</h2>
          <ul className="footer__list">
            <li className="footer__list-item">
              <a href="mailto:dfa.service.info@gmail.com" className="footer__link">
                dfa.service.info@gmail.com
              </a>
            </li>
            <li className="footer__list-item">
              <a href="mailto:dfa.info@ya.com" className="footer__link">
                dfa.info@ya.com
              </a>
            </li>
            <li className="footer__list-item">
              <a href="https://t.me/dfa_design_for_all" className="footer__link">
                @dfa_design_for_all
              </a>
            </li>
          </ul>
        </div>
        <div className="footer__list-container">
          <h2 className="footer__title">{t(FOOTER.LEGAL.TITLE)}</h2>
          <ul className="footer__list">
            <li className="footer__list-item">
              <Link to="/" className="footer__link">
                {t(FOOTER.LEGAL.TERMS)}
              </Link>
            </li>
            <li className="footer__list-item">
              <Link to="/" className="footer__link">
                {t(FOOTER.LEGAL.PRIVACY)}
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer__list-container footer__list-container_socials">
          <h2 className="footer__title">{t(FOOTER.SOCIALS.TITLE)}</h2>
          <ul className="footer__list footer__list_socials">
            <li>
              <a
                href="https://t.me/dfa_design_for_all"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__link"
              >
                <img src={telegramIcon} alt={t(FOOTER.SOCIALS.TELEGRAM_ALT)} />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/dfa_service/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__link"
              >
                <img src={instagramIcon} alt={t(FOOTER.SOCIALS.INSTAGRAM_ALT)} />
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/profile.php?id=100095689982022"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__link"
              >
                <img src={facebookIcon} alt={t(FOOTER.SOCIALS.FACEBOOK_ALT)} />
              </a>
            </li>
            <li>
              <a
                href="https://vk.com/design_for_all_pub"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__link"
              >
                <img src={vkIcon} alt={t(FOOTER.SOCIALS.VK_ALT)} />
              </a>
            </li>
            <li>
              <a
                href="https://ru.pinterest.com/dfaservicemedia/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__link"
              >
                <img src={pinterestIcon} alt={t(FOOTER.SOCIALS.PINTEREST_ALT)} />
              </a>
            </li>
            <li>
              <a
                href="https://x.com/Ivan1983759"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__link"
              >
                <img
                  src={theme === 'dark' ? xWhite : xBlack}
                  alt={t(FOOTER.SOCIALS.X_ALT)}
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="footer__copyright">
        {t(FOOTER.COPYRIGHT, { year: currentYear })}
      </p>
    </footer>
  );
}
