import { useEffect, useState } from 'react';
import { Input, Modal } from 'components';
import { useSelector } from 'react-redux';
import { getCurrentTheme } from 'store/slices/theme';
import './ModalSocials.css';
import {
  emailRegex,
  phoneRegex,
  socialsRegex,
  detectSocialPlatform,
  detectTitleName,
} from 'utils/socials';

export default function ModalSocials({
  isOpen,
  onClose,
  onSave,
  title,
  contact,
}) {
  const theme = useSelector(getCurrentTheme);
  const isEditMode = Boolean(contact);
  const [selectedOption, setSelectedOption] = useState(
    isEditMode ? contact.type : 'phone'
  );
  const [inputValue, setInputValue] = useState(isEditMode ? contact.value : '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (contact) {
      setSelectedOption(contact.type);
      setInputValue(contact.value);
    } else {
      setSelectedOption('phone');
      setInputValue('');
      setError('');
    }
  }, [contact]);

  // Разрешаем изменять выбранную опцию только в режиме добавления
  const handleOptionChange = (e) => {
    if (!isEditMode) {
      setSelectedOption(e.target.value);
      setInputValue('');
      setError('');
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length > 400) {
      setError('Длина ссылки не должна превышать 400 символов');
      return;
    }

    let regex;
    // В режиме добавления используем выбранный тип, в режиме редактирования – фиксированный тип
    if (!isEditMode) {
      if (selectedOption === 'phone') {
        regex = phoneRegex;
      } else if (selectedOption === 'email') {
        regex = emailRegex;
      } else {
        regex = socialsRegex;
      }
    } else {
      if (contact.type === 'phone') {
        regex = phoneRegex;
      } else if (contact.type === 'email') {
        regex = emailRegex;
      } else {
        regex = socialsRegex;
      }
    }

    if (value && !regex.test(value)) {
      setError('Введите корректное значение');
      return;
    }

    // Дополнительная проверка для социальных сетей в режиме редактирования:
    if (
      isEditMode &&
      contact &&
      contact.type !== 'phone' &&
      contact.type !== 'email'
    ) {
      const detected = detectSocialPlatform(value);
      if (value && detected !== contact.type) {
        setError(
          'Ой, адрес не соответствует выбранной соцсети. Проверьте, пожалуйста, ссылку.'
        );
        return;
      }
    }

    setError('');
  };

  const handleConfirm = () => {
    if (!error && inputValue) {
      // В режиме добавления, если выбран тип "socials", определяем его автоматически
      const platform = !isEditMode
        ? selectedOption === 'socials'
          ? detectSocialPlatform(inputValue)
          : selectedOption
        : contact.type; // В режиме редактирования тип фиксирован

      // Если в режиме редактирования URL не соответствует исходному типу, блокируем подтверждение
      if (isEditMode && contact.type !== 'phone' && contact.type !== 'email') {
        const detected = detectSocialPlatform(inputValue);
        if (detected !== contact.type) {
          setError(
            'Ой, адрес не соответствует выбранной соцсети. Проверьте, пожалуйста, ссылку.'
          );
          return;
        }
      }
      // Передаём объект контакта для обновления
      onSave({ social_media: { [platform]: inputValue } });
      setInputValue('');
      onClose();
    }
  };

  const modalTitle = isEditMode
    ? `Редактировать ${detectTitleName(contact.value, contact.type)}`
    : title;

  return (
    <Modal
      title={modalTitle}
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      twoBtns
      isBlocked={!!error || !inputValue}
    >
      {!isEditMode && (
        <div
          className={`modal-socials__options ${
            theme === 'dark' ? 'dark' : 'light'
          }`}
        >
          <label className="custom-radio">
            <input
              type="radio"
              name="contactType"
              value="phone"
              checked={selectedOption === 'phone'}
              onChange={handleOptionChange}
            />
            <span className="radio-custom" />
            <span className="radio-text">Телефон</span>
          </label>
          <label className="custom-radio">
            <input
              type="radio"
              name="contactType"
              value="email"
              checked={selectedOption === 'email'}
              onChange={handleOptionChange}
            />
            <span className="radio-custom" />
            <span className="radio-text">Email</span>
          </label>

          <label className="custom-radio">
            <input
              type="radio"
              name="contactType"
              value="socials"
              checked={selectedOption === 'socials'}
              onChange={handleOptionChange}
            />
            <span className="radio-custom" />
            <span className="radio-text">Соц. сети</span>
          </label>
        </div>
      )}

      <label className="modal-socials__input-label">
        <Input
          type="text"
          value={inputValue}
          placeholder={
            selectedOption === 'email'
              ? 'example@mail.com'
              : selectedOption === 'phone'
              ? '+71234567890'
              : 'https://example.com'
          }
          onChange={handleInputChange}
          errors={error}
        />
        {error && isEditMode && (
          <span className="modal-socials__error">{error}</span>
        )}
      </label>
    </Modal>
  );
}
