import { useState } from 'react';
import { Input, Modal } from 'components';
import { useSelector } from 'react-redux';
import { getCurrentTheme } from 'store/selectors';
import './ModalSocials.css';

const emailRegex = /^[\w.-]+@[\w.-]+\.\w+$/;
const phoneRegex = /^\+?\d{10,15}$/;
const socialsRegex = /^https:\/\/\S+\.\S+$/;

export default function ModalSocials({ isOpen, onClose, onSave, title }) {
  const theme = useSelector(getCurrentTheme);
  const [selectedOption, setSelectedOption] = useState('phone');
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    setInputValue('');
    setError('');
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    let regex;
    if (selectedOption === 'phone') {
      regex = phoneRegex;
    } else if (selectedOption === 'email') {
      regex = emailRegex;
    } else {
      regex = socialsRegex;
    }

    if (value && !regex.test(value)) {
      setError('Введите корректное значение');
    } else {
      setError('');
    }
  };

  const handleConfirm = () => {
    if (!error && inputValue) {
      onSave({ social_media: { [selectedOption]: inputValue } });
      setInputValue('');
      onClose();
    }
  };

  return (
    <Modal
      title={title}
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      twoBtns
      isBlocked={!!error || !inputValue}
    >
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
      </label>
    </Modal>
  );
}
