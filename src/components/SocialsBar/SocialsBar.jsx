import './SocialsBar.css';
import { SocialItem } from 'components';
import plusBigIcon from 'images/author/plus-icon.svg';
import { useTranslation } from 'react-i18next';
import { PROFILE } from 'utils/translationKeys';

export default function SocialsBar({
  onOpen,
  socialMediaList,
  onEdit,
  onDelete,
}) {
  const { t } = useTranslation();
  const renderSocialMedia = () => {
    const entries = Object.entries(socialMediaList || {});
    if (entries.length === 0) {
      return null;
    }

    return entries.map(([type, value], index) => (
      <SocialItem
        key={type + index}
        type={type}
        value={value}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    ));
  };

  return (
    <div className="socials-bar">
      {renderSocialMedia()}
      <button type="button" className="socials-bar-btn" onClick={onOpen}>
        <img src={plusBigIcon} alt={t(PROFILE.SOCIAL_BAR.ADD_ICON_ALT)} />
      </button>
    </div>
  );
}
