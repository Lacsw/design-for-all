import rejectIcon from 'images/modals/deny-icon.svg';
import approveIcon from 'images/modals/approve-icon.svg';
import { useTranslation } from 'react-i18next';
import { ADMIN } from 'utils/translationKeys';

const possibleFields = [
  'sub_category',
  'image',
  'title',
  'description',
  'recommend_from_creator',
];

const ReasonFields = ({ fields }) => {
  const { t } = useTranslation();
  const keysInOrder = possibleFields.filter((field) => fields[field]);

  return (
    <ul className="modal__reasons-list">
      {keysInOrder.map((field) => {
        return (
          <li className="modal__reason" key={field}>
            <img
              className="modal__reason-icon"
              src={fields[field] === 'reject' ? rejectIcon : approveIcon}
              alt={
                fields[field] === 'reject'
                  ? t(ADMIN.REASON_FIELDS.ICONS.REJECT)
                  : t(ADMIN.REASON_FIELDS.ICONS.APPROVE)
              }
            />
            {field === 'sub_category' && t(ADMIN.REASON_FIELDS.SUB_CATEGORY)}
            {field === 'title' && t(ADMIN.REASON_FIELDS.TITLE)}
            {field === 'image' && t(ADMIN.REASON_FIELDS.IMAGE)}
            {field === 'description' && t(ADMIN.REASON_FIELDS.DESCRIPTION)}
            {field === 'recommend_from_creator' && t(ADMIN.REASON_FIELDS.RECOMMENDATIONS)}
          </li>
        );
      })}
    </ul>
  );
};

export default ReasonFields;
