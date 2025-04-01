import './SocialsBar.css';
import { SocialItem } from 'components';
import plusBigIcon from 'images/author/plus-icon.svg';

export default function SocialsBar({
  onOpen,
  socialMediaList,
  onEdit,
  onDelete,
}) {
  const renderSocialMedia = () => {
    const entries = Object.entries(socialMediaList || {});
    if (entries.length === 0) {
      return <p className="socials-bar-empty">Контакты отсутствуют</p>;
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
        <img src={plusBigIcon} alt="Иконка добавить" />
      </button>
    </div>
  );
}
