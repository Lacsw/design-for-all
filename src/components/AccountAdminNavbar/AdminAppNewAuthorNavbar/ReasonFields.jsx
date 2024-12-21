import rejectIcon from 'images/modals/deny-icon.svg';
import approveIcon from 'images/modals/approve-icon.svg';

const possibleFields = [
  'sub_category',
  'image',
  'title',
  'description',
  'recommend_from_creator',
];

const ReasonFields = ({ fields }) => {
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
                  ? 'Красный крестик'
                  : 'Зелёная галочка'
              }
            />
            {field === 'sub_category' && 'Подкатегория'}
            {field === 'title' && 'Заголовок статьи'}
            {field === 'image' && 'Картинка статьи'}
            {field === 'description' && 'Контент статьи'}
            {field === 'recommend_from_creator' && 'Рекомендации авторов'}
          </li>
        );
      })}
    </ul>
  );
};

export default ReasonFields;
