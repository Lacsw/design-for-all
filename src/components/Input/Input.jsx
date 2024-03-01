import { useEffect, useState } from 'react';

import './Input.css';
import hideIcon from '../../images/pass-hide.svg';
import showIcon from '../../images/pass-show.svg';

export default function Input({
  children,
  type,
  value,
  placeholder,
  onChange,
  name,
  errors,
  required = false,
}) {
  const [visibility, setVisibility] = useState(type);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    const isEmpty = value.trim() === '';
    setIsEmpty(isEmpty);
  }, [value]);

  const validationClass = () => {
    if (!isEmpty) {
      return !errors && value ? 'input_valid' : 'input_error';
    } else {
      return '';
    }
  };

  function toggleInputVisibility() {
    setVisibility(visibility === 'password' ? 'text' : 'password');
  }

  function handleBlur({ target }) {
    const isEmpty = target.value.trim() === '';
    setIsEmpty(isEmpty);
  }

  return (
    <div className={`input ${validationClass()}`}>
      <input
        name={name}
        className="input__field"
        type={visibility}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        onBlur={handleBlur}
        autoComplete="off"
      />
      {type === 'password' && (
        <img
          className="input__hide-icon"
          src={visibility === 'password' ? hideIcon : showIcon}
          alt="show/hide password"
          onClick={() => toggleInputVisibility()}
        />
      )}
      {children}
    </div>
  );
}
