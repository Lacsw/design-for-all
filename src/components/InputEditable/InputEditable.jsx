import './InputEditable.css';

import editIcon from '../../images/edit-icon.svg';
import Input from '../Input/Input';

export default function InputEditable({ type, value }) {
  return (
    <Input type={type} value={value}>
      <button className="input-editable__btn">
        <img src={editIcon} alt="Редактировать" />
      </button>
    </Input>
  );
}
