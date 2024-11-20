import './InputEditable.css';

import editIcon from 'images/edit-icon.svg';
import { Input } from 'components';

export default function InputEditable({ type, value, onOpen }) {
  return (
    <Input type={type} value={value} placeholder={'example@domain.com'} disabled>
      <button type="button" className="input-editable__btn" onClick={onOpen}>
        <img src={editIcon} alt="Редактировать" />
      </button>
    </Input>
  );
}
