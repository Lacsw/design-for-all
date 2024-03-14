import './FieldEditable.css';
import editIcon from 'images/edit-icon.svg';

export default function FieldEditable({ value }) {
  return (
    <div className="field-editable">
      <div className="field-editable__text">{value}</div>
      <button className="field-editable__btn">
        <img src={editIcon} alt="Редактировать" />
      </button>
    </div>
  );
}
