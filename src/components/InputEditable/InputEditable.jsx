import './InputEditable.css';

import editIcon from 'images/edit-icon.svg';
import { Input } from 'components';
import { useTranslation } from 'react-i18next';
import { PROFILE } from 'utils/translationKeys';

export default function InputEditable({ type, value, onOpen }) {
  const { t } = useTranslation();
  return (
    <Input type={type} value={value} placeholder={t(PROFILE.INPUT_EDITABLE.PLACEHOLDER)} disabled>
      <button type="button" className="input-editable__btn" onClick={onOpen}>
        <img src={editIcon} alt={t(PROFILE.INPUT_EDITABLE.EDIT_ICON_ALT)} />
      </button>
    </Input>
  );
}
