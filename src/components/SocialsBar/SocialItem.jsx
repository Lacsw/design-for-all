import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentTheme } from 'store/selectors';
import { socialIcons } from 'utils/constants';
import './SocialsBar.css';

import deleteIconNoBgBlack from 'images/delete_icon_no_bg_black.svg';
import editIconNoBgBlack from 'images/edit_icon_no_bg_black.svg';

function SocialItem({ type, value, onEdit, onDelete }) {
  const theme = useSelector(getCurrentTheme);
  const [showActions, setShowActions] = useState(false);

  const handleMouseEnter = () => setShowActions(true);
  const handleMouseLeave = () => setShowActions(false);

  const toggleActions = (e) => {
    e.preventDefault();
    setShowActions((prev) => !prev);
  };

  return (
    <div
      className="social-item"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      <button
        onClick={toggleActions}
        type="button"
        className="socials-bar-btn socials-bar-btn-margin"
      >
        <img
          src={
            (socialIcons[type] && socialIcons[type][theme]) ||
            socialIcons[type] ||
            socialIcons['default'][theme]
          }
          alt={type}
        />
      </button>
      {showActions && (
        <div className="social-item-actions">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(type);
            }}
            className="socials-bar-btn"
          >
            <img src={deleteIconNoBgBlack} alt={type} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(type, value);
            }}
            className="socials-bar-btn"
          >
            <img src={editIconNoBgBlack} alt={type} />
          </button>
        </div>
      )}
    </div>
  );
}

export default SocialItem;
