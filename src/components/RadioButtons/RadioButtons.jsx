import { useSelector } from 'react-redux';
import { getCurrentTheme } from 'store/slices/theme';
import './RadioButtons.css';

const RadioButtons = ({ name, onChoice }) => {
  const theme = useSelector(getCurrentTheme);
  return (
    <div className={'radio-box ' + theme}>
      <label className="radio-label">
        <input
          type="radio"
          name={name}
          className="radio radio_approve"
          value="approve"
          onChange={onChoice}
        />
      </label>
      <label className="radio-label">
        <input
          type="radio"
          name={name}
          className="radio radio_reject"
          value="reject"
          onChange={onChoice}
        />
      </label>
    </div>
  );
};

export default RadioButtons;
